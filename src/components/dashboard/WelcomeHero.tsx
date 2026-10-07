"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Flame, Zap, Trophy, ArrowRight, Play, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/lib/dummyData/users";

export function WelcomeHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-amber-600 text-white p-4.5 sm:p-6 lg:p-8 shadow-[0_12px_32px_rgba(255,90,54,0.22)] border-t border-white/20 transition-all">
      {/* Decorative ambient background glows */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-20 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">
        {/* Left Welcome Copy */}
        <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-wide border border-white/25 text-white shadow-2xs max-w-full">
            <Sparkles className="h-3.5 w-3.5 text-amber-200 animate-pulse shrink-0" />
            <span className="truncate">Creative Flow Active · Autumn Session</span>
          </div>

          <h1 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            Welcome back, {currentUser.name.split(" ")[0]}! 🎸
          </h1>

          <p className="text-white/90 text-xs sm:text-base leading-relaxed font-normal">
            Ready to dial in your <span className="font-semibold text-amber-100">Neo-Soul chord melody</span> and calibrate your <span className="font-semibold text-amber-100">V60 bloom extraction</span> today?
          </p>

          {/* Quick Stats Pill Row */}
          <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2.5 pt-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10.5px] sm:text-xs font-bold text-white shadow-2xs min-w-0">
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300 fill-amber-300 shrink-0" />
              <span className="truncate">{currentUser.streak.currentDays}d Streak</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10.5px] sm:text-xs font-bold text-white shadow-2xs min-w-0">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300 shrink-0" />
              <span className="truncate">{currentUser.stats.points.toLocaleString()} XP</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10.5px] sm:text-xs font-bold text-white shadow-2xs min-w-0">
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-200 shrink-0" />
              <span className="truncate">{currentUser.stats.communityRank}</span>
            </div>
          </div>
        </div>

        {/* Right Quick Action CTAs */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 shrink-0 lg:min-w-[210px] pt-1 lg:pt-0">
          <Link href="/buddy-rooms" className="w-full">
            <Button
              variant="secondary"
              size="lg"
              className="w-full justify-between bg-white text-slate-900 hover:bg-slate-50 border-none shadow-md font-bold text-sm group active:scale-[0.98] transition-transform"
              rightIcon={<ArrowRight className="h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" />}
            >
              <span className="flex items-center gap-2">
                <Play className="h-4 w-4 text-primary-500 fill-primary-500" />
                Resume Practice
              </span>
            </Button>
          </Link>

          <Link href="/quizzes" className="w-full">
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center text-white border-white/30 hover:bg-white/15 hover:text-white backdrop-blur-xs font-semibold text-xs active:scale-[0.98] transition-transform"
              leftIcon={<Compass className="h-3.5 w-3.5 text-amber-200" />}
            >
              Explore New Hobbies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
