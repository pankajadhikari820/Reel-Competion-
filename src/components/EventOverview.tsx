import { Camera, Sparkles, Send } from 'lucide-react';
import gearImage from '../assets/images/filmmaker_production_gear_1793293403678.jpg';

export function EventOverview() {
  const steps = [
    {
      step: '01',
      title: 'GET THE PS',
      description: 'Discover the challenge during the official briefing.',
      icon: Camera,
    },
    {
      step: '02',
      title: 'CREATE YOUR VISION',
      description: 'Conceptualize, shoot, and edit your original reel.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'SUBMIT YOUR REEL',
      description: 'Submit the final entry before the deadline.',
      icon: Send,
    },
  ];

  return (
    <section id="overview" className="border-b border-neutral-200 bg-[#FAFAFA] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>EVENT OVERVIEW</span>
            <span aria-hidden="true">/</span>
            <span>STRUCTURE & PHILOSOPHY</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            One Fest, Endless Stories
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Overview Prose */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed">
            <p>
              Put your creativity, shooting, and editing skills to the test! Reel Shoot is a short-form video challenge where teams will be given a Problem Statement (PS) that will serve as the basis for their reel.
            </p>
            <p>
              The Problem Statement will be shared on 30th October during a brief competition briefing. Once the PS is revealed, your time starts! Teams must conceptualize, shoot, edit, and submit their final reel within the given competition window.
            </p>
            <p>
              Participants are free to choose their own creative approach, storytelling style, shooting technique, and editing style, as long as the final reel follows the given Problem Statement.
            </p>
          </div>

          {/* Minimal Gear Composition Visual */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 shadow-xs">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={gearImage}
                  alt="Filmmaking equipment flat-lay composition"
                  className="h-full w-full object-cover contrast-105 transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-2 text-[11px] font-mono-numbers text-neutral-500">
                <span>INNOVISTA 2026 PRODUCTION GEAR</span>
                <span>GEHU HALDWANI</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Step Process */}
        <div className="mt-14 pt-12 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-numbers text-xl font-bold text-neutral-900">
                      {item.step}
                    </span>
                    <item.icon className="h-5 w-5 text-neutral-400" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <div className="mt-8 text-center text-sm font-semibold tracking-wide text-neutral-800">
            "Get the PS. Create your vision. Shoot. Edit. Submit."
          </div>
        </div>

      </div>
    </section>
  );
}
