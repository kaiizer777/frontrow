"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [internalTab, setInternalTab] = React.useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = React.useCallback(
    (val: string) => {
      if (value === undefined) {
        setInternalTab(val);
      }
      onValueChange?.(val);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full space-y-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pill" | "underline";
}

export function TabsList({
  className,
  variant = "pill",
  children,
  ...props
}: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center",
        variant === "pill" &&
          "p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 gap-1",
        variant === "underline" &&
          "border-b border-slate-200 gap-6 w-full justify-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  badge?: string | number;
}

export function TabsTrigger({
  value,
  badge,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isSelected = context.activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all select-none cursor-pointer",
        isSelected
          ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] border border-slate-200/60"
          : "text-slate-600 hover:text-slate-900 hover:bg-white/50",
        className
      )}
      {...props}
    >
      {children}
      {badge !== undefined && (
        <span
          className={cn(
            "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
            isSelected
              ? "bg-primary-50 text-primary-600"
              : "bg-slate-200/70 text-slate-600"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("animate-in fade-in-50 duration-150 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
