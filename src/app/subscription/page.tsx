"use client";

import * as React from "react";
import { AppShell } from "@/components/shared/AppShell";
import {
  SubscriptionHero,
  PricingTierCards,
  MentorGrid,
  BookSessionModal,
  MentorReviewsCarousel,
  SubscriptionFAQ,
} from "@/components/subscription";
import { SubscriptionPlan } from "@/lib/dummyData/types";
import { mentors } from "@/lib/dummyData/subscriptionPlans";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedMentorId, setSelectedMentorId] = React.useState<string | null>(null);
  const [selectedPlanName, setSelectedPlanName] = React.useState<string | null>(null);

  // References to scroll down to sections smoothly
  const pricingRef = React.useRef<HTMLDivElement>(null);
  const mentorsRef = React.useRef<HTMLDivElement>(null);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlanName(plan.name);
    // If user selects a plan with mentorship credits, default to first featured mentor
    if (plan.mentorshipCreditsPerMonth > 0) {
      setSelectedMentorId(mentors[0]?.id || null);
    }
    setModalOpen(true);
  };

  const handleBookMentorSession = (mentorId: string) => {
    setSelectedMentorId(mentorId);
    setSelectedPlanName("Pro Mentorship");
    setModalOpen(true);
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMentors = () => {
    mentorsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppShell>
      <div className="space-y-12 sm:space-y-16 pb-16">
        {/* Hero Section */}
        <SubscriptionHero
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
          onExploreMentorsClick={scrollToMentors}
          onViewPlansClick={scrollToPricing}
        />

        {/* Pricing Tiers Section */}
        <div ref={pricingRef} className="scroll-mt-20">
          <PricingTierCards
            billingCycle={billingCycle}
            onSelectPlan={handleSelectPlan}
          />
        </div>

        {/* Verified Mentors Roster & Craft Filters */}
        <div ref={mentorsRef} className="scroll-mt-20">
          <MentorGrid onBookSession={handleBookMentorSession} />
        </div>

        {/* Authentic Student Social Proof Carousel */}
        <MentorReviewsCarousel />

        {/* FAQ Accordion Section */}
        <SubscriptionFAQ />

        {/* Interactive Booking Modal */}
        <BookSessionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialMentorId={selectedMentorId}
          initialPlanName={selectedPlanName}
        />
      </div>
    </AppShell>
  );
}
