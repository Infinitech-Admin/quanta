// app/admin/institutional-products/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { InstitutionalProductFormDialog } from "@/components/admin/institutional-product-form-dialog";
import {
  ApiItemResponse,
  ApiListResponse,
  InstitutionalProduct,
  InstitutionalProductFormValues,
} from "@/types/institutional-product";
import { getImageUrl } from "@/lib/image-url";

const PAGE_SIZE = 10;

export default function AdminInstitutionalProductsPage() {
  const [products, setProducts] = useState<InstitutionalProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<InstitutionalProduct | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<InstitutionalProduct | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/institutional-products", {
        cache: "no-store",
      });
      const json: ApiListResponse<InstitutionalProduct> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load products");
      }
      setProducts(json.data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load products",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialProducts() {
      try {
        const res = await fetch("/api/admin/institutional-products", {
          cache: "no-store",
        });
        const json: ApiListResponse<InstitutionalProduct> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load products");
        }
        if (!ignore) setProducts(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load products",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length === 0) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  async function handleCreateOrUpdate(values: InstitutionalProductFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingProduct);
      const url = isEditing
        ? `/api/admin/institutional-products/${editingProduct!.id}`
        : "/api/admin/institutional-products";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json: ApiItemResponse<InstitutionalProduct> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save product");
      }

      toast.success(isEditing ? "Product updated." : "Product created.");
      setFormOpen(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save product",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/institutional-products/${deleteTarget.id}`,
        { method: "DELETE" },
      );
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete product");
      }
      toast.success("Product deleted.");
      setDeleteTarget(null);
      await loadProducts();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<InstitutionalProduct>[] = [
    {
      key: "name",
      header: "Product",
      render: (product) => {
        const imageUrl = getImageUrl(product.image);
        return (
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
              />
            ) : (
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100 ring-1 ring-black/5" />
            )}
            <p className="font-medium text-gray-900">{product.name}</p>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            product.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {product.is_active ? "Published" : "Draft"}
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
              Institutional Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the institutional products shown on the public brands page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Product
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
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
            data={filteredProducts}
            rowKey={(product) => product.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No institutional products found."
            mobileTitle={(product) => product.name}
            renderActions={(product) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(product);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`Edit ${product.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(product)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <InstitutionalProductFormDialog
        open={formOpen}
        initialData={editingProduct}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingProduct(null);
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
