// app/admin/news/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  NewsFormDialog,
  NewsFormValues,
} from "@/components/admin/news-form-dialog";
import { getImageUrl } from "@/lib/image-url";
import type { ApiListResponse, ApiNews } from "@/types/news";

const PAGE_SIZE = 10;

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<ApiNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ApiNews | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<ApiNews | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadArticles() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/news", { cache: "no-store" });
      const json: ApiListResponse<ApiNews> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load articles");
      }
      setArticles(json.data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load articles",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch("/api/admin/news", { cache: "no-store" });
        const json: ApiListResponse<ApiNews> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load articles");
        }
        if (!ignore) setArticles(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load articles",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  // Categories are whatever has been typed manually in existing articles.
  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      return (
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, category, search]);

  async function handleSave(values: NewsFormValues) {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("category", values.category);
      formData.set("published_at", values.published_at);
      formData.set("excerpt", values.excerpt);
      formData.set("content", values.content);
      if (values.cover) formData.set("cover_image", values.cover);
      values.files.forEach((f) => formData.append("images[]", f));
      values.removeIds.forEach((id) =>
        formData.append("remove_image_ids[]", String(id)),
      );

      const url = editing ? `/api/admin/news/${editing.id}` : "/api/admin/news";
      const res = await fetch(url, { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save");
      }

      toast.success(editing ? "Article updated." : "Article published.");
      setFormOpen(false);
      setEditing(null);
      await loadArticles();
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
      const res = await fetch(`/api/admin/news/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete article");
      }
      toast.success("Article deleted.");
      setDeleteTarget(null);
      await loadArticles();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete article",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<ApiNews>[] = [
    {
      key: "cover",
      header: "Cover",
      render: (a) => {
        const url = getImageUrl(a.cover_image ?? a.images[0]?.image ?? null);
        return url ? (
          <Image
            src={url}
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
      key: "title",
      header: "Title",
      render: (a) => (
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900">{a.title}</p>
          <p className="truncate text-xs text-gray-400">/news/{a.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (a) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {a.category}
        </span>
      ),
    },
    {
      key: "images",
      header: "Photos",
      render: (a) => <span className="text-gray-600">{a.images.length}</span>,
    },
    {
      key: "published_at",
      header: "Date",
      render: (a) => (
        <span className="text-gray-600">{a.published_at.slice(0, 10)}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">News</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the stories shown on the public news page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Article
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or category…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-56"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(a) => a.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No articles found."
            mobileTitle={(a) => a.title}
            renderActions={(a) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(a);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label="Edit article"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(a)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete article"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <NewsFormDialog
        open={formOpen}
        initialData={editing}
        categories={categories}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this article?"
        description="This action cannot be undone. The article and all its photos will be removed from the public news page."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
