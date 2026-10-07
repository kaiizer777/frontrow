"use client";

import * as React from "react";
import { Sparkles, Hash, Users, Pin } from "lucide-react";
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

  // Auto scroll to bottom when new messages arrive
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
      {/* Welcome & Room Introduction Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-primary-50/20 to-white border border-slate-200/80 space-y-2 mb-6">
        <div className="h-10 w-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          #
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Welcome to #{room.name}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          This is the official circle for {room.hobbyName}. Share progress clips, ask gear & technique questions, collaborate with peers, and jam with mentors.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200/80 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Date Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
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

      {/* Real-Time Typing Simulation Indicator */}
      <div className="flex items-center gap-2 pt-2 px-3 text-[11px] text-slate-400 font-medium select-none">
        <div className="flex items-center gap-1">
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
