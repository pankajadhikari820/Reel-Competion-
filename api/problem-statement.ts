import type { Request, Response } from 'express';
import { OFFICIAL_PROBLEM_STATEMENT } from '../server/problemStatement.ts';

const OFFICIAL_RELEASE_TIME_ISO = '2026-10-30T11:00:00+05:30';
const OFFICIAL_DEADLINE_TIME_ISO = '2026-10-31T23:59:00+05:30';

const RELEASE_TIME_MS = new Date(OFFICIAL_RELEASE_TIME_ISO).getTime();
const DEADLINE_TIME_MS = new Date(OFFICIAL_DEADLINE_TIME_ISO).getTime();

export default function handler(req: Request, res: Response) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const now = Date.now();
  const isReleased = now >= RELEASE_TIME_MS;
  const isDeadlinePassed = now >= DEADLINE_TIME_MS;

  if (!isReleased) {
    return res.status(200).json({
      isReleased: false,
      isDeadlinePassed: false,
      serverTime: new Date(now).toISOString(),
      releaseTime: OFFICIAL_RELEASE_TIME_ISO,
      deadlineTime: OFFICIAL_DEADLINE_TIME_ISO,
      timeRemainingToReleaseMs: Math.max(0, RELEASE_TIME_MS - now),
      timeRemainingToDeadlineMs: Math.max(0, DEADLINE_TIME_MS - now),
      message: 'The Problem Statement is currently locked. It will automatically be revealed on 30 October 2026 at 11:00 AM IST during the briefing in LT2.',
    });
  }

  return res.status(200).json({
    isReleased: true,
    isDeadlinePassed,
    serverTime: new Date(now).toISOString(),
    releaseTime: OFFICIAL_RELEASE_TIME_ISO,
    deadlineTime: OFFICIAL_DEADLINE_TIME_ISO,
    timeRemainingToReleaseMs: 0,
    timeRemainingToDeadlineMs: Math.max(0, DEADLINE_TIME_MS - now),
    problemStatement: OFFICIAL_PROBLEM_STATEMENT,
  });
}
