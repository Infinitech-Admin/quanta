"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingSocial } from "@/components/floating-social";
import { Chatbot } from "@/components/chatbot";
import { PromoModal } from "@/components/promo-modal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

/* ─────────────────────────────────────────────
   ADMIN SHELL
   Sidebar + top header, no public nav/footer/
   marketing widgets
───────────────────────────────────────────── */
function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden admin-shell">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="min-h-screen flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PUBLIC SHELL
   Site header/footer, plus marketing widgets
   (floating social, chatbot, promo modal)
───────────────────────────────────────────── */
function PublicShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingSocial />
      <Chatbot />
      <PromoModal />
    </>
  );
}

/* ─────────────────────────────────────────────
   ROUTE SWITCHER
   Anything under /admin → AdminShell
   Everything else       → PublicShell
───────────────────────────────────────────── */
function ShellRouter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return isAdmin ? (
    <AdminShell>{children}</AdminShell>
  ) : (
    <PublicShell>{children}</PublicShell>
  );
}

/* ─────────────────────────────────────────────
   ROOT LAYOUT EXPORT
   Consumed by app/layout.tsx (server component),
   which keeps metadata/viewport/JSON-LD there and
   delegates shell switching to this client component.
───────────────────────────────────────────── */
export default function RootLayout({ children }: { children: ReactNode }) {
  return <ShellRouter>{children}</ShellRouter>;
}