/**
 * Shared types for INNOVISTA 2026 Reel Shoot Challenge
 */

export interface CreativeApproach {
  id: number;
  title: string;
  description: string;
}

export interface ProblemStatementContent {
  title: string;
  subtitle: string;
  theme: string;
  description: string[];
  creativeApproaches: CreativeApproach[];
  note: string;
  mission: string;
}

export interface ReleaseResponse {
  isReleased: boolean;
  isDeadlinePassed: boolean;
  serverTime: string;
  releaseTime: string;
  deadlineTime: string;
  timeRemainingToReleaseMs: number;
  timeRemainingToDeadlineMs: number;
  message?: string;
  problemStatement?: ProblemStatementContent;
}

export interface PublicEventConfig {
  eventName: string;
  edition: string;
  institution: string;
  tagline: string;
  theme: string;
  dates: string;
  teamSize: string;
  venue: string;
  briefingLocation: string;
  attendanceNotice: string;
  releaseTimestamp: string;
  deadlineTimestamp: string;
  guidelinesPdfUrl: string | null;
  itineraryPdfUrl: string | null;
  submissionFormUrl: string | null;
  feedbackFormUrl: string | null;
  whatsappSubmissionNumber: string;
  whatsappSubmissionPhone: string;
  coordinator: {
    name: string;
    role: string;
    phone: string;
    phoneTel: string;
  };
  eventHead: {
    name: string;
    role: string;
    phone: string;
    phoneTel: string;
  };
  footerCredit: string;
}
