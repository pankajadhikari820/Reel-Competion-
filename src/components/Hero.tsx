import { ArrowRight, Clock, Video } from 'lucide-react';
import heroImage from '../assets/images/hero_cinematic_filmmaking_1793293403543.jpg';

interface HeroProps {
  isReleased: boolean;
}

export function Hero({ isReleased }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background subtle grid pattern for filmmaking grid structure */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow - clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
              <span>INNOVISTA 2026</span>
              <span aria-hidden="true">/</span>
              <span>OFFICIAL COMPETITION</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl text-balance">
              REEL SHOOT
              <span className="block text-neutral-900">CHALLENGE.</span>
            </h1>

            {/* Theme statement */}
            <div className="mt-3 text-sm font-semibold tracking-widest text-neutral-600 uppercase">
              THEME: ONE FEST, ENDLESS STORIES.
            </div>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Put your creativity, shooting, and editing skills to the test. Capture the energy of Innovista 2026 and transform real moments into an unforgettable visual story.
            </p>

            {/* Compact Event Metadata - Clean unboxed metadata with dot separators */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-neutral-500 border-y border-neutral-200/80 py-3 max-w-xl">
              <span className="text-neutral-900 font-semibold">30–31 OCTOBER 2026</span>
              <span aria-hidden="true">·</span>
              <span>TEAM OF 2 MEMBERS</span>
              <span aria-hidden="true">·</span>
              <span>GEHU HALDWANI CAMPUS</span>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#problem-statement"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 min-h-[44px]"
              >
                <span>{isReleased ? 'Read Problem Statement' : 'Explore Challenge'}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 min-h-[44px]"
              >
                <span>View Timeline</span>
              </a>
            </div>
          </div>

          {/* Right Column: Filmmaking Frame Asset with Viewfinder Details */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-xl border border-neutral-200 bg-white p-2 shadow-xs">
              
              {/* Camera Viewfinder Overlay Box */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-950">
                <img
                  src={heroImage}
                  alt="Cinematic filmmaker shooting on campus lawn"
                  className="h-full w-full object-cover grayscale contrast-115 opacity-90 transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Film Viewfinder Corner Marks */}
                <div className="pointer-events-none absolute inset-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-numbers text-[10px] tracking-wider text-white/90 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      REC
                    </span>
                    <span className="font-mono-numbers text-[10px] tracking-wider text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      24.00 FPS · 4K UHD
                    </span>
                  </div>

                  {/* Center crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="h-6 w-[1px] bg-white" />
                    <div className="w-6 h-[1px] bg-white absolute" />
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="font-mono-numbers text-[10px] tracking-wider text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      ISO 800 · 35MM
                    </span>
                    <span className="font-mono-numbers text-[10px] tracking-widest text-white/90 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      00:30:11:00
                    </span>
                  </div>
                </div>

                {/* Framing corner crosshairs */}
                <div className="pointer-events-none absolute inset-2.5">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70" />
                </div>
              </div>

              {/* Viewfinder caption footer */}
              <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] text-neutral-500 font-mono-numbers">
                <div className="flex items-center gap-1.5">
                  <Video className="h-3 w-3 text-neutral-400" />
                  <span>FRAME RATIO 16:9 · 9:16 REEL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-neutral-400" />
                  <span>OCT 30–31, 2026</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
