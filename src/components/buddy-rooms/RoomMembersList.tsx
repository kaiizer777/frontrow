"use client";

import * as React from "react";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  Sparkles,
  Users2,
  ExternalLink,
  Share2,
  Check,
  X,
} from "lucide-react";
import { BuddyRoom, RoomMember } from "@/lib/dummyData/types";
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
        "flex flex-col h-full bg-slate-50/60 border-l border-slate-200/80 w-64 lg:w-72 shrink-0 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Users2 className="h-4 w-4 text-slate-500" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
            Circle Members ({room.members.length})
          </h3>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Members Scroll Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-6">
        {/* Mentors Section */}
        {mentors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Crown className="h-3.5 w-3.5 text-amber-600" />
                Verified Mentors
              </span>
              <span className="text-[10px] bg-amber-100/80 px-1.5 py-0.2 rounded-full">
                {mentors.length}
              </span>
            </div>

            <div className="space-y-2">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50/70 to-white border border-amber-200/70 shadow-2xs space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Avatar
                        src={mentor.avatar}
                        alt={mentor.name}
                        fallback={mentor.name}
                        size="md"
                        className="border-2 border-amber-300"
                      />
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white",
                          mentor.status === "online"
                            ? "bg-emerald-500"
                            : mentor.status === "idle"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {mentor.name}
                        </span>
                        <Crown className="h-3 w-3 text-amber-600 shrink-0" />
                      </div>
                      <span className="text-[10px] font-semibold text-amber-700 truncate block">
                        {mentor.specialty || "Master Instructor"}
                      </span>
                    </div>
                  </div>

                  <Link href="/subscription" className="block">
                    <Button
                      variant="outline"
                      size="xs"
                      className="w-full text-[11px] font-bold justify-between bg-white hover:bg-amber-50 border-amber-300 text-amber-900 shadow-2xs"
                    >
                      <span>Book 1-on-1 Session</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moderators Section */}
        {mods.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-teal-800 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                Moderators
              </span>
              <span className="text-[10px] bg-teal-100/80 px-1.5 py-0.2 rounded-full">
                {mods.length}
              </span>
            </div>

            <div className="space-y-1.5">
              {mods.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/70 shadow-2xs"
                >
                  <div className="relative">
                    <Avatar
                      src={mod.avatar}
                      alt={mod.name}
                      fallback={mod.name}
                      size="sm"
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-2 w-2 rounded-full ring-2 ring-white",
                        mod.status === "online" ? "bg-emerald-500" : "bg-slate-400"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-800 truncate block">
                      {mod.name}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium truncate block">
                      {mod.specialty || "Community Mod"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Circle Members Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Members & Peers</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded-full text-slate-700">
              {members.length}
            </span>
          </div>

          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white hover:border-slate-200 border border-transparent transition-all"
              >
                <div className="relative">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    fallback={member.name}
                    size="sm"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-2 w-2 rounded-full ring-2 ring-white",
                      member.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-slate-800 truncate block">
                    {member.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate block">
                    {member.specialty || "Hobby Learner"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Circle Member CTA */}
      <div className="p-3.5 border-t border-slate-200/80 bg-white">
        <button
          type="button"
          onClick={handleCopyInvite}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 transition-all cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">Room Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5 text-slate-600" />
              <span>Share Room Invite</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
