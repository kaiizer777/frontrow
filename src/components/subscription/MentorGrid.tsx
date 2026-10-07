"use client";

import * as React from "react";
import { Search, Filter, Sparkles, Check, SlidersHorizontal, UserCheck } from "lucide-react";
import { mentors } from "@/lib/dummyData/subscriptionPlans";
import { MentorCard } from "./MentorCard";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface MentorGridProps {
  onBookSession: (mentorId: string) => void;
}

const craftFilters = [
  { id: "all", label: "All Crafts", icon: "✨" },
  { id: "hobby-guitar", label: "Electric Guitar", icon: "🎸" },
  { id: "hobby-coffee", label: "Specialty Coffee", icon: "☕" },
  { id: "hobby-photo", label: "Street Photography", icon: "📷" },
  { id: "hobby-pottery", label: "Ceramic Pottery", icon: "🏺" },
  { id: "hobby-digital-art", label: "Digital Art", icon: "🎨" },
  { id: "hobby-woodwork", label: "Japanese Joinery", icon: "🪵" },
];

export function MentorGrid({ onBookSession }: MentorGridProps) {
  const [selectedCraft, setSelectedCraft] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [onlyAvailableSoon, setOnlyAvailableSoon] = React.useState<boolean>(false);

  // Filter mentors
  const filteredMentors = React.useMemo(() => {
    return mentors.filter((mentor) => {
      // Craft filter
      const matchesCraft =
        selectedCraft === "all" || mentor.hobbyId === selectedCraft;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        mentor.name.toLowerCase().includes(q) ||
        mentor.specialty.toLowerCase().includes(q) ||
        mentor.hobbyName.toLowerCase().includes(q) ||
        mentor.skills.some((s) => s.toLowerCase().includes(q));

      // Availability filter
      const matchesAvail =
        !onlyAvailableSoon ||
        mentor.availableNext.toLowerCase().includes("today") ||
        mentor.availableNext.toLowerCase().includes("tomorrow");

      return matchesCraft && matchesSearch && matchesAvail;
    });
  }, [selectedCraft, searchQuery, onlyAvailableSoon]);

  return (
    <div className="space-y-6">
      {/* Section Title & Subheading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary-700 font-bold text-xs uppercase tracking-wider">
            <UserCheck className="h-4 w-4 text-primary-600" />
            <span>Vetted Artisan Roster</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display mt-1">
            Meet Your 1-on-1 Master Mentors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Every mentor is a battle-tested master, industry judge, or studio lead with 9+ years of craft dedication.
          </p>
        </div>

        {/* Filter Counters */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="primary" size="md">
            {filteredMentors.length} Verified Mentors Available
          </Badge>
        </div>
      </div>

      {/* Craft Filter Pills Bar (Scrollable horizontally on mobile) */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {craftFilters.map((craft) => {
            const isSelected = selectedCraft === craft.id;
            return (
              <button
                key={craft.id}
                type="button"
                onClick={() => setSelectedCraft(craft.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80"
                }`}
              >
                <span className="text-sm select-none">{craft.icon}</span>
                <span>{craft.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Quick Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:max-w-md">
          <Input
            placeholder="Search by mentor name, skill (e.g. Tone, Glaze, Pour-over)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-slate-400" />}
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => setOnlyAvailableSoon(!onlyAvailableSoon)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              onlyAvailableSoon
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <div
              className={`h-3.5 w-3.5 rounded border flex items-center justify-center ${
                onlyAvailableSoon
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {onlyAvailableSoon && <Check className="h-2.5 w-2.5 stroke-[3]" />}
            </div>
            <span>Available Next 24-48h</span>
          </button>
        </div>
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
          <p className="text-sm font-bold text-slate-900">
            No mentors found matching your filters
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting &quot;All Crafts&quot; to see all available mentors.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCraft("all");
              setSearchQuery("");
              setOnlyAvailableSoon(false);
            }}
            className="text-xs text-primary-600 font-bold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
