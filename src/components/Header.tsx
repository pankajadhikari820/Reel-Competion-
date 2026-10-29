import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  isReleased: boolean;
  onOpenAdmin: () => void;
}

export function Header({ isReleased, onOpenAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Problem Statement', href: '#problem-statement' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Itinerary & Resources', href: '#resources' },
    { label: 'Submit Reel', href: '#submission' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="flex flex-col text-left text-neutral-900 group"
          aria-label="Innovista 2026 GEHU Haldwani Home"
        >
          <span className="text-base font-bold tracking-tight text-neutral-900 whitespace-nowrap">
            INNOVISTA 2026
          </span>
          <span className="text-[11px] font-medium tracking-wider text-neutral-500 uppercase whitespace-nowrap -mt-0.5">
            GEHU HALDWANI
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-neutral-950 whitespace-nowrap shrink-0 relative py-1 hover:underline underline-offset-4 decoration-neutral-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA & Admin Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenAdmin}
            title="Organizer Admin Portal"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
          >
            Admin
          </button>

          <a
            href="#problem-statement"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 whitespace-nowrap shrink-0 min-h-[38px]"
          >
            {isReleased ? 'Read Statement' : 'Explore Challenge'}
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2.5 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 min-h-[44px] min-w-[44px]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 py-5 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 min-h-[44px]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-400" />
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  handleLinkClick();
                  onOpenAdmin();
                }}
                className="flex w-full items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 min-h-[44px]"
              >
                Organizer Admin Portal
              </button>

              <a
                href="#problem-statement"
                onClick={handleLinkClick}
                className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 min-h-[44px]"
              >
                {isReleased ? 'Read Problem Statement' : 'Explore Challenge'}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
