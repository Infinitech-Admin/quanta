"use client";

import { ArrowDown, ArrowUp, Plus, Trash2, X } from "lucide-react";
import type { JobSection } from "@/types/job-listing";

const SUGGESTED_LABELS = [
  "Job Specifications",
  "What We're Looking For",
  "Education",
  "Work Experience",
  "Competencies and Skills",
  "Key Responsibilities",
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

function autoResize(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

interface SectionsFieldProps {
  sections: JobSection[];
  onChange: (sections: JobSection[]) => void;
}

export function SectionsField({ sections, onChange }: SectionsFieldProps) {
  function updateSection(index: number, patch: Partial<JobSection>) {
    onChange(sections.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function removeSection(index: number) {
    onChange(sections.filter((_, i) => i !== index));
  }

  function moveSection(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function addSection(title = "") {
    onChange([...sections, { title, items: [""] }]);
  }

  function updateItem(si: number, li: number, value: string) {
    const items = sections[si].items.map((it, i) => (i === li ? value : it));
    updateSection(si, { items });
  }

  function addItemAfter(si: number, li: number) {
    const items = [...sections[si].items];
    items.splice(li + 1, 0, "");
    updateSection(si, { items });
    // Focus the new line once React has rendered it.
    setTimeout(() => {
      document
        .querySelector<HTMLTextAreaElement>(`[data-line="${si}-${li + 1}"]`)
        ?.focus();
    }, 0);
  }

  function removeItem(si: number, li: number) {
    const items = sections[si].items.filter((_, i) => i !== li);
    updateSection(si, { items: items.length ? items : [""] });
  }

  const usedTitles = new Set(sections.map((s) => s.title.trim().toLowerCase()));
  const suggestions = SUGGESTED_LABELS.filter(
    (l) => !usedTitles.has(l.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {sections.length === 0 && (
        <p className="rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
          No sections yet. Add one below, then type its label and lines.
        </p>
      )}

      {sections.map((section, si) => (
        <div
          key={si}
          className="rounded-xl border border-gray-200 bg-gray-50/60 p-4"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Section label
              </label>
              <input
                required
                type="text"
                value={section.title}
                onChange={(e) => updateSection(si, { title: e.target.value })}
                className={`${inputClass} font-medium`}
                placeholder="e.g. Job Specifications"
              />
            </div>
            <div className="mt-6 flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={() => moveSection(si, -1)}
                disabled={si === 0}
                aria-label="Move section up"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(si, 1)}
                disabled={si === sections.length - 1}
                aria-label="Move section down"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeSection(si)}
                aria-label="Delete section"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {section.items.map((item, li) => (
              <div key={li} className="flex items-start gap-2">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                <textarea
                  data-line={`${si}-${li}`}
                  rows={1}
                  value={item}
                  ref={autoResize}
                  onInput={(e) => autoResize(e.currentTarget)}
                  onChange={(e) => updateItem(si, li, e.target.value)}
                  onKeyDown={(e) => {
                    // Enter adds a new line; Shift+Enter is not needed for bullets.
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addItemAfter(si, li);
                    }
                  }}
                  className={`${inputClass} resize-none overflow-hidden leading-relaxed`}
                  placeholder="Type a line, press Enter for the next"
                />
                <button
                  type="button"
                  onClick={() => removeItem(si, li)}
                  aria-label="Remove line"
                  className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addItemAfter(si, section.items.length - 1)}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Plus className="h-4 w-4" />
            Add line
          </button>
        </div>
      ))}

      <div className="rounded-xl border border-dashed border-gray-300 p-4">
        <button
          type="button"
          onClick={() => addSection()}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-gray-950"
        >
          <Plus className="h-4 w-4" />
          Add section
        </button>

        {suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Quick add:</span>
            {suggestions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => addSection(label)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
