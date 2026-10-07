"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, ArrowRight, Clock, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { quizzes } from "@/lib/dummyData/quizzes";

export function QuizBannerWidget() {
  const featuredQuiz = quizzes[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white p-5 sm:p-6 shadow-md border border-teal-700/50">
      {/* Decorative ambient radial glows */}
      <div className="absolute right-0 top-0 -bottom-10 w-64 bg-gradient-to-l from-teal-400/20 to-transparent pointer-events-none rounded-full blur-2xl" />
      <div className="absolute -left-12 -top-12 w-40 h-40 bg-primary-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              size="sm"
              className="bg-teal-500/20 text-teal-200 border-teal-400/30 backdrop-blur-xs font-bold"
            >
              <Sparkles className="h-3 w-3 text-teal-300 mr-1" />
              Creative Discovery
            </Badge>

            <div className="flex items-center gap-1 text-[11px] text-teal-200 font-medium">
              <Clock className="h-3.5 w-3.5 text-teal-300" />
              <span>{featuredQuiz.estimatedMinutes} mins</span>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-white leading-snug">
              {featuredQuiz.title}
            </h3>
            <p className="text-xs text-teal-100/85 line-clamp-2 mt-1 leading-relaxed">
              {featuredQuiz.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-teal-200/90 pt-0.5">
            <span className="flex items-center gap-1 font-semibold">
              <Users className="h-3 w-3 text-teal-300" />
              {featuredQuiz.participantsCount.toLocaleString()}+ Creatives Tested
            </span>
            <span>•</span>
            <span className="text-amber-300 font-bold">96% High Match</span>
          </div>
        </div>

        <Link href="/quizzes" className="block w-full pt-1">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-between bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold border-none shadow-xs text-xs group"
            rightIcon={<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />}
          >
            <span>Take 3-Min Quiz</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
