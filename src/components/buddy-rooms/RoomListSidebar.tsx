"use client";

import * as React from "react";
import {
  Guitar,
  Coffee,
  Camera,
  Sparkles,
  Palette,
  Hammer,
  Users2,
  Clock,
  Radio,
  Flame,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { currentUser } from "@/lib/dummyData/users";
import { cn } from "@/lib/utils";
import { RoomFilters, RoomFilterState } from "./RoomFilters";

interface RoomListSidebarProps {
  rooms: BuddyRoom[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  className?: string;
}

const ICON_MAP: Record<string, string> = {
  Guitar: "🎸",
  Coffee: "☕",
  Camera: "📷",
  Sparkles: "🏺",
  Palette: "🎨",
  Hammer: "🪵",
};

export function RoomListSidebar({
  rooms,
  activeRoomId,
  onSelectRoom,
  className,
}: RoomListSidebarProps) {
  const [filters, setFilters] = React.useState<RoomFilterState>({
    category: "all",
    searchQuery: "",
    onlyActiveNow: false,
    sortBy: "recommended",
  });

  const isInterestMatch = (room: BuddyRoom) => {
    return currentUser.interests.some(
      (interest) =>
        room.hobbyName.toLowerCase().includes(interest.toLowerCase()) ||
        room.name.toLowerCase().includes(interest.toLowerCase()) ||
        room.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase()))
    );
  };

  const filteredRooms = React.useMemo(() => {
    return rooms
      .filter((room) => {
        if (filters.category !== "all" && room.hobbyId !== filters.category) {
          return false;
        }
        if (filters.onlyActiveNow && room.onlineCount < 15) {
          return false;
        }
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          return (
            room.name.toLowerCase().includes(q) ||
            room.hobbyName.toLowerCase().includes(q) ||
            room.tags.some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        const aMatch = isInterestMatch(a) ? 1 : 0;
        const bMatch = isInterestMatch(b) ? 1 : 0;
        if (aMatch !== bMatch) return bMatch - aMatch;
        return b.onlineCount - a.onlineCount;
      });
  }, [rooms, filters]);

  return (
    <div className={cn("flex flex-col h-full select-none min-h-0", className)}>
      {/* Header & Filter Controls */}
      <div className="p-3 border-b border-slate-200/80 bg-white space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 font-display flex items-center gap-1.5 uppercase tracking-wider">
            <span>Buddy Jam Rooms</span>
            <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-1.5 py-0.2 rounded-full border border-primary-200/60">
              {filteredRooms.length}
            </span>
          </h2>
          <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Circles
          </span>
        </div>

        <RoomFilters
          filters={filters}
          onFilterChange={setFilters}
          totalRoomsCount={rooms.length}
          activeRoomsCount={rooms.filter((r) => r.onlineCount >= 15).length}
        />
      </div>

      {/* Rooms Scroll List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {filteredRooms.length === 0 ? (
          <div className="p-6 text-center space-y-1 text-slate-400 text-xs">
            <p className="font-semibold text-slate-600">No rooms match</p>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  category: "all",
                  searchQuery: "",
                  onlyActiveNow: false,
                  sortBy: "recommended",
                })
              }
              className="text-primary-600 underline text-xs font-semibold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredRooms.map((room) => {
            const isSelected = room.id === activeRoomId;
            const iconEmoji = ICON_MAP[room.icon] || "💬";
            const matchesUserHobby = isInterestMatch(room);

            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelectRoom(room.id)}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl transition-all relative border flex items-start gap-2.5 group cursor-pointer",
                  isSelected
                    ? "bg-white border-primary-300 ring-1 ring-primary-500/20 shadow-xs"
                    : "bg-transparent border-transparent hover:bg-white/80 hover:border-slate-200/80"
                )}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-primary-600 rounded-r-full" />
                )}

                {/* Emoji Icon Avatar */}
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-sm border shadow-2xs transition-colors",
                    isSelected
                      ? "bg-primary-50 text-primary-700 border-primary-200"
                      : "bg-white text-slate-700 border-slate-200/90 group-hover:border-slate-300"
                  )}
                >
                  {iconEmoji}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "text-xs font-bold truncate",
                        isSelected ? "text-primary-950" : "text-slate-800 group-hover:text-primary-600"
                      )}
                    >
                      {room.name}
                    </span>

                    {/* Online Count */}
                    <div className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{room.onlineCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
                    <span className="text-slate-500 font-medium truncate">
                      {room.hobbyName}
                    </span>
                    {matchesUserHobby && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded-full border border-amber-200/60 shrink-0">
                        <Flame className="h-2 w-2 text-amber-600" />
                        Match
                      </span>
                    )}
                  </div>

                  {/* Last Message Preview */}
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 italic">
                    {room.lastMessageSnippet}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
