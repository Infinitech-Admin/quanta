"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingSocial } from "@/components/floating-social";
import { Chatbot } from "@/components/chatbot";
import { PromoModal } from "@/components/promo-modal";
import { AuthProvider } from "@/contexts/AuthContext";

/* ─────────────────────────────────────────────
   ADMIN SHELL
   No sidebar/header here — app/admin/layout.tsx
   owns that chrome for every /admin/* route.
   This just passes children through untouched so
   admin pages don't inherit the public site's
   nav/footer/marketing widgets.
───────────────────────────────────────────── */
function AdminShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
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
   AuthProvider wraps everything so useAuth() is
   available in both the admin and public shells,
   as well as any page/component underneath them.
───────────────────────────────────────────── */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ShellRouter>{children}</ShellRouter>
    </AuthProvider>
  );
}
