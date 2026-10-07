"use client";

import * as React from "react";
import {
  Sparkles,
  Video,
  ShieldCheck,
  Clock,
  RotateCcw,
  Star,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SubscriptionHeroProps {
  billingCycle: "monthly" | "annual";
  onBillingCycleChange: (cycle: "monthly" | "annual") => void;
  onExploreMentorsClick: () => void;
  onViewPlansClick: () => void;
}

export function SubscriptionHero({
  billingCycle,
  onBillingCycleChange,
  onExploreMentorsClick,
  onViewPlansClick,
}: SubscriptionHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-700/50">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-primary-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>FRONTROW MASTER ACCELERATION</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
          Elevate Your Craft with{" "}
          <span className="bg-gradient-to-r from-primary-300 via-amber-200 to-primary-200 bg-clip-text text-transparent">
            1-on-1 Master Mentorship
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Skip years of trial and error. Connect directly with world-class artisans, touring musicians, Q-graders, and studio masters for live video sessions and 24h async project reviews.
        </p>

        {/* Value Proposition Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2 text-left sm:text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary-500/20 text-primary-300 shrink-0">
              <Video className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">45-min HD Video</p>
              <p className="text-[10px] text-slate-400">Live 1-on-1 private coaching</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">24h Async Reviews</p>
              <p className="text-[10px] text-slate-400">Video paint-over & voiceover</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Top 1% Vetted</p>
              <p className="text-[10px] text-slate-400">Artisans & industry judges</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
              <RotateCcw className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Flexible Reschedule</p>
              <p className="text-[10px] text-slate-400">100% Satisfaction guarantee</p>
            </div>
          </div>
        </div>

        {/* Billing Cycle Switcher */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => onBillingCycleChange("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => onBillingCycleChange("annual")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === "annual"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Trust Badges Ribbon */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm sm:text-base">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>4.98 / 5.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Average Mentor Rating</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-primary-300 font-bold text-sm sm:text-base">
              <Users className="h-4 w-4" />
              <span>2,400+ Sessions</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">1-on-1 Sessions Completed</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm sm:text-base">
              <Award className="h-4 w-4" />
              <span>Top 1% Curated</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Vetted Masters & Judges</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-sky-400 font-bold text-sm sm:text-base">
              <CheckCircle className="h-4 w-4" />
              <span>100% Guaranteed</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Or free repeat session</p>
          </div>
        </div>
      </div>
    </div>
  );
}
