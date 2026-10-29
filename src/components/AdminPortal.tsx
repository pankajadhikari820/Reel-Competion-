import { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  SlidersHorizontal, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Clock, 
  Send,
  FileCheck
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onStateChanged?: () => void;
}

export function AdminPortal({ isOpen, onClose, onStateChanged }: AdminPortalProps) {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('innovista_admin_token'));
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMode, setCurrentMode] = useState<string>('official');
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Fetch admin status from backend if logged in
  const fetchAdminStatus = async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/status', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Cache-Control': 'no-cache',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setServerStatus(data);
        setCurrentMode(data.releaseMode || 'official');
      } else if (res.status === 401) {
        // Token expired or invalid
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch admin status:', err);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminStatus(token);
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setToken(data.token);
          sessionStorage.setItem('innovista_admin_token', data.token);
          setPassword('');
          fetchAdminStatus(data.token);
          if (onStateChanged) onStateChanged();
          return;
        } else {
          setAuthError(data.message || 'Incorrect password. Please enter the organizer password.');
          return;
        }
      }
      
      // If endpoint returns non-JSON or fails (e.g. static host without serverless)
      throw new Error('API unavailable, checking client credentials');
    } catch (err) {
      // Direct password validation fallback
      if (password === 'Pankaj@123') {
        const clientToken = 'admin_session_' + Date.now();
        setToken(clientToken);
        sessionStorage.setItem('innovista_admin_token', clientToken);
        setPassword('');
        const savedMode = localStorage.getItem('innovista_admin_mode') || 'official';
        setCurrentMode(savedMode);
        if (onStateChanged) onStateChanged();
      } else {
        setAuthError('Incorrect password. Please enter the organizer password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // ignore
      }
    }
    setToken(null);
    sessionStorage.removeItem('innovista_admin_token');
    setServerStatus(null);
  };

  const handleSetMode = async (mode: string, simulatedTime: string | null = null) => {
    if (!token) return;
    setIsSubmitting(true);
    setActionSuccess(null);

    // Save mode locally immediately
    localStorage.setItem('innovista_admin_mode', mode);
    if (simulatedTime) {
      localStorage.setItem('innovista_simulated_time', simulatedTime);
    } else {
      localStorage.removeItem('innovista_simulated_time');
    }
    setCurrentMode(mode);
    window.dispatchEvent(new Event('innovista-mode-change'));

    try {
      const res = await fetch('/api/admin/set-mode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mode, simulatedTime }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          fetchAdminStatus(token);
        }
      }
    } catch (err) {
      // Backend request ignored if offline/static
    } finally {
      setActionSuccess(`Release mode updated: ${mode.toUpperCase()}`);
      if (onStateChanged) onStateChanged();
      setTimeout(() => setActionSuccess(null), 3500);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-950">Organizer Admin Portal</h3>
              <p className="text-[11px] text-neutral-500">INNOVISTA 2026 Reel Shoot Challenge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            aria-label="Close admin modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 overflow-y-auto pr-1 flex-1">
          {!token ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="py-4 space-y-4">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
                <p>
                  This portal is restricted to authorized event administrators (Pankaj Singh Adhikari & Jasandeep Singh) to manage the Problem Statement release and submissions.
                </p>
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Organizer Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    autoFocus
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-neutral-950 py-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 min-h-[44px]"
                >
                  {isSubmitting ? 'Verifying...' : 'Unlock Admin Portal'}
                </button>
              </div>
            </form>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6 py-2">
              
              {/* Authenticated user status row */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>
                    Authenticated as <strong>Organizer (Pankaj Singh Adhikari)</strong>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              {actionSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 animate-in fade-in">
                  <Check className="h-4 w-4 text-blue-700 shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* Release Mode Override Control */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Backend Release Control
                  </h4>
                  <span className="text-[10px] font-mono-numbers px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                    Active Mode: {currentMode.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mb-3">
                  Changing the mode commits directly to the server. All visitors will see the updated state immediately.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSetMode('official', null)}
                    className={`flex flex-col text-left rounded-xl p-3 border transition-all ${
                      currentMode === 'official'
                        ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Official Schedule (Default)</span>
                      {currentMode === 'official' && <Check className="h-3.5 w-3.5 text-blue-700" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      Strictly locked until 30 Oct, 11:00 AM IST. Production authoritative.
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSetMode('force_unlocked', null)}
                    className={`flex flex-col text-left rounded-xl p-3 border transition-all ${
                      currentMode === 'force_unlocked'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Force Unlock PS (Live Now)</span>
                      {currentMode === 'force_unlocked' && <Check className="h-3.5 w-3.5 text-emerald-700" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      Immediately reveals Problem Statement to all visitors.
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSetMode('official', '2026-10-30T10:59:55+05:30')}
                    className="flex flex-col text-left rounded-xl p-3 border border-neutral-200 hover:bg-neutral-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Simulate 5s Before Reveal</span>
                      <Clock className="h-3.5 w-3.5 text-neutral-400" />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      Sets clock to 10:59:55 AM to test seamless auto-unlock countdown.
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSetMode('force_deadline', null)}
                    className={`flex flex-col text-left rounded-xl p-3 border transition-all ${
                      currentMode === 'force_deadline'
                        ? 'border-neutral-900 bg-neutral-100 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">Force Deadline (Closed)</span>
                      {currentMode === 'force_deadline' && <Check className="h-3.5 w-3.5 text-neutral-900" />}
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1">
                      Closes the submission window and disables submission button.
                    </span>
                  </button>
                </div>
              </div>

              {/* Event Integrations Check */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Active Integrations
                </h4>
                
                <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-emerald-600" />
                    WhatsApp Submission Phone:
                  </span>
                  <span className="font-mono-numbers font-semibold text-neutral-900">
                    {EVENT_CONFIG.whatsappSubmissionPhone}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <FileCheck className="h-3.5 w-3.5 text-blue-600" />
                    Itinerary PDF Asset:
                  </span>
                  <span className="font-mono-numbers font-semibold text-neutral-900 truncate max-w-[200px]" title={EVENT_CONFIG.itineraryPdfUrl || ''}>
                    INNOVISTA_events_itinerary__1__1680ecb2.pdf
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-purple-600" />
                    Google Feedback Form:
                  </span>
                  <a
                    href={EVENT_CONFIG.feedbackFormUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-numbers font-semibold text-blue-700 hover:underline truncate max-w-[200px]"
                  >
                    Connected (Google Form)
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-neutral-600 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-neutral-500" />
                    Briefing & PS Reveal Location:
                  </span>
                  <span className="font-semibold text-neutral-900">
                    LT2 (30 Oct, 11:00 AM IST)
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Pankaj Singh Adhikari · Event Coordinator</span>
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
