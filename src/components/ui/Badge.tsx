import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors border select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-orange-500/15 via-orange-500/10 to-orange-500/5 text-orange-700 border-orange-500/30",
        secondary:
          "bg-gradient-to-b from-teal-500/15 via-teal-500/10 to-teal-500/5 text-teal-800 border-teal-500/30",
        amber:
          "bg-gradient-to-b from-amber-500/15 via-amber-500/10 to-amber-500/5 text-amber-800 border-amber-500/30",
        neutral:
          "bg-slate-100/90 text-slate-700 border-slate-200/80",
        success:
          "bg-emerald-50 text-emerald-700 border-emerald-500/30",
        outline:
          "bg-transparent text-slate-700 border-slate-300",
        live:
          "bg-rose-50 text-rose-700 border-rose-500/30 font-bold",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "primary" && "bg-orange-500",
            variant === "secondary" && "bg-teal-500",
            variant === "amber" && "bg-amber-500",
            variant === "success" && "bg-emerald-500",
            variant === "live" && "bg-rose-500 animate-pulse",
            (!variant || variant === "neutral" || variant === "outline") && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}
