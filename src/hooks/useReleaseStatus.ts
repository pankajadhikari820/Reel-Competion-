import { useState, useEffect, useCallback, useRef } from 'react';
import { ReleaseResponse } from '../types/eventTypes.ts';

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
  const [timeRemainingReleaseMs, setTimeRemainingReleaseMs] = useState<number>(0);
  const [timeRemainingDeadlineMs, setTimeRemainingDeadlineMs] = useState<number>(0);

  const prevIsReleased = useRef<boolean | null>(null);

  // Fetch release status directly from authoritative backend
  const fetchStatus = useCallback(async () => {
    try {
      setError(null);
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

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json: ReleaseResponse = await res.json();
      setData(json);

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
      console.error('[Innovista 2026] Failed to fetch problem statement:', err);
      setError('Unable to synchronize with official event server. Retrying...');
    } finally {
      setIsLoading(false);
    }
  }, [simulatedTime]);

  // Initial fetch and simulated time changes
  useEffect(() => {
    setIsLoading(true);
    fetchStatus();
  }, [fetchStatus]);

  // Periodic authoritative polling every 12 seconds to ensure sync
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchStatus();
    }, 12000);
    return () => clearInterval(pollInterval);
  }, [fetchStatus]);

  // High-precision 1-second countdown ticker calculated against synchronized server clock
  useEffect(() => {
    if (!data) return;

    const timer = setInterval(() => {
      const releaseMs = new Date(data.releaseTime).getTime();
      const deadlineMs = new Date(data.deadlineTime).getTime();
      
      // Calculate effective current server time
      const currentServerTime = Date.now() + clockOffsetMs;

      const remainingRelease = Math.max(0, releaseMs - currentServerTime);
      const remainingDeadline = Math.max(0, deadlineMs - currentServerTime);

      setTimeRemainingReleaseMs(remainingRelease);
      setTimeRemainingDeadlineMs(remainingDeadline);

      // If we crossed the release threshold while currently locked, trigger an immediate authoritative fetch!
      if (!data.isReleased && remainingRelease <= 0) {
        fetchStatus();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data, clockOffsetMs, fetchStatus]);

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

  const isReleased = data?.isReleased ?? false;
  const isDeadlinePassed = data?.isDeadlinePassed ?? false;

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
