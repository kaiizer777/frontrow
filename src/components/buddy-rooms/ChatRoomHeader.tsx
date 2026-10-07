"use client";

import * as React from "react";
import {
  ChevronLeft,
  Radio,
  Pin,
  Users2,
  Sparkles,
  Volume2,
  Share2,
  Guitar,
  Coffee,
  Camera,
  Palette,
  Hammer,
  ArrowRight,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { cn } from "@/lib/utils";

interface ChatRoomHeaderProps {
  room: BuddyRoom;
  onBackToRooms?: () => void;
  onOpenLiveJam: () => void;
  onToggleMembers: () => void;
  isMembersOpen: boolean;
}

const ICON_MAP: Record<string, string> = {
  Guitar: "🎸",
  Coffee: "☕",
  Camera: "📷",
  Sparkles: "🏺",
  Palette: "🎨",
  Hammer: "🪵",
};

export function ChatRoomHeader({
  room,
  onBackToRooms,
  onOpenLiveJam,
  onToggleMembers,
  isMembersOpen,
}: ChatRoomHeaderProps) {
  const [showPinned, setShowPinned] = React.useState(true);
  const emoji = ICON_MAP[room.icon] || "💬";

  return (
    <div className="bg-white border-b border-slate-200/80 shrink-0 z-10 space-y-0">
      {/* Top Main Room Header */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Left: Room Badge & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {onBackToRooms && (
            <button
              type="button"
              onClick={onBackToRooms}
              className="md:hidden p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Back to rooms"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Room Emoji Icon Badge */}
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200/90 flex items-center justify-center text-xl shadow-2xs shrink-0 select-none">
            {emoji}
          </div>

          {/* Room Title & Description */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-display truncate">
                {room.name}
              </h1>

              {/* Live Count Pill */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{room.onlineCount} online</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 truncate mt-0.5">
              {room.description}
            </p>
          </div>
        </div>

        {/* Right: High-End Live Audio Jam Button & Members Drawer Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Audio Jam Studio Button */}
          <button
            type="button"
            onClick={onOpenLiveJam}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all cursor-pointer ring-1 ring-slate-900/10 hover:shadow-md"
          >
            {/* Pulsing Live Audio Equalizer Wave Simulation */}
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-full bg-emerald-400 rounded-full animate-pulse" />
              <span
                className="w-0.5 h-2/3 bg-emerald-400 rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-0.5 h-full bg-emerald-400 rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
              <span
                className="w-0.5 h-1/2 bg-emerald-400 rounded-full animate-pulse"
                style={{ animationDelay: "75ms" }}
              />
            </div>

            <span className="font-display tracking-tight">Live Audio Jam</span>

            <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold tracking-wide border border-emerald-500/30">
              STAGE
            </span>
          </button>

          {/* Members Toggle */}
          <button
            type="button"
            onClick={onToggleMembers}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
              isMembersOpen
                ? "bg-slate-100 text-slate-900 border-slate-300 shadow-2xs font-bold"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            )}
            title="Toggle circle members panel"
          >
            <Users2 className="h-4 w-4 text-slate-500" />
            <span className="hidden lg:inline text-xs">Members</span>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-200/80 px-1.5 py-0.2 rounded-full">
              {room.members.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pinned Weekly Jam Challenge Banner */}
      {room.pinnedAnnouncement && showPinned && (
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border-t border-amber-200/60 px-4 py-2 sm:px-5 flex items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="h-5 w-5 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <Pin className="h-3 w-3" />
            </span>
            <span className="font-semibold truncate">
              {room.pinnedAnnouncement}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenLiveJam}
              className="text-[11px] font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Jam Stage</span>
              <ArrowRight className="h-3 w-3" />
            </button>
            <span className="text-amber-300">•</span>
            <button
              type="button"
              onClick={() => setShowPinned(false)}
              className="text-[11px] font-medium text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
