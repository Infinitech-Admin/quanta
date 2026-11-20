// app/admin/gallery/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

import {
  ApiListResponse,
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  GalleryImage,
} from "@/types/gallery";
import {
  GalleryFormDialog,
  GalleryBulkFormValues,
} from "@/components/admin/gallery-form-dialog";
import { getImageUrl } from "@/lib/image-url";

const PAGE_SIZE = 10;

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | GalleryImage["category"]>(
    "All",
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Used by event handlers (create/update/delete) to refresh the list.
  // Sets isLoading(true) itself since it isn't called from an effect body.
  async function loadImages() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      const json: ApiListResponse<GalleryImage> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load images");
      }
      setImages(json.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    // Initial mount load. isLoading already starts as `true`, so this
    // effect never calls setState synchronously — the first setState
    // happens only after the fetch resolves.
    async function loadInitialImages() {
      try {
        const res = await fetch("/api/admin/gallery", { cache: "no-store" });
        const json: ApiListResponse<GalleryImage> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load images");
        }
        if (!ignore) setImages(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load images",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialImages();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredImages = useMemo(() => {
    return images
      .filter((img) => {
        const matchesCategory = category === "All" || img.category === category;
        const q = search.trim().toLowerCase();
        const matchesSearch =
          q.length === 0 || img.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.sort_order - b.sort_order);
  }, [images, category, search]);

  async function handleCreateOrUpdate(values: GalleryBulkFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingImage);

      const formData = new FormData();
      formData.set("category", values.category);
      formData.set("sort_order", String(values.sort_order));

      if (isEditing && values.files[0]) {
        formData.set("image", values.files[0]);
      } else {
        values.files.forEach((file) => {
          formData.append("images[]", file);
        });
      }

      const url = isEditing
        ? `/api/admin/gallery/${editingImage!.id}`
        : "/api/admin/gallery";

      const res = await fetch(url, { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save");
      }

      toast.success(
        isEditing
          ? "Image updated."
          : values.files.length > 1
            ? `${values.files.length} images added.`
            : "Image added.",
      );
      setFormOpen(false);
      setEditingImage(null);
      await loadImages();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete image");
      }
      toast.success("Image deleted.");
      setDeleteTarget(null);
      await loadImages();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete image",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<GalleryImage>[] = [
    {
      key: "image",
      header: "Image",
      render: (img) => {
        const imageUrl = getImageUrl(img.image);
        return imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
          />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-100 ring-1 ring-black/5" />
        );
      },
    },
    {
      key: "category",
      header: "Category",
      render: (img) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {GALLERY_CATEGORY_LABELS[img.category]}
        </span>
      ),
    },
    {
      key: "sort_order",
      header: "Order",
      render: (img) => <span className="text-gray-600">{img.sort_order}</span>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the images shown on the public gallery page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingImage(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Image
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | GalleryImage["category"])
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-56"
          >
            <option value="All">All categories</option>
            {GALLERY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {GALLERY_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filteredImages}
            rowKey={(img) => img.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No images found."
            mobileTitle={(img) => GALLERY_CATEGORY_LABELS[img.category]}
            renderActions={(img) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingImage(img);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Edit image"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(img)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <GalleryFormDialog
        open={formOpen}
        initialData={editingImage}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingImage(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this image?"
        description="This action cannot be undone. It will also disappear from the public gallery page."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
