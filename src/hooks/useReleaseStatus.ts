import { useState, useEffect, useCallback, useRef } from 'react';
import { ReleaseResponse } from '../types/eventTypes.ts';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { OFFICIAL_PROBLEM_STATEMENT_DATA } from '../data/problemStatementData.ts';

interface UseReleaseStatusOptions {
  simulatedTime?: string | null;
}

export function useReleaseStatus({ simulatedTime }: UseReleaseStatusOptions = {}) {
  const [data, setData] = useState<ReleaseResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track client-server clock offset in milliseconds
  const [clockOffsetMs, setClockOffsetMs] = useState<number>(0);
  
  // High-frequency seconds countdown
  const [timeRemainingReleaseMs, setTimeRemainingReleaseMs] = useState<number>(() => {
    const releaseMs = new Date(EVENT_CONFIG.releaseTimestamp).getTime();
    return Math.max(0, releaseMs - Date.now());
  });
  const [timeRemainingDeadlineMs, setTimeRemainingDeadlineMs] = useState<number>(() => {
    const deadlineMs = new Date(EVENT_CONFIG.deadlineTimestamp).getTime();
    return Math.max(0, deadlineMs - Date.now());
  });

  const prevIsReleased = useRef<boolean | null>(null);

  // Compute fallback release state based on client clock and admin override
  const getClientFallbackState = useCallback((): ReleaseResponse => {
    const now = Date.now();
    const releaseMs = new Date(EVENT_CONFIG.releaseTimestamp).getTime();
    const deadlineMs = new Date(EVENT_CONFIG.deadlineTimestamp).getTime();

    // Check local admin override
    const localAdminMode = localStorage.getItem('innovista_admin_mode') || 'official';
    const localSimulatedTime = localStorage.getItem('innovista_simulated_time');

    let effectiveNow = now;
    if (simulatedTime) {
      const p = new Date(simulatedTime).getTime();
      if (!isNaN(p)) effectiveNow = p;
    } else if (localSimulatedTime) {
      const p = new Date(localSimulatedTime).getTime();
      if (!isNaN(p)) effectiveNow = p;
    }

    let isReleased = effectiveNow >= releaseMs;
    let isDeadlinePassed = effectiveNow >= deadlineMs;

    if (localAdminMode === 'force_unlocked') {
      isReleased = true;
      isDeadlinePassed = false;
    } else if (localAdminMode === 'force_locked') {
      isReleased = false;
      isDeadlinePassed = false;
    } else if (localAdminMode === 'force_deadline') {
      isReleased = true;
      isDeadlinePassed = true;
    }

    const remainingRelease = isReleased ? 0 : Math.max(0, releaseMs - effectiveNow);
    const remainingDeadline = isDeadlinePassed ? 0 : Math.max(0, deadlineMs - effectiveNow);

    return {
      isReleased,
      isDeadlinePassed,
      serverTime: new Date(effectiveNow).toISOString(),
      releaseTime: EVENT_CONFIG.releaseTimestamp,
      deadlineTime: EVENT_CONFIG.deadlineTimestamp,
      timeRemainingToReleaseMs: remainingRelease,
      timeRemainingToDeadlineMs: remainingDeadline,
      message: isReleased 
        ? undefined 
        : 'The Problem Statement is currently locked. It will automatically be revealed on 30 October 2026 at 11:00 AM IST.',
      problemStatement: isReleased ? OFFICIAL_PROBLEM_STATEMENT_DATA : undefined,
    };
  }, [simulatedTime]);

  // Fetch release status directly from authoritative backend with resilient fallback
  const fetchStatus = useCallback(async () => {
    try {
      const url = new URL('/api/problem-statement', window.location.origin);
      if (simulatedTime) {
        url.searchParams.set('simulated_time', simulatedTime);
      }

      const res = await fetch(url.toString(), {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      // Verify that the response is valid JSON (not HTML from an SPA rewrite)
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        // Fall back gracefully to client scheduler
        const fallback = getClientFallbackState();
        setData(fallback);
        setTimeRemainingReleaseMs(fallback.timeRemainingToReleaseMs);
        setTimeRemainingDeadlineMs(fallback.timeRemainingToDeadlineMs);
        setError(null);
        return;
      }

      const json: ReleaseResponse = await res.json();
      setData(json);
      setError(null);

      // Compute client-server time offset
      const serverDate = new Date(json.serverTime).getTime();
      const clientNow = Date.now();
      setClockOffsetMs(serverDate - clientNow);

      setTimeRemainingReleaseMs(json.timeRemainingToReleaseMs);
      setTimeRemainingDeadlineMs(json.timeRemainingToDeadlineMs);

      // Detect transition to live
      if (prevIsReleased.current === false && json.isReleased === true) {
        console.log('[Innovista 2026] Problem Statement unlocked automatically!');
      }
      prevIsReleased.current = json.isReleased;
    } catch (err) {
      // In case of any network or JSON parsing issue, apply reliable local fallback
      const fallback = getClientFallbackState();
      setData(fallback);
      setTimeRemainingReleaseMs(fallback.timeRemainingToReleaseMs);
      setTimeRemainingDeadlineMs(fallback.timeRemainingToDeadlineMs);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, [simulatedTime, getClientFallbackState]);

  // Initial fetch and simulated time changes
  useEffect(() => {
    setIsLoading(true);
    fetchStatus();
  }, [fetchStatus]);

  // Listen for admin mode changes dispatched locally
  useEffect(() => {
    const handleModeChange = () => {
      fetchStatus();
    };
    window.addEventListener('innovista-mode-change', handleModeChange);
    return () => window.removeEventListener('innovista-mode-change', handleModeChange);
  }, [fetchStatus]);

  // Periodic authoritative polling every 12 seconds to ensure sync
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchStatus();
    }, 12000);
    return () => clearInterval(pollInterval);
  }, [fetchStatus]);

  // High-precision 1-second countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const releaseMs = new Date(EVENT_CONFIG.releaseTimestamp).getTime();
      const deadlineMs = new Date(EVENT_CONFIG.deadlineTimestamp).getTime();
      
      const currentServerTime = Date.now() + clockOffsetMs;

      // Check if admin override exists
      const localAdminMode = localStorage.getItem('innovista_admin_mode') || 'official';
      if (localAdminMode === 'force_unlocked') {
        setTimeRemainingReleaseMs(0);
        setTimeRemainingDeadlineMs(Math.max(0, deadlineMs - currentServerTime));
        setData((prev) => {
          if (!prev?.isReleased) {
            return {
              ...(prev || getClientFallbackState()),
              isReleased: true,
              problemStatement: prev?.problemStatement || OFFICIAL_PROBLEM_STATEMENT_DATA,
              timeRemainingToReleaseMs: 0,
            };
          }
          return prev;
        });
        return;
      }
      if (localAdminMode === 'force_deadline') {
        setTimeRemainingReleaseMs(0);
        setTimeRemainingDeadlineMs(0);
        setData((prev) => {
          if (!prev?.isDeadlinePassed) {
            return {
              ...(prev || getClientFallbackState()),
              isReleased: true,
              isDeadlinePassed: true,
              problemStatement: prev?.problemStatement || OFFICIAL_PROBLEM_STATEMENT_DATA,
              timeRemainingToReleaseMs: 0,
              timeRemainingToDeadlineMs: 0,
            };
          }
          return prev;
        });
        return;
      }

      const remainingRelease = Math.max(0, releaseMs - currentServerTime);
      const remainingDeadline = Math.max(0, deadlineMs - currentServerTime);

      setTimeRemainingReleaseMs(remainingRelease);
      setTimeRemainingDeadlineMs(remainingDeadline);

      // Auto-unlock transition trigger when timer ends
      if (remainingRelease <= 0) {
        setData((prev) => {
          if (!prev?.isReleased) {
            return {
              ...(prev || getClientFallbackState()),
              isReleased: true,
              problemStatement: prev?.problemStatement || OFFICIAL_PROBLEM_STATEMENT_DATA,
              timeRemainingToReleaseMs: 0,
            };
          }
          return prev;
        });
        if (data && !data.isReleased) {
          fetchStatus();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data, clockOffsetMs, fetchStatus, getClientFallbackState]);

  // Convert milliseconds into days, hours, minutes, seconds breakdown
  const formatTimeParts = (ms: number) => {
    if (ms <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  const isReleased = data?.isReleased ?? (timeRemainingReleaseMs <= 0);
  const isDeadlinePassed = data?.isDeadlinePassed ?? (timeRemainingDeadlineMs <= 0);

  return {
    data,
    isLoading,
    error,
    isReleased,
    isDeadlinePassed,
    releaseCountdown: formatTimeParts(timeRemainingReleaseMs),
    deadlineCountdown: formatTimeParts(timeRemainingDeadlineMs),
    refetch: fetchStatus,
  };
}
