"use client";

import * as React from "react";
import {
  Search,
  Flame,
  Radio,
  Sparkles,
  Layers,
  ChevronRight,
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

const CATEGORIES = [
  { id: "all", label: "All", icon: "🌐" },
  { id: "hobby-guitar", label: "Guitar", icon: "🎸" },
  { id: "hobby-coffee", label: "Coffee", icon: "☕" },
  { id: "hobby-photo", label: "Photo", icon: "📷" },
  { id: "hobby-pottery", label: "Pottery", icon: "🏺" },
  { id: "hobby-digital-art", label: "Art", icon: "🎨" },
  { id: "hobby-woodwork", label: "Wood", icon: "🪵" },
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
    <div
      className={cn(
        "bg-slate-50/80 border-b border-slate-200/80 px-3 py-2 shrink-0 select-none flex items-center justify-between gap-2.5 min-w-0",
        className
      )}
    >
      {/* Left & Middle: Category Switcher + Room Pills in a Single Seamless Scroll Strip */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none min-w-0 flex-1 py-0.5">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 shrink-0 bg-slate-200/60 p-0.5 rounded-xl">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                  isSelected
                    ? "bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/90"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                )}
                title={`Filter by ${cat.label}`}
              >
                <span className="text-xs">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subtle Vertical Divider */}
        <div className="w-px h-5 bg-slate-200 shrink-0 mx-0.5" aria-hidden="true" />

        {/* Horizontal Room Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
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
                  "group flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border cursor-pointer",
                  isSelected
                    ? "bg-white text-slate-950 border-primary-400 ring-2 ring-primary-500/20 shadow-xs font-bold"
                    : "bg-white/80 text-slate-600 border-slate-200/90 hover:bg-white hover:text-slate-900 hover:border-slate-300 shadow-2xs"
                )}
              >
                <span className="text-xs select-none">{emoji}</span>
                <span className={cn("text-xs", isSelected && "font-bold text-slate-900")}>
                  {room.name}
                </span>

                {/* Live pulse count badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                    isSelected
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {room.onlineCount}
                </span>

                {match && !isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" title="Interest Match" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Quick Search */}
      <div className="relative shrink-0 hidden md:block">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
        <input
          type="text"
          placeholder="Filter rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-28 lg:w-36 pl-7 pr-2 py-1 text-xs bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-primary-500 focus:w-44 transition-all shadow-2xs"
        />
      </div>
    </div>
  );
}
