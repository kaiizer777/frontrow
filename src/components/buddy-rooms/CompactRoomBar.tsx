"use client";

import * as React from "react";
import {
  Search,
  SlidersHorizontal,
  Flame,
  Users2,
  ChevronDown,
  Sparkles,
  Radio,
  Check,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { currentUser } from "@/lib/dummyData/users";
import { cn } from "@/lib/utils";

interface CompactRoomBarProps {
  rooms: BuddyRoom[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  className?: string;
}

const CATEGORY_TABS = [
  { id: "all", label: "All Rooms" },
  { id: "hobby-guitar", label: "Guitar" },
  { id: "hobby-coffee", label: "Coffee" },
  { id: "hobby-photo", label: "Photo" },
  { id: "hobby-pottery", label: "Pottery" },
  { id: "hobby-digital-art", label: "Art" },
  { id: "hobby-woodwork", label: "Woodcraft" },
];

const ICON_MAP: Record<string, string> = {
  Guitar: "🎸",
  Coffee: "☕",
  Camera: "📷",
  Sparkles: "🏺",
  Palette: "🎨",
  Hammer: "🪵",
};

export function CompactRoomBar({
  rooms,
  activeRoomId,
  onSelectRoom,
  className,
}: CompactRoomBarProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);

  const isInterestMatch = (room: BuddyRoom) => {
    return currentUser.interests.some(
      (interest) =>
        room.hobbyName.toLowerCase().includes(interest.toLowerCase()) ||
        room.name.toLowerCase().includes(interest.toLowerCase()) ||
        room.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase()))
    );
  };

  const filteredRooms = React.useMemo(() => {
    return rooms.filter((room) => {
      if (selectedCategory !== "all" && room.hobbyId !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          room.name.toLowerCase().includes(q) ||
          room.hobbyName.toLowerCase().includes(q) ||
          room.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [rooms, selectedCategory, searchQuery]);

  return (
    <div className={cn("bg-white border-b border-slate-200/80 px-3 py-2 shrink-0 space-y-2 z-10", className)}>
      {/* Top Channel Pills Scroll Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Horizontal Room Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1 min-w-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden lg:inline shrink-0 select-none">
            Rooms:
          </span>

          {filteredRooms.map((room) => {
            const isSelected = room.id === activeRoomId;
            const emoji = ICON_MAP[room.icon] || "💬";
            const match = isInterestMatch(room);

            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelectRoom(room.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border cursor-pointer select-none",
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/10"
                    : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300"
                )}
              >
                <span className="text-sm">{emoji}</span>
                <span className="font-bold">{room.name}</span>

                {/* Online pulse count */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSelected ? "bg-emerald-400" : "bg-emerald-500"
                    )}
                  />
                  {room.onlineCount}
                </span>

                {match && !isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="Interest Match" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Filter & Search Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Category Filter Selector */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-0.5">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap",
                  selectedCategory === cat.id
                    ? "bg-white text-slate-900 font-bold shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Trigger */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl px-2 py-1 shadow-xs">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-24 text-xs bg-transparent focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Search rooms"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
