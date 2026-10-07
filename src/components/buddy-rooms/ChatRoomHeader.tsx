"use client";

import * as React from "react";
import {
  ChevronLeft,
  Pin,
  Users2,
  Sparkles,
  Trophy,
  ArrowRight,
  X,
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
    <div className="bg-white border-b border-slate-200/80 shrink-0 z-10">
      {/* Top Main Room Header */}
      <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Left: Room Icon & Title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
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
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-50 to-amber-50/60 border border-primary-100 flex items-center justify-center text-lg shadow-2xs shrink-0 select-none">
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

            <p className="text-[11px] text-slate-500 truncate">
              {room.description}
            </p>
          </div>
        </div>

        {/* Right: Signature Warm-Gradient Live Audio Jam Button & Members Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live Audio Jam Studio Button — FRONTROW Warm Gradient Treatment */}
          <button
            type="button"
            onClick={onOpenLiveJam}
            className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 hover:from-primary-500 hover:to-amber-500 border-t border-t-amber-200/60 border-x border-x-primary-600/60 border-b border-b-primary-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_rgba(240,68,30,0.22)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_3px_8px_rgba(240,68,30,0.3)] active:translate-y-[0.5px] transition-all cursor-pointer select-none"
            title="Join Live Audio Jam Stage"
          >
            {/* Pulsing Live Audio Equalizer Wave Animation */}
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-full bg-white rounded-full animate-pulse" />
              <span
                className="w-0.5 h-2/3 bg-amber-100 rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-0.5 h-full bg-white rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
              <span
                className="w-0.5 h-1/2 bg-amber-100 rounded-full animate-pulse"
                style={{ animationDelay: "75ms" }}
              />
            </div>

            <span className="font-display tracking-tight text-white font-bold hidden xs:inline">
              Live Audio Jam
            </span>

            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-white text-[9px] font-black tracking-wider uppercase border border-white/30 backdrop-blur-xs">
              STAGE
            </span>
          </button>

          {/* Members Toggle */}
          <button
            type="button"
            onClick={onToggleMembers}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
              isMembersOpen
                ? "bg-slate-100 text-slate-900 border-slate-300 shadow-2xs font-bold"
                : "bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
            )}
            title="Toggle circle members panel"
          >
            <Users2 className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden lg:inline text-xs">Members</span>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-200/80 px-1.5 py-0.2 rounded-full">
              {room.members.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pinned Weekly Jam Challenge Alert Strip (Compact & Dismissible) */}
      {room.pinnedAnnouncement && showPinned && (
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border-t border-amber-200/60 px-3.5 py-1.5 sm:px-4 flex items-center justify-between gap-2.5 text-xs text-amber-950 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-4.5 w-4.5 rounded-md bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <Trophy className="h-2.5 w-2.5" />
            </span>
            <span className="font-semibold truncate text-[11px]">
              <strong className="font-bold text-amber-900 mr-1">Challenge:</strong>
              {room.pinnedAnnouncement}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenLiveJam}
              className="text-[10px] font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
            >
              <span>Jam Stage</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
            <span className="text-amber-300">•</span>
            <button
              type="button"
              onClick={() => setShowPinned(false)}
              className="text-[10px] font-medium text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
              title="Dismiss banner"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
