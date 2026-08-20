"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Briefcase,
  Building2,
  Loader2,
  Mail,
  MailWarning,
  Tag,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface CountWithDelta {
  total: number;
  last30d: number;
  deltaPercent: number | null;
}

interface DashboardStats {
  contactInquiries: CountWithDelta;
  customers: CountWithDelta;
  institutionalProducts: CountWithDelta & { active: number };
  jobListings: { total: number; active: number };
  groupCompanies: { total: number };
  brands: { total: number };
  unreadContactSubmissions: number;
}

interface TrendPoint {
  date: string;
  contactSubmissions: number;
}

interface RecentSubmission {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  is_read: boolean;
  created_at: string;
}

type Loadable<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || json?.success === false) {
    throw new Error(json?.message ?? `Request to ${url} failed`);
  }
  return json.data as T;
}

function formatDelta(deltaPercent: number | null) {
  if (deltaPercent === null) return null;
  const isPositive = deltaPercent >= 0;
  return {
    isPositive,
    label: `${isPositive ? "+" : ""}${deltaPercent}%`,
  };
}

function formatShortDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });
}

function StatCard({
  label,
  value,
  subLabel,
  deltaPercent,
  icon: Icon,
  swatch,
}: {
  label: string;
  value: number | string;
  subLabel?: string;
  deltaPercent?: number | null;
  icon: React.ElementType;
  swatch: string;
}) {
  const delta = deltaPercent !== undefined ? formatDelta(deltaPercent) : null;

  return (
    <div className="flex overflow-hidden rounded-2xl border border-forest-deep/10 bg-white/70">
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
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                delta.isPositive ? "text-emerald-600" : "text-red-600",
              )}
            >
              {delta.isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {delta.label}
            </span>
          )}
        </div>
        {subLabel && (
          <p className="mt-1 text-xs text-forest-deep/50">{subLabel}</p>
        )}
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-forest-deep/10 bg-white/70">
      <div className="w-1.5 shrink-0 animate-pulse bg-forest-deep/10" />
      <div className="min-w-0 flex-1 space-y-3 p-4 sm:p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-forest-deep/10" />
        <div className="h-6 w-16 animate-pulse rounded bg-forest-deep/10" />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  const [stats, setStats] = useState<Loadable<DashboardStats>>({
    status: "loading",
  });
  const [trends, setTrends] = useState<Loadable<TrendPoint[]>>({
    status: "loading",
  });
  const [recentActivity, setRecentActivity] = useState<
    Loadable<RecentSubmission[]>
  >({ status: "loading" });

  const loadDashboard = useCallback(async () => {
    setStats({ status: "loading" });
    setTrends({ status: "loading" });
    setRecentActivity({ status: "loading" });

    const [statsResult, trendsResult, activityResult] =
      await Promise.allSettled([
        fetchJson<DashboardStats>("/api/admin/dashboard/stats"),
        fetchJson<TrendPoint[]>("/api/admin/dashboard/trends?days=30"),
        fetchJson<RecentSubmission[]>(
          "/api/admin/dashboard/recent-activity?limit=8",
        ),
      ]);

    setStats(
      statsResult.status === "fulfilled"
        ? { status: "ready", data: statsResult.value }
        : {
            status: "error",
            message: statsResult.reason?.message ?? "Failed to load stats",
          },
    );
    setTrends(
      trendsResult.status === "fulfilled"
        ? { status: "ready", data: trendsResult.value }
        : {
            status: "error",
            message: trendsResult.reason?.message ?? "Failed to load trends",
          },
    );
    setRecentActivity(
      activityResult.status === "fulfilled"
        ? { status: "ready", data: activityResult.value }
        : {
            status: "error",
            message:
              activityResult.reason?.message ?? "Failed to load activity",
          },
    );
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
      return;
    }
    loadDashboard();
  }, [loading, isAuthenticated, isAdmin, router, loadDashboard]);

  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-forest-deep/50" />
      </div>
    );
  }

  const barData =
    stats.status === "ready"
      ? [
          { name: "Our Customers", total: stats.data.customers.total },
          { name: "Products", total: stats.data.institutionalProducts.total },
          { name: "Job listings", total: stats.data.jobListings.total },
          { name: "Group cos.", total: stats.data.groupCompanies.total },
          { name: "Brands", total: stats.data.brands.total },
        ]
      : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/50">
            Dashboard
          </p>
          <h1 className="font-fraunces text-2xl text-forest-deep sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0] ?? "there"}
          </h1>
        </div>
      </div>

      {stats.status === "error" ? (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {stats.message}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.status === "loading" ? (
            Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          ) : (
            <>
              <StatCard
                label="Contact inquiries (30d)"
                value={stats.data.contactInquiries.last30d}
                subLabel={`${stats.data.contactInquiries.total} total`}
                deltaPercent={stats.data.contactInquiries.deltaPercent}
                icon={Mail}
                swatch="bg-sun"
              />
              <StatCard
                label="Unread inquiries"
                value={stats.data.unreadContactSubmissions}
                icon={MailWarning}
                swatch="bg-red-500"
              />
              <StatCard
                label="Our Customers"
                value={stats.data.customers.total}
                subLabel={`+${stats.data.customers.last30d} in 30d`}
                deltaPercent={stats.data.customers.deltaPercent}
                icon={Users}
                swatch="bg-emerald-600"
              />
              <StatCard
                label="Institutional products"
                value={stats.data.institutionalProducts.total}
                subLabel={`${stats.data.institutionalProducts.active} active`}
                deltaPercent={stats.data.institutionalProducts.deltaPercent}
                icon={Boxes}
                swatch="bg-[#C9A272]"
              />
              <StatCard
                label="Job listings"
                value={stats.data.jobListings.total}
                subLabel={`${stats.data.jobListings.active} active`}
                icon={Briefcase}
                swatch="bg-forest-deep"
              />
              <StatCard
                label="Group companies"
                value={stats.data.groupCompanies.total}
                icon={Building2}
                swatch="bg-[#8B7355]"
              />
              <StatCard
                label="Brands"
                value={stats.data.brands.total}
                icon={Tag}
                swatch="bg-sun"
              />
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-forest-deep/10 bg-white/70 p-4 sm:p-5 lg:col-span-2">
          <h2 className="font-fraunces text-lg text-forest-deep">
            Contact submissions — last 30 days
          </h2>
          <div className="mt-4 h-64">
            {trends.status === "loading" && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-forest-deep/40" />
              </div>
            )}
            {trends.status === "error" && (
              <div className="flex h-full items-center justify-center text-sm text-red-600">
                {trends.message}
              </div>
            )}
            {trends.status === "ready" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends.data}>
                  <defs>
                    <linearGradient
                      id="fillSubmissions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2f4f3f"
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor="#2f4f3f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2f4f3f10" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatShortDate}
                    tick={{ fontSize: 11, fill: "#2f4f3f80" }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#2f4f3f80" }}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                  />
                  <Tooltip
                    labelFormatter={(label) => formatShortDate(String(label))}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #2f4f3f1a",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="contactSubmissions"
                    stroke="#2f4f3f"
                    strokeWidth={2}
                    fill="url(#fillSubmissions)"
                    name="Submissions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-forest-deep/10 bg-white/70 p-4 sm:p-5">
          <h2 className="font-fraunces text-lg text-forest-deep">
            Totals by entity
          </h2>
          <div className="mt-4 h-64">
            {stats.status === "loading" && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-forest-deep/40" />
              </div>
            )}
            {stats.status === "ready" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  layout="vertical"
                  margin={{ left: 8, right: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2f4f3f10"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#2f4f3f80" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fontSize: 11, fill: "#2f4f3f80" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #2f4f3f1a",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="total" fill="#2f4f3f" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-forest-deep/10 bg-white/70">
        <div className="flex items-center justify-between border-b border-forest-deep/10 px-4 py-4 sm:px-5">
          <h2 className="font-fraunces text-lg text-forest-deep">
            Recent contact submissions
          </h2>
        </div>

        {recentActivity.status === "loading" && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-forest-deep/40" />
          </div>
        )}

        {recentActivity.status === "error" && (
          <div className="px-5 py-6 text-sm text-red-600">
            {recentActivity.message}
          </div>
        )}

        {recentActivity.status === "ready" && (
          <>
            {recentActivity.data.length === 0 ? (
              <p className="px-5 py-6 text-sm text-forest-deep/50">
                No contact submissions yet.
              </p>
            ) : (
              <>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-xs font-medium uppercase tracking-[0.1em] text-forest-deep/50">
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Subject</th>
                        <th className="px-5 py-3">Received</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.data.map((submission) => (
                        <tr
                          key={submission.id}
                          className="border-t border-forest-deep/5 text-forest-deep/80"
                        >
                          <td className="px-5 py-3 font-medium text-forest-deep">
                            {submission.name}
                          </td>
                          <td className="px-5 py-3">{submission.email}</td>
                          <td className="px-5 py-3">
                            {submission.subject ?? "—"}
                          </td>
                          <td className="px-5 py-3 tabular-nums">
                            {new Date(submission.created_at).toLocaleDateString(
                              "en-PH",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={cn(
                                "rounded-full px-2.5 py-1 text-xs font-medium",
                                submission.is_read
                                  ? "bg-forest-deep/10 text-forest-deep"
                                  : "bg-red-100 text-red-700",
                              )}
                            >
                              {submission.is_read ? "Read" : "Unread"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="divide-y divide-forest-deep/5 sm:hidden">
                  {recentActivity.data.map((submission) => (
                    <li
                      key={submission.id}
                      className="flex items-center justify-between px-4 py-3.5"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-forest-deep">
                          {submission.name}
                        </p>
                        <p className="truncate text-xs text-forest-deep/60">
                          {submission.subject ?? submission.email}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                          submission.is_read
                            ? "bg-forest-deep/10 text-forest-deep"
                            : "bg-red-100 text-red-700",
                        )}
                      >
                        {submission.is_read ? "Read" : "Unread"}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
