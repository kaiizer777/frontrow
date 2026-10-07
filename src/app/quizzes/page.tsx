"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/shared/AppShell";
import {
  QuizHeroBanner,
  QuizCardGrid,
  QuizPlayerModal,
} from "@/components/quizzes";
import { quizzes } from "@/lib/dummyData/quizzes";
import { Quiz } from "@/lib/dummyData/types";
import { Sparkles, Compass, Lightbulb, Users, ArrowRight, CheckCircle2, Flame, HeartHandshake, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES = [
  "All Quizzes",
  "Weekend DIY",
  "Music & Audio",
  "Visual Arts",
  "Craft & Tactile",
];

function QuizzesContent() {
  const searchParams = useSearchParams();
  const quizParam = searchParams.get("quiz");

  const [activeCategory, setActiveCategory] = React.useState("All Quizzes");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);

  // Auto-open quiz if matched in query params (e.g. ?quiz=quiz-creative-spark)
  React.useEffect(() => {
    if (quizParam) {
      const foundQuiz = quizzes.find((q) => q.id === quizParam || q.slug === quizParam);
      if (foundQuiz) {
        setSelectedQuiz(foundQuiz);
        setIsPlayerOpen(true);
      }
    }
  }, [quizParam]);

  // Filter quizzes based on category and search query
  const filteredQuizzes = React.useMemo(() => {
    return quizzes.filter((quiz) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All Quizzes" || quiz.category === activeCategory;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        quiz.title.toLowerCase().includes(query) ||
        quiz.tagline.toLowerCase().includes(query) ||
        quiz.description.toLowerCase().includes(query) ||
        quiz.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsPlayerOpen(true);
  };

  const handleResetFilters = () => {
    setActiveCategory("All Quizzes");
    setSearchQuery("");
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Hero Banner with Filters and Social Proof */}
      <QuizHeroBanner
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={CATEGORIES}
      />

      {/* Main Quizzes Grid */}
      <QuizCardGrid
        quizzes={filteredQuizzes}
        onStartQuiz={handleStartQuiz}
        onResetFilters={handleResetFilters}
      />

      {/* "How It Works" 3-Step Visual Engine Section */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 md:p-10 border border-slate-800/80 shadow-xl relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Scientific Craft Affinity
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white mt-1">
                How FRONTROW Discovery Works
              </h3>
            </div>
            <Badge variant="secondary" size="sm" className="bg-teal-500/20 text-teal-300 border-teal-400/30 w-fit">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Smart Match Engine
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-6 rounded-2xl bg-slate-850/80 border border-slate-750/70 space-y-3 relative group hover:border-teal-500/50 transition-all">
              <div className="h-11 w-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold font-display text-base border border-teal-400/30 shadow-xs">
                01
              </div>
              <h4 className="text-base font-bold text-white">
                Intuitive Vibe Calibration
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                4 prompt scenarios identify whether tactile ceramics, soulful chords, or visual framing sparks your natural focus and flow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-850/80 border border-slate-750/70 space-y-3 relative group hover:border-emerald-500/50 transition-all">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold font-display text-base border border-emerald-400/30 shadow-xs">
                02
              </div>
              <h4 className="text-base font-bold text-white">
                Friction-Free Starter Pack
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Receive an instant gear blueprint, bite-sized starter masterclass, and beginner-safe practice drills tailored to your schedule.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-850/80 border border-slate-750/70 space-y-3 relative group hover:border-amber-500/50 transition-all">
              <div className="h-11 w-11 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold font-display text-base border border-amber-400/30 shadow-xs">
                03
              </div>
              <h4 className="text-base font-bold text-white">
                Live Peer Accountability
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Jump straight into active hobby lounges to share daily progress and jam with creators at your exact skill level.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quiz Player & Celebration Modal */}
      <QuizPlayerModal
        quiz={selectedQuiz}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        onExploreOtherQuizzes={() => {
          setIsPlayerOpen(false);
          setActiveCategory("All Quizzes");
        }}
      />
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <AppShell>
      <React.Suspense
        fallback={
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent align-[-0.125em]" />
            <p className="mt-3 text-xs text-slate-500">Loading discovery quizzes...</p>
          </div>
        }
      >
        <QuizzesContent />
      </React.Suspense>
    </AppShell>
  );
}
