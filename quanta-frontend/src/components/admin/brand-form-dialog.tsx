"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  GradientPicker,
  GradientValue,
} from "@/components/admin/gradient-picker";
import { ImageDropzone } from "@/components/admin/image-dropzone";
import { MultiImageDropzone } from "@/components/admin/multi-image-dropzone";
import { FeatureListEditor } from "@/components/admin/feature-list-editor";
import {
  Brand,
  BrandCategory,
  BrandFormValues,
  BRAND_CATEGORIES,
} from "@/types/brand";

interface BrandFormDialogProps {
  open: boolean;
  initialData: Brand | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: BrandFormValues) => void;
}

const DEFAULT_GRADIENT: GradientValue = {
  color: "#16a34a",
  gradient: "linear-gradient(135deg, #0f7a37 0%, #16a34a 50%, #4ade80 100%)",
};

const EMPTY_FORM: BrandFormValues = {
  slug: "",
  name: "",
  description: "",
  features: [],
  category: "Paper",
  color: DEFAULT_GRADIENT.color,
  gradient: DEFAULT_GRADIENT.gradient,
  image: null,
  heroImage: null,
  images: [],
  sort_order: 0,
  is_active: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildFormValues(initialData: Brand | null): BrandFormValues {
  if (!initialData) return EMPTY_FORM;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...rest } = initialData;
  return { ...rest, images: rest.images ?? [] };
}

export function BrandFormDialog({
  open,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: BrandFormDialogProps) {
  const [values, setValues] = useState<BrandFormValues>(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BrandFormValues, string>>
  >({});
  const isEditing = Boolean(initialData);

  // Adjust form state during render when the dialog opens or the record
  // being edited changes — the React-recommended alternative to resetting
  // state in an effect. See: https://react.dev/learn/you-might-not-need-an-effect
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (open !== prevOpen || initialData !== prevInitialData) {
    setPrevOpen(open);
    setPrevInitialData(initialData);

    if (open) {
      setValues(buildFormValues(initialData));
      setSlugTouched(Boolean(initialData));
      setErrors({});
    }
  }

  function update<K extends keyof BrandFormValues>(
    key: K,
    value: BrandFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) {
      update("slug", slugify(name));
    }
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof BrandFormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.slug.trim()) nextErrors.slug = "Slug is required.";
    if (!values.description.trim())
      nextErrors.description = "Description is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // Drop any blank feature rows left over from the editor before saving.
    onSubmit({
      ...values,
      features: values.features.map((f) => f.trim()).filter(Boolean),
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Brand" : "New Brand"}
            </Dialog.Title>
            <Dialog.Close
              onClick={onCancel}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Brand name" error={errors.name}>
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Fresh"
                  className={inputClass(Boolean(errors.name))}
                />
              </Field>

              <Field
                label="Web address (auto-filled)"
                error={errors.slug}
                helperText="This is the link people will use to view the brand. You usually don't need to change it."
              >
                <input
                  type="text"
                  value={values.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value));
                  }}
                  placeholder="fresh"
                  className={inputClass(Boolean(errors.slug))}
                />
              </Field>
            </div>

            <Field label="Description" error={errors.description}>
              <textarea
                value={values.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                placeholder="High grade tissue that is absorbent, hygienic and environment-friendly…"
                className={inputClass(Boolean(errors.description))}
              />
            </Field>

            <Field
              label="Highlights"
              helperText="Short points shown with a checkmark under the description."
            >
              <FeatureListEditor
                value={values.features}
                onChange={(features) => update("features", features)}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Category">
                <select
                  value={values.category}
                  onChange={(e) =>
                    update("category", e.target.value as BrandCategory)
                  }
                  className={inputClass(false)}
                >
                  {BRAND_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Display order"
                helperText="Lower numbers show up first."
              >
                <input
                  type="number"
                  value={values.sort_order}
                  onChange={(e) =>
                    update("sort_order", Number(e.target.value) || 0)
                  }
                  className={inputClass(false)}
                />
              </Field>
            </div>

            <Field
              label="Card color"
              helperText="Pick a ready-made style, or choose your own colors — no design experience needed."
            >
              <GradientPicker
                value={{ color: values.color, gradient: values.gradient }}
                onChange={(next) => {
                  update("color", next.color);
                  update("gradient", next.gradient);
                }}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ImageDropzone
                label="Thumbnail image"
                helperText="Shown in the small brand grid. A square logo or product photo works best."
                value={values.image}
                onChange={(url) => update("image", url)}
                uploadFolder="brands"
              />
              <ImageDropzone
                label="Hero image"
                helperText="Shown in the large featured card. A wide, high-quality photo works best."
                value={values.heroImage}
                onChange={(url) => update("heroImage", url)}
                uploadFolder="brands/hero"
              />
            </div>

            <Field
              label="Gallery images"
              helperText="Extra photos shown on the brand's detail page. Add as many as you like."
            >
              <MultiImageDropzone
                value={values.images}
                onChange={(urls) => update("images", urls)}
                uploadFolder="brands/gallery"
              />
            </Field>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={values.is_active}
                onChange={(e) => update("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
              />
              Show this brand on the public brands page
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Saving…"
                  : isEditing
                    ? "Save changes"
                    : "Create brand"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label,
  error,
  helperText,
  children,
}: {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
      {helperText && !error && (
        <span className="mt-1 block text-xs text-gray-400">{helperText}</span>
      )}
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
  }`;
}
