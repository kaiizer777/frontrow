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
  Sparkle,
  Radio,
  ChevronRight,
  Flame,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { currentUser } from "@/lib/dummyData/users";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { RoomFilters, RoomFilterState } from "./RoomFilters";

interface RoomListSidebarProps {
  rooms: BuddyRoom[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Guitar: Guitar,
  Coffee: Coffee,
  Camera: Camera,
  Sparkles: Sparkles,
  Palette: Palette,
  Hammer: Hammer,
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

  // Calculate matching interests with current user
  const isInterestMatch = (room: BuddyRoom) => {
    return currentUser.interests.some(
      (interest) =>
        room.hobbyName.toLowerCase().includes(interest.toLowerCase()) ||
        room.name.toLowerCase().includes(interest.toLowerCase()) ||
        room.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase()))
    );
  };

  // Filter and sort rooms
  const filteredRooms = React.useMemo(() => {
    return rooms
      .filter((room) => {
        // Category filter
        if (filters.category !== "all" && room.hobbyId !== filters.category) {
          return false;
        }

        // Live active now filter (e.g., > 15 online)
        if (filters.onlyActiveNow && room.onlineCount < 15) {
          return false;
        }

        // Search query filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = room.name.toLowerCase().includes(q);
          const matchesHobby = room.hobbyName.toLowerCase().includes(q);
          const matchesTags = room.tags.some((t) => t.toLowerCase().includes(q));
          const matchesDesc = room.description.toLowerCase().includes(q);
          return matchesName || matchesHobby || matchesTags || matchesDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "active") {
          return b.onlineCount - a.onlineCount;
        }
        if (filters.sortBy === "members") {
          return b.memberCount - a.memberCount;
        }
        // "recommended": prioritize user's interest matches first, then online count
        const aMatch = isInterestMatch(a) ? 1 : 0;
        const bMatch = isInterestMatch(b) ? 1 : 0;
        if (aMatch !== bMatch) return bMatch - aMatch;
        return b.onlineCount - a.onlineCount;
      });
  }, [rooms, filters]);

  const activeRoomsCount = rooms.filter((r) => r.onlineCount >= 15).length;

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-slate-200/80 select-none",
        className
      )}
    >
      {/* Header & Filter Controls */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 space-y-3 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <span>Hobby Jam Rooms</span>
              <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200/50">
                {filteredRooms.length} of {rooms.length}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live peer studios, audio jams & feedback circles
            </p>
          </div>
        </div>

        <RoomFilters
          filters={filters}
          onFilterChange={setFilters}
          totalRoomsCount={rooms.length}
          activeRoomsCount={activeRoomsCount}
        />
      </div>

      {/* Rooms Scroll List */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 divide-y divide-transparent">
        {filteredRooms.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <div className="text-2xl">🔍</div>
            <p className="text-xs font-semibold text-slate-700">No rooms found</p>
            <p className="text-[11px] text-slate-400">
              Try adjusting your search query or hobby filters.
            </p>
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
              className="text-xs font-bold text-primary-600 hover:text-primary-700 underline mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRooms.map((room) => {
            const isSelected = room.id === activeRoomId;
            const IconComponent = ICON_MAP[room.icon] || Users2;
            const matchesUserHobby = isInterestMatch(room);

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={cn(
                  "group relative p-3 rounded-xl border transition-all cursor-pointer text-left",
                  isSelected
                    ? "bg-primary-50/70 border-primary-300 ring-2 ring-primary-500/20 shadow-xs"
                    : "bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                )}
              >
                {/* Active selection bar indicator on left */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary-600 rounded-r-full" />
                )}

                <div className="flex items-start gap-3 pl-1">
                  {/* Hobby Icon / Room Avatar */}
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors shadow-2xs",
                      isSelected
                        ? "bg-primary-600 text-white border-primary-600 shadow-primary-500/20"
                        : "bg-slate-50 text-slate-700 border-slate-200 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-200"
                    )}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Room Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    {/* Top Row: Title & Online count */}
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={cn(
                          "text-xs font-bold truncate",
                          isSelected ? "text-primary-950" : "text-slate-900 group-hover:text-primary-600"
                        )}
                      >
                        {room.name}
                      </h3>

                      {/* Live Online Badge */}
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700">
                          {room.onlineCount}
                        </span>
                      </div>
                    </div>

                    {/* Second Row: Hobby Name + Similar Match Tag */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="font-semibold text-slate-500">
                        {room.hobbyName}
                      </span>
                      {matchesUserHobby && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full font-bold bg-amber-100/80 text-amber-800 border border-amber-200/60">
                          <Flame className="h-2.5 w-2.5 text-amber-600" />
                          Interest Match
                        </span>
                      )}
                    </div>

                    {/* Third Row: Last message snippet */}
                    <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                      &ldquo;{room.lastMessageSnippet}&rdquo;
                    </p>

                    {/* Bottom Metadata: Member count + Last message timestamp */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-500">
                        <Users2 className="h-3 w-3" />
                        {room.memberCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {room.lastMessageTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
