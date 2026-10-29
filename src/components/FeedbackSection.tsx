import { MessageSquare, ExternalLink } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

export function FeedbackSection() {
  const isFeedbackConfigured = Boolean(
    EVENT_CONFIG.feedbackFormUrl && EVENT_CONFIG.feedbackFormUrl.trim().length > 0
  );

  return (
    <section id="feedback" className="border-b border-neutral-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 rounded-xl border border-neutral-200 bg-[#FAFAFA] p-8 sm:p-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              <span>PARTICIPANT FEEDBACK</span>
              <span aria-hidden="true">/</span>
              <span>CONTINUOUS IMPROVEMENT</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950">
              HELP US MAKE IT BETTER.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Share your feedback and help us improve future competition experiences.
            </p>
          </div>

          <div className="flex flex-col sm:items-start shrink-0">
            {isFeedbackConfigured ? (
              <a
                href={EVENT_CONFIG.feedbackFormUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 min-h-[44px]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Share Feedback</span>
                <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
              </a>
            ) : (
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-6 py-3.5 text-xs font-semibold text-neutral-400 cursor-not-allowed min-h-[44px]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Share Feedback</span>
                </button>
                <span className="text-xs font-medium text-neutral-500">
                  Feedback form coming soon.
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
