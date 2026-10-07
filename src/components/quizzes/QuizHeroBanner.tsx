"use client";

import * as React from "react";
import { Sparkles, Compass, Flame, Users, CheckCircle2, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface QuizHeroBannerProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
}

export function QuizHeroBanner({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categories,
}: QuizHeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-primary-500/15 blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 bottom-0 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      {/* Decorative subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Badges & Social Proof */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              size="md"
              className="bg-teal-500/20 text-teal-300 border border-teal-400/30 backdrop-blur-md font-semibold px-3 py-1"
            >
              <Compass className="h-3.5 w-3.5 mr-1.5 text-teal-300 animate-pulse" />
              Interest Discovery Engine
            </Badge>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/20">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              98.4% Match Accuracy
            </span>
          </div>

          {/* Live social proof ticker */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-300">
            <div className="flex -space-x-1.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-slate-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-slate-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-slate-900 object-cover"
              />
            </div>
            <span className="font-medium">
              <strong className="text-white font-bold">14,200+</strong> hobbyists matched this month
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="max-w-2xl space-y-2.5">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300">
              Creative Obsession
            </span>{" "}
            in 3 Minutes
          </h1>
          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
            Take an interactive vibe check calibrated to your rhythm, tactile preferences, and weekly free time.
            Get matched with starter courses, tailored gear guides, and live buddy rooms.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-800/80">
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold scale-[1.02]"
                      : "bg-slate-800/90 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search input for instant matching */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search quiz or vibe..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
