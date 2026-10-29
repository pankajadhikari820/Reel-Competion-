/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useReleaseStatus } from './hooks/useReleaseStatus.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProblemStatementSection } from './components/ProblemStatementSection.tsx';
import { EventOverview } from './components/EventOverview.tsx';
import { EventDetails } from './components/EventDetails.tsx';
import { TimelineSection } from './components/TimelineSection.tsx';
import { ResourcesSection } from './components/ResourcesSection.tsx';
import { SubmissionSection } from './components/SubmissionSection.tsx';
import { FeedbackSection } from './components/FeedbackSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
    isReleased,
    isDeadlinePassed,
    releaseCountdown,
    deadlineCountdown,
    refetch,
  } = useReleaseStatus();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation with Admin Portal Access */}
      <Header 
        isReleased={isReleased} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero isReleased={isReleased} />

        {/* Secure Timed Problem Statement Section */}
        <ProblemStatementSection
          isReleased={isReleased}
          isDeadlinePassed={isDeadlinePassed}
          problemStatement={data?.problemStatement}
          isLoading={isLoading}
          error={error}
          releaseCountdown={releaseCountdown}
          deadlineCountdown={deadlineCountdown}
          onRefresh={refetch}
        />

        {/* Event Overview & Structure */}
        <EventOverview />

        {/* Event Specifications & Operational Details */}
        <EventDetails />

        {/* Schedule & Interactive Timeline */}
        <TimelineSection
          isReleased={isReleased}
          isDeadlinePassed={isDeadlinePassed}
        />

        {/* Official Resources (Guidelines & Itinerary PDFs) */}
        <ResourcesSection />

        {/* Submission Section with Google Drive Instructions */}
        <SubmissionSection isDeadlinePassed={isDeadlinePassed} />

        {/* Participant Feedback Section */}
        <FeedbackSection />

        {/* Direct Organizer Contact Details */}
        <ContactSection />
      </main>

      {/* Official Footer with Admin Access */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Password-Protected Organizer Admin Portal (Password: Pankaj@123) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onStateChanged={refetch}
      />
    </div>
  );
}
