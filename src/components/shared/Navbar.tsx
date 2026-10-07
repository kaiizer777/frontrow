"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Flame,
  Menu,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { FrontrowLogo } from "./FrontrowLogo";

export function Navbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 md:pl-64 transition-all shrink-0">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        {/* Mobile Left: Brand Logo */}
        <div className="flex items-center md:hidden">
          <Link href="/" className="block">
            <FrontrowLogo size="sm" />
          </Link>
        </div>

        {/* Desktop Left: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hobbies, mentors, buddy rooms... (Press ⌘K)"
              className="w-full h-9 pl-9 pr-12 rounded-lg bg-slate-50 border border-slate-200 text-base sm:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
              readOnly
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Streak, Notification Bell, User Profile & Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-2xs">
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>14 Day Streak</span>
          </div>

          {/* Notifications (hidden on mobile phone view) */}
          <button
            type="button"
            className="hidden md:flex relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white" />
          </button>

          {/* Profile Snapshot */}
          <Link
            href="/"
            className="flex items-center gap-2.5 pl-2 py-1 pr-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
          >
            <Avatar
              fallback="SB"
              size="sm"
              isOnline={true}
              className="ring-1 ring-primary-500/30"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                Saif B.
              </span>
              <span className="text-[10px] font-medium text-teal-600">
                Top 5% • Explorer
              </span>
            </div>
          </Link>

          {/* Mobile Right Corner: Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors md:hidden cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
