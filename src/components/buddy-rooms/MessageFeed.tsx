"use client";

import * as React from "react";
import { Sparkles, Hash, Pin, MessageSquare } from "lucide-react";
import { ChatMessage, BuddyRoom } from "@/lib/dummyData/types";
import { MessageBubble } from "./MessageBubble";
import { cn } from "@/lib/utils";

interface MessageFeedProps {
  room: BuddyRoom;
  messages: ChatMessage[];
  onToggleReaction: (messageId: string, emoji: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

export function MessageFeed({
  room,
  messages,
  onToggleReaction,
  onAddReaction,
}: MessageFeedProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
      {/* Sleek Room Introduction Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-primary-50/20 to-white border border-slate-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            #
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Welcome to #{room.name}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The official circle for {room.hobbyName}. Share your practice clips, ask gear & technique questions, and collaborate with mentors in real-time.
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200/80 px-2 py-0.5 rounded-lg shadow-2xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Date Divider */}
      <div className="relative flex items-center justify-center my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/70" />
        </div>
        <span className="relative bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 rounded-full border border-slate-200 shadow-2xs">
          Today
        </span>
      </div>

      {/* Messages Stream */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onToggleReaction={onToggleReaction}
            onAddReaction={onAddReaction}
          />
        ))}
      </div>

      {/* Typing Indicator */}
      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-medium select-none">
        <div className="flex items-center gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
          <span
            className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span>{room.members[0]?.name || "Alex Rivera"} is typing...</span>
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
