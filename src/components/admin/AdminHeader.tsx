"use client";

import { Menu, PanelLeft, Bell, LogOut } from "lucide-react";

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileMenu: () => void;
}

export default function AdminHeader({
  collapsed,
  onToggle,
  onMobileMenu,
}: AdminHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-forest/10 bg-cream px-4 sm:px-6">
      <div className="flex items-center gap-1">
        {/* Mobile: opens drawer */}
        <button
          onClick={onMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest/10 hover:text-forest-deep lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop: collapses rail */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden h-9 w-9 items-center justify-center rounded-full text-forest-deep/70 transition-colors hover:bg-forest/10 hover:text-forest-deep lg:flex"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-1">
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
