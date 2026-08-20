"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CustomerImageDropzone } from "@/components/admin/customer-image-dropzone";
import { Customer, CustomerFormValues } from "@/types/customer";

interface CustomerFormDialogProps {
  open: boolean;
  initialData: Customer | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: CustomerFormValues) => void;
}

const EMPTY_FORM: CustomerFormValues = {
  name: "",
  logo: null,
  sort_order: 0,
  is_active: true,
};

function buildFormValues(initialData: Customer | null): CustomerFormValues {
  if (!initialData) return EMPTY_FORM;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...rest } = initialData;
  return rest;
}

export function CustomerFormDialog({
  open,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: CustomerFormDialogProps) {
  const [values, setValues] = useState<CustomerFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerFormValues, string>>
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
      setErrors({});
    }
  }

  function update<K extends keyof CustomerFormValues>(
    key: K,
    value: CustomerFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof CustomerFormValues, string>> = {};
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
    <Dialog.Root open={open} onOpenChange={(next) => !next && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Customer" : "New Customer"}
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
            <Field label="Customer name" error={errors.name}>
              <input
                type="text"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Acme Corp"
                className={inputClass(Boolean(errors.name))}
              />
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

            <CustomerImageDropzone
              label="Logo"
              helperText="Transparent PNG works best."
              value={values.logo}
              onChange={(url) => update("logo", url)}
            />

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={values.is_active}
                onChange={(e) => update("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
              />
              Show this customer on the homepage
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
                    : "Create customer"}
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
