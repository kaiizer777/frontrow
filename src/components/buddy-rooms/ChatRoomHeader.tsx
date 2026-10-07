"use client";

import * as React from "react";
import {
  ChevronLeft,
  Radio,
  Pin,
  Users2,
  Info,
  Sparkles,
  Share2,
  MoreVertical,
  Volume2,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    <div className="bg-white border-b border-slate-200/80 shadow-2xs shrink-0">
      {/* Top Navbar Row */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
        {/* Left: Back Button (Mobile) & Room Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {onBackToRooms && (
            <button
              type="button"
              onClick={onBackToRooms}
              className="lg:hidden p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Back to room list"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-display truncate">
                {room.name}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {room.onlineCount} online
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
              {room.description}
            </p>
          </div>
        </div>

        {/* Right: Actions (Live Audio Jam CTA + Members Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Join Live Audio Jam Button */}
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenLiveJam}
            className="rounded-xl px-2.5 sm:px-3.5 py-1.5 text-xs font-bold gap-1.5 shadow-sm bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 transition-all cursor-pointer"
          >
            <Radio className="h-3.5 w-3.5 animate-pulse text-primary-200" />
            <span className="hidden sm:inline">Join Live Audio Jam</span>
            <span className="sm:hidden">Live Jam</span>
            <span className="hidden md:inline-flex px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
              ON AIR
            </span>
          </Button>

          {/* Toggle Members Drawer / Panel Button */}
          <button
            type="button"
            onClick={onToggleMembers}
            className={cn(
              "flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
              isMembersOpen
                ? "bg-slate-100 text-slate-900 border-slate-300 shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            )}
            title="Toggle circle members panel"
          >
            <Users2 className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Members</span>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded-full">
              {room.members.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pinned Weekly Challenge / Announcement Banner */}
      {room.pinnedAnnouncement && showPinned && (
        <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 border-t border-amber-200/60 px-3.5 sm:px-4 py-2 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-5 w-5 rounded-md bg-amber-200/70 text-amber-800 flex items-center justify-center shrink-0">
              <Pin className="h-3 w-3" />
            </div>
            <span className="font-semibold truncate">
              {room.pinnedAnnouncement}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPinned(false)}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-950 shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
