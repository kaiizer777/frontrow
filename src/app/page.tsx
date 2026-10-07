import * as React from "react";
import { AppShell } from "@/components/shared/AppShell";
import {
  WelcomeHero,
  StreakActivityWidget,
  EnrolledCoursesSection,
  RecommendedHobbiesSection,
  ActiveBuddyRoomsWidget,
  QuizBannerWidget,
  MentorshipStatusCard,
} from "@/components/dashboard";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Personalized Welcome Banner & Quick Action Hero */}
        <WelcomeHero />

        {/* Dashboard Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Main Content Flow: Streaks, Active Courses, Recommendations (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
            {/* Streak & Weekly Practice Momentum Widget */}
            <StreakActivityWidget />

            {/* Enrolled In-Progress Courses */}
            <EnrolledCoursesSection />

            {/* AI Curated Hobby & Craft Recommendations */}
            <RecommendedHobbiesSection />
          </div>

          {/* Right Action & Live Community Column (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            {/* Active Real-Time Buddy Rooms */}
            <ActiveBuddyRoomsWidget />

            {/* 3-Minute Creative Discovery Quiz Banner */}
            <QuizBannerWidget />

            {/* VIP 1-on-1 Mentorship Spotlight */}
            <MentorshipStatusCard />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
