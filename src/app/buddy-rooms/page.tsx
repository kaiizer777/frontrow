"use client";

import * as React from "react";
import { AppShell } from "@/components/shared/AppShell";
import { RoomListSidebar, ChatRoomView } from "@/components/buddy-rooms";
import { buddyRooms } from "@/lib/dummyData/buddyRooms";
import { cn } from "@/lib/utils";

export default function BuddyRoomsPage() {
  const [activeRoomId, setActiveRoomId] = React.useState<string>(
    buddyRooms[0]?.id || "room-vintage-tone"
  );
  const [mobileView, setMobileView] = React.useState<"list" | "chat">("list");

  const activeRoom =
    buddyRooms.find((r) => r.id === activeRoomId) || buddyRooms[0];

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setMobileView("chat");
  };

  return (
    <AppShell
      fluid
      containerClassName="w-full h-full flex-1 flex flex-col p-2 sm:p-3.5 lg:p-4 overflow-hidden"
    >
      {/* Studio Workspace Shell */}
      <div className="flex-1 flex h-full min-h-0 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Left Column: Room Channel Sidebar (Hidden on mobile when chat is active) */}
        <div
          className={cn(
            "w-full md:w-72 lg:w-80 shrink-0 h-full flex flex-col border-r border-slate-200/80 bg-slate-50/50 transition-all",
            mobileView === "chat" ? "hidden md:flex" : "flex"
          )}
        >
          <RoomListSidebar
            rooms={buddyRooms}
            activeRoomId={activeRoomId}
            onSelectRoom={handleSelectRoom}
          />
        </div>

        {/* Center & Right Column: Interactive Chat Stream & Members Panel */}
        <div
          className={cn(
            "flex-1 h-full flex flex-col min-w-0 transition-all",
            mobileView === "list" ? "hidden md:flex" : "flex"
          )}
        >
          {activeRoom ? (
            <ChatRoomView
              room={activeRoom}
              onBackToRooms={() => setMobileView("list")}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              Select a room to join the conversation.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
