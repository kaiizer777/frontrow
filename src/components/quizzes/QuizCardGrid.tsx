"use client";

import * as React from "react";
import { Compass, RotateCcw, Sparkles } from "lucide-react";
import { Quiz } from "@/lib/dummyData/types";
import { QuizCard } from "./QuizCard";
import { Button } from "@/components/ui/Button";

export interface QuizCardGridProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz) => void;
  onResetFilters: () => void;
}

export function QuizCardGrid({ quizzes, onStartQuiz, onResetFilters }: QuizCardGridProps) {
  if (quizzes.length === 0) {
    return (
      <div className="py-16 text-center rounded-3xl bg-white border border-slate-200/90 p-8 max-w-md mx-auto space-y-4 shadow-sm">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-600">
          <Compass className="h-7 w-7 animate-spin" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">No quizzes matched your search</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try adjusting your category filter or clearing the search keyword.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          className="font-bold text-xs cursor-pointer border-slate-200 hover:border-teal-400"
        >
          Reset All Filters
        </Button>
      </div>
    );
  }

  // Feature the first quiz if we have multiple quizzes
  const featuredQuiz = quizzes[0];
  const remainingQuizzes = quizzes.slice(1);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Featured Primary Hero Card */}
      {featuredQuiz && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-ping" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-800">
                ⭐ Featured Discovery Spotlight
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Recommended for beginners & explorers
            </span>
          </div>
          <QuizCard quiz={featuredQuiz} onStartQuiz={onStartQuiz} featured={true} />
        </div>
      )}

      {/* Grid of Remaining Quizzes */}
      {remainingQuizzes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200/70">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-600" />
              More Specialty Discovery Tracks ({remainingQuizzes.length})
            </h3>
            <span className="text-xs text-slate-500">2-3 min each</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {remainingQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onStartQuiz={onStartQuiz} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
