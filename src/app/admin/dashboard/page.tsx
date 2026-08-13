"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  Boxes,
  Loader2,
  Package,
  PlusCircle,
  Users,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   MOCK DATA — swap for real fetches once
   /api/admin/stats and /api/admin/orders/recent
   exist. Each stat carries a "swatch" color, a
   small nod to paper-stock sample chips, used as
   the card's left edge.
───────────────────────────────────────────── */
const stats = [
  {
    label: "Revenue (30d)",
    value: "₱1,284,900",
    delta: "+12.4%",
    icon: Banknote,
    swatch: "bg-sun",
  },
  {
    label: "Orders (30d)",
    value: "342",
    delta: "+6.1%",
    icon: Package,
    swatch: "bg-forest-deep",
  },
  {
    label: "Products live",
    value: "58",
    delta: "+2",
    icon: Boxes,
    swatch: "bg-[#C9A272]", // kraft
  },
  {
    label: "Registered customers",
    value: "4,910",
    delta: "+184",
    icon: Users,
    swatch: "bg-emerald-600",
  },
];

const recentOrders = [
  {
    id: "QP-10482",
    customer: "Rosario Mercado",
    total: "₱2,450.00",
    status: "Fulfilled",
  },
  {
    id: "QP-10481",
    customer: "Del Monte Groceries",
    total: "₱18,900.00",
    status: "Processing",
  },
  {
    id: "QP-10480",
    customer: "Angelo Bautista",
    total: "₱1,120.00",
    status: "Fulfilled",
  },
  {
    id: "QP-10479",
    customer: "Fresh Mart Cavite",
    total: "₱9,760.00",
    status: "Pending",
  },
  {
    id: "QP-10478",
    customer: "Corazon Villanueva",
    total: "₱3,300.00",
    status: "Fulfilled",
  },
];

const statusStyles: Record<string, string> = {
  Fulfilled: "bg-forest-deep/10 text-forest-deep",
  Processing: "bg-sun/20 text-forest-deep",
  Pending: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-forest-deep/50" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Header ───────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/50">
            Dashboard
          </p>
          <h1 className="font-fraunces text-2xl text-forest-deep sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0] ?? "there"}
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-deep/90 sm:self-start"
        >
          <PlusCircle className="h-4 w-4" />
          New product
        </button>
      </div>

      {/* ── Stat cards ───────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon, swatch }) => (
          <div
            key={label}
            className="flex overflow-hidden rounded-2xl border border-forest-deep/10 bg-white/70"
          >
            {/* paper-stock swatch edge */}
            <div className={cn("w-1.5 shrink-0", swatch)} aria-hidden="true" />
            <div className="min-w-0 flex-1 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-medium uppercase tracking-[0.1em] text-forest-deep/50 sm:text-xs">
                  {label}
                </span>
                <Icon className="h-4 w-4 shrink-0 text-forest-deep/40" />
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-fraunces text-xl tabular-nums text-forest-deep sm:text-2xl">
                  {value}
                </span>
                <span className="text-xs font-medium tabular-nums text-emerald-600">
                  {delta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent orders ────────────────────── */}
      <div className="rounded-2xl border border-forest-deep/10 bg-white/70">
        <div className="flex items-center justify-between border-b border-forest-deep/10 px-4 py-4 sm:px-5">
          <h2 className="font-fraunces text-lg text-forest-deep">
            Recent orders
          </h2>
          <button
            type="button"
            className="text-xs font-medium text-forest-deep/60 underline-offset-4 hover:text-forest-deep hover:underline"
          >
            View all
          </button>
        </div>

        {/* Desktop / tablet: table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-[0.1em] text-forest-deep/50">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-forest-deep/5 text-forest-deep/80"
                >
                  <td className="px-5 py-3 font-medium tabular-nums text-forest-deep">
                    {order.id}
                  </td>
                  <td className="px-5 py-3">{order.customer}</td>
                  <td className="px-5 py-3 tabular-nums">{order.total}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        statusStyles[order.status] ??
                          "bg-forest-deep/10 text-forest-deep",
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked ledger cards, not a squeezed table */}
        <ul className="divide-y divide-forest-deep/5 sm:hidden">
          {recentOrders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between px-4 py-3.5"
            >
              <div className="min-w-0">
                <p className="font-medium tabular-nums text-forest-deep">
                  {order.id}
                </p>
                <p className="truncate text-xs text-forest-deep/60">
                  {order.customer}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-sm tabular-nums text-forest-deep/80">
                  {order.total}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    statusStyles[order.status] ??
                      "bg-forest-deep/10 text-forest-deep",
                  )}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
