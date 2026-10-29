import { EVENT_CONFIG } from '../config/eventConfig.ts';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-neutral-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
          <div>
            <div className="text-sm font-extrabold tracking-tight text-neutral-900">
              {EVENT_CONFIG.eventName}
            </div>
            <div className="text-xs font-semibold text-neutral-600 mt-0.5">
              {EVENT_CONFIG.edition}
            </div>
            <div className="text-xs font-medium text-neutral-400 mt-0.5">
              {EVENT_CONFIG.institution}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-500">
            <a href="#overview" className="hover:text-neutral-900 transition-colors">Overview</a>
            <a href="#problem-statement" className="hover:text-neutral-900 transition-colors">Problem Statement</a>
            <a href="#timeline" className="hover:text-neutral-900 transition-colors">Timeline</a>
            <a href="#resources" className="hover:text-neutral-900 transition-colors">Resources</a>
            <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hover:text-neutral-900 transition-colors underline underline-offset-4 decoration-neutral-300 font-semibold"
              >
                Admin Portal
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 {EVENT_CONFIG.institution}. All rights reserved.</p>
          <p className="text-neutral-600 font-medium">{EVENT_CONFIG.footerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
