// components/admin/news-form-dialog.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { ApiNews } from "@/types/news";
import { getImageUrl } from "@/lib/image-url";

export type NewsFormValues = {
  title: string;
  category: string;
  published_at: string;
  excerpt: string;
  content: string;
  is_featured: boolean;
  cover: File | null;
  files: File[]; // gallery images (multi upload)
  removeIds: number[]; // existing gallery images to delete (edit only)
};

type Props = {
  open: boolean;
  initialData: ApiNews | null;
  categories: string[]; // suggestions only; any text is allowed
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: NewsFormValues) => void;
};

export function NewsFormDialog(props: Props) {
  if (!props.open) return null;
  // key remounts the form so state resets for each article / new item
  return <FormBody key={props.initialData?.id ?? "new"} {...props} />;
}

const input =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

function FormBody({
  initialData,
  categories,
  isSubmitting,
  onCancel,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at.slice(0, 10) ??
      new Date().toISOString().slice(0, 10),
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [isFeatured, setIsFeatured] = useState(
    Boolean(initialData?.is_featured),
  );
  const [cover, setCover] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [removeIds, setRemoveIds] = useState<number[]>([]);

  const canSubmit = title.trim() && category.trim() && !isSubmitting;

  function toggleRemove(id: number) {
    setRemoveIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit article" : "New article"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-6 py-5">
          <Field
            label="Title"
            hint="The page URL (slug) is generated from this automatically."
          >
            <input
              className={input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Category"
              hint="Type any category, or pick an existing one."
            >
              <input
                className={input}
                list="news-categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Company Milestone"
              />
              <datalist id="news-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Date">
              <input
                type="date"
                className={input}
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </Field>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300"
            />
            <span>
              <span className="block text-sm font-medium text-gray-800">
                Featured article
              </span>
              <span className="block text-xs text-gray-500">
                Shows the “Featured” badge on the homepage newsroom.
              </span>
            </span>
          </label>

          <Field
            label="Short summary"
            hint="Shown on cards and under the article title."
          >
            <textarea
              rows={2}
              maxLength={500}
              className={input}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </Field>

          <Field
            label="Article body"
            hint="Blank line = new paragraph. Start a line with “## ” for a heading, or “> ” for a pull quote."
          >
            <textarea
              rows={9}
              className={input}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>

          <Field
            label="Cover image"
            hint={
              initialData?.cover_image
                ? "Leave empty to keep the current cover."
                : "Leave empty to use the first gallery image."
            }
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setCover(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
            />
          </Field>

          <Field
            label="Gallery images"
            hint="Select as many as you like. You can add more than once."
          >
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []);
                setFiles((prev) => [...prev, ...picked]);
                e.target.value = ""; // allow re-picking the same file
              }}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
            />

            {files.length > 0 && (
              <ul className="mt-3 space-y-1">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-700"
                  >
                    <span className="truncate">{f.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((p) => p.filter((_, j) => j !== i))
                      }
                      className="ml-3 text-gray-400 hover:text-red-600"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {initialData && initialData.images.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-xs text-gray-500">
                  Current gallery. Click an image to mark it for removal.
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {initialData.images.map((img) => {
                    const marked = removeIds.includes(img.id);
                    const url = getImageUrl(img.image);
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => toggleRemove(img.id)}
                        className={`relative aspect-square overflow-hidden rounded-lg ring-2 ${
                          marked
                            ? "opacity-40 ring-red-500"
                            : "ring-transparent"
                        }`}
                      >
                        {url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                        {marked && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-700">
                            REMOVE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </Field>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              onSubmit({
                title: title.trim(),
                category: category.trim(),
                published_at: publishedAt,
                excerpt: excerpt.trim(),
                content,
                is_featured: isFeatured,
                cover,
                files,
                removeIds,
              })
            }
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving…"
              : initialData
                ? "Save changes"
                : "Publish article"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-800">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}