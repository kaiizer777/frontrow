"use client";

import * as React from "react";
import {
  Search,
  SlidersHorizontal,
  Flame,
  Radio,
  Sparkles,
  Layers,
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
  { id: "all", label: "All Rooms", icon: "🌐" },
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
        "bg-slate-50/70 border-b border-slate-200/80 px-3.5 py-2 shrink-0 space-y-2 select-none",
        className
      )}
    >
      {/* Category Pills & Search Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
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
                    ? "bg-white text-slate-900 shadow-2xs border border-slate-200 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                )}
              >
                <span className="text-xs">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative shrink-0 hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
          <input
            type="text"
            placeholder="Quick filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-32 lg:w-40 pl-7 pr-2 py-1 text-xs bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-primary-500 focus:w-48 transition-all"
          />
        </div>
      </div>

      {/* Room Tabs Horizontal List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
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
                "group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border cursor-pointer",
                isSelected
                  ? "bg-white text-slate-900 border-primary-400 ring-2 ring-primary-500/20 shadow-xs"
                  : "bg-white/70 text-slate-600 border-slate-200/90 hover:bg-white hover:text-slate-900 hover:border-slate-300 shadow-2xs"
              )}
            >
              <span className="text-sm select-none">{emoji}</span>
              <span className={cn("font-bold", isSelected && "text-slate-950")}>
                {room.name}
              </span>

              {/* Online pulse count badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                  isSelected
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {room.onlineCount}
              </span>

              {match && !isSelected && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="Interest Match" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
