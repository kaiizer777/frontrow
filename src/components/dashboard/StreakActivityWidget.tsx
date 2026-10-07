"use client";

import * as React from "react";
import { Flame, Shield, Clock, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { currentUser } from "@/lib/dummyData/users";
import { cn } from "@/lib/utils";

export function StreakActivityWidget() {
  const [selectedDay, setSelectedDay] = React.useState<string | null>(null);

  const totalWeeklyMinutes = currentUser.streak.weeklyActivity.reduce(
    (acc, curr) => acc + curr.minutes,
    0
  );
  const weeklyGoalMinutes = 300; // 5 hours target
  const goalPercentage = Math.min(Math.round((totalWeeklyMinutes / weeklyGoalMinutes) * 100), 100);

  return (
    <Card variant="default" className="relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Flame className="h-5 w-5 text-primary-500 fill-primary-500 animate-pulse" />
              Practice Rhythm & Streak
            </CardTitle>
            <Badge variant="amber" size="sm" dot={true}>
              {currentUser.streak.currentDays} Days Active
            </Badge>
          </div>
          <CardDescription className="text-xs text-slate-500 mt-0.5">
            Log at least 20 mins daily to keep your flame blazing
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-[11px] font-bold text-slate-700">
            <Shield className="h-3.5 w-3.5 text-teal-600" />
            <span>{currentUser.streak.freezeCount} Freezes</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* 7-Day Interactive Activity Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              This Week's Momentum
            </span>
            <span className="text-[11px] font-bold text-teal-600">
              {totalWeeklyMinutes} mins / {currentUser.stats.hoursPracticed}h total
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {currentUser.streak.weeklyActivity.map((day) => {
              const isSelected = selectedDay === day.day;
              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => setSelectedDay(isSelected ? null : day.day)}
                  className={cn(
                    "flex flex-col items-center justify-between p-2 rounded-xl transition-all text-center border relative group cursor-pointer",
                    day.active
                      ? "bg-gradient-to-b from-primary-50/70 to-amber-50/40 border-primary-200/80 hover:border-primary-400 hover:shadow-xs"
                      : "bg-slate-50/80 border-slate-200/60 text-slate-400",
                    isSelected && "ring-2 ring-primary-500 ring-offset-1 shadow-xs"
                  )}
                >
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900">
                    {day.day}
                  </span>

                  <div className="my-1.5">
                    {day.active ? (
                      <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-primary-500 to-amber-400 flex items-center justify-center text-white shadow-2xs group-hover:scale-110 transition-transform">
                        <Flame className="h-4 w-4 fill-white" />
                      </div>
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-400">
                        <span className="text-xs">·</span>
                      </div>
                    )}
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-bold",
                      day.active ? "text-primary-700 font-extrabold" : "text-slate-400"
                    )}
                  >
                    {day.minutes}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Weekly Goal Progress Bar & Key Metrics */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1 w-full sm:max-w-xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Weekly Goal ({weeklyGoalMinutes}m)
              </span>
              <span className="font-bold text-emerald-600">{goalPercentage}% Hit</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="h-3.5 w-3.5 text-primary-500" />
              <span>
                Avg <strong className="text-slate-900 font-bold">50m/day</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
              <span>
                Personal Best <strong className="text-slate-900 font-bold">{currentUser.streak.bestDays}d</strong>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
