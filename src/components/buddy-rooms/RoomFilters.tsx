"use client";

import * as React from "react";
import { Search, Radio, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { id: "all", label: "All", icon: "🌐" },
  { id: "hobby-guitar", label: "Guitar", icon: "🎸" },
  { id: "hobby-coffee", label: "Coffee", icon: "☕" },
  { id: "hobby-photo", label: "Photo", icon: "📷" },
  { id: "hobby-pottery", label: "Pottery", icon: "🏺" },
  { id: "hobby-digital-art", label: "Art", icon: "🎨" },
  { id: "hobby-woodwork", label: "Wood", icon: "🪵" },
];

export function RoomFilters({
  filters,
  onFilterChange,
  totalRoomsCount,
  activeRoomsCount,
}: RoomFiltersProps) {
  return (
    <div className="space-y-2">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter rooms or gear..."
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
          className="w-full pl-8.5 pr-7 py-1.5 text-xs bg-white border border-slate-200/90 rounded-lg shadow-2xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full h-4 w-4 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Pills (Compact horizontal scroll) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none -mx-0.5 px-0.5">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = filters.category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange({ ...filters, category: tab.id })}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 border select-none",
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100/80 hover:text-slate-900"
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
