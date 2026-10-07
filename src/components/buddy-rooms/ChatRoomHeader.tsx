"use client";

import * as React from "react";
import {
  ChevronLeft,
  Radio,
  Pin,
  Users2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ChatRoomHeaderProps {
  room: BuddyRoom;
  onBackToRooms?: () => void;
  onOpenLiveJam: () => void;
  onToggleMembers: () => void;
  isMembersOpen: boolean;
}

export function ChatRoomHeader({
  room,
  onBackToRooms,
  onOpenLiveJam,
  onToggleMembers,
  isMembersOpen,
}: ChatRoomHeaderProps) {
  const [showPinned, setShowPinned] = React.useState(true);

  return (
    <div className="bg-white border-b border-slate-200/80 shrink-0 z-10">
      {/* Top Navbar Row */}
      <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-3">
        {/* Left: Identity */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {onBackToRooms && (
            <button
              type="button"
              onClick={onBackToRooms}
              className="md:hidden p-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Back to rooms"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 font-display truncate">
                #{room.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/60 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {room.onlineCount} online
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate mt-0.2">
              {room.description}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Join Live Audio Jam */}
          <button
            type="button"
            onClick={onOpenLiveJam}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white shadow-2xs transition-all cursor-pointer"
          >
            <Radio className="h-3.5 w-3.5 animate-pulse text-primary-200" />
            <span className="hidden sm:inline">Live Audio Jam</span>
            <span className="sm:hidden">Jam</span>
            <span className="hidden md:inline px-1 py-0.2 rounded-full bg-white/20 text-[9px] font-extrabold">
              LIVE
            </span>
          </button>

          {/* Members Toggle */}
          <button
            type="button"
            onClick={onToggleMembers}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
              isMembersOpen
                ? "bg-slate-100 text-slate-900 border-slate-300 shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            )}
            title="Toggle circle members"
          >
            <Users2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden lg:inline text-[11px]">Members</span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded-full">
              {room.members.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pinned Announcement Bar */}
      {room.pinnedAnnouncement && showPinned && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border-t border-amber-200/50 px-3.5 py-1.5 flex items-center justify-between gap-2 text-[11px] text-amber-900">
          <div className="flex items-center gap-1.5 min-w-0">
            <Pin className="h-3 w-3 text-amber-700 shrink-0" />
            <span className="font-medium truncate">
              {room.pinnedAnnouncement}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowPinned(false)}
            className="text-[10px] font-bold text-amber-700 hover:text-amber-950 shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
