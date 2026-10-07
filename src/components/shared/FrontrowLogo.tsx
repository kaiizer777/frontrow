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
      {/* Radiant Sunset Coral Craft Emblem */}
      <div
        className={cn(
          "relative shrink-0 rounded-[12px] bg-gradient-to-br from-[#FF6B47] via-[#FF5A36] to-[#E63914] p-1.5 shadow-[0_4px_16px_rgba(255,90,54,0.32)] border-t border-white/35 flex items-center justify-center overflow-hidden",
          iconSizes[size]
        )}
      >
        {/* Ambient Top Light Flare */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[12px]" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        >
          {/* Layer 1: Frontrow Amphitheater Perspective Curves (Stage Rows) */}
          <path
            d="M 5 23.5 C 11 19.5, 21 19.5, 27 23.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          <path
            d="M 6.5 17.5 C 11.5 14.5, 20.5 14.5, 25.5 17.5"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />

          {/* Layer 2: Main Dynamic Apex Arc */}
          <path
            d="M 6 8.5 C 12 6.5, 20 6.5, 26 8.5"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Layer 3: Radiant Frontrow Spotlight Star (Mastery Spark) */}
          <path
            d="M 16 3.5 L 18.2 9.5 L 24 11.5 L 18.2 13.5 L 16 19.5 L 13.8 13.5 L 8 11.5 L 13.8 9.5 Z"
            fill="#FFFFFF"
          />
          <circle cx="16" cy="11.5" r="1.8" fill="#FDE047" />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-[17px] tracking-tight text-slate-950 leading-none">
              FRONT<span className="text-primary-600">ROW</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 shadow-[0_0_4px_rgba(255,90,54,0.6)]" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 tracking-[0.16em] uppercase leading-none mt-1">
            Hobby Learning Hub
          </span>
        </div>
      )}
    </div>
  );
}
