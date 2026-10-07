"use client";

import * as React from "react";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

interface ReviewItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  craft: string;
  mentorName: string;
  rating: number;
  date: string;
  quote: string;
  keyOutcome: string;
}

const featuredReviews: ReviewItem[] = [
  {
    id: "rev-alex",
    studentName: "Alex Rivera",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    craft: "Electric Guitar & Tone",
    mentorName: "Marcus Vance",
    rating: 5,
    date: "3 days ago",
    quote: "Marcus completely unlocked my thumb-over chord transitions. In 45 minutes I learned what I was struggling with for 6 months on generic YouTube tutorials.",
    keyOutcome: "Unlocked Neo-Soul chord transitions & fretboard fluidity",
  },
  {
    id: "rev-saif",
    studentName: "Saif B.",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    craft: "Electric Guitar & Tone",
    mentorName: "Marcus Vance",
    rating: 5,
    date: "1 week ago",
    quote: "Incredible ear for tone. Marcus helped me dial the sweet spot on my transparent overdrive pedal and clean up fret noise in my lead phrasing.",
    keyOutcome: "Mastered analog gain staging and dynamic attack",
  },
  {
    id: "rev-chloe",
    studentName: "Chloe Adams",
    studentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    craft: "Specialty Coffee Brewing",
    mentorName: "Elena Rostova",
    rating: 5,
    date: "2 days ago",
    quote: "Elena analyzed my pour flow and adjusted my water recipe to 45ppm magnesium. My washed Ethiopian coffee tasted like liquid peach tea!",
    keyOutcome: "Dialed-in custom water chemistry & 22% extraction yields",
  },
  {
    id: "rev-jin",
    studentName: "Jin Woo",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    craft: "Street Photography",
    mentorName: "Kai Takahashi",
    rating: 5,
    date: "Last week",
    quote: "Kai gave constructive, uncompromising feedback on my contact sheets. Taught me to shoot the background first and wait for the character to walk into the frame.",
    keyOutcome: "Zone-focus mastery & overcoming street candid hesitation",
  },
  {
    id: "rev-maya",
    studentName: "Maya Lin",
    studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    craft: "Digital Concept Art",
    mentorName: "Sora Matsuda",
    rating: 5,
    date: "5 days ago",
    quote: "Sora did a live paint-over on my character illustration and the rim lighting transformation was mind-blowing. The portfolio review gave me clear next steps.",
    keyOutcome: "Cinematic light keys & Procreate brush dynamic setups",
  },
];

export function MentorReviewsCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const prevReview = () => {
    setActiveIndex(
      (prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length
    );
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-700/60 overflow-hidden relative">
      {/* Glow Effect */}
      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
        <div>
          <div className="flex items-center gap-2 text-primary-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Student Breakthroughs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
            Real Craft Transformations
          </h2>
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevReview}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-xs text-slate-400 px-1 font-mono">
            {activeIndex + 1} / {featuredReviews.length}
          </div>
          <button
            type="button"
            onClick={nextReview}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Review Display */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Quote Block (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
            <span className="ml-2 text-xs font-bold text-slate-300">
              5.0 Verified Student Review
            </span>
          </div>

          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed italic">
            &ldquo;{featuredReviews[activeIndex].quote}&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-primary-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Key Breakthrough:</strong>{" "}
              {featuredReviews[activeIndex].keyOutcome}
            </span>
          </div>
        </div>

        {/* Student & Mentor Card (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={featuredReviews[activeIndex].studentAvatar}
              alt={featuredReviews[activeIndex].studentName}
              fallback={featuredReviews[activeIndex].studentName.substring(0, 2)}
              size="lg"
            />
            <div>
              <h4 className="font-bold text-white text-sm">
                {featuredReviews[activeIndex].studentName}
              </h4>
              <p className="text-xs text-primary-300 font-medium">
                {featuredReviews[activeIndex].craft}
              </p>
              <span className="text-[10px] text-slate-400">
                {featuredReviews[activeIndex].date}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Mentored by:</span>
            <span className="font-bold text-white">
              {featuredReviews[activeIndex].mentorName}
            </span>
          </div>
        </div>
      </div>

      {/* Mini preview dots */}
      <div className="flex items-center justify-center gap-2 pt-6">
        {featuredReviews.map((r, idx) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === idx
                ? "w-8 bg-primary-400"
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Jump to review by ${r.studentName}`}
          />
        ))}
      </div>
    </div>
  );
}
