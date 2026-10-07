"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FrontrowLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function FrontrowLogo({
  className,
  size = "md",
  showWordmark = true,
}: FrontrowLogoProps) {
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Precision Bespoke Vector Icon */}
      <div
        className={cn(
          "relative shrink-0 rounded-[11px] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-1.5 shadow-[0_4px_14px_rgba(15,23,42,0.18),0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-white/10 flex items-center justify-center overflow-hidden",
          iconSizes[size]
        )}
      >
        {/* Subtle Ambient Radial Backlight inside the emblem */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-transparent to-amber-400/20 pointer-events-none" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full relative z-10"
        >
          <defs>
            {/* Core Sunset Gradient */}
            <linearGradient id="fr-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="60%" stopColor="#FF441F" />
              <stop offset="100%" stopColor="#D82B08" />
            </linearGradient>

            {/* Amber Glow Accent */}
            <linearGradient id="fr-gradient-amber" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>

            {/* Subtle inner reflection */}
            <linearGradient id="fr-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Layer 1: Frontrow Dynamic Curved Stage Rows (Amphitheater Perspective) */}
          <path
            d="M 5 24 C 11 20, 21 20, 27 24"
            stroke="url(#fr-gradient-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M 7 18.5 C 12 15.5, 20 15.5, 25 18.5"
            stroke="url(#fr-gradient-primary)"
            strokeWidth="2.75"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Layer 2: Frontrow Primary Apex Arc & Monogram 'F' Structure */}
          <path
            d="M 6 9 C 12 7.5, 20 7.5, 26 9"
            stroke="url(#fr-gradient-primary)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Central Creative Focus Beacon / Diamond Spark */}
          <path
            d="M 16 5 L 18 10.5 L 23.5 12.5 L 18 14.5 L 16 20 L 14 14.5 L 8.5 12.5 L 14 10.5 Z"
            fill="url(#fr-gradient-primary)"
          />
          <circle cx="16" cy="12.5" r="1.5" fill="url(#fr-gradient-amber)" />

          {/* Subtle Top Bevel Highlight */}
          <path
            d="M 6 9 C 11 7.8, 21 7.8, 26 9"
            stroke="url(#fr-sheen)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-[17px] tracking-[-0.03em] text-slate-950 leading-none">
              FRONT<span className="text-primary-600">ROW</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 shadow-[0_0_6px_rgba(255,90,54,0.8)]" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 tracking-[0.16em] uppercase leading-none mt-1">
            Hobby Learning Hub
          </span>
        </div>
      )}
    </div>
  );
}
