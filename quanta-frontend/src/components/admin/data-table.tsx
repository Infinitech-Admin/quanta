"use client";

import { ReactNode, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export type Column<T> = {
  /** Unique key for the column (also used as the mobile-card label key) */
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  /** Hide this column in the compact mobile-card view */
  hideOnMobile?: boolean;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  /** Rows per page — pagination happens entirely client-side */
  pageSize?: number;
  emptyMessage?: string;
  isLoading?: boolean;
  renderActions?: (row: T) => ReactNode;
  /** Optional element rendered as the card title on mobile (defaults to first column) */
  mobileTitle?: (row: T) => ReactNode;
}

/**
 * Generic, reusable data table.
 *
 * - Frontend-only pagination: the full `data` array is passed in and this
 *   component slices it locally — no network requests happen on page
 *   change.
 * - Responsive: renders a real <table> at md+ and a stacked card list on
 *   small screens.
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  pageSize = 10,
  emptyMessage = "No records found.",
  isLoading = false,
  renderActions,
  mobileTitle,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // Keep the current page in range whenever the underlying data set shrinks
  // (e.g. after a delete or a search filter). Clamped synchronously during
  // render — the React-recommended alternative to doing this in an effect.
  // See: https://react.dev/learn/you-might-not-need-an-effect
  const [prevTotalPages, setPrevTotalPages] = useState(totalPages);
  if (totalPages !== prevTotalPages) {
    setPrevTotalPages(totalPages);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const rangeStart = data.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, data.length);

  return (
    <div className="w-full">
      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-4 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </td>
              </tr>
            ) : pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row) => (
                <tr key={rowKey(row)} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 align-middle ${col.className ?? ""}`}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {renderActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {isLoading ? (
          <div className="flex justify-center rounded-xl border border-gray-200 bg-white py-10">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : pageData.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-10 text-center text-sm text-gray-400">
            {emptyMessage}
          </div>
        ) : (
          pageData.map((row) => (
            <div
              key={rowKey(row)}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-semibold text-gray-900">
                  {mobileTitle ? mobileTitle(row) : columns[0]?.render(row)}
                </div>
                {renderActions && (
                  <div className="flex shrink-0 gap-2">
                    {renderActions(row)}
                  </div>
                )}
              </div>
              <dl className="mt-2 space-y-1">
                {columns
                  .filter((col) => !col.hideOnMobile)
                  .slice(mobileTitle ? 0 : 1)
                  .map((col) => (
                    <div
                      key={col.key}
                      className="flex justify-between gap-3 text-sm"
                    >
                      <dt className="text-gray-400">{col.header}</dt>
                      <dd className="text-right text-gray-700">
                        {col.render(row)}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      {data.length > 0 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">{rangeStart}</span>–
            <span className="font-medium text-gray-700">{rangeEnd}</span> of{" "}
            <span className="font-medium text-gray-700">{data.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-gray-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<number[]>((acc, p) => {
                if (acc.length && p - acc[acc.length - 1] > 1) acc.push(-1); // gap marker
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === -1 ? (
                  <span key={`gap-${i}`} className="px-1 text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-gray-50"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
