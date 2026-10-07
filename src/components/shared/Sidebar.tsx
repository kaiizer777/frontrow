"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Sparkles,
  HelpCircle,
  Compass,
  Bookmark,
  TrendingUp,
  Flame,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const mainNav = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: undefined,
  },
  {
    name: "Buddy Rooms",
    href: "/buddy-rooms",
    icon: Users2,
    badge: { text: "Live", variant: "live" as const },
  },
  {
    name: "1-on-1 Mentorship",
    href: "/subscription",
    icon: Sparkles,
    badge: { text: "Pro", variant: "primary" as const },
  },
  {
    name: "Interest Quizzes",
    href: "/quizzes",
    icon: HelpCircle,
    badge: { text: "New", variant: "secondary" as const },
  },
];

const activeHobbies = [
  { name: "Electric Guitar", icon: "🎸", count: 18, href: "/buddy-rooms" },
  { name: "Coffee Brewing", icon: "☕", count: 24, href: "/buddy-rooms" },
  { name: "Street Photography", icon: "📷", count: 32, href: "/buddy-rooms" },
  { name: "Pottery & Clay", icon: "🏺", count: 12, href: "/buddy-rooms" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-200/80 bg-white/95 backdrop-blur-md flex flex-col justify-between py-5 px-3.5 transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          {/* Mobile close button */}
          <div className="flex md:hidden items-center justify-between px-2 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Core Navigation */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Explore
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all",
                      isActive
                        ? "bg-primary-50/80 text-primary-600 font-bold border border-primary-200/60 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-primary-600" : "text-slate-400"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badge.variant} size="sm">
                        {item.badge.text}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Active Hobby Circles */}
          <div>
            <div className="flex items-center justify-between px-3 pb-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <span>My Circles</span>
              <span className="text-[10px] text-teal-600 font-medium">4 Joined</span>
            </div>
            <div className="space-y-1">
              {activeHobbies.map((hobby) => (
                <Link
                  key={hobby.name}
                  href={hobby.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm select-none">{hobby.icon}</span>
                    <span className="font-medium group-hover:text-slate-900">
                      {hobby.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 group-hover:bg-slate-200 px-1.5 py-0.5 rounded-full">
                    {hobby.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Mentorship Upgrade Callout */}
        <div className="pt-4 border-t border-slate-100">
          <div className="rounded-xl p-3.5 bg-gradient-to-br from-primary-50/70 via-white to-amber-50/50 border border-primary-200/70 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-600">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-900 font-display">
                1-on-1 Mentorship
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Get matched with master craftspeople for weekly tailored feedback.
            </p>
            <Link href="/subscription" onClick={onClose} className="block">
              <Button
                variant="primary"
                size="xs"
                className="w-full justify-between text-xs"
              >
                <span>View Plans</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
