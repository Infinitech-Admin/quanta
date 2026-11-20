// app/admin/job-applications/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, MapPin, Search } from "lucide-react";
import { DataTable, Column } from "@/components/admin/data-table";
import { JobApplicationDialog } from "@/components/admin/job-application-dialog";
import {
  APPLICATION_STATUSES,
  STATUS_STYLES,
  type ApplicationListResponse,
  type ApplicationStatus,
  type JobApplication,
} from "@/types/job-application";

const PAGE_SIZE = 10;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// The API paginates (max 100 per page). Load every page so search and the
// status filter work across all applications.
async function fetchAllApplications(): Promise<JobApplication[]> {
  const all: JobApplication[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const res = await fetch(
      `/api/admin/job-applications?per_page=100&page=${page}`,
      {
        cache: "no-store",
      },
    );
    const json: ApplicationListResponse = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || "Failed to load applications");
    }
    all.push(...json.data);
    lastPage = json.meta?.last_page ?? 1;
    page += 1;
  } while (page <= lastPage);

  return all;
}

export default function AdminJobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>(
    "All",
  );
  const [selected, setSelected] = useState<JobApplication | null>(null);

  useEffect(() => {
    let ignore = false;
    fetchAllApplications()
      .then((data) => !ignore && setApplications(data))
      .catch((err) => {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load applications",
          );
        }
      })
      .finally(() => !ignore && setIsLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      const matchesSearch =
        q.length === 0 ||
        a.full_name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [applications, search, statusFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: applications.length };
    for (const s of APPLICATION_STATUSES) {
      c[s] = applications.filter((a) => a.status === s).length;
    }
    return c;
  }, [applications]);

  const columns: Column<JobApplication>[] = [
    {
      key: "applicant",
      header: "Applicant",
      render: (a) => (
        <div>
          <p className="font-medium text-gray-900">{a.full_name}</p>
          <p className="text-xs text-gray-400">{a.email}</p>
        </div>
      ),
    },
    {
      key: "position",
      header: "Position",
      render: (a) => (
        <div>
          <p className="text-gray-900">{a.position}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3 text-gray-400" />
            {a.location}
          </p>
        </div>
      ),
    },
    {
      key: "applied",
      header: "Applied",
      render: (a) => (
        <span className="text-gray-600">{formatDate(a.created_at)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (a) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[a.status]}`}
        >
          {a.status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Job Applications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Applications submitted through the public careers page.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...APPLICATION_STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s} ({counts[s] ?? 0})
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, position, or location…"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(a) => a.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No applications found."
            mobileTitle={(a) => a.full_name}
            renderActions={(a) => (
              <button
                type="button"
                onClick={() => setSelected(a)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label={`View ${a.full_name}`}
              >
                <Eye className="h-4 w-4" />
              </button>
            )}
          />
        </div>
      </div>

      {selected && (
        <JobApplicationDialog
          application={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
