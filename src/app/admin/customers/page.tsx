"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CustomerFormDialog } from "@/components/admin/customer-form-dialog";
import {
  ApiItemResponse,
  ApiListResponse,
  Customer,
  CustomerFormValues,
} from "@/types/customer";
import { getImageUrl } from "@/lib/image-url";

const PAGE_SIZE = 10;

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadCustomers() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/customers", { cache: "no-store" });
      const json: ApiListResponse<Customer> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load customers");
      }
      setCustomers([...json.data].sort((a, b) => a.sort_order - b.sort_order));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load customers",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialCustomers() {
      try {
        const res = await fetch("/api/admin/customers", { cache: "no-store" });
        const json: ApiListResponse<Customer> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load customers");
        }
        if (!ignore) {
          setCustomers(
            [...json.data].sort((a, b) => a.sort_order - b.sort_order),
          );
        }
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load customers",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialCustomers();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleCreateOrUpdate(values: CustomerFormValues) {
    setIsSaving(true);
    try {
      const isEditing = Boolean(editingCustomer);
      const url = isEditing
        ? `/api/admin/customers/${editingCustomer!.id}`
        : "/api/admin/customers";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json: ApiItemResponse<Customer> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save customer");
      }

      toast.success(isEditing ? "Customer updated." : "Customer created.");
      setFormOpen(false);
      setEditingCustomer(null);
      await loadCustomers();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save customer",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/customers/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete customer");
      }
      toast.success("Customer deleted.");
      setDeleteTarget(null);
      await loadCustomers();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete customer",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      render: (customer) => {
        const logoUrl = getImageUrl(customer.logo);
        return (
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={customer.name}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-lg object-contain ring-1 ring-black/5"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-400 ring-1 ring-black/5">
                {customer.name.charAt(0)}
              </div>
            )}
            <p className="font-medium text-gray-900">{customer.name}</p>
          </div>
        );
      },
    },
    {
      key: "sort_order",
      header: "Order",
      render: (customer) => (
        <span className="text-gray-600">{customer.sort_order}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (customer) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            customer.is_active
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {customer.is_active ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the customer logos shown on the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingCustomer(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Customer
          </button>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={customers}
            rowKey={(customer) => customer.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No customers found."
            mobileTitle={(customer) => customer.name}
            renderActions={(customer) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCustomer(customer);
                    setFormOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`Edit ${customer.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(customer)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${customer.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <CustomerFormDialog
        open={formOpen}
        initialData={editingCustomer}
        isSubmitting={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleCreateOrUpdate}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This action cannot be undone. It will also disappear from the homepage."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
