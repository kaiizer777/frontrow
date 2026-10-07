"use client";

import * as React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  containerClassName?: string;
  fluid?: boolean;
}

export function AppShell({ children, containerClassName, fluid = false }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 md:pl-64 flex flex-col min-w-0">
          <div
            className={
              fluid
                ? (containerClassName || "w-full flex-1 flex flex-col")
                : `max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 ${containerClassName || ""}`
            }
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
