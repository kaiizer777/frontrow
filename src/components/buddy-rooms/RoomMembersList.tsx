"use client";

import * as React from "react";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  Users2,
  ExternalLink,
  Share2,
  Check,
  X,
} from "lucide-react";
import { BuddyRoom } from "@/lib/dummyData/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface RoomMembersListProps {
  room: BuddyRoom;
  onClose?: () => void;
  className?: string;
}

export function RoomMembersList({
  room,
  onClose,
  className,
}: RoomMembersListProps) {
  const [copiedLink, setCopiedLink] = React.useState(false);

  const mentors = room.members.filter((m) => m.role === "mentor");
  const mods = room.members.filter((m) => m.role === "mod");
  const members = room.members.filter((m) => m.role === "member" || !m.role);

  const handleCopyInvite = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-50/70 border-l border-slate-200/80 w-56 lg:w-64 shrink-0 select-none min-h-0",
        className
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-slate-200/80 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-1.5">
          <Users2 className="h-3.5 w-3.5 text-slate-500" />
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-display">
            Members ({room.members.length})
          </h3>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer touch-manipulation"
            aria-label="Close members panel"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Members Scroll Body */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-4 min-h-0 overscroll-y-contain [-webkit-overflow-scrolling:touch]">
        {/* Mentors Section */}
        {mentors.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 uppercase tracking-wider px-1">
              <span className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-600" />
                Verified Mentors
              </span>
              <span className="text-[9px] bg-amber-100/80 px-1 py-0.2 rounded-full">
                {mentors.length}
              </span>
            </div>

            <div className="space-y-1.5">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="p-2 rounded-xl bg-gradient-to-br from-amber-50/80 to-white border border-amber-200/70 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar
                        src={mentor.avatar}
                        alt={mentor.name}
                        fallback={mentor.name}
                        size="sm"
                        className="border border-amber-300"
                      />
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1.5 ring-white",
                          mentor.status === "online"
                            ? "bg-emerald-500"
                            : mentor.status === "idle"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {mentor.name}
                      </span>
                      <span className="text-[10px] font-medium text-amber-700 truncate block">
                        {mentor.specialty || "Instructor"}
                      </span>
                    </div>
                  </div>

                  <Link href="/subscription" className="block">
                    <Button
                      variant="outline"
                      size="xs"
                      className="w-full text-[10px] font-bold justify-between bg-white hover:bg-amber-50 border-amber-300 text-amber-900 py-1"
                    >
                      <span>Book 1-on-1</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moderators Section */}
        {mods.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-teal-800 uppercase tracking-wider px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-teal-600" />
                Moderators
              </span>
              <span className="text-[9px] bg-teal-100/80 px-1 py-0.2 rounded-full">
                {mods.length}
              </span>
            </div>

            <div className="space-y-1">
              {mods.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-slate-200/70 shadow-2xs"
                >
                  <div className="relative">
                    <Avatar
                      src={mod.avatar}
                      alt={mod.name}
                      fallback={mod.name}
                      size="xs"
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full ring-1 ring-white",
                        mod.status === "online" ? "bg-emerald-500" : "bg-slate-400"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-800 truncate block">
                      {mod.name}
                    </span>
                    <span className="text-[9px] text-teal-700 truncate block">
                      {mod.specialty || "Mod"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Members Section */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Members & Peers</span>
            <span className="text-[9px] bg-slate-200 px-1 py-0.2 rounded-full text-slate-700">
              {members.length}
            </span>
          </div>

          <div className="space-y-0.5">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white hover:border-slate-200 border border-transparent transition-all"
              >
                <div className="relative">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    fallback={member.name}
                    size="xs"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full ring-1 ring-white",
                      member.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-slate-700 truncate block">
                    {member.name}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate block">
                    {member.specialty || "Member"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Share CTA */}
      <div className="p-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] border-t border-slate-200/80 bg-white shrink-0">
        <button
          type="button"
          onClick={handleCopyInvite}
          className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 transition-all cursor-pointer touch-manipulation active:scale-98"
        >
          {copiedLink ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-700 text-[11px]">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3 w-3 text-slate-600" />
              <span className="text-[11px]">Invite Friends</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
