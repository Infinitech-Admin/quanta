"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, Mail, MailOpen, Search, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiListResponse, ContactSubmission } from "@/types/contact-submission";

const PAGE_SIZE = 10;

export default function AdminContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"All" | "Unread" | "Read">(
    "All",
  );

  const [viewing, setViewing] = useState<ContactSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Used by event handlers (delete) to refresh the list. Not called from
  // an effect, so setIsLoading(true) here doesn't trip set-state-in-effect.
  async function loadSubmissions() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/contact-submissions", {
        cache: "no-store",
      });
      const json: ApiListResponse<ContactSubmission> = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load submissions");
      }
      setSubmissions(json.data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to load submissions",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    // Initial mount load. isLoading already starts as `true`, so no
    // setState runs synchronously here — the first setState happens
    // only after the fetch resolves.
    async function loadInitialSubmissions() {
      try {
        const res = await fetch("/api/admin/contact-submissions", {
          cache: "no-store",
        });
        const json: ApiListResponse<ContactSubmission> = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load submissions");
        }
        if (!ignore) setSubmissions(json.data);
      } catch (err) {
        if (!ignore) {
          toast.error(
            err instanceof Error ? err.message : "Failed to load submissions",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadInitialSubmissions();

    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchesRead =
        readFilter === "All" ||
        (readFilter === "Unread" && !s.is_read) ||
        (readFilter === "Read" && s.is_read);
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q);
      return matchesRead && matchesSearch;
    });
  }, [submissions, readFilter, search]);

  async function handleView(submission: ContactSubmission) {
    setViewing(submission);
    if (!submission.is_read) {
      try {
        const res = await fetch(
          `/api/admin/contact-submissions/${submission.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_read: true }),
          },
        );
        if (res.ok) {
          setSubmissions((prev) =>
            prev.map((s) =>
              s.id === submission.id ? { ...s, is_read: true } : s,
            ),
          );
        }
      } catch {
        // Non-critical — the list will just show it as unread until refresh.
      }
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/contact-submissions/${deleteTarget.id}`,
        { method: "DELETE" },
      );
      const json = await res.json().catch(() => ({ success: res.ok }));
      if (!res.ok || json.success === false) {
        throw new Error(json.message || "Failed to delete submission");
      }
      toast.success("Submission deleted.");
      setDeleteTarget(null);
      await loadSubmissions();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete submission",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: Column<ContactSubmission>[] = [
    {
      key: "name",
      header: "From",
      render: (s) => (
        <div className="flex items-center gap-2">
          {s.is_read ? (
            <MailOpen className="h-4 w-4 shrink-0 text-gray-400" />
          ) : (
            <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
          )}
          <div>
            <p
              className={`font-medium ${s.is_read ? "text-gray-700" : "text-gray-900"}`}
            >
              {s.name}
            </p>
            <p className="text-xs text-gray-400">{s.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (s) => <span className="text-gray-700">{s.subject}</span>,
    },
    {
      key: "email_sent",
      header: "Email",
      render: (s) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            s.email_sent
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {s.email_sent ? "Sent" : "Failed"}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Received",
      render: (s) => (
        <span className="text-gray-500">
          {new Date(s.created_at).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Contact Submissions
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Messages sent through the public contact form.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or subject…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <select
            value={readFilter}
            onChange={(e) =>
              setReadFilter(e.target.value as "All" | "Unread" | "Read")
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:w-48"
          >
            <option value="All">All messages</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(s) => s.id}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            emptyMessage="No contact submissions found."
            mobileTitle={(s) => s.name}
            renderActions={(s) => (
              <>
                <button
                  type="button"
                  onClick={() => handleView(s)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  aria-label={`View message from ${s.name}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(s)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete message from ${s.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          />
        </div>
      </div>

      <Dialog
        open={Boolean(viewing)}
        onOpenChange={(open) => !open && setViewing(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewing?.subject}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-3 text-sm">
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">
                  {viewing.name}
                </span>{" "}
                &lt;{viewing.email}&gt;
              </p>
              <p className="text-xs text-gray-400">
                {new Date(viewing.created_at).toLocaleString()}
              </p>
              <p className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700">
                {viewing.message}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete message from "${deleteTarget?.name}"?`}
        description="This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
