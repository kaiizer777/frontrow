"use client";

import * as React from "react";
import {
  Mic,
  MicOff,
  Radio,
  Volume2,
  X,
  Sparkles,
  Headphones,
  Music,
  Share2,
  Users,
  Sliders,
} from "lucide-react";
import { BuddyRoom, RoomMember } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface LiveAudioJamModalProps {
  room: BuddyRoom;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveAudioJamModal({
  room,
  isOpen,
  onClose,
}: LiveAudioJamModalProps) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [activeSpeakerIdx, setActiveSpeakerIdx] = React.useState(0);

  // Cycle active speaker simulation
  React.useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveSpeakerIdx((prev) => (prev + 1) % Math.min(3, room.members.length));
    }, 3200);
    return () => clearInterval(interval);
  }, [isOpen, room.members.length]);

  if (!isOpen) return null;

  const speakers = room.members.slice(0, 3);
  const listeners = room.members.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 shadow-inner">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-display">
                  Live Jam Room
                </h3>
                <Badge variant="live" size="sm">
                  ON AIR
                </Badge>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{room.name}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stage Area */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          {/* Main Jam Stage Banner */}
          <div className="text-center space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary-400">
              Active Stage — Audio Feed
            </span>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
              Low-latency stereo audio feed with pedalboard & mic direct input
            </h4>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {speakers.map((member, idx) => {
              const isSpeaking = idx === activeSpeakerIdx;
              return (
                <div
                  key={member.id}
                  className={cn(
                    "relative p-2.5 sm:p-3.5 rounded-2xl flex flex-col items-center text-center transition-all",
                    isSpeaking
                      ? "bg-primary-950/40 border-2 border-primary-400 ring-2 sm:ring-4 ring-primary-500/20 shadow-lg shadow-primary-900/30"
                      : "bg-slate-800/60 border border-slate-700/50"
                  )}
                >
                  {/* Speaking Wave Glow */}
                  <div className="relative mb-1.5 sm:mb-2">
                    {isSpeaking && (
                      <span className="absolute -inset-2 rounded-full bg-primary-500/30 animate-ping pointer-events-none" />
                    )}
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      fallback={member.name}
                      size="md"
                      className="sm:size-lg border-2 border-slate-700"
                    />
                    {isSpeaking && (
                      <span className="absolute -bottom-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] sm:text-[10px] shadow-sm">
                        <Volume2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-100 truncate w-full">
                    {member.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium capitalize truncate w-full">
                    {member.specialty || member.role}
                  </span>

                  {/* Visualizer Wave Bar Simulation */}
                  {isSpeaking ? (
                    <div className="flex items-center gap-0.5 mt-1.5 sm:mt-2 h-2.5 sm:h-3">
                      <span className="w-1 bg-primary-400 h-full rounded-full animate-bounce" />
                      <span
                        className="w-1 bg-primary-400 h-2/3 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1 bg-primary-400 h-full rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                      <span
                        className="w-1 bg-primary-400 h-1/2 rounded-full animate-bounce"
                        style={{ animationDelay: "75ms" }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5 mt-1.5 sm:mt-2 h-2.5 sm:h-3 opacity-30">
                      <span className="w-1 bg-slate-500 h-1 rounded-full" />
                      <span className="w-1 bg-slate-500 h-1 rounded-full" />
                      <span className="w-1 bg-slate-500 h-1 rounded-full" />
                      <span className="w-1 bg-slate-500 h-1 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Listeners Section */}
          <div className="bg-slate-800/40 rounded-2xl p-3 sm:p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 truncate">
                <Headphones className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Audience ({room.onlineCount})</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-primary-400 font-bold shrink-0">
                HQ 320kbps Audio
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none touch-pan-x [-webkit-overflow-scrolling:touch]">
              {room.members.map((m) => (
                <div key={m.id} className="relative group shrink-0">
                  <Avatar
                    src={m.avatar}
                    alt={m.name}
                    fallback={m.name}
                    size="sm"
                    className="border border-slate-700"
                  />
                </div>
              ))}
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                +{room.onlineCount - room.members.length > 0 ? room.onlineCount - room.members.length : 12}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="p-3.5 sm:p-5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer touch-manipulation active:scale-95",
              isMuted
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            )}
          >
            {isMuted ? (
              <>
                <MicOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
                <span>Live Mic</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs py-1.5 px-2.5 sm:px-3 touch-manipulation"
            >
              Minimize
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onClose}
              className="text-xs py-1.5 px-2.5 sm:px-3 touch-manipulation"
            >
              Leave
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
