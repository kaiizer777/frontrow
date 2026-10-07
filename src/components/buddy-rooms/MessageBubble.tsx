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
        "group relative flex items-start gap-2.5 p-2 rounded-xl transition-colors",
        isCurrentUser
          ? "bg-primary-50/40 border border-primary-100/50"
          : "hover:bg-slate-50/70 border border-transparent"
      )}
    >
      {/* Sender Avatar */}
      <div className="shrink-0 mt-0.5">
        <Avatar
          src={message.sender.avatar}
          alt={message.sender.name}
          fallback={message.sender.name}
          size="sm"
          className="border border-slate-200 shadow-2xs"
        />
      </div>

      {/* Message Content Container */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Author Info & Badges */}
        <div className="flex flex-wrap items-center gap-1.5 leading-none">
          <span
            className={cn(
              "text-xs font-bold",
              isCurrentUser ? "text-primary-900" : "text-slate-900"
            )}
          >
            {message.sender.name}
          </span>

          {/* Role Badges */}
          {message.sender.badge && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full border shadow-2xs",
                message.sender.badge.toLowerCase().includes("mentor") ||
                  message.sender.badge.toLowerCase().includes("master")
                  ? "bg-amber-50 text-amber-800 border-amber-300"
                  : "bg-teal-50 text-teal-800 border-teal-300"
              )}
            >
              {message.sender.badge.toLowerCase().includes("mentor") ||
              message.sender.badge.toLowerCase().includes("master") ? (
                <Crown className="h-2.5 w-2.5 text-amber-600" />
              ) : (
                <ShieldCheck className="h-2.5 w-2.5 text-teal-600" />
              )}
              {message.sender.badge}
            </span>
          )}

          {isCurrentUser && (
            <span className="inline-flex items-center text-[9px] font-bold px-1 py-0.2 rounded-full bg-primary-100 text-primary-800 border border-primary-200">
              You
            </span>
          )}

          {/* Timestamp */}
          <span className="text-[10px] text-slate-400 font-medium">
            {message.timestamp}
          </span>
        </div>

        {/* Message Text Body */}
        <p className="text-xs text-slate-800 leading-relaxed break-words">
          {message.content}
        </p>

        {/* Audio / Media Attachment */}
        {message.attachment && (
          <div className="pt-0.5">
            {message.attachment.type === "audio" ? (
              <div className="flex items-center gap-2.5 p-2 bg-white border border-slate-200/90 rounded-xl shadow-2xs max-w-xs">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="h-7 w-7 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer"
                >
                  {isPlayingAudio ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3 ml-0.5" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700 mb-0.5">
                    <span className="truncate">{message.attachment.title || "Audio Demo"}</span>
                    <span className="text-slate-400 font-mono text-[9px]">0:42</span>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-0.5 h-3">
                    {[40, 70, 90, 30, 80, 100, 60, 45, 85, 95, 50, 70, 30, 90, 100, 60, 40, 80, 50, 75].map(
                      (height, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-0.5 rounded-full transition-all duration-300",
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
              <div className="rounded-lg overflow-hidden border border-slate-200 max-w-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={message.attachment.url}
                  alt={message.attachment.title || "Shared work"}
                  className="w-full h-auto object-cover max-h-36"
                />
              </div>
            ) : null}
          </div>
        )}

        {/* Clickable Reactions */}
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          {message.reactions &&
            message.reactions.map((rx) => (
              <button
                key={rx.emoji}
                type="button"
                onClick={() => onToggleReaction(message.id, rx.emoji)}
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer select-none",
                  rx.userReacted
                    ? "bg-primary-50 border-primary-300 text-primary-800 shadow-2xs"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
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
              className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Add reaction"
            >
              <Smile className="h-3 w-3" />
            </button>

            {showEmojiMenu && (
              <div className="absolute left-0 bottom-full mb-1 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 flex items-center gap-0.5 animate-in fade-in zoom-in-95 duration-100">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onAddReaction(message.id, emoji);
                      setShowEmojiMenu(false);
                    }}
                    className="h-6 w-6 rounded-lg hover:bg-slate-100 flex items-center justify-center text-xs transition-transform hover:scale-125 cursor-pointer"
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
