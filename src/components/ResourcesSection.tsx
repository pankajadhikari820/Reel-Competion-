import { useState } from 'react';
import { FileText, Calendar, ExternalLink, AlertCircle, ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

export function ResourcesSection() {
  const [showScheduleTable, setShowScheduleTable] = useState(false);

  const resources = [
    {
      id: 'guidelines',
      title: 'Official Competition Guidelines',
      description: 'Read the complete competition rules and submission instructions.',
      url: EVENT_CONFIG.guidelinesPdfUrl,
      buttonText: 'View Guidelines PDF',
      icon: FileText,
    },
    {
      id: 'itinerary',
      title: 'Official Event Itinerary',
      description: 'Check the competition schedule, briefing, and event timings across all fest days.',
      url: EVENT_CONFIG.itineraryPdfUrl,
      buttonText: 'View Itinerary PDF',
      icon: Calendar,
      hasTablePreview: true,
    },
  ];

  const itineraryDays = [
    {
      day: 'Day 1 — 30th October 2026',
      events: [
        { name: 'Welcome Committee (School Students)', time: '09:00 AM – 10:00 AM', venue: 'Main Porch' },
        { name: 'Inaugural Ceremony', time: '09:30 AM – 10:00 AM', venue: 'Confluence Hall' },
        { name: 'Coding Competition', time: '10:30 AM – 11:30 AM', venue: 'Computer Lab 2, 3' },
        { name: 'Workshop 1 (Schools) (Robotics)', time: '10:30 AM onwards', venue: 'Computer Lab 1' },
        { name: 'Science Exhibition (Schools)', time: '11:00 AM – 01:30 PM', venue: 'Corridor' },
        { name: 'E-Sports (College)', time: '11:00 AM – 04:00 PM', venue: 'LT3 & LT4' },
        { name: 'Reel Shoot starts (Briefing & Reveal)', time: '11:00 AM – 11:30 AM', venue: 'LT-2', highlight: true },
        { name: 'Workshop 2 (Schools) (Internet safety)', time: '11:30 AM – 12:30 PM', venue: 'Kalam Theater, LT1 / Confluence Hall' },
        { name: 'Refreshments', time: '12:30 PM – 01:30 PM', venue: 'Canteen' },
        { name: 'Prize Distribution Ceremony', time: '03:00 PM – 04:00 PM', venue: 'Confluence Hall' },
        { name: 'Hackathon Inaugural', time: '05:00 PM onwards', venue: 'New Building' },
      ],
    },
    {
      day: 'Day 2 — 31st October 2026',
      events: [
        { name: 'Tech Treasure Hunt (Colleges)', time: '09:30 AM – 02:00 PM', venue: 'LT2' },
        { name: 'Seminar 1 (Colleges)', time: '10:00 AM – 11:30 AM', venue: 'Confluence Hall' },
        { name: 'E-Sports (Colleges)', time: '10:00 AM – 04:00 PM', venue: 'LT1 / Kalam Theater, LT3, LT4' },
        { name: 'Seminar 2 (Colleges)', time: '01:00 PM – 02:00 PM', venue: 'Confluence Hall' },
        { name: 'Typing Test (Colleges)', time: '02:30 PM – 04:30 PM', venue: 'Computer Lab 1, 2, 3' },
      ],
    },
    {
      day: 'Day 3 — 1st November 2026',
      events: [
        { name: 'Hackathon Presentation', time: '09:00 AM – 01:00 PM', venue: 'New Building Hall 101' },
        { name: 'E-Sports (Colleges)', time: '09:30 AM – 02:00 PM', venue: 'LT1, LT3 & LT4' },
        { name: 'Clash Royale Game (GEHU)', time: '09:30 AM – 12:30 PM', venue: 'LT2' },
        { name: 'Reel Shoot Ends (Final Cutoff)', time: '12:00 AM (Midnight)', venue: 'Online / Drive Link', highlight: true },
        { name: 'Lucky Draw', time: '02:00 PM onwards', venue: 'Lawn' },
        { name: 'Open DJ', time: '04:00 PM – 06:00 PM', venue: 'Lawn' },
      ],
    },
  ];

  return (
    <section id="resources" className="border-b border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>DOCUMENTATION</span>
            <span aria-hidden="true">/</span>
            <span>OFFICIAL FILES</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Official Competition Resources
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Review the official documents and schedule before participating.
          </p>
        </div>

        {/* Resources Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res) => {
            const isAvailable = Boolean(res.url && res.url.trim().length > 0);

            return (
              <div
                key={res.id}
                className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-[#FAFAFA] p-6 sm:p-8 transition-all hover:bg-white hover:border-neutral-300 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-200/60 text-neutral-800">
                      <res.icon className="h-5 w-5" />
                    </div>
                    {isAvailable ? (
                      <span className="text-xs font-semibold text-emerald-700">
                        PDF READY
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                        <AlertCircle className="h-3.5 w-3.5 text-neutral-400" />
                        Document coming soon
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-neutral-950">
                    {res.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-normal">
                    {res.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-200/70 flex flex-wrap items-center gap-3">
                  {isAvailable ? (
                    <a
                      href={res.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 min-h-[44px] w-full sm:w-auto"
                    >
                      <span>{res.buttonText}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-5 py-3 text-xs font-semibold text-neutral-400 cursor-not-allowed min-h-[44px] w-full sm:w-auto"
                    >
                      <span>{res.buttonText}</span>
                    </button>
                  )}

                  {res.hasTablePreview && (
                    <button
                      type="button"
                      onClick={() => setShowScheduleTable(!showScheduleTable)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors min-h-[44px] w-full sm:w-auto"
                    >
                      <span>{showScheduleTable ? 'Hide Schedule' : 'View Schedule Table'}</span>
                      {showScheduleTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Itinerary Breakdown Table */}
        {showScheduleTable && (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  INNOVISTA 2026 OFFICIAL ITINERARY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mt-1">
                  Complete 3-Day Event Schedule
                </h3>
              </div>
              <a
                href={EVENT_CONFIG.itineraryPdfUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
              >
                <span>Open Original PDF</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-6 space-y-8">
              {itineraryDays.map((dayGroup) => (
                <div key={dayGroup.day}>
                  <h4 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-200">
                    {dayGroup.day}
                  </h4>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-neutral-200 text-neutral-500 font-semibold">
                          <th className="py-2.5 pr-4">Event</th>
                          <th className="py-2.5 px-4">Time</th>
                          <th className="py-2.5 pl-4">Venue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {dayGroup.events.map((ev, i) => (
                          <tr
                            key={i}
                            className={
                              ev.highlight
                                ? 'bg-blue-50/70 font-semibold text-blue-950'
                                : 'hover:bg-neutral-50/80 text-neutral-700'
                            }
                          >
                            <td className="py-2.5 pr-4">
                              <span className="flex items-center gap-1.5">
                                {ev.name}
                                {ev.highlight && (
                                  <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                                    Reel Shoot
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-mono-numbers whitespace-nowrap text-neutral-600">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-neutral-400" />
                                {ev.time}
                              </span>
                            </td>
                            <td className="py-2.5 pl-4 whitespace-nowrap text-neutral-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-neutral-400" />
                                {ev.venue}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
