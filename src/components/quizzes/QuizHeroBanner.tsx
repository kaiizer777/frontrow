"use client";

import * as React from "react";
import { Sparkles, Compass, Flame, Zap, Users, Search, X, CheckCircle2 } from "lucide-react";
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
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K keyboard shortcut to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-5 sm:p-8 md:p-10 shadow-2xl border border-slate-800/80">
      {/* Ambient background glows & mesh lighting */}
      <div className="absolute -right-16 -top-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 w-52 h-52 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 space-y-6 sm:space-y-7">
        {/* Top Badges & Live Vibe Radar Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              size="md"
              className="bg-teal-500/20 text-teal-300 border border-teal-400/30 backdrop-blur-md font-semibold px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
            >
              <Compass className="h-3.5 w-3.5 mr-1.5 text-teal-300 animate-pulse" />
              Craft & Vibe Discovery Lounge
            </Badge>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/25">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              98.4% Match Accuracy
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/25">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              3-Min Discovery
            </span>
          </div>

          {/* Overlapping live user avatars with live pulse */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-300 w-fit">
            <div className="flex -space-x-1.5 relative">
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
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
            <span className="font-medium text-slate-300">
              <strong className="text-white font-bold">14,200+</strong> creatives matched
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="max-w-3xl space-y-2.5">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300">
              Creative Obsession
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            Take a 3-minute intuitive vibe check calibrated to your rhythm, tactile preferences, and weekly free time.
            Get matched with starter courses, tailored gear blueprints, and live peer lounges.
          </p>
        </div>

        {/* Filter Pills & Keyboard Search */}
        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 border-t border-slate-800/80">
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar -mx-1 px-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold shadow-md shadow-teal-500/20 scale-[1.02]"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Bar with ⌘K Badge */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search quiz, craft, or vibe..."
              className="w-full pl-9.5 pr-14 py-2 rounded-xl bg-slate-800/90 border border-slate-700/70 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-700/70 text-[10px] text-slate-300 font-mono border border-slate-600/50 pointer-events-none">
                <span>⌘</span>
                <span>K</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
