"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { GroupCompanyFormDialog } from "@/components/admin/group-company-form-dialog";
import {
  ApiItemResponse,
  ApiListResponse,
  GroupCompany,
  GroupCompanyFormValues,
} from "@/types/group-company";

const PAGE_SIZE = 10;

export default function AdminGroupCompaniesPage() {
  const [companies, setCompanies] = useState<GroupCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<GroupCompany | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<GroupCompany | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Used by event handlers (create/update/delete) to refresh the list.
  async function loadCompanies() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/group-companies", {
        cache: "no-store",
      });
      const json: ApiListResponse<GroupCompany> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load companies");
      }
      setCompanies([...json.data].sort((a, b) => a.sort_order - b.sort_order));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load companies",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialCompanies() {
      try {
        const res = await fetch("/api/admin/group-companies", {
          cache: "no-store",
        });
        const json: ApiListResponse<GroupCompany> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load companies");
        }
        if (!ignore) {
          setCompanies(
            [...json.data].sort((a, b) => a.sort_order - b.sort_order),
          );
        }
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load companies",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialCompanies();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredCompanies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(
      (c) =>
        c.short_name.toLowerCase().includes(q) ||
        c.full_name.toLowerCase().includes(q),
    );
  }, [companies, search]);

  async function handleCreateOrUpdate(values: GroupCompanyFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingCompany);
      const url = isEditing
        ? `/api/admin/group-companies/${editingCompany!.id}`
        : "/api/admin/group-companies";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json: ApiItemResponse<GroupCompany> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save company");
      }

      toast.success(isEditing ? "Company updated." : "Company created.");
      setFormOpen(false);
      setEditingCompany(null);
      await loadCompanies();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save company",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/group-companies/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete company");
      }
      toast.success("Company deleted.");
      setDeleteTarget(null);
      await loadCompanies();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete company",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<GroupCompany>[] = [
    {
      key: "short_name",
      header: "Company",
      render: (c) => (
        <div>
          <p className="font-medium text-gray-900">{c.short_name}</p>
          <p className="text-xs text-gray-400">{c.slug}</p>
        </div>
      ),
    },
    {
      key: "tagline",
      header: "Tagline",
      render: (c) => (
        <span className="line-clamp-1 text-gray-600">{c.tagline || "—"}</span>
      ),
    },
    {
      key: "sort_order",
      header: "Order",
      render: (c) => <span className="text-gray-600">{c.sort_order}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            c.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {c.is_active ? "Active" : "Hidden"}
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
              Group of Companies
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the company tabs shown on the &ldquo;Our Group of
              Companies&rdquo; page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingCompany(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Company
          </button>
        </div>

        <div className="mt-6">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filteredCompanies}
            rowKey={(c) => c.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No companies found."
            mobileTitle={(c) => c.short_name}
            renderActions={(c) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCompany(c);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`Edit ${c.short_name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(c)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${c.short_name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <GroupCompanyFormDialog
        open={formOpen}
        initialData={editingCompany}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingCompany(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.short_name}"?`}
        description="This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
