"use client";

import * as React from "react";
import { Search, SlidersHorizontal, Radio, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface RoomFilterState {
  category: string;
  searchQuery: string;
  onlyActiveNow: boolean;
  sortBy: "active" | "members" | "recommended";
}

interface RoomFiltersProps {
  filters: RoomFilterState;
  onFilterChange: (filters: RoomFilterState) => void;
  totalRoomsCount: number;
  activeRoomsCount: number;
}

const CATEGORY_TABS = [
  { id: "all", label: "All Rooms", icon: "🌐" },
  { id: "hobby-guitar", label: "Electric Guitar", icon: "🎸" },
  { id: "hobby-coffee", label: "Specialty Coffee", icon: "☕" },
  { id: "hobby-photo", label: "Street Photography", icon: "📷" },
  { id: "hobby-pottery", label: "Ceramic Pottery", icon: "🏺" },
  { id: "hobby-digital-art", label: "Digital Art", icon: "🎨" },
  { id: "hobby-woodwork", label: "Japanese Joinery", icon: "🪵" },
];

export function RoomFilters({
  filters,
  onFilterChange,
  totalRoomsCount,
  activeRoomsCount,
}: RoomFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Search Bar & Live Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search rooms, gear, topics or tags (e.g. V60, Tube Amp, Leica)..."
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl shadow-2xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full h-5 w-5 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Live Active Now Pill Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() =>
              onFilterChange({ ...filters, onlyActiveNow: !filters.onlyActiveNow })
            }
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all shadow-2xs select-none",
              filters.onlyActiveNow
                ? "bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-500/20"
                : "bg-white border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  filters.onlyActiveNow ? "bg-emerald-500" : "bg-slate-400"
                )}
              />
              <span
                className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  filters.onlyActiveNow ? "bg-emerald-500" : "bg-slate-400"
                )}
              />
            </span>
            <span>Active Now</span>
            <span
              className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                filters.onlyActiveNow
                  ? "bg-emerald-200/60 text-emerald-800"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {activeRoomsCount}
            </span>
          </button>

          {/* Sort Menu */}
          <div className="flex items-center bg-white border border-slate-200/90 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, sortBy: "recommended" })}
              className={cn(
                "px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all",
                filters.sortBy === "recommended"
                  ? "bg-primary-50 text-primary-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              )}
              title="Matched with your interests"
            >
              Recommended
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, sortBy: "active" })}
              className={cn(
                "px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all",
                filters.sortBy === "active"
                  ? "bg-primary-50 text-primary-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              )}
              title="Most live online participants"
            >
              Active
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills (Horizontally Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = filters.category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, category: tab.id })}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 border select-none",
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
