"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Play, Clock, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/lib/dummyData/users";
import { courses } from "@/lib/dummyData/courses";

export function EnrolledCoursesSection() {
  const enrolledWithDetails = currentUser.enrolledCourses.map((enrolled) => {
    const course = courses.find((c) => c.id === enrolled.courseId);
    return {
      ...enrolled,
      course,
    };
  }).filter((item) => item.course !== undefined);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Continue Learning
            </h2>
            <Badge variant="primary" size="sm">
              {enrolledWithDetails.length} In Progress
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick up right where you left off in your creative workshops
          </p>
        </div>

        <Link
          href="/buddy-rooms"
          className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
        >
          <span>View All Courses</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {enrolledWithDetails.map(({ course, progressPercent, completedLessonsCount, totalLessonsCount, nextLessonTitle, lastAccessedDate }) => {
          if (!course) return null;

          return (
            <Card
              key={course.id}
              variant="interactive"
              className="flex flex-col justify-between overflow-hidden border-slate-200/80 bg-white group hover:border-primary-300"
            >
              <div>
                {/* Course Cover Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="primary" size="sm" className="backdrop-blur-md bg-primary-600/90 text-white font-bold border-none shadow-xs">
                      {course.hobbyName.split("&")[0].trim()}
                    </Badge>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10">
                      <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1 text-slate-200">
                      <Clock className="h-3.5 w-3.5" />
                      {course.durationHours}h total
                    </span>
                    <span className="text-[11px] font-semibold text-white/90">
                      Last active {lastAccessedDate}
                    </span>
                  </div>
                </div>

                {/* Card Content & Progress */}
                <CardContent className="p-4 space-y-3.5">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Progress Bar & Counter */}
                  <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                        {completedLessonsCount}/{totalLessonsCount} Lessons Completed
                      </span>
                      <span className="font-extrabold text-primary-600">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Up Next Lesson Pill */}
                  <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                      <Play className="h-2.5 w-2.5 fill-teal-700 text-teal-700" />
                      <span>Next Up</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {nextLessonTitle}
                    </p>
                  </div>
                </CardContent>
              </div>

              {/* Card Footer: Instructor & CTA */}
              <CardFooter className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar
                    src={course.instructor.avatar}
                    fallback={course.instructor.name.substring(0, 2)}
                    size="sm"
                    isOnline={true}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {course.instructor.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {course.instructor.title.split("&")[0].trim()}
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="shrink-0 font-bold text-xs"
                  leftIcon={<Play className="h-3.5 w-3.5 fill-white" />}
                >
                  Resume
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
