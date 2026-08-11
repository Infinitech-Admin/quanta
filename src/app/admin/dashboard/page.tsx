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

/* ─────────────────────────────────────────────
   MOCK DATA
   Swap these for real fetches (e.g. SWR / React
   Query hitting /api/admin/stats,
   /api/admin/orders/recent) once those endpoints
   exist. Shapes are kept intentionally simple so
   the swap is a drop-in.
───────────────────────────────────────────── */
const stats = [
  {
    label: "Revenue (30d)",
    value: "₱1,284,900",
    delta: "+12.4%",
    icon: Banknote,
  },
  {
    label: "Orders (30d)",
    value: "342",
    delta: "+6.1%",
    icon: Package,
  },
  {
    label: "Products live",
    value: "58",
    delta: "+2",
    icon: Boxes,
  },
  {
    label: "Registered customers",
    value: "4,910",
    delta: "+184",
    icon: Users,
  },
];

const recentOrders = [
  { id: "QP-10482", customer: "Rosario Mercado", total: "₱2,450.00", status: "Fulfilled" },
  { id: "QP-10481", customer: "Del Monte Groceries", total: "₱18,900.00", status: "Processing" },
  { id: "QP-10480", customer: "Angelo Bautista", total: "₱1,120.00", status: "Fulfilled" },
  { id: "QP-10479", customer: "Fresh Mart Cavite", total: "₱9,760.00", status: "Pending" },
  { id: "QP-10478", customer: "Corazon Villanueva", total: "₱3,300.00", status: "Fulfilled" },
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
    <div className="space-y-8">
      {/* ── Header ───────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/50">
            Dashboard
          </p>
          <h1 className="font-fraunces text-3xl text-forest-deep">
            Welcome back, {user?.name?.split(" ")[0] ?? "there"}
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-forest-deep px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-deep/90"
        >
          <PlusCircle className="h-4 w-4" />
          New product
        </button>
      </div>

      {/* ── Stat cards ───────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-forest-deep/10 bg-white/70 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.1em] text-forest-deep/50">
                {label}
              </span>
              <Icon className="h-4 w-4 text-forest-deep/40" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-fraunces text-2xl text-forest-deep">
                {value}
              </span>
              <span className="text-xs font-medium text-emerald-600">
                {delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent orders ────────────────────── */}
      <div className="rounded-2xl border border-forest-deep/10 bg-white/70">
        <div className="flex items-center justify-between border-b border-forest-deep/10 px-5 py-4">
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

        <div className="overflow-x-auto">
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
                  <td className="px-5 py-3 font-medium text-forest-deep">
                    {order.id}
                  </td>
                  <td className="px-5 py-3">{order.customer}</td>
                  <td className="px-5 py-3">{order.total}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[order.status] ??
                        "bg-forest-deep/10 text-forest-deep"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}