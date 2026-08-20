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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Job Listings",
    href: "/admin/job-listing",
    icon: Package,
  },
  {
    label: "Group of Companies",
    href: "/admin/group-companies",
    icon: Users,
  },
  {
    label: "Brand",
    href: "/admin/brand",
    icon: Package,
  },
  {
    label: "Institutional-products",
    href: "/admin/institutional-products",
    icon: Package,
  },

  {
    label: "Our Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Contact",
    href: "/admin/contact",
    icon: Package,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  const nav = (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sun/20 text-sun-light"
                : "text-cream/70 hover:bg-cream/10 hover:text-cream",
              collapsed && "lg:justify-center lg:px-0",
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" />

            <span className={cn(collapsed && "lg:hidden")}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden h-full flex-col border-r border-forest/10 bg-forest-deep text-cream transition-[width] duration-200 lg:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-cream/10 px-4">
          {!collapsed && (
            <span className="font-fraunces text-lg text-cream">
              Quanta Admin
            </span>
          )}

          <button
            type="button"
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

        {nav}
      </aside>

      {/* Mobile Sidebar */}
      <Sheet
        open={mobileOpen}
        onOpenChange={(open) => {
          if (!open) {
            onMobileClose();
          }
        }}
      >
        <SheetContent
          side="left"
          className="w-72 max-w-[80vw] border-r-0 bg-forest-deep p-0 text-cream"
        >
          <SheetHeader className="flex h-16 flex-row items-center border-b border-cream/10 px-4">
            <SheetTitle className="font-fraunces text-lg text-cream">
              Quanta Admin
            </SheetTitle>
          </SheetHeader>

          {nav}
        </SheetContent>
      </Sheet>
    </>
  );
}
