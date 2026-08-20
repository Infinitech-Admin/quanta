"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { BrandFormDialog } from "@/components/admin/brand-form-dialog";
import {
  ApiItemResponse,
  ApiListResponse,
  Brand,
  BrandFormValues,
  BRAND_CATEGORIES,
} from "@/types/brand";
import { getImageUrl } from "@/lib/image-url";
const PAGE_SIZE = 10;

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | Brand["category"]>("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Used by event handlers (create/update/delete) to refresh the list.
  // Sets isLoading(true) itself since it isn't called from an effect body.
  async function loadBrands() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/brands", { cache: "no-store" });
      const json: ApiListResponse<Brand> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load brands");
      }
      setBrands(json.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load brands");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    // Initial mount load. isLoading already starts as `true`, so this
    // effect never calls setState synchronously — the first setState
    // happens only after the fetch resolves.
    async function loadInitialBrands() {
      try {
        const res = await fetch("/api/admin/brands", { cache: "no-store" });
        const json: ApiListResponse<Brand> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load brands");
        }
        if (!ignore) setBrands(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load brands",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialBrands();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredBrands = useMemo(() => {
    return brands
      .filter((brand) => {
        const matchesCategory =
          category === "All" || brand.category === category;
        const q = search.trim().toLowerCase();
        const matchesSearch =
          q.length === 0 ||
          brand.name.toLowerCase().includes(q) ||
          brand.slug.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.sort_order - b.sort_order);
  }, [brands, category, search]);

  async function handleCreateOrUpdate(values: BrandFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingBrand);
      const url = isEditing
        ? `/api/admin/brands/${editingBrand!.id}`
        : "/api/admin/brands";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json: ApiItemResponse<Brand> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save brand");
      }

      toast.success(isEditing ? "Brand updated." : "Brand created.");
      setFormOpen(false);
      setEditingBrand(null);
      await loadBrands();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save brand");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/brands/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete brand");
      }
      toast.success("Brand deleted.");
      setDeleteTarget(null);
      await loadBrands();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete brand",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<Brand>[] = [
    {
      key: "name",
      header: "Brand",
      render: (brand) => {
        const imageUrl = getImageUrl(brand.image);
        return (
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={brand.name}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
              />
            ) : (
              <div
                className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${brand.gradient} ring-1 ring-black/5`}
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{brand.name}</p>
              <p className="text-xs text-gray-400">{brand.slug}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "category",
      header: "Category",
      render: (brand) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {brand.category}
        </span>
      ),
    },
    {
      key: "sort_order",
      header: "Order",
      render: (brand) => (
        <span className="text-gray-600">{brand.sort_order}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (brand) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            brand.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {brand.is_active ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the brands shown on the public brands page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingBrand(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Brand
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or slug…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | Brand["category"])
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-56"
          >
            <option value="All">All categories</option>
            {BRAND_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filteredBrands}
            rowKey={(brand) => brand.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No brands found."
            mobileTitle={(brand) => brand.name}
            renderActions={(brand) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBrand(brand);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`Edit ${brand.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(brand)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${brand.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <BrandFormDialog
        open={formOpen}
        initialData={editingBrand}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingBrand(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This action cannot be undone. It will also disappear from the public brands page."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
