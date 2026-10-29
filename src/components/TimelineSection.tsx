import { Clock, CheckCircle2, Circle } from 'lucide-react';

interface TimelineSectionProps {
  isReleased: boolean;
  isDeadlinePassed: boolean;
}

export function TimelineSection({ isReleased, isDeadlinePassed }: TimelineSectionProps) {
  const milestones = [
    {
      date: '30 OCTOBER 2026',
      time: '11:00 AM IST',
      title: 'Competition Briefing & PS Reveal',
      description: 'Official competition briefing in LT2. The Problem Statement is revealed and the competition clock begins.',
      status: isReleased ? 'completed' : 'current',
    },
    {
      date: '30–31 OCTOBER 2026',
      time: 'COMPETITION WINDOW',
      title: 'Shooting & Editing Phase',
      description: 'Teams conceptualize narratives, shoot campus fest events, and edit their reels following the Problem Statement.',
      status: isDeadlinePassed ? 'completed' : isReleased ? 'current' : 'upcoming',
    },
    {
      date: '31 OCTOBER 2026',
      time: '11:59 PM IST',
      title: 'Final Submission Deadline',
      description: 'The submission window officially closes. Teams must upload their final reel link before this deadline.',
      status: isDeadlinePassed ? 'completed' : 'upcoming',
    },
  ];

  return (
    <section id="timeline" className="border-b border-neutral-200 bg-[#FAFAFA] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>SCHEDULE & MILESTONES</span>
            <span aria-hidden="true">/</span>
            <span>TIMELINE</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Event Timeline
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Crucial milestones from initial briefing to final submission cutoff.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {milestones.map((milestone, idx) => {
              const isCurrent = milestone.status === 'current';
              const isDone = milestone.status === 'completed';

              return (
                <div
                  key={milestone.title}
                  className={`relative flex flex-col justify-between rounded-xl border p-6 transition-all ${
                    isCurrent
                      ? 'border-blue-600 bg-white shadow-sm ring-1 ring-blue-600/20'
                      : 'border-neutral-200 bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Status header indicator */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono-numbers font-semibold text-neutral-500">
                        STAGE {String(idx + 1).padStart(2, '0')}
                      </div>
                      {isDone ? (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>PASSED</span>
                        </div>
                      ) : isCurrent ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700">
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                          <span>ACTIVE NOW</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                          <Circle className="h-3.5 w-3.5" />
                          <span>UPCOMING</span>
                        </div>
                      )}
                    </div>

                    {/* Date & Time */}
                    <div className="mt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                        {milestone.date}
                      </div>
                      <div className="text-xs font-mono-numbers text-neutral-500 mt-0.5">
                        {milestone.time}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 text-base font-bold text-neutral-950">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-normal">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1 font-mono-numbers">
                      <Clock className="h-3 w-3" />
                      IST (UTC+05:30)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
