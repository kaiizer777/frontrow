"use client";

import * as React from "react";
import { AppShell } from "@/components/shared/AppShell";
import { CompactRoomBar, ChatRoomView } from "@/components/buddy-rooms";
import { buddyRooms } from "@/lib/dummyData/buddyRooms";

export default function BuddyRoomsPage() {
  const [activeRoomId, setActiveRoomId] = React.useState<string>(
    buddyRooms[0]?.id || "room-vintage-tone"
  );

  const activeRoom =
    buddyRooms.find((r) => r.id === activeRoomId) || buddyRooms[0];

  return (
    <AppShell
      fluid
      containerClassName="w-full h-full flex-1 flex flex-col p-2 sm:p-3.5 lg:p-4 overflow-hidden"
    >
      {/* Studio Workspace Shell */}
      <div className="flex-1 flex flex-col h-full min-h-0 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Concise Top Channel Tabs & Filters Bar */}
        <CompactRoomBar
          rooms={buddyRooms}
          activeRoomId={activeRoomId}
          onSelectRoom={setActiveRoomId}
        />

        {/* Full Width Interactive Chat View & Members Panel */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          {activeRoom ? (
            <ChatRoomView room={activeRoom} />
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
