"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  ArrowRight,
  RotateCcw,
  Users2,
  BookOpen,
  Share2,
  CheckCircle2,
  Flame,
  Star,
  Compass,
} from "lucide-react";
import { QuizResultRecommendation, Quiz } from "@/lib/dummyData/types";
import { hobbies } from "@/lib/dummyData/hobbies";
import { courses } from "@/lib/dummyData/courses";
import { buddyRooms } from "@/lib/dummyData/buddyRooms";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface QuizResultCardProps {
  quiz: Quiz;
  result: QuizResultRecommendation;
  onRetakeQuiz: () => void;
  onExploreOtherQuizzes: () => void;
}

export function QuizResultCard({
  quiz,
  result,
  onRetakeQuiz,
  onExploreOtherQuizzes,
}: QuizResultCardProps) {
  const [copied, setCopied] = React.useState(false);

  // Find linked entities
  const matchedHobby = hobbies.find((h) => h.id === result.hobbyId) || hobbies[0];
  const matchedCourse = courses.find((c) => c.id === result.starterCourseId) || courses[0];
  const matchedRoom = buddyRooms.find((r) => r.id === result.recommendedBuddyRoomId) || buddyRooms[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I scored a ${result.matchScorePercent}% match with ${result.hobbyName} on FRONTROW! Check out discovery quizzes: https://frontrow-nu.vercel.app/quizzes`
      );
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-6">
      {/* Celebratory Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-teal-500/30 text-center">
        {/* Ambient Celebration Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-teal-400/25 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Sparkles & Emojis */}
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 backdrop-blur-md text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
            <span>Creative Compatibility Match Found!</span>
          </div>

          {/* Big Match Percentage Highlight */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="relative flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-1.5 shadow-xl shadow-teal-500/25">
              <div className="h-full w-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-2">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200">
                  {result.matchScorePercent}%
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Affinity Score
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 max-w-lg">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {result.headline}
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Hobby Showcase Card */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Your Recommended Craft Profile</h2>
          </div>
          <Badge variant="success" size="sm" dot={true}>
            Top Verified Fit
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 shadow-xs">
            <img
              src={matchedHobby.coverImage}
              alt={matchedHobby.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {matchedHobby.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {matchedHobby.difficultyLevel}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {matchedHobby.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
              {matchedHobby.description}
            </p>
          </div>
        </div>

        {/* Compatibility Breakdown Bars */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Sensory / Flow</span>
              <span className="text-teal-700">{result.matchScorePercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: `${result.matchScorePercent}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Schedule Fit</span>
              <span className="text-emerald-700">95%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Community Vibe</span>
              <span className="text-amber-700">92%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "92%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Actions (Course & Buddy Room) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Starter Course */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 transition-all space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                <BookOpen className="h-3.5 w-3.5" />
                Step 1: Starter Masterclass
              </span>
              <span className="text-xs text-slate-500 font-medium">{matchedCourse.durationHours} hrs</span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={matchedCourse.coverImage}
                alt={matchedCourse.title}
                className="h-14 w-14 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {matchedCourse.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                  Instructor: {matchedCourse.instructor.name} ({matchedCourse.instructor.title})
                </p>
              </div>
            </div>
          </div>

          <Link href={`/?enrolled=${matchedCourse.id}`} className="block w-full">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center text-xs font-bold shadow-xs cursor-pointer"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Start Beginner Masterclass
            </Button>
          </Link>
        </div>

        {/* Recommended Buddy Room */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 transition-all space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <Users2 className="h-3.5 w-3.5" />
                Step 2: Live Hobby Lounge
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {matchedRoom.onlineCount} online
              </span>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={matchedRoom.coverImage}
                alt={matchedRoom.name}
                className="h-14 w-14 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  #{matchedRoom.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                  {matchedRoom.description}
                </p>
              </div>
            </div>
          </div>

          <Link href={`/buddy-rooms?room=${matchedRoom.id}`} className="block w-full">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-xs"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Join #{matchedRoom.name.split("&")[0].trim()} Room
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetakeQuiz}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            className="flex-1 sm:flex-initial text-xs font-bold cursor-pointer"
          >
            Retake Quiz
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onExploreOtherQuizzes}
            leftIcon={<Compass className="h-3.5 w-3.5 text-teal-600" />}
            className="flex-1 sm:flex-initial text-xs font-bold text-teal-700 hover:bg-teal-50 cursor-pointer"
          >
            Explore Other Quizzes
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          leftIcon={copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
          className="w-full sm:w-auto text-xs font-semibold cursor-pointer border-slate-200"
        >
          {copied ? "Match Link Copied!" : "Share My Result"}
        </Button>
      </div>
    </div>
  );
}
