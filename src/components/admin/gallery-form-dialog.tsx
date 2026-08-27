// components/admin/gallery-form-dialog.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  GalleryImage,
} from "@/types/gallery";
import { getImageUrl } from "@/lib/image-url";

// Must stay in sync with the server's php.ini `max_file_uploads` setting
// (and the "images" max:20 validation rule in GalleryController@store).
const MAX_FILES = 20;

export interface GalleryBulkFormValues {
  category: GalleryImage["category"];
  sort_order: number;
  files: File[]; // empty when editing without changing the image
}

interface GalleryFormDialogProps {
  open: boolean;
  initialData: GalleryImage | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: GalleryBulkFormValues) => void;
}

export function GalleryFormDialog({
  open,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: GalleryFormDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Mounting the form only while the dialog is open (and keying it by
          which record is being edited) means its local state is always
          freshly derived from `initialData` right on mount — no effect
          needed to "reset" it afterwards, which is what tripped the
          set-state-in-effect rule. */}
      <GalleryForm
        key={initialData?.id ?? "new"}
        initialData={initialData}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
}

function GalleryForm({
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: Omit<GalleryFormDialogProps, "open">) {
  const isEditing = Boolean(initialData);

  const [category, setCategory] = useState<GalleryImage["category"]>(
    initialData?.category ?? "gift-giving",
  );
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(
    initialData ? [getImageUrl(initialData.image) ?? ""] : [],
  );
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    if (isEditing) {
      // Editing a single existing item still only accepts one replacement image.
      const single = selected[0];
      setFiles([single]);
      setPreviews([URL.createObjectURL(single)]);
      return;
    }

    setFiles((prev) => {
      const combined = [...prev, ...selected];

      if (combined.length > MAX_FILES) {
        setError(
          `You can only upload up to ${MAX_FILES} images at once. Only the first ${MAX_FILES} were kept — remove some and try again for the rest.`,
        );
      } else {
        setError(null);
      }

      const capped = combined.slice(0, MAX_FILES);

      setPreviews((prevPreviews) => {
        const combinedPreviews = [
          ...prevPreviews,
          ...selected.map((f) => URL.createObjectURL(f)),
        ];
        return combinedPreviews.slice(0, MAX_FILES);
      });

      return capped;
    });
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditing && files.length === 0) {
      setError("Please choose at least one image.");
      return;
    }
    if (files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} images at once.`);
      return;
    }
    setError(null);
    onSubmit({ category, sort_order: sortOrder, files });
  }

  return (
    // Cap the dialog to the viewport height and lay it out as header / scrollable body / footer,
    // so it never grows past the screen no matter how many images are added.
    <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
      <div className="shrink-0 border-b border-gray-100 p-6 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Edit Image" : "Add Images"}
        </h2>
        {!isEditing && (
          <p className="mt-1 text-sm text-gray-500">
            Select up to {MAX_FILES} images at once — they&apos;ll all be added
            to the same category.
            {files.length > 0 && (
              <span
                className={`ml-1 font-medium ${
                  files.length >= MAX_FILES ? "text-red-600" : "text-gray-700"
                }`}
              >
                {files.length}/{MAX_FILES} selected
              </span>
            )}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        {/* Only this middle section scrolls; header and action buttons stay put. */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Images
            </label>

            {previews.length > 0 && (
              <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-black/5"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      unoptimized={src.startsWith("blob:")}
                      className="object-cover"
                    />
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100"
                        aria-label="Remove"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isEditing || files.length < MAX_FILES ? (
              <label className="flex h-24 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500 hover:border-gray-400">
                <ImagePlus className="h-5 w-5" />
                {isEditing ? "Replace image" : "Click to add images"}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple={!isEditing}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex h-24 items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-100 text-sm text-gray-400">
                <ImagePlus className="h-5 w-5" />
                Limit reached ({MAX_FILES} max)
              </div>
            )}
            {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as GalleryImage["category"])
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {GALLERY_CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Starting sort order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-gray-100 p-6 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {isSubmitting
              ? "Saving…"
              : isEditing
                ? "Save changes"
                : files.length > 1
                  ? `Add ${files.length} images`
                  : "Add image"}
          </button>
        </div>
      </form>
    </div>
  );
}
