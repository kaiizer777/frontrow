"use client";

import * as React from "react";
import { BuddyRoom, ChatMessage } from "@/lib/dummyData/types";
import { currentUser } from "@/lib/dummyData/users";
import { initialRoomMessages } from "@/lib/dummyData/messages";
import { ChatRoomHeader } from "./ChatRoomHeader";
import { MessageFeed } from "./MessageFeed";
import { ChatInput } from "./ChatInput";
import { RoomMembersList } from "./RoomMembersList";
import { LiveAudioJamModal } from "./LiveAudioJamModal";
import { cn } from "@/lib/utils";

interface ChatRoomViewProps {
  room: BuddyRoom;
  onBackToRooms?: () => void;
  className?: string;
}

export function ChatRoomView({
  room,
  onBackToRooms,
  className,
}: ChatRoomViewProps) {
  // Store all messages per room in local state for interactive sending & reactions
  const [roomMessagesMap, setRoomMessagesMap] = React.useState<
    Record<string, ChatMessage[]>
  >(initialRoomMessages);

  const [isMembersOpen, setIsMembersOpen] = React.useState(true);
  const [isLiveJamOpen, setIsLiveJamOpen] = React.useState(false);

  // Active messages for current room
  const activeMessages = roomMessagesMap[room.id] || [
    {
      id: `welcome-${room.id}`,
      roomId: room.id,
      sender: {
        id: "inst-system",
        name: "Circle Bot",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        badge: "System",
      },
      content: `Welcome to #${room.name}! Start a conversation or share what you're working on today.`,
      timestamp: "Just now",
      reactions: [{ emoji: "👋", count: 3, userReacted: false }],
    },
  ];

  // Send message handler
  const handleSendMessage = (
    content: string,
    attachment?: { type: "image" | "audio" | "link"; url: string; title?: string }
  ) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: room.id,
      sender: {
        id: currentUser.id,
        name: "Saif B. (You)",
        avatar: currentUser.avatar,
        isCurrentUser: true,
      },
      content,
      timestamp: "Just now",
      reactions: [],
      attachment,
    };

    setRoomMessagesMap((prev) => ({
      ...prev,
      [room.id]: [...(prev[room.id] || []), newMessage],
    }));
  };

  // Toggle reaction handler
  const handleToggleReaction = (messageId: string, emoji: string) => {
    setRoomMessagesMap((prev) => {
      const roomMsgs = prev[room.id] || [];
      const updated = roomMsgs.map((msg) => {
        if (msg.id !== messageId) return msg;

        const currentReactions = msg.reactions || [];
        const existingRx = currentReactions.find((r) => r.emoji === emoji);

        let newReactions;
        if (existingRx) {
          if (existingRx.userReacted) {
            // Remove user reaction
            if (existingRx.count <= 1) {
              newReactions = currentReactions.filter((r) => r.emoji !== emoji);
            } else {
              newReactions = currentReactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count - 1, userReacted: false }
                  : r
              );
            }
          } else {
            // Add user reaction
            newReactions = currentReactions.map((r) =>
              r.emoji === emoji
                ? { ...r, count: r.count + 1, userReacted: true }
                : r
            );
          }
        } else {
          // New reaction
          newReactions = [
            ...currentReactions,
            { emoji, count: 1, userReacted: true },
          ];
        }

        return { ...msg, reactions: newReactions };
      });

      return { ...prev, [room.id]: updated };
    });
  };

  // Add reaction from popover
  const handleAddReaction = (messageId: string, emoji: string) => {
    handleToggleReaction(messageId, emoji);
  };

  return (
    <div
      className={cn(
        "flex-1 flex flex-col md:flex-row h-full min-h-0 bg-white overflow-hidden relative",
        className
      )}
    >
      {/* Center Chat View Area (Header + Messages Feed + Input) */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <ChatRoomHeader
          room={room}
          onBackToRooms={onBackToRooms}
          onOpenLiveJam={() => setIsLiveJamOpen(true)}
          onToggleMembers={() => setIsMembersOpen(!isMembersOpen)}
          isMembersOpen={isMembersOpen}
        />

        <MessageFeed
          room={room}
          messages={activeMessages}
          onToggleReaction={handleToggleReaction}
          onAddReaction={handleAddReaction}
        />

        <ChatInput onSendMessage={handleSendMessage} roomName={room.name} />
      </div>

      {/* Desktop Members Panel */}
      {isMembersOpen && (
        <div className="hidden xl:block h-full shrink-0">
          <RoomMembersList
            room={room}
            onClose={() => setIsMembersOpen(false)}
          />
        </div>
      )}

      {/* Mobile/Tablet Members Drawer Backdrop & Panel */}
      {isMembersOpen && (
        <div className="xl:hidden">
          <div
            onClick={() => setIsMembersOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs"
            aria-hidden="true"
          />
          <div className="fixed top-0 bottom-0 right-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl animate-in slide-in-from-right duration-200">
            <RoomMembersList
              room={room}
              onClose={() => setIsMembersOpen(false)}
              className="w-full h-full border-l-0"
            />
          </div>
        </div>
      )}

      {/* Live Audio Jam Studio Modal */}
      <LiveAudioJamModal
        room={room}
        isOpen={isLiveJamOpen}
        onClose={() => setIsLiveJamOpen(false)}
      />
    </div>
  );
}
