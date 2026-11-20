"use client";

import { useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false); // desktop: narrow vs full
  const [mobileOpen, setMobileOpen] = useState(false); // mobile: drawer open

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-cream/40">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          onMobileMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
