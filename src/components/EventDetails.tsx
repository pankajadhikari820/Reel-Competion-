import { Calendar, Users, MapPin, Clock, Award, AlertCircle } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

export function EventDetails() {
  const details = [
    {
      label: 'Competition',
      value: 'INNOVISTA 2026 — Reel Shoot Challenge',
      icon: Award,
    },
    {
      label: 'Theme',
      value: EVENT_CONFIG.theme,
      icon: Award,
    },
    {
      label: 'Competition Dates',
      value: EVENT_CONFIG.dates,
      icon: Calendar,
    },
    {
      label: 'Problem Statement Release',
      value: '30 October 2026, 11:00 AM IST',
      icon: Clock,
    },
    {
      label: 'Team Size',
      value: EVENT_CONFIG.teamSize,
      icon: Users,
    },
    {
      label: 'Venue',
      value: EVENT_CONFIG.venue,
      icon: MapPin,
    },
    {
      label: 'Briefing / Presentation',
      value: EVENT_CONFIG.briefingLocation,
      icon: MapPin,
    },
    {
      label: 'Submission Deadline',
      value: '31 October 2026, 11:59 PM IST',
      icon: Clock,
    },
  ];

  return (
    <section id="details" className="border-b border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>KEY SPECIFICATIONS</span>
            <span aria-hidden="true">/</span>
            <span>EVENT METADATA</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Event Details
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Official operational parameters and requirements for registered teams.
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-[#FAFAFA] p-5 shadow-2xs transition-colors hover:bg-white hover:border-neutral-300"
            >
              <div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                    {item.label}
                  </span>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="mt-2.5 text-base font-bold text-neutral-900 leading-snug">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Attendance Notice */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs sm:text-sm text-blue-950">
          <AlertCircle className="h-4 w-4 text-blue-700 shrink-0" />
          <span>
            <strong>Attendance:</strong> {EVENT_CONFIG.attendanceNotice}
          </span>
        </div>

      </div>
    </section>
  );
}
