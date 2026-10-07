"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Users, Star, Clock, Bookmark, ArrowRight, Layers, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { courses } from "@/lib/dummyData/courses";
import { hobbies } from "@/lib/dummyData/hobbies";

export function RecommendedHobbiesSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [savedCourses, setSavedCourses] = React.useState<string[]>([
    "course-digital-art-101",
    "course-woodwork-101",
  ]);

  // Recommended courses that the user hasn't enrolled in yet (or featured discovery items)
  const recommendedCourses = courses.filter((c) =>
    ["course-digital-art-101", "course-pottery-101", "course-woodwork-101"].includes(c.id)
  );

  const categories = ["All", "Tactile Crafts", "Design & Art", "Woodcraft"];

  const filteredCourses = selectedCategory === "All"
    ? recommendedCourses
    : recommendedCourses.filter((c) => {
        if (selectedCategory === "Tactile Crafts") return c.hobbyId === "hobby-pottery";
        if (selectedCategory === "Design & Art") return c.hobbyId === "hobby-digital-art";
        if (selectedCategory === "Woodcraft") return c.hobbyId === "hobby-woodwork";
        return true;
      });

  const toggleBookmark = (courseId: string) => {
    setSavedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Recommended For You
            </h2>
            <Badge variant="amber" size="sm" dot={true}>
              AI Curated
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Handpicked creative workshops based on your neo-soul & visual art affinities
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary-600 text-white shadow-xs font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isSaved = savedCourses.includes(course.id);
          const hobby = hobbies.find((h) => h.id === course.hobbyId);

          return (
            <Card
              key={course.id}
              variant="interactive"
              className="flex flex-col justify-between overflow-hidden border-slate-200/80 bg-white group hover:border-teal-300"
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
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="backdrop-blur-md bg-teal-800/90 text-white font-bold border-none shadow-xs"
                    >
                      {course.level}
                    </Badge>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(course.id);
                      }}
                      className="p-1.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/90 transition-colors cursor-pointer"
                      title="Bookmark course"
                    >
                      <Bookmark
                        className={`h-3.5 w-3.5 ${
                          isSaved ? "fill-amber-400 text-amber-400" : "text-white"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1 text-amber-300 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-300" />
                      {course.rating.toFixed(2)} ({course.reviewCount})
                    </span>
                    <span className="flex items-center gap-1 text-slate-200 font-semibold">
                      <Users className="h-3.5 w-3.5" />
                      {course.studentCount.toLocaleString()} learners
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider">
                      {course.hobbyName}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 mt-0.5">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Card Footer: Instructor & CTA */}
              <CardFooter className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    By <strong className="text-slate-900 font-bold">{course.instructor.name}</strong>
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold text-xs text-teal-700 hover:text-teal-800 hover:bg-teal-50 border-teal-200"
                  rightIcon={<ArrowRight className="h-3 w-3" />}
                >
                  Explore
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
