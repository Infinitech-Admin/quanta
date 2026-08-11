"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-forest/10 bg-forest-deep text-cream transition-all duration-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo / brand */}
      <div className="flex h-16 items-center justify-between border-b border-cream/10 px-4">
        {!collapsed && (
          <span className="font-serif text-lg text-cream">Quanta Admin</span>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sun/20 text-sun-light"
                  : "text-cream/70 hover:bg-cream/10 hover:text-cream",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}