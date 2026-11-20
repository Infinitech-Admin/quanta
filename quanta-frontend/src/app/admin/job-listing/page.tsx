"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { JobListingFormDialog } from "@/components/admin/job-listing-form-dialog";
import {
  ApiItemResponse,
  ApiListResponse,
  JobListing,
  JobListingFormValues,
} from "@/types/job-listing";

const PAGE_SIZE = 10;

export default function AdminJobListingPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
const [department, setDepartment] = useState<
  "All" | JobListing["department"]
>("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<JobListing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadJobs() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/job-listings", { cache: "no-store" });
      const json: ApiListResponse<JobListing> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load job listings");
      }
      setJobs(json.data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load job listings",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialJobs() {
      try {
        const res = await fetch("/api/admin/job-listings", {
          cache: "no-store",
        });
        const json: ApiListResponse<JobListing> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load job listings");
        }
        if (!ignore) setJobs(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load job listings",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialJobs();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept = department === "All" || job.department === department;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      return matchesDept && matchesSearch;
    });
  }, [jobs, department, search]);

  async function handleCreateOrUpdate(values: JobListingFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingJob);
      const url = isEditing
        ? `/api/admin/job-listings/${editingJob!.id}`
        : "/api/admin/job-listings";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json: ApiItemResponse<JobListing> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save job listing");
      }

      toast.success(
        isEditing ? "Job listing updated." : "Job listing created.",
      );
      setFormOpen(false);
      setEditingJob(null);
      await loadJobs();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save job listing",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/job-listings/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete job listing");
      }
      toast.success("Job listing deleted.");
      setDeleteTarget(null);
      await loadJobs();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete job listing",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<JobListing>[] = [
    {
      key: "title",
      header: "Title",
      render: (job) => (
        <div>
          <p className="font-medium text-gray-900">{job.title}</p>
          <p className="text-xs text-gray-400">{job.slug}</p>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      render: (job) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {job.department}
        </span>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (job) => (
        <span className="flex items-center gap-1 text-gray-600">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          {job.location}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (job) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            job.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {job.is_active ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Job Listings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the openings shown on the public careers page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingJob(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value as "All" | JobListing["department"])
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-56"
          >
            <option value="All">All departments</option>
            <option value="Corporate">Corporate</option>
            <option value="Logistics & Operations">
              Logistics & Operations
            </option>
          </select>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filteredJobs}
            rowKey={(job) => job.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No job listings found."
            mobileTitle={(job) => job.title}
            renderActions={(job) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingJob(job);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`Edit ${job.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(job)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${job.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <JobListingFormDialog
        open={formOpen}
        initialData={editingJob}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.title}"?`}
        description="This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
