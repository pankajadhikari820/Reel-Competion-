import { useState } from 'react';
import { ExternalLink, AlertTriangle, MessageCircle, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

interface SubmissionSectionProps {
  isDeadlinePassed: boolean;
}

export function SubmissionSection({ isDeadlinePassed }: SubmissionSectionProps) {
  const [driveLink, setDriveLink] = useState('');
  const [teamName, setTeamName] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const whatsappNumber = EVENT_CONFIG.whatsappSubmissionNumber; // '919568598832'
  const displayPhone = EVENT_CONFIG.whatsappSubmissionPhone; // '+91 95685 98832'

  // Build the prefilled WhatsApp text message
  const generateWhatsAppUrl = () => {
    let messageText = 'This is my Drive link: ';
    if (driveLink.trim()) {
      messageText = `This is my Drive link: ${driveLink.trim()}`;
      if (teamName.trim()) {
        messageText += `\nTeam Name: ${teamName.trim()}`;
      }
      messageText += `\nCompetition: INNOVISTA 2026 – Reel Shoot Challenge`;
    } else {
      messageText = `This is my Drive link: \nTeam Name: \nCompetition: INNOVISTA 2026 – Reel Shoot Challenge`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDeadlinePassed) return;
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="submission" className="border-b border-neutral-200 bg-[#FAFAFA] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-12 shadow-xs">
          <div className="max-w-3xl">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              <span>FINAL ENTRY</span>
              <span aria-hidden="true">/</span>
              <span>WHATSAPP SUBMISSION</span>
            </div>

            {/* Heading */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              YOUR REEL. YOUR STORY.
            </h2>

            {/* Description */}
            <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Ready to showcase your vision? Submit your final reel by sharing your Google Drive link directly with the organizers on WhatsApp.
            </p>

            {/* Interactive Drive Link Submission Form */}
            <form onSubmit={handleQuickSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="team-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Team Name / Member Names (Optional)
                  </label>
                  <input
                    id="team-name"
                    type="text"
                    disabled={isDeadlinePassed}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Cinema Squad (2 Members)"
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-neutral-100 disabled:text-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="drive-link" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Google Drive Video Link
                  </label>
                  <div className="relative">
                    <input
                      id="drive-link"
                      type="url"
                      disabled={isDeadlinePassed}
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                      placeholder="https://drive.google.com/file/d/..."
                      className="w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-neutral-100 disabled:text-neutral-400 transition-colors"
                    />
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  </div>
                </div>
              </div>

              {/* Submission CTA Row */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                {isDeadlinePassed ? (
                  <div className="flex flex-col gap-2">
                    <button
                      disabled
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-6 py-3.5 text-sm font-semibold text-neutral-400 cursor-not-allowed min-h-[44px]"
                    >
                      <span>Submit with Drive Link</span>
                    </button>
                    <span className="text-xs font-medium text-red-600">
                      The official submission window has closed.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 min-h-[44px] cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Submit with Drive Link</span>
                      <ExternalLink className="h-3.5 w-3.5 text-emerald-200" />
                    </button>

                    <span className="text-xs text-neutral-500 font-mono-numbers">
                      Sends directly to Organizer WhatsApp: <span className="font-semibold text-neutral-800">{displayPhone}</span>
                    </span>
                  </div>
                )}
              </div>
            </form>

            {/* Google Drive Link Checklist Notice */}
            <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 sm:p-6 text-neutral-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Important Google Drive Access Instructions
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Before submitting, make sure your Google Drive video link is accessible to the organizers. Set General Access to <strong>'Anyone with the link'</strong> and the role to <strong>Viewer</strong>, where permitted. Test your link in a private/incognito window before submitting. Restricted or inaccessible links may not be considered valid submissions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
