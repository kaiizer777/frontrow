"use client";

import * as React from "react";
import { Clock, Users, ArrowRight, Sparkles, HelpCircle, CheckCircle } from "lucide-react";
import { Quiz } from "@/lib/dummyData/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
  featured?: boolean;
}

export function QuizCard({ quiz, onStartQuiz, featured = false }: QuizCardProps) {
  // Extract unique matched hobbies names from possible results
  const matchedHobbyNames = Object.values(quiz.possibleResults).map((r) => r.hobbyName.split("&")[0].trim());

  return (
    <div
      onClick={() => onStartQuiz(quiz)}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-400/80 transition-all duration-200 cursor-pointer overflow-hidden ${
        featured ? "md:col-span-2 md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* Visual Cover Header */}
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? "md:w-5/12 h-52 md:h-auto shrink-0" : "h-48 w-full"}`}>
        <img
          src={quiz.coverImage}
          alt={quiz.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            size="sm"
            className="bg-slate-900/80 text-teal-300 border border-teal-500/30 backdrop-blur-md font-bold text-[11px]"
          >
            <Sparkles className="h-3 w-3 mr-1 text-teal-400" />
            {quiz.accentBadge || "Popular"}
          </Badge>

          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
            <Clock className="h-3 w-3 text-teal-300" />
            {quiz.estimatedMinutes} min
          </span>
        </div>

        {/* Bottom participant count on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-200">
          <Users className="h-3.5 w-3.5 text-teal-300" />
          <span>{quiz.participantsCount.toLocaleString()}+ matched</span>
        </div>
      </div>

      {/* Card Content & Action */}
      <div className={`p-5 flex flex-col justify-between flex-1 space-y-4 ${featured ? "md:p-7" : ""}`}>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
              {quiz.category}
            </span>
            <span className="text-[11px] text-slate-600 font-medium">
              {quiz.questions.length} Questions
            </span>
          </div>

          <div>
            <h3 className={`font-display font-bold text-slate-900 group-hover:text-teal-700 transition-colors ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}>
              {quiz.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
              {quiz.tagline}
            </p>
          </div>

          {/* Matched crafts teaser chips */}
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-emerald-500" />
              Possible Matches:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {matchedHobbyNames.slice(0, 3).map((name, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                >
                  {name}
                </span>
              ))}
              {matchedHobbyNames.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium">
                  +{matchedHobbyNames.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStartQuiz(quiz);
            }}
            className="w-full justify-between font-bold text-xs sm:text-sm text-teal-800 bg-teal-50/60 hover:bg-teal-600 hover:text-white border-teal-200 transition-all group/btn shadow-xs cursor-pointer"
            rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
          >
            <span>Start Discovery Quiz</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
