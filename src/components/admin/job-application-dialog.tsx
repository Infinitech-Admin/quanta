// components/admin/job-application-dialog.tsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Download, ExternalLink, X } from "lucide-react";
import { STATUS_STYLES, type JobApplication } from "@/types/job-application";

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Read-only view of one application, with CV download. */
export function JobApplicationDialog({
  application,
  onClose,
}: {
  application: JobApplication;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function downloadCv() {
    try {
      const res = await fetch(
        `/api/admin/job-applications/${application.id}/cv`,
      );
      if (!res.ok) throw new Error("CV file not found.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = application.cv_original_name;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to download CV");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:py-10"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div>
            <h2
              id="application-title"
              className="text-lg font-semibold text-gray-900"
            >
              {application.full_name}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {application.position} · {application.location}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              Applied {formatDate(application.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[application.status]}`}
            >
              {application.status}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <dl className="grid gap-5 px-6 py-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-gray-400">Email</dt>
            <dd className="mt-0.5 break-all text-gray-900">
              <a
                href={`mailto:${application.email}`}
                className="hover:underline"
              >
                {application.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-400">Phone</dt>
            <dd className="mt-0.5 text-gray-900">
              <a href={`tel:${application.phone}`} className="hover:underline">
                {application.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-400">Portfolio / demo reel</dt>
            <dd className="mt-0.5 text-gray-900">
              {application.portfolio ? (
                <a
                  href={application.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 break-all hover:underline"
                >
                  {application.portfolio}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-400">CV / Résumé</dt>
            <dd className="mt-0.5">
              <button
                type="button"
                onClick={downloadCv}
                className="inline-flex items-center gap-1.5 text-gray-900 hover:underline"
              >
                <Download className="h-3.5 w-3.5" />
                {application.cv_original_name}
                <span className="text-xs text-gray-400">
                  {formatSize(application.cv_size)}
                </span>
              </button>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-gray-400">Introduction</dt>
            <dd className="mt-0.5 whitespace-pre-wrap text-gray-900">
              {application.introduction || (
                <span className="text-gray-400">None</span>
              )}
            </dd>
          </div>
          {application.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-gray-400">Internal notes</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-gray-900">
                {application.notes}
              </dd>
            </div>
          )}
        </dl>

        {/* TODO: email actions (nodemailer) go here later */}

        <div className="flex justify-end border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
