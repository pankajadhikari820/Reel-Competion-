import { PublicEventConfig } from '../types/eventTypes.ts';

/**
 * Centralized Configuration for Innovista 2026 Reel Shoot Challenge
 * Non-sensitive public event metadata and configurable external links.
 * 
 * NOTE: The official Problem Statement is NOT stored here.
 * It is securely stored on the server side and only returned via /api/problem-statement
 * at or after the release timestamp (2026-10-30T11:00:00+05:30).
 */
export const EVENT_CONFIG: PublicEventConfig = {
  eventName: 'INNOVISTA 2026',
  edition: 'REEL SHOOT CHALLENGE',
  institution: 'Graphic Era Hill University, Haldwani',
  tagline: 'One Fest, Endless Stories.',
  theme: 'One Fest, Endless Stories',
  dates: '30–31 October 2026',
  teamSize: 'Exactly 2 members',
  venue: 'GEHU Haldwani Campus',
  briefingLocation: 'LT2',
  attendanceNotice: 'Mandatory, as communicated by the organizer.',
  
  // Official release timestamp: 30 October 2026 at 11:00 AM IST (UTC+05:30)
  releaseTimestamp: '2026-10-30T11:00:00+05:30',
  
  // Official submission deadline: 31 October 2026 at 11:59 PM IST (UTC+05:30)
  deadlineTimestamp: '2026-10-31T23:59:00+05:30',
  
  /**
   * Official Competition Documents (PDFs)
   * The organizer can update these paths or URLs when files are uploaded or hosted.
   * If set to null or empty string, the UI gracefully renders "Document coming soon"
   * and disables the button per master requirements.
   */
  guidelinesPdfUrl: null, // e.g. '/documents/Innovista2026_ReelShoot_Guidelines.pdf'
  itineraryPdfUrl: '/assets/aistudio/INNOVISTA_events_itinerary__1__1680ecb2.pdf',
  
  /**
   * WhatsApp Submission Configuration
   * Primary submission route requested by organizer: WhatsApp to +91 95685 98832
   */
  whatsappSubmissionNumber: '919568598832',
  whatsappSubmissionPhone: '+91 95685 98832',

  /**
   * Optional External Google Forms (can be used alongside or as fallback)
   * When null or empty string, the UI displays "Submission link will be shared soon."
   * or "Feedback form coming soon." with disabled buttons.
   */
  submissionFormUrl: null, // e.g. 'https://forms.gle/official-innovista-reel-submission'
  feedbackFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdHWh3EP7EQ1iWcFk4Bux7OL6p03zjpASg_hpcsnUWTn2kJKQ/viewform',
  
  coordinator: {
    name: 'Pankaj Singh Adhikari',
    role: 'Event Coordinator',
    phone: '+91 95685 98832',
    phoneTel: 'tel:+919568598832',
  },
  
  eventHead: {
    name: 'Jasandeep Singh',
    role: 'Event Head',
    phone: '+91 98972 99223',
    phoneTel: 'tel:+919897299223',
  },
  
  footerCredit: 'Developed and Managed by Pankaj Singh Adhikari.',
};
