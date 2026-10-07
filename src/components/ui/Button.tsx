import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:translate-y-[0.5px]",
  {
    variants: {
      variant: {
        primary:
          "btn-tier3-primary text-white rounded-lg focus-visible:ring-primary-500",
        secondary:
          "btn-tier2-secondary text-slate-800 rounded-lg hover:text-slate-900 focus-visible:ring-slate-400",
        outline:
          "border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-lg focus-visible:ring-slate-400",
        ghost:
          "text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus-visible:ring-slate-400 active:bg-slate-200",
        accent:
          "bg-teal-600 text-white rounded-lg hover:bg-teal-700 border-t border-teal-400/30 border-b border-teal-800 shadow-sm focus-visible:ring-teal-500",
        destructive:
          "bg-rose-600 text-white rounded-lg hover:bg-rose-700 border-b border-rose-800 shadow-sm focus-visible:ring-rose-500",
      },
      size: {
        xs: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
        md: "h-9 px-4 text-sm gap-2 rounded-lg",
        lg: "h-11 px-5 text-base gap-2.5 rounded-xl font-semibold",
        icon: "h-9 w-9 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
