"use client";

import * as React from "react";
import Image from "next/image";
import {
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  Video,
  MessageSquareQuote,
} from "lucide-react";
import { MentorProfile } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface MentorCardProps {
  mentor: MentorProfile;
  onBookSession: (mentorId: string) => void;
}

export function MentorCard({ mentor, onBookSession }: MentorCardProps) {
  const [showReviewSnippet, setShowReviewSnippet] = React.useState(false);
  const topReview = mentor.reviews[0];

  return (
    <div className="group rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image & Header Banner */}
        <div className="relative h-28 w-full bg-slate-800 overflow-hidden">
          <Image
            src={mentor.coverImage}
            alt={mentor.hobbyName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Top Pill Tags */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              {mentor.hobbyName}
            </span>

            {mentor.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-300 bg-amber-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="p-5 pt-0">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="relative">
              <div className="rounded-full ring-4 ring-white shadow-md bg-white">
                <Avatar
                  src={mentor.avatar}
                  alt={mentor.name}
                  fallback={mentor.name.substring(0, 2)}
                  size="xl"
                  isOnline={true}
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-1 rounded-full shadow-xs"
                title="Verified Master Artisan"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Experience & Sessions stats */}
            <div className="text-right flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                {mentor.experienceYears} yrs exp
              </span>
              <span className="text-[11px] font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100">
                {mentor.completedSessions} sessions
              </span>
            </div>
          </div>

          {/* Name & Specialty */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors font-display">
                {mentor.name}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {mentor.handle}
              </span>
            </div>

            <p className="text-xs font-semibold text-primary-700 mt-0.5 line-clamp-1">
              {mentor.specialty}
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{mentor.rating.toFixed(2)}</span>
              </div>
              <span className="text-slate-600">({mentor.reviewCount} student reviews)</span>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
              {mentor.bio}
            </p>

            {/* Skill Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {mentor.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md"
                >
                  {skill}
                </span>
              ))}
              {mentor.skills.length > 3 && (
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md">
                  +{mentor.skills.length - 3}
                </span>
              )}
            </div>

            {/* Next Availability Tag */}
            <div className="mt-3.5 p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px]">Next Open Slot:</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-900">
                {mentor.availableNext}
              </span>
            </div>

            {/* Review Quote Dropdown */}
            {topReview && (
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={() => setShowReviewSnippet(!showReviewSnippet)}
                  className="text-[11px] text-slate-500 hover:text-primary-600 flex items-center gap-1 font-medium transition-colors"
                >
                  <MessageSquareQuote className="h-3 w-3" />
                  <span>
                    {showReviewSnippet ? "Hide review" : `“${topReview.authorName} says: ${topReview.comment.slice(0, 38)}...”`}
                  </span>
                </button>

                {showReviewSnippet && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 italic animate-in fade-in duration-150">
                    <p>“{topReview.comment}”</p>
                    <span className="block not-italic text-[10px] font-bold text-slate-500 mt-1">
                      — {topReview.authorName}, {topReview.date}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Rate & Action Button */}
      <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">
            Rate / Credit
          </span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            ${mentor.hourlyRate}
            <span className="text-[11px] font-normal text-slate-500">
              {" "}
              / 45 min
            </span>
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onBookSession(mentor.id)}
          className="text-xs group shadow-xs"
        >
          <span>Book Session</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}
