"use client";

import * as React from "react";
import { Hash, Pin, Sparkles } from "lucide-react";
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
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-0">
      {/* Compact Room Introduction */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-xs">
            #
          </div>
          <h3 className="text-xs font-bold text-slate-900 font-display">
            Welcome to #{room.name}
          </h3>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          The official circle for {room.hobbyName}. Share practice clips, tone recipes, and ask questions!
        </p>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold text-slate-600 bg-white border border-slate-200 px-1.5 py-0.2 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Date Divider */}
      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200/70" />
        </div>
        <span className="relative bg-white px-2.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-full border border-slate-200 shadow-2xs">
          Today
        </span>
      </div>

      {/* Messages Stream */}
      <div className="space-y-2.5">
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
      <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-400 font-medium select-none">
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
