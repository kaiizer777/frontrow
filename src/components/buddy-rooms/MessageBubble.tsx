"use client";

import * as React from "react";
import {
  Play,
  Pause,
  Crown,
  ShieldCheck,
  Smile,
  Plus,
} from "lucide-react";
import { ChatMessage } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
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

  const isCurrentUser =
    message.sender.isCurrentUser || message.sender.id === "user-saif";

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
        "group relative flex items-start gap-2.5 sm:gap-3 p-2 sm:p-3 rounded-2xl transition-all shadow-2xs max-w-full overflow-hidden",
        isCurrentUser
          ? "bg-primary-50/50 border border-primary-100/80"
          : "bg-slate-50/60 hover:bg-slate-50/95 border border-slate-200/70 hover:border-slate-200"
      )}
    >
      {/* Sender Avatar */}
      <div className="shrink-0 mt-0.5">
        <Avatar
          src={message.sender.avatar}
          alt={message.sender.name}
          fallback={message.sender.name}
          size="sm"
          className="border border-slate-200/90 shadow-2xs ring-2 ring-white"
        />
      </div>

      {/* Message Content Container */}
      <div className="flex-1 min-w-0 space-y-1.5 overflow-hidden">
        {/* Author Info & Badges */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 leading-none">
          <span
            className={cn(
              "text-xs font-bold",
              isCurrentUser ? "text-primary-950" : "text-slate-900"
            )}
          >
            {message.sender.name}
          </span>

          {/* Role Badges */}
          {message.sender.badge && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border shadow-2xs",
                message.sender.badge.toLowerCase().includes("mentor") ||
                  message.sender.badge.toLowerCase().includes("master")
                  ? "bg-gradient-to-r from-amber-50 to-amber-100/90 text-amber-900 border-amber-300/80"
                  : "bg-teal-50 text-teal-800 border-teal-300/80"
              )}
            >
              {message.sender.badge.toLowerCase().includes("mentor") ||
              message.sender.badge.toLowerCase().includes("master") ? (
                <Crown className="h-2.5 w-2.5 text-amber-600 shrink-0" />
              ) : (
                <ShieldCheck className="h-2.5 w-2.5 text-teal-600 shrink-0" />
              )}
              <span>{message.sender.badge}</span>
            </span>
          )}

          {isCurrentUser && (
            <span className="inline-flex items-center text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary-100 text-primary-800 border border-primary-200/80">
              You
            </span>
          )}

          {/* Timestamp */}
          <span className="text-[10px] text-slate-400 font-medium ml-0.5">
            {message.timestamp}
          </span>
        </div>

        {/* Message Text Body */}
        <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed break-words font-normal">
          {message.content}
        </p>

        {/* Audio / Media Attachment */}
        {message.attachment && (
          <div className="pt-1 max-w-full">
            {message.attachment.type === "audio" ? (
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-white border border-slate-200/90 rounded-xl shadow-2xs w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer active:scale-95 touch-manipulation"
                  title={isPlayingAudio ? "Pause clip" : "Play audio snippet"}
                >
                  {isPlayingAudio ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5 ml-0.5" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1">
                    <span className="truncate">{message.attachment.title || "Audio Snippet"}</span>
                    <span className="text-slate-400 font-mono text-[10px] ml-1 shrink-0">0:42</span>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-0.5 h-3.5 overflow-hidden">
                    {[40, 70, 90, 30, 80, 100, 60, 45, 85, 95, 50, 70, 30, 90, 100, 60, 40, 80, 50, 75, 45, 85].map(
                      (height, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-0.5 rounded-full transition-all duration-200 shrink-0",
                            isPlayingAudio && i % 2 === 0
                              ? "bg-primary-500 animate-pulse"
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
              <div className="rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs w-full max-w-xs sm:max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={message.attachment.url}
                  alt={message.attachment.title || "Shared work"}
                  className="w-full h-auto object-cover max-h-40"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Clickable Reactions */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {message.reactions &&
            message.reactions.map((rx) => (
              <button
                key={rx.emoji}
                type="button"
                onClick={() => onToggleReaction(message.id, rx.emoji)}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none touch-manipulation active:scale-95",
                  rx.userReacted
                    ? "bg-primary-50 border-primary-300 text-primary-800 shadow-2xs ring-1 ring-primary-400/20"
                    : "bg-white border-slate-200/90 text-slate-600 hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                )}
                title="Click to react"
              >
                <span>{rx.emoji}</span>
                <span className="text-[10px] font-bold">{rx.count}</span>
              </button>
            ))}

          {/* Quick Reaction Popover */}
          <div className="relative inline-block" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowEmojiMenu(!showEmojiMenu)}
              className="inline-flex items-center justify-center h-5.5 w-5.5 rounded-full bg-white border border-slate-200/90 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer touch-manipulation active:scale-95"
              title="Add reaction"
            >
              <Smile className="h-3 w-3" />
            </button>

            {showEmojiMenu && (
              <div className="absolute left-0 bottom-full mb-1 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 sm:p-1.5 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-100 max-w-[calc(100vw-3.5rem)] overflow-x-auto scrollbar-none">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onAddReaction(message.id, emoji);
                      setShowEmojiMenu(false);
                    }}
                    className="h-6.5 w-6.5 rounded-lg hover:bg-slate-100 flex items-center justify-center text-sm transition-transform hover:scale-125 active:scale-125 cursor-pointer touch-manipulation shrink-0"
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
