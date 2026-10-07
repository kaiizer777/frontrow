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
  // On mobile screens, toggle whether user is looking at room list or chat view
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
      containerClassName="w-full flex-1 flex flex-col p-2 sm:p-4 lg:p-6 min-h-0"
    >
      {/* Studio Workspace Container */}
      <div className="flex-1 flex flex-col h-[calc(100vh-5.5rem)] min-h-[580px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="flex-1 flex h-full min-h-0 relative">
          {/* Left Column: Room List & Category Filters (Hidden on mobile if in chat view) */}
          <div
            className={cn(
              "w-full lg:w-80 xl:w-96 shrink-0 h-full flex flex-col transition-all",
              mobileView === "chat" ? "hidden lg:flex" : "flex"
            )}
          >
            <RoomListSidebar
              rooms={buddyRooms}
              activeRoomId={activeRoomId}
              onSelectRoom={handleSelectRoom}
            />
          </div>

          {/* Right Column: Chat Room Studio & Members (Hidden on mobile if in list view) */}
          <div
            className={cn(
              "flex-1 h-full flex flex-col min-w-0 transition-all",
              mobileView === "list" ? "hidden lg:flex" : "flex"
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
      </div>
    </AppShell>
  );
}
