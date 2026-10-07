"use client";

import * as React from "react";
import { Sparkles, Flame, Zap, Search, X } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-amber-600 text-white p-6 sm:p-8 shadow-[0_12px_32px_rgba(255,90,54,0.22)] border-t border-white/20 transition-all">
      {/* Decorative ambient background glows */}
      <div className="absolute -right-16 -top-16 w-80 sm:w-96 h-80 sm:h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-20 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Badges & Live Social Proof Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/25 text-white shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-200 animate-pulse" />
              <span>Craft & Vibe Discovery Lounge · Interactive Quizzes</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold text-white shadow-2xs">
              <Flame className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>98.4% Match Accuracy</span>
            </div>

            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold text-white shadow-2xs">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span>3-Min Discovery</span>
            </div>
          </div>

          {/* Overlapping live user avatars with live pulse */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-xs text-white shadow-2xs w-fit">
            <div className="flex -space-x-1.5 relative">
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-300 ring-2 ring-primary-600 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-300 ring-2 ring-primary-600" />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-primary-700 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-primary-700 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="user"
                className="h-5 w-5 rounded-full ring-1.5 ring-primary-700 object-cover"
              />
            </div>
            <span className="font-medium text-white/95">
              <strong className="text-white font-bold">14,200+</strong> creatives matched
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="max-w-3xl space-y-2.5">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Discover Your Next{" "}
            <span className="text-amber-200">
              Creative Obsession
            </span>{" "}
            🔮
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-2xl">
            Take a 3-minute intuitive vibe check calibrated to your rhythm, tactile preferences, and weekly free time.
            Get matched with starter courses, tailored gear blueprints, and live peer lounges.
          </p>
        </div>

        {/* Filter Pills & Keyboard Search */}
        <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 border-t border-white/20">
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
                      ? "bg-white text-slate-900 font-bold shadow-md shadow-black/10 scale-[1.02]"
                      : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Bar with ⌘K Badge */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/70" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search quiz, craft, or vibe..."
              className="w-full pl-9.5 pr-14 py-2 rounded-xl bg-white/15 border border-white/25 text-xs text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 focus:border-white transition-all backdrop-blur-sm"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/20 text-[10px] text-white/90 font-mono border border-white/25 pointer-events-none">
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
