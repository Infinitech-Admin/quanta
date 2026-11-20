"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import type { Job } from "@/lib/jobs-data";

// Where the form posts (multipart/form-data). Point this at your Laravel route,
// or implement /api/careers/apply in Next. Fields sent: first_name, last_name,
// middle_name, phone, email, position, location, job_slug, portfolio,
// introduction, cv.
const APPLY_ENDPOINT =
  process.env.NEXT_PUBLIC_APPLY_ENDPOINT ?? "/api/careers/apply";

const MAX_CV_BYTES = 16 * 1024 * 1024;
const ALLOWED_EXT = [".odf", ".pdf", ".doc", ".docx"];

const STEPS = [
  {
    title: "Choose a position.",
    body: "Click “Apply for This Role” on any job listing to preselect the position and work location.",
  },
  {
    title: "Complete your details.",
    body: "Provide your contact information, résumé, and an optional portfolio or demo reel link.",
  },
  {
    title: "Send your application to HR.",
    body: "Use Submit Application to send the form and attached CV directly to HR.",
  },
];

const inputCls =
  "w-full rounded-xl border border-black/10 bg-[#fdfdf9] px-4 py-3.5 text-xs text-[#1f2623] outline-none placeholder:text-[#7a847f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20";
const labelCls = "mb-2 block text-xs font-bold text-[#12392a]";

type Status = "idle" | "sending" | "sent" | "error";

export function ApplicationForm({
  jobs,
  preselect,
}: {
  jobs: Job[];
  preselect: { job: Job; nonce: number } | null;
}) {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const titles = useMemo(
    () => [...new Set(jobs.map((j) => j.title))].sort(),
    [jobs],
  );
  const locations = useMemo(
    () => [
      ...new Set(
        jobs.filter((j) => j.title === position).map((j) => j.location),
      ),
    ],
    [jobs, position],
  );

  // "Apply for This Role" → fill position + location
  useEffect(() => {
    if (!preselect) return;
    setPosition(preselect.job.title);
    setLocation(preselect.job.location);
  }, [preselect]);

  const onPositionChange = (title: string) => {
    setPosition(title);
    const options = [
      ...new Set(jobs.filter((j) => j.title === title).map((j) => j.location)),
    ];
    setLocation(options.length === 1 ? options[0] : "");
  };

  const onFileChange = (f: File | null) => {
    setMessage("");
    if (!f) return setFile(null);
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      setFile(null);
      setStatus("error");
      setMessage("Please upload your CV as .odf, .pdf, .doc, or .docx.");
      return;
    }
    if (f.size > MAX_CV_BYTES) {
      setFile(null);
      setStatus("error");
      setMessage("Your CV is larger than 16 MB. Please upload a smaller file.");
      return;
    }
    setStatus("idle");
    setFile(f);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!file) {
      setStatus("error");
      setMessage("Please attach your CV before submitting.");
      return;
    }

    const fd = new FormData(form);
    fd.set("position", position);
    fd.set("location", location);
    fd.set(
      "job_slug",
      jobs.find((j) => j.title === position && j.location === location)?.slug ??
        "",
    );
    fd.set("cv", file);

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(APPLY_ENDPOINT, { method: "POST", body: fd });
      if (!res.ok) {
        // Surface Laravel's first validation message when there is one
        const data = await res.json().catch(() => null);
        const first = data?.errors
          ? (Object.values(data.errors).flat()[0] as string | undefined)
          : data?.message;
        throw new Error(typeof first === "string" ? first : String(res.status));
      }
      form.reset();
      setPosition("");
      setLocation("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setStatus("sent");
      setMessage(
        "Application sent. Our HR team will contact you if your profile matches the role.",
      );
    } catch (err) {
      setStatus("error");
      const detail =
        err instanceof Error && !/^\d+$/.test(err.message) ? err.message : "";
      setMessage(
        detail ||
          "We couldn’t send your application. Check your connection and try again, or email careers@quantapaper.com.",
      );
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-white px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: how it works */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b7a43]">
            Your next chapter starts here
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#1f2623] md:text-6xl">
            Ready to make your move?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-[1.9] text-[#5b6460]">
            Tell us a little about yourself and the role you’re interested in.
            Once you submit, your application details and CV are sent securely
            to Quanta Paper’s HR team.
          </p>

          <ol className="mt-8 space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e4f0e7] text-[11px] font-bold text-[#0f4a2c]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-bold text-[#12392a]">{s.title}</p>
                  <p className="mt-1 max-w-sm text-xs leading-[1.8] text-[#5b6460]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border-l-4 border-[#00a651] bg-[#f7f6f2] p-5">
            <p className="text-[11px] uppercase tracking-wide text-[#5b6460]">
              Application emails
            </p>
            <a
              href="mailto:careers@quantapaper.com"
              className="mt-2 block text-xs font-bold text-[#12392a] hover:underline"
            >
              careers@quantapaper.com
            </a>
            <a
              href="mailto:human.resources@quantapaper.com"
              className="mt-1 block text-xs font-bold text-[#12392a] hover:underline"
            >
              human.resources@quantapaper.com
            </a>
          </div>
        </div>

        {/* Right: form card */}
        <form
          onSubmit={onSubmit}
          className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_-28px_rgba(15,74,44,0.45)] ring-1 ring-black/5"
        >
          <div className="border-b border-black/5 bg-[#eff3e9] px-7 py-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b7a43]">
              Job application
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#12392a]">
              Apply to Join Quanta
            </h3>
            <p className="mt-3 text-[11px] text-[#5b6460]">
              Fields marked * are required. Your CV must be one supported file,
              16 MB or smaller.
            </p>
          </div>

          <div className="grid gap-5 p-7 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={labelCls}>
                First Name *
              </label>
              <input
                id="first_name"
                name="first_name"
                required
                autoComplete="given-name"
                placeholder="First name"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="last_name" className={labelCls}>
                Last Name *
              </label>
              <input
                id="last_name"
                name="last_name"
                required
                autoComplete="family-name"
                placeholder="Last name"
                className={inputCls}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="middle_name" className={labelCls}>
                Middle Name{" "}
                <span className="font-normal text-[#7a847f]">(optional)</span>
              </label>
              <input
                id="middle_name"
                name="middle_name"
                autoComplete="additional-name"
                placeholder="Middle name"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelCls}>
                Contact Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="e.g. 09XX XXX XXXX"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="position" className={labelCls}>
                Desired Position *
              </label>
              <select
                id="position"
                required
                value={position}
                onChange={(e) => onPositionChange(e.target.value)}
                className={inputCls}
              >
                <option value="">Select a position</option>
                {titles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className={labelCls}>
                Preferred Work Location *
              </label>
              <select
                id="location"
                required
                disabled={!position}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${inputCls} disabled:opacity-60`}
              >
                <option value="">
                  {position ? "Select a location" : "Choose a role first"}
                </option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="portfolio" className={labelCls}>
                Portfolio or Demo Reel Link{" "}
                <span className="font-normal text-[#7a847f]">(optional)</span>
              </label>
              <input
                id="portfolio"
                name="portfolio"
                type="url"
                placeholder="https://"
                className={inputCls}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="introduction" className={labelCls}>
                Short Introduction{" "}
                <span className="font-normal text-[#7a847f]">(optional)</span>
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows={4}
                maxLength={2000}
                placeholder="Tell us why you’d like to join Quanta or share something relevant to this role..."
                className={`${inputCls} resize-y`}
              />
            </div>

            <div className="sm:col-span-2">
              <span className={labelCls}>Upload Your CV / Résumé *</span>
              <label
                htmlFor="cv"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-[#a9cdb3] bg-[#f6faf6] px-6 py-8 text-center transition-colors hover:bg-[#eef6ef] focus-within:border-[#00a651]"
              >
                <Upload className="h-5 w-5 text-[#0b7a43]" aria-hidden />
                <span className="text-xs font-bold text-[#12392a]">
                  {file ? file.name : "Click to choose your CV"}
                </span>
                <span className="text-[11px] leading-relaxed text-[#6b756f]">
                  One file only · Maximum 16 MB
                  <br />
                  Allowed: .odf, .pdf, .doc, .docx
                </span>
                <input
                  ref={fileRef}
                  id="cv"
                  type="file"
                  accept=".odf,.pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-[#0b5a32] px-8 py-4 text-xs font-bold text-white transition-colors hover:bg-[#094a29] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
              >
                {status === "sending" ? "Sending…" : "Submit Application"}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 text-xs leading-relaxed ${status === "error" ? "text-[#b42318]" : "text-[#0f4a2c]"}`}
              >
                {message}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
