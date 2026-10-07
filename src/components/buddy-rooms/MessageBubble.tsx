"use client";

import * as React from "react";
import {
  Play,
  Pause,
  Volume2,
  Crown,
  ShieldCheck,
  Sparkles,
  Plus,
  Smile,
  Check,
} from "lucide-react";
import { ChatMessage } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
  onToggleReaction: (messageId: string, emoji: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const QUICK_EMOJIS = ["🔥", "🎸", "☕", "👏", "💡", "✨", "❤️", "📸"];

export function MessageBubble({
  message,
  onToggleReaction,
  onAddReaction,
}: MessageBubbleProps) {
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const isCurrentUser = message.sender.isCurrentUser || message.sender.id === "user-saif";

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowEmojiMenu(false);
      }
    }
    if (showEmojiMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiMenu]);

  // Audio simulation timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio]);

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl transition-colors",
        isCurrentUser
          ? "bg-primary-50/40 border border-primary-100/60"
          : "hover:bg-slate-50/80 border border-transparent"
      )}
    >
      {/* Sender Avatar */}
      <div className="shrink-0 mt-0.5">
        <Avatar
          src={message.sender.avatar}
          alt={message.sender.name}
          fallback={message.sender.name}
          size="md"
          className="border border-slate-200 shadow-2xs"
        />
      </div>

      {/* Message Content Container */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Author Info & Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-xs sm:text-sm font-bold",
              isCurrentUser ? "text-primary-900" : "text-slate-900"
            )}
          >
            {message.sender.name}
          </span>

          {/* Role Badges */}
          {message.sender.badge && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs",
                message.sender.badge.toLowerCase().includes("mentor") ||
                  message.sender.badge.toLowerCase().includes("master")
                  ? "bg-amber-50 text-amber-800 border-amber-300"
                  : "bg-teal-50 text-teal-800 border-teal-300"
              )}
            >
              {message.sender.badge.toLowerCase().includes("mentor") ||
              message.sender.badge.toLowerCase().includes("master") ? (
                <Crown className="h-3 w-3 text-amber-600" />
              ) : (
                <ShieldCheck className="h-3 w-3 text-teal-600" />
              )}
              {message.sender.badge}
            </span>
          )}

          {isCurrentUser && (
            <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary-100 text-primary-800 border border-primary-200">
              You
            </span>
          )}

          {/* Timestamp */}
          <span className="text-[11px] text-slate-400 font-medium">
            {message.timestamp}
          </span>
        </div>

        {/* Message Text Body */}
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed break-words">
          {message.content}
        </p>

        {/* Optional Audio or Image Attachment Simulation */}
        {message.attachment && (
          <div className="pt-1">
            {message.attachment.type === "audio" ? (
              <div className="flex items-center gap-3 p-3 bg-white border border-slate-200/90 rounded-2xl shadow-2xs max-w-sm">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="h-9 w-9 rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-all"
                >
                  {isPlayingAudio ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span className="truncate">{message.attachment.title || "Audio Riff Demo"}</span>
                    <span className="text-slate-400 font-mono text-[10px]">0:42</span>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-0.5 h-4">
                    {[40, 70, 90, 30, 80, 100, 60, 45, 85, 95, 50, 70, 30, 90, 100, 60, 40, 80, 50, 75].map(
                      (height, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-1 rounded-full transition-all duration-300",
                            isPlayingAudio && i % 3 === 0
                              ? "bg-primary-600 animate-pulse"
                              : "bg-slate-300"
                          )}
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : message.attachment.type === "image" ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={message.attachment.url}
                  alt={message.attachment.title || "Shared work"}
                  className="w-full h-auto object-cover max-h-48"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Clickable Reactions Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {message.reactions &&
            message.reactions.map((rx) => (
              <button
                key={rx.emoji}
                type="button"
                onClick={() => onToggleReaction(message.id, rx.emoji)}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none",
                  rx.userReacted
                    ? "bg-primary-50 border-primary-300 text-primary-800 shadow-2xs"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
                title="Click to react"
              >
                <span>{rx.emoji}</span>
                <span className="text-[11px] font-bold">{rx.count}</span>
              </button>
            ))}

          {/* Add Reaction Button & Popover Menu */}
          <div className="relative inline-block" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowEmojiMenu(!showEmojiMenu)}
              className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Add reaction"
            >
              <Smile className="h-3.5 w-3.5" />
            </button>

            {showEmojiMenu && (
              <div className="absolute left-0 bottom-full mb-1 z-30 bg-white border border-slate-200 rounded-2xl shadow-lg p-1.5 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-100">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onAddReaction(message.id, emoji);
                      setShowEmojiMenu(false);
                    }}
                    className="h-7 w-7 rounded-xl hover:bg-slate-100 flex items-center justify-center text-sm transition-transform hover:scale-125 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
