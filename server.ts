import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { OFFICIAL_PROBLEM_STATEMENT } from './server/problemStatement.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Authoritative official timestamps
const OFFICIAL_RELEASE_TIME_ISO = '2026-10-30T11:00:00+05:30';
const OFFICIAL_DEADLINE_TIME_ISO = '2026-10-31T23:59:00+05:30';

const RELEASE_TIME_MS = new Date(OFFICIAL_RELEASE_TIME_ISO).getTime();
const DEADLINE_TIME_MS = new Date(OFFICIAL_DEADLINE_TIME_ISO).getTime();

// Admin configuration
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pankaj@123';
const activeAdminTokens = new Set<string>();

// Backend persistent runtime override state
export type ReleaseMode = 'official' | 'force_unlocked' | 'force_locked' | 'force_deadline';
let backendReleaseMode: ReleaseMode = 'official';
let backendSimulatedTimeMs: number | null = null;

// Middleware
app.use(express.json());

// API Cache Prevention Middleware for all /api endpoints
app.use('/api', (_req: Request, res: Response, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

/**
 * Determine effective server time considering backend state and optional per-request override
 */
function getEffectiveTime(req: Request): number {
  const reqSimulated = req.query.simulated_time as string | undefined || req.headers['x-simulated-time'] as string | undefined;
  if (reqSimulated) {
    const parsed = new Date(reqSimulated).getTime();
    if (!isNaN(parsed)) return parsed;
  }
  if (backendSimulatedTimeMs !== null) {
    return backendSimulatedTimeMs;
  }
  return Date.now();
}

/**
 * Determine release status considering admin backend mode
 */
function evaluateReleaseState(req: Request) {
  const now = getEffectiveTime(req);

  if (backendReleaseMode === 'force_unlocked') {
    return {
      isReleased: true,
      isDeadlinePassed: false,
      now,
    };
  }
  if (backendReleaseMode === 'force_locked') {
    return {
      isReleased: false,
      isDeadlinePassed: false,
      now,
    };
  }
  if (backendReleaseMode === 'force_deadline') {
    return {
      isReleased: true,
      isDeadlinePassed: true,
      now,
    };
  }

  // Official clock mode
  return {
    isReleased: now >= RELEASE_TIME_MS,
    isDeadlinePassed: now >= DEADLINE_TIME_MS,
    now,
  };
}

/**
 * Helper to authenticate admin token
 */
function verifyAdminToken(req: Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return activeAdminTokens.has(token);
}

/* ==========================================================================
   ADMIN ENDPOINTS
   ========================================================================== */

/**
 * POST /api/admin/login
 * Validates admin password (Pankaj@123) and issues session token
 */
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(24).toString('hex');
    activeAdminTokens.add(token);
    return res.json({
      success: true,
      token,
      mode: backendReleaseMode,
      simulatedTime: backendSimulatedTimeMs ? new Date(backendSimulatedTimeMs).toISOString() : null,
      message: 'Admin authentication successful',
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Invalid admin credentials',
  });
});

/**
 * GET /api/admin/status
 * Returns detailed admin status
 */
app.get('/api/admin/status', (req: Request, res: Response) => {
  if (!verifyAdminToken(req)) {
    return res.status(401).json({ error: 'Unauthorized admin access' });
  }

  const { isReleased, isDeadlinePassed, now } = evaluateReleaseState(req);

  res.json({
    success: true,
    serverTime: new Date(now).toISOString(),
    realClockTime: new Date().toISOString(),
    releaseMode: backendReleaseMode,
    simulatedTime: backendSimulatedTimeMs ? new Date(backendSimulatedTimeMs).toISOString() : null,
    isReleased,
    isDeadlinePassed,
    officialReleaseTime: OFFICIAL_RELEASE_TIME_ISO,
    officialDeadlineTime: OFFICIAL_DEADLINE_TIME_ISO,
  });
});

/**
 * POST /api/admin/set-mode
 * Allows admin to toggle backend release mode
 */
app.post('/api/admin/set-mode', (req: Request, res: Response) => {
  if (!verifyAdminToken(req)) {
    return res.status(401).json({ error: 'Unauthorized admin access' });
  }

  const { mode, simulatedTime } = req.body || {};

  if (['official', 'force_unlocked', 'force_locked', 'force_deadline'].includes(mode)) {
    backendReleaseMode = mode;
  }

  if (simulatedTime === null) {
    backendSimulatedTimeMs = null;
  } else if (typeof simulatedTime === 'string') {
    const parsed = new Date(simulatedTime).getTime();
    if (!isNaN(parsed)) {
      backendSimulatedTimeMs = parsed;
    }
  }

  console.log(`[Innovista Admin] Backend release mode updated to: ${backendReleaseMode}, simulatedTime: ${backendSimulatedTimeMs}`);

  const { isReleased, isDeadlinePassed, now } = evaluateReleaseState(req);

  res.json({
    success: true,
    mode: backendReleaseMode,
    simulatedTime: backendSimulatedTimeMs ? new Date(backendSimulatedTimeMs).toISOString() : null,
    isReleased,
    isDeadlinePassed,
    effectiveServerTime: new Date(now).toISOString(),
    message: `Backend release mode committed: ${backendReleaseMode}`,
  });
});

/**
 * POST /api/admin/logout
 */
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

/* ==========================================================================
   PUBLIC TIMED RELEASE ENDPOINTS
   ========================================================================== */

/**
 * GET /api/time
 * Authoritative server time endpoint for frontend synchronization
 */
app.get('/api/time', (req: Request, res: Response) => {
  const { isReleased, isDeadlinePassed, now } = evaluateReleaseState(req);

  res.json({
    serverTime: new Date(now).toISOString(),
    serverTimeMs: now,
    releaseTime: OFFICIAL_RELEASE_TIME_ISO,
    releaseTimeMs: RELEASE_TIME_MS,
    deadlineTime: OFFICIAL_DEADLINE_TIME_ISO,
    deadlineTimeMs: DEADLINE_TIME_MS,
    isReleased,
    isDeadlinePassed,
    timeRemainingToReleaseMs: isReleased ? 0 : Math.max(0, RELEASE_TIME_MS - now),
    timeRemainingToDeadlineMs: isDeadlinePassed ? 0 : Math.max(0, DEADLINE_TIME_MS - now),
  });
});

/**
 * GET /api/problem-statement
 * Secure timed release endpoint.
 */
app.get('/api/problem-statement', (req: Request, res: Response) => {
  try {
    const { isReleased, isDeadlinePassed, now } = evaluateReleaseState(req);

    if (!isReleased) {
      // Locked state: Do NOT return the problem statement text under any circumstance.
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

    // Released state: Return full official problem statement
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
  } catch (error) {
    return res.status(500).json({
      error: 'An unexpected server error occurred while retrieving competition data.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Innovista 2026 Server running on http://0.0.0.0:${PORT} [${isDev ? 'development' : 'production'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
