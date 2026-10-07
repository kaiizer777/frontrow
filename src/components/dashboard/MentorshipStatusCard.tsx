"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Star, CheckCircle, Video, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { mentors } from "@/lib/dummyData/subscriptionPlans";

export function MentorshipStatusCard() {
  const topMentor = mentors[0]; // Marcus Vance

  return (
    <Card variant="default" className="border-slate-200/80 bg-gradient-to-br from-white via-primary-50/20 to-amber-50/30 overflow-hidden relative">
      <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="sm" dot={true} className="text-[10px] sm:text-xs">
            VIP Mentorship
          </Badge>
          <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500">
            Open: Tomorrow
          </span>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-slate-900">
            1-on-1 Craft Coaching
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Book private video reviews & get tailored feedback on your playing.
          </p>
        </div>

        {/* Featured Mentor Card */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Avatar
              src={topMentor.avatar}
              fallback={topMentor.name.substring(0, 2)}
              size="md"
              isOnline={true}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {topMentor.name}
                </h4>
                <div className="flex items-center text-amber-500 text-[10px] font-bold shrink-0">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{topMentor.rating.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 truncate">
                {topMentor.specialty}
              </p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100">
            <span className="flex items-center gap-1 text-teal-700 font-semibold text-[10.5px] sm:text-[11px]">
              <Video className="h-3.5 w-3.5 shrink-0" />
              45-min Live Video
            </span>
            <span className="font-bold text-slate-900 text-[10.5px] sm:text-[11px]">
              ${topMentor.hourlyRate}/session
            </span>
          </div>
        </div>

        <Link href="/subscription" className="block w-full">
          <Button
            variant="primary"
            size="sm"
            className="w-full justify-between font-bold text-xs group active:scale-[0.98] transition-transform"
            rightIcon={<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />}
          >
            <span>Book Mentor Session</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}
