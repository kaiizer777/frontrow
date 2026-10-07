"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusSizeClasses = {
  xs: "h-1.5 w-1.5 ring-1",
  sm: "h-2 w-2 ring-1.5",
  md: "h-2.5 w-2.5 ring-2",
  lg: "h-3 w-3 ring-2",
  xl: "h-3.5 w-3.5 ring-2",
};

export function Avatar({
  src,
  alt = "User Avatar",
  fallback = "FR",
  size = "md",
  isOnline,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium text-slate-700 bg-gradient-to-tr from-slate-200 to-slate-100 ring-1 ring-slate-200/80 shadow-xs",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="font-semibold text-slate-600 tracking-tight">
          {fallback.slice(0, 2).toUpperCase()}
        </span>
      )}
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-white",
            isOnline ? "bg-emerald-500" : "bg-slate-300",
            statusSizeClasses[size]
          )}
        />
      )}
    </div>
  );
}
