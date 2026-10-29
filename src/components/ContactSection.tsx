import { Phone, UserCheck } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';

export function ContactSection() {
  const contacts = [
    {
      role: 'EVENT COORDINATOR',
      name: EVENT_CONFIG.coordinator.name,
      phone: EVENT_CONFIG.coordinator.phone,
      tel: EVENT_CONFIG.coordinator.phoneTel,
    },
    {
      role: 'EVENT HEAD',
      name: EVENT_CONFIG.eventHead.name,
      phone: EVENT_CONFIG.eventHead.phone,
      tel: EVENT_CONFIG.eventHead.phoneTel,
    },
  ];

  return (
    <section id="contact" className="border-b border-neutral-200 bg-[#FAFAFA] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            <span>DIRECT ASSISTANCE</span>
            <span aria-hidden="true">/</span>
            <span>ORGANIZERS</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Organizer Contacts
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Reach out directly to the event leads for questions or competition assistance.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xs transition-all hover:border-neutral-300"
            >
              <div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                    {contact.role}
                  </span>
                  <UserCheck className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-neutral-950">
                  {contact.name}
                </h3>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-100">
                <a
                  href={contact.tel}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors py-1.5 focus-visible:outline-2 focus-visible:outline-neutral-900 rounded-md min-h-[44px]"
                  aria-label={`Call ${contact.name} at ${contact.phone}`}
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-mono-numbers">{contact.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
