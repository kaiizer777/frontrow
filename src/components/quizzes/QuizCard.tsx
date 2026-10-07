"use client";

import * as React from "react";
import { Clock, Users, ArrowRight, Sparkles, CheckCircle2, Flame, Star } from "lucide-react";
import { Quiz } from "@/lib/dummyData/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
  featured?: boolean;
}

// Craft icons mapping for possible matches chips
function getCraftEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("guitar") || lower.includes("music") || lower.includes("sound")) return "🎸";
  if (lower.includes("coffee") || lower.includes("barista") || lower.includes("brew")) return "☕";
  if (lower.includes("pottery") || lower.includes("ceramic") || lower.includes("clay")) return "🏺";
  if (lower.includes("photo") || lower.includes("film") || lower.includes("camera") || lower.includes("lens")) return "📸";
  if (lower.includes("art") || lower.includes("digital") || lower.includes("illustration") || lower.includes("concept")) return "🎨";
  if (lower.includes("wood") || lower.includes("carpentry") || lower.includes("joinery")) return "🪚";
  return "✨";
}

export function QuizCard({ quiz, onStartQuiz, featured = false }: QuizCardProps) {
  // Extract unique matched hobbies names from possible results
  const matchedHobbies = Object.values(quiz.possibleResults).map((r) => ({
    name: r.hobbyName.split("&")[0].trim(),
    fullName: r.hobbyName,
    matchScore: r.matchScorePercent,
  }));

  if (featured) {
    return (
      <div
        onClick={() => onStartQuiz(quiz)}
        className="group relative flex flex-col lg:flex-row rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-teal-400/80 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Spotlight Visual Cover Header */}
        <div className="relative overflow-hidden bg-slate-900 lg:w-5/12 h-64 sm:h-72 lg:h-auto shrink-0">
          <img
            src={quiz.coverImage}
            alt={quiz.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Multi-layered cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/30 lg:to-slate-950/80" />

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 text-teal-300 border border-teal-500/40 backdrop-blur-md text-xs font-bold shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              {quiz.accentBadge || "Trending #1"}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 text-white border border-white/15 backdrop-blur-md text-xs font-semibold">
              <Clock className="h-3.5 w-3.5 text-teal-400" />
              {quiz.estimatedMinutes} min
            </span>
          </div>

          {/* Bottom Live Metrics */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-medium text-slate-200">
            <span className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
              <Users className="h-3.5 w-3.5 text-teal-300" />
              <strong className="text-white font-bold">{quiz.participantsCount.toLocaleString()}</strong> matched
            </span>

            <span className="flex items-center gap-1 text-amber-300 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
              <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
              4.9/5 Rating
            </span>
          </div>
        </div>

        {/* Featured Content & CTA Section */}
        <div className="p-6 sm:p-8 lg:p-9 flex flex-col justify-between flex-1 space-y-6">
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/70">
                {quiz.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {quiz.questions.length} Step Intuitive Vibe Check
              </span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 ml-auto">
                ⚡ Instant Blueprint
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-slate-900 text-xl sm:text-2xl lg:text-3xl group-hover:text-teal-700 transition-colors leading-tight">
                {quiz.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {quiz.description || quiz.tagline}
              </p>
            </div>

            {/* Possible Matches Visual Pill Deck */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                Featured Craft Results in this Deck:
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedHobbies.slice(0, 4).map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 hover:bg-teal-50/70 text-slate-700 hover:text-teal-900 text-xs font-medium border border-slate-200/90 transition-colors"
                  >
                    <span>{getCraftEmoji(h.name)}</span>
                    <span>{h.name}</span>
                  </span>
                ))}
                {matchedHobbies.length > 4 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium">
                    +{matchedHobbies.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Magnetic CTA Bar */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              <span>Includes tailored masterclasses & room matches</span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                onStartQuiz(quiz);
              }}
              className="w-full sm:w-auto font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all group/btn cursor-pointer bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white"
              rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
            >
              <span>Start Discovery Quiz</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Specialty Track Cards
  return (
    <div
      onClick={() => onStartQuiz(quiz)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-400/80 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Visual Cover Header */}
      <div className="relative overflow-hidden bg-slate-900 h-48 w-full">
        <img
          src={quiz.coverImage}
          alt={quiz.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            size="sm"
            className="bg-slate-900/80 text-teal-300 border border-teal-500/30 backdrop-blur-md font-bold text-[11px]"
          >
            <Sparkles className="h-3 w-3 mr-1 text-teal-400" />
            {quiz.accentBadge || "Track"}
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
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
              {quiz.category}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {quiz.questions.length} Questions
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors line-clamp-1">
              {quiz.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
              {quiz.tagline}
            </p>
          </div>

          {/* Matched crafts teaser chips */}
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-teal-600" />
              Possible Matches:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {matchedHobbies.slice(0, 3).map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                >
                  <span>{getCraftEmoji(h.name)}</span>
                  <span>{h.name}</span>
                </span>
              ))}
              {matchedHobbies.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[11px] font-medium">
                  +{matchedHobbies.length - 3} more
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
