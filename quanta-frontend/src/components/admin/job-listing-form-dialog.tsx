"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  DEPARTMENTS,
  JobListing,
  JobListingFormValues,
} from "@/types/job-listing";
import { BulletListField } from "@/components/admin/bullet-list-field";

interface JobListingFormDialogProps {
  open: boolean;
  initialData?: JobListing | null;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: JobListingFormValues) => void;
}

const emptyValues: JobListingFormValues = {
  title: "",
  slug: "",
  location: "",
  department: DEPARTMENTS[0],
  job_summary: "",
  education: [""],
  work_experience: [""],
  competencies_skills: [""],
  key_responsibilities: [""],
  is_active: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Strips fully-blank rows before saving so empty bullets don't get persisted.
function cleanList(items: string[]): string[] {
  return items.map((i) => i.trim()).filter((i) => i.length > 0);
}

function initialValuesFrom(
  initialData: JobListing | null | undefined,
): JobListingFormValues {
  if (!initialData) return emptyValues;
  return {
    title: initialData.title,
    slug: initialData.slug,
    location: initialData.location,
    department: initialData.department,
    job_summary: initialData.job_summary ?? "",
    education: initialData.education.length ? initialData.education : [""],
    work_experience: initialData.work_experience.length
      ? initialData.work_experience
      : [""],
    competencies_skills: initialData.competencies_skills.length
      ? initialData.competencies_skills
      : [""],
    key_responsibilities: initialData.key_responsibilities.length
      ? initialData.key_responsibilities
      : [""],
    is_active: initialData.is_active ?? true,
  };
}

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

export function JobListingFormDialog({
  open,
  initialData,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: JobListingFormDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white text-gray-900 shadow-xl">
        {/* Keying by which listing is being edited (or "new") means this
            inner form always mounts with state derived fresh from
            initialData — no effect is needed to "reset" it afterwards,
            which is what was tripping the set-state-in-effect rule. */}
        <JobListingForm
          key={initialData?.id ?? initialData?.slug ?? "new"}
          initialData={initialData}
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

function JobListingForm({
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: Omit<JobListingFormDialogProps, "open">) {
  const [values, setValues] = useState<JobListingFormValues>(() =>
    initialValuesFrom(initialData),
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData));

  const isEditing = Boolean(initialData);

  function handleTitleChange(title: string) {
    setValues((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...values,
      education: cleanList(values.education),
      work_experience: cleanList(values.work_experience),
      competencies_skills: cleanList(values.competencies_skills),
      key_responsibilities: cleanList(values.key_responsibilities),
    });
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Edit Job Listing" : "New Job Listing"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Title
          </label>
          <input
            required
            type="text"
            value={values.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={fieldClass}
            placeholder="e.g. Business Control"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Slug
          </label>
          <input
            required
            type="text"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setValues((prev) => ({
                ...prev,
                slug: slugify(e.target.value),
              }));
            }}
            className={`${fieldClass} font-mono`}
            placeholder="business-control"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              Location
            </label>
            <input
              required
              type="text"
              value={values.location}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, location: e.target.value }))
              }
              className={fieldClass}
              placeholder="e.g. Cebu"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              Department
            </label>
            <select
              value={values.department}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  department: e.target
                    .value as JobListingFormValues["department"],
                }))
              }
              className={fieldClass}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Job Summary
          </label>
          <textarea
            rows={4}
            value={values.job_summary}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, job_summary: e.target.value }))
            }
            className={`${fieldClass} leading-relaxed`}
            placeholder="Responsible for monitoring and improving the company's financial and operational performance…"
          />
        </div>

        <BulletListField
          label="Education"
          items={values.education}
          onChange={(education) =>
            setValues((prev) => ({ ...prev, education }))
          }
          placeholder="e.g. Bachelor's degree in Accounting, Finance, or related field"
        />

        <BulletListField
          label="Work Experience"
          items={values.work_experience}
          onChange={(work_experience) =>
            setValues((prev) => ({ ...prev, work_experience }))
          }
          placeholder="e.g. 2–5 years of experience in business control or related role"
        />

        <BulletListField
          label="Competencies and Skills"
          items={values.competencies_skills}
          onChange={(competencies_skills) =>
            setValues((prev) => ({ ...prev, competencies_skills }))
          }
          placeholder="e.g. Budgeting and forecasting"
        />

        <BulletListField
          label="Key Responsibilities"
          items={values.key_responsibilities}
          onChange={(key_responsibilities) =>
            setValues((prev) => ({ ...prev, key_responsibilities }))
          }
          placeholder="e.g. Prepare and monitor budgets, forecasts, and financial reports"
        />

        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            checked={values.is_active}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, is_active: e.target.checked }))
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          Published (visible on the careers page)
        </label>

        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-gray-100 bg-white pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? "Save changes" : "Create listing"}
          </button>
        </div>
      </form>
    </>
  );
}
