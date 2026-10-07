"use client";

import * as React from "react";
import { Compass, RotateCcw } from "lucide-react";
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
      <div className="py-16 text-center rounded-2xl bg-white border border-slate-200 p-8 max-w-md mx-auto space-y-4 shadow-xs">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
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
          className="font-bold text-xs"
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
    <div className="space-y-6">
      {/* Featured Primary Hero Card */}
      {featuredQuiz && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Featured Discovery Experience
            </h2>
          </div>
          <QuizCard quiz={featuredQuiz} onStartQuiz={onStartQuiz} featured={true} />
        </div>
      )}

      {/* Grid of Remaining Quizzes */}
      {remainingQuizzes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            More Specialty Discovery Tracks ({remainingQuizzes.length})
          </h3>
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
