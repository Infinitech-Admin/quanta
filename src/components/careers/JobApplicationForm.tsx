"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";

export function JobApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [cvFileName, setCvFileName] = React.useState<string | null>(null);
  const [pictureFileName, setPictureFileName] = React.useState<string | null>(
    null,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your backend / API route / email service.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-[var(--mist)] p-8 text-center ring-1 ring-[var(--leaf)]/15">
        <h3 className="font-[var(--font-display)] text-xl italic text-[var(--forest-deep)]">
          Thank you for applying!
        </h3>
        <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--ink)]/70">
          Our HR team will review your application for {jobTitle} and reach out
          if you&apos;re shortlisted.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-[var(--font-display)] text-2xl italic text-[var(--forest-deep)]">
        Job Application
      </h2>
      <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--ink)]/70">
        Applying for: <span className="font-semibold">{jobTitle}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name" name="lastName" required />
          <Field label="Middle Name" name="middleName" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Contact Number" name="contact" type="tel" required />
          <Field label="Email" name="email" type="email" required />
        </div>

        <FileField
          label="Upload your CV"
          hint="One file only. 16 MB limit. Allowed types: odf, pdf, doc, docx."
          accept=".odf,.pdf,.doc,.docx"
          fileName={cvFileName}
          onFileName={setCvFileName}
        />

        <FileField
          label="Attach Picture (maximum file size 2MB)"
          hint="One file only. 2 MB limit. Allowed types: jpg, jpeg, png."
          accept=".jpg,.jpeg,.png"
          fileName={pictureFileName}
          onFileName={setPictureFileName}
        />

        <Field
          label="Desired Position"
          name="desiredPosition"
          defaultValue={jobTitle}
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[var(--leaf)] px-8 py-3 font-[var(--font-body)] text-sm font-semibold text-[var(--forest-deep)] transition-transform hover:scale-[1.02]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="font-[var(--font-body)] text-sm font-medium text-[var(--ink)]/85">
        {label}
        {required ? <span className="text-[var(--kraft)]"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-[var(--leaf)]/25 bg-[var(--paper)] px-3 py-2 font-[var(--font-body)] text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--forest)]"
      />
    </label>
  );
}

function FileField({
  label,
  hint,
  accept,
  fileName,
  onFileName,
}: {
  label: string;
  hint: string;
  accept: string;
  fileName: string | null;
  onFileName: (name: string | null) => void;
}) {
  const inputId = React.useId();

  return (
    <div>
      <span className="font-[var(--font-body)] text-sm font-medium text-[var(--ink)]/85">
        {label}
      </span>
      <label
        htmlFor={inputId}
        className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[var(--leaf)]/40 bg-[var(--mist)] px-4 py-4 transition-colors hover:bg-[var(--leaf)]/10"
      >
        <UploadCloud className="h-5 w-5 shrink-0 text-[var(--forest)]" />
        <span className="font-[var(--font-body)] text-sm text-[var(--ink)]/70">
          {fileName ?? "Click to upload"}
        </span>
        <input
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onFileName(e.target.files?.[0]?.name ?? null)}
        />
      </label>
      <p className="mt-1.5 font-[var(--font-body)] text-xs text-[var(--ink)]/50">
        {hint}
      </p>
    </div>
  );
}
