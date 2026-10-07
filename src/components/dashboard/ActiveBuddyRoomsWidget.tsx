"use client";

import * as React from "react";
import Link from "next/link";
import { Users2, Radio, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { buddyRooms } from "@/lib/dummyData/buddyRooms";

export function ActiveBuddyRoomsWidget() {
  const activeRooms = buddyRooms.slice(0, 3);

  return (
    <Card variant="default" className="border-slate-200/80 bg-white">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Live Buddy Rooms
            </CardTitle>
            <Badge variant="live" size="sm" dot={true}>
              Active Now
            </Badge>
          </div>
          <CardDescription className="text-xs text-slate-500 mt-0.5">
            Hang out, share practice clips & jam with peers in real-time
          </CardDescription>
        </div>

        <Link
          href="/buddy-rooms"
          className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {activeRooms.map((room) => {
          return (
            <Link
              key={room.id}
              href="/buddy-rooms"
              className="block p-3 rounded-xl border border-slate-150 hover:border-teal-300 bg-slate-50/50 hover:bg-teal-50/20 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative h-11 w-11 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-slate-200">
                    <img
                      src={room.coverImage}
                      alt={room.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                        {room.name}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      <span className="font-semibold text-slate-700">{room.hobbyName.split("&")[0].trim()}:</span>{" "}
                      {room.lastMessageSnippet}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700 border border-emerald-200/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span>{room.onlineCount} online</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">
                    {room.lastMessageTime}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        <div className="pt-1">
          <Link href="/buddy-rooms" className="block w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center text-xs font-bold text-teal-700 hover:bg-teal-50 border-teal-200"
              leftIcon={<Users2 className="h-3.5 w-3.5" />}
            >
              Enter Community Lounges
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
