// components/admin/institutional-product-form-dialog.tsx
"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { InstitutionalProductImageDropzone } from "@/components/admin/institutional-product-image-dropzone";
import {
  InstitutionalProduct,
  InstitutionalProductFormValues,
} from "@/types/institutional-product";

interface InstitutionalProductFormDialogProps {
  open: boolean;
  initialData: InstitutionalProduct | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: InstitutionalProductFormValues) => void;
}

const EMPTY_FORM: InstitutionalProductFormValues = {
  name: "",
  image: null,
  is_active: true,
};

function initialValuesFrom(
  initialData: InstitutionalProduct | null,
): InstitutionalProductFormValues {
  if (!initialData) return EMPTY_FORM;
  const { id, created_at, updated_at, ...rest } = initialData;
  return rest;
}

export function InstitutionalProductFormDialog({
  open,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: InstitutionalProductFormDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
          {/* Mounting the form only while the dialog is open (and keying it
              by which record is being edited) means its local state is
              always freshly derived from `initialData` right on mount —
              there's no need for an effect to "reset" it after the fact,
              which is what was tripping the set-state-in-effect rule. */}
          {open && (
            <ProductForm
              key={initialData?.id ?? "new"}
              initialData={initialData}
              isSubmitting={isSubmitting}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProductForm({
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: Omit<InstitutionalProductFormDialogProps, "open">) {
  const [values, setValues] = useState<InstitutionalProductFormValues>(() =>
    initialValuesFrom(initialData),
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof InstitutionalProductFormValues, string>>
  >({});
  const isEditing = Boolean(initialData);

  function update<K extends keyof InstitutionalProductFormValues>(
    key: K,
    value: InstitutionalProductFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<
      Record<keyof InstitutionalProductFormValues, string>
    > = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Dialog.Title className="text-lg font-semibold text-gray-900">
          {isEditing ? "Edit Product" : "New Product"}
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
        <Field label="Product name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Hand Sanitizer"
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <InstitutionalProductImageDropzone
          label="Product image"
          helperText="Shown in the institutional products grid on the public brands page."
          value={values.image}
          onChange={(url) => update("image", url)}
        />
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={values.is_active}
            onChange={(e) => update("is_active", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
          />
          Show this product on the public brands page
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
                : "Create product"}
          </button>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
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
