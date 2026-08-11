"use client";

import { Menu, Bell, LogOut } from "lucide-react";

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminHeader({ collapsed, onToggle }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-forest/10 bg-cream px-4">
      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="flex h-9 w-9 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest/10 hover:text-forest-deep"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest/10 hover:text-forest-deep"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          aria-label="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest/10 hover:text-forest-deep"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}