import { useState } from 'react';
import { Lock, Unlock, Copy, Check, Sparkles, RefreshCw, AlertCircle, Film, Compass, ChevronRight } from 'lucide-react';
import { ProblemStatementContent } from '../types/eventTypes.ts';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ProblemStatementSectionProps {
  isReleased: boolean;
  isDeadlinePassed: boolean;
  problemStatement?: ProblemStatementContent;
  isLoading: boolean;
  error: string | null;
  releaseCountdown: CountdownParts;
  deadlineCountdown: CountdownParts;
  onRefresh: () => void;
}

export function ProblemStatementSection({
  isReleased,
  isDeadlinePassed,
  problemStatement,
  isLoading,
  error,
  releaseCountdown,
  deadlineCountdown,
  onRefresh,
}: ProblemStatementSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!problemStatement) return;

    const textToCopy = `
${problemStatement.title}
${problemStatement.subtitle}
Theme: ${problemStatement.theme}

${problemStatement.description.join('\n\n')}

CREATIVE APPROACHES:
${problemStatement.creativeApproaches.map((a) => `${a.id}. ${a.title}\n${a.description}`).join('\n\n')}

NOTE:
${problemStatement.note}

YOUR MISSION:
"${problemStatement.mission}"
    `.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const activeCountdown = isReleased ? deadlineCountdown : releaseCountdown;

  return (
    <section id="problem-statement" className="relative border-b border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              <span>THE CHALLENGE</span>
              <span aria-hidden="true">/</span>
              <span>{isReleased ? 'OFFICIAL RELEASE' : 'TIMED REVEAL'}</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              {isReleased ? 'Official Problem Statement' : 'Problem Statement Reveal'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl">
              {isReleased
                ? 'Review the official competition theme, creative approaches, and mission statement below.'
                : 'The challenge is almost here. Join the competition briefing, discover the Problem Statement, and turn your creative vision into a reel that captures the spirit of Innovista 2026.'}
            </p>
          </div>

          {/* Status Badge & Server Sync */}
          <div className="flex items-center gap-3 shrink-0">
            {isReleased ? (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2 text-xs font-semibold text-emerald-800">
                <Unlock className="h-4 w-4 text-emerald-600" />
                <span>PROBLEM STATEMENT LIVE</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-neutral-700">
                <Lock className="h-4 w-4 text-neutral-500" />
                <span>PROBLEM STATEMENT LOCKED</span>
              </div>
            )}

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh server status"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors disabled:opacity-50 min-h-[40px] min-w-[40px]"
              aria-label="Refresh status"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error notification if server connection fails */}
        {error && (
          <div className="mt-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-900">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={onRefresh}
              className="text-xs font-semibold underline hover:no-underline ml-4"
            >
              Retry
            </button>
          </div>
        )}

        {/* Countdown Box */}
        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50/50 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                {isReleased
                  ? isDeadlinePassed
                    ? 'COMPETITION STATUS'
                    : 'SUBMISSION DEADLINE COUNTDOWN'
                  : 'OFFICIAL REVEAL COUNTDOWN'}
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-neutral-900">
                {isReleased
                  ? isDeadlinePassed
                    ? 'SUBMISSION WINDOW CLOSED'
                    : 'Submissions Close: 31 October 2026, 11:59 PM IST'
                  : 'Reveal Date: 30 October 2026, 11:00 AM IST (LT2)'}
              </div>
            </div>

            {/* Countdown Grid */}
            {!isDeadlinePassed && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full">
                {[
                  { label: 'DAYS', value: activeCountdown.days },
                  { label: 'HOURS', value: activeCountdown.hours },
                  { label: 'MINUTES', value: activeCountdown.minutes },
                  { label: 'SECONDS', value: activeCountdown.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white py-3 px-2 shadow-2xs"
                  >
                    <span className="font-mono-numbers text-xl sm:text-3xl font-extrabold text-neutral-900">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-400 mt-0.5">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-10">
          {!isReleased ? (
            /* PRE-RELEASE LOCKED CONTAINER */
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/40 p-8 sm:p-14 text-center">
              
              {/* Camera Frame Corners */}
              <div className="pointer-events-none absolute inset-4">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neutral-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neutral-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neutral-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neutral-300" />
              </div>

              <div className="mx-auto max-w-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200/60 text-neutral-700">
                  <Lock className="h-6 w-6 text-neutral-700" />
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-bold text-neutral-900">
                  Problem Statement Protected
                </h3>

                <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  The complete Problem Statement is securely stored on the server. At <strong>11:00 AM IST on 30 October 2026</strong>, during the briefing in <strong>LT2</strong>, this section will automatically unlock and reveal the full challenge without requiring a page refresh.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-neutral-500">
                  <span>Authoritative Time Check Active</span>
                  <span aria-hidden="true">·</span>
                  <span>Briefing Location: LT2</span>
                  <span aria-hidden="true">·</span>
                  <span>Auto-Reveal: 11:00 AM IST</span>
                </div>
              </div>
            </div>
          ) : (
            /* POST-RELEASE OFFICIAL PROBLEM STATEMENT */
            problemStatement && (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-12 shadow-xs transition-all animate-in fade-in duration-500">
                
                {/* Header Row with Copy Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-200">
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                      OFFICIAL BRIEFING DOCUMENT
                    </div>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-950">
                      {problemStatement.title}
                    </h3>
                    <div className="mt-1.5 text-base sm:text-lg font-semibold text-neutral-700">
                      {problemStatement.subtitle}
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 min-h-[44px] shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-neutral-500" />
                        <span>Copy Problem Statement</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Theme Bar */}
                <div className="my-6 rounded-lg bg-blue-50/70 border border-blue-100 px-4 py-3 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-blue-900 uppercase">
                    COMPETITION THEME:
                  </span>
                  <span className="text-sm font-bold text-blue-950">
                    {problemStatement.theme}
                  </span>
                </div>

                {/* Description Paragraphs */}
                <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed">
                  {problemStatement.description.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Creative Approaches Grid */}
                <div className="mt-10">
                  <div className="flex items-center gap-2 pb-4 border-b border-neutral-200">
                    <Film className="h-5 w-5 text-neutral-700" />
                    <h4 className="text-lg font-bold text-neutral-950">
                      Creative Approaches
                    </h4>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {problemStatement.creativeApproaches.map((approach) => (
                      <div
                        key={approach.id}
                        className="group flex flex-col justify-between rounded-xl border border-neutral-200/90 bg-neutral-50/40 p-5 transition-all hover:bg-white hover:border-neutral-300 hover:shadow-xs"
                      >
                        <div>
                          <div className="text-xs font-bold text-blue-700 font-mono-numbers">
                            {String(approach.id).padStart(2, '0')}.
                          </div>
                          <h5 className="mt-1.5 text-base font-bold text-neutral-900">
                            {approach.title}
                          </h5>
                          <p className="mt-2 text-sm text-neutral-600 leading-normal">
                            {approach.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Note */}
                <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
                  <span className="font-semibold text-neutral-900 block mb-1">Important Note:</span>
                  <p>{problemStatement.note}</p>
                </div>

                {/* Mission Statement Box */}
                <div className="mt-8 rounded-xl border border-neutral-900 bg-neutral-950 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                    <Compass className="h-4 w-4 text-neutral-300" />
                    <span>YOUR MISSION</span>
                  </div>
                  <blockquote className="mt-3 text-lg sm:text-xl font-medium italic text-neutral-100 leading-relaxed">
                    "{problemStatement.mission}"
                  </blockquote>
                </div>

              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
