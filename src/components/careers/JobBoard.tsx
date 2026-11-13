"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  MapPin,
  Search,
} from "lucide-react";
import type { Job } from "@/lib/jobs-data";

/* ── Detail sections ─────────────────────────────────────────────
   Matches the Job type in lib/jobs-data: summary is a paragraph, the rest
   are string[] bullet lists. Empty or missing fields are skipped.     */
const SECTIONS: { key: keyof Job; label: string }[] = [
  { key: "summary", label: "Role overview" },
  { key: "responsibilities", label: "Responsibilities" },
  { key: "education", label: "Education" },
  { key: "workExperience", label: "Work experience" },
  { key: "skills", label: "Skills" },
];

function getSections(job: Job) {
  return SECTIONS.flatMap(({ key, label }) => {
    const value = job[key];
    if (typeof value === "string" && value.trim()) {
      return [{ label, items: [value.trim()], isText: true }];
    }
    if (Array.isArray(value) && value.length > 0) {
      return [{ label, items: value.map(String), isText: false }];
    }
    return [];
  });
}

const dept = (j: Job) => String(j.department);

/* ── Detail panel ─────────────────────────────────────────────── */
function JobDetail({
  job,
  onApply,
}: {
  job: Job;
  onApply: (job: Job) => void;
}) {
  const sections = getSections(job);
  return (
    <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_50px_-24px_rgba(15,74,44,0.5)] ring-1 ring-black/5 lg:flex lg:h-full lg:flex-col">
      <div className="bg-gradient-to-br from-[#1b4d39] to-[#0f6b44] p-6 text-white sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
          {dept(job)}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl">
          {job.title}
        </h3>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-bold">
          <MapPin className="h-3 w-3" aria-hidden /> {job.location}
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => onApply(job)}
            className="inline-flex items-center gap-2 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#009447] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Apply for This Role <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-7 lg:flex-1 lg:overflow-y-auto">
        {sections.length === 0 ? (
          <p className="text-sm leading-[1.8] text-[#5b6460]">
            Full role details are available on request.{" "}
            <Link
              href={`/careers/${job.slug}`}
              className="font-bold text-[#0b7a43] underline-offset-4 hover:underline"
            >
              View the job page
            </Link>
          </p>
        ) : (
          sections.map((s) => (
            <div key={s.label}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#12392a]">
                {s.label}
              </h4>
              {s.isText ? (
                <p className="mt-3 text-[13px] leading-[1.8] text-[#5b6460]">
                  {s.items[0]}
                </p>
              ) : (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] leading-[1.7] text-[#5b6460] marker:text-[#8aa592]">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Filter select ────────────────────────────────────────────── */
function FilterSelect({
  label,
  icon: Icon,
  value,
  onChange,
  allLabel,
  options,
}: {
  label: string;
  icon: typeof MapPin;
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  options: string[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b6460]" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-black/10 bg-white py-4 pl-11 pr-10 text-xs text-[#1f2623] outline-none focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1f2623]" />
    </label>
  );
}

/* ── Board ────────────────────────────────────────────────────── */
export function JobBoard({
  jobs,
  onApply,
}: {
  jobs: Job[];
  onApply: (job: Job) => void;
}) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs],
  );
  const departments = useMemo(
    () => [...new Set(jobs.map(dept))].sort(),
    [jobs],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (!location || j.location === location) &&
        (!department || dept(j) === department) &&
        (!q ||
          j.title.toLowerCase().includes(q) ||
          dept(j).toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)),
    );
  }, [jobs, query, location, department]);

  // If the selected job gets filtered out, fall back to the first result
  const selected =
    filtered.find((j) => j.slug === selectedSlug) ?? filtered[0] ?? null;

  return (
    <section id="positions" className="scroll-mt-24 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0b7a43]">
              Current openings
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] text-[#1f2623] md:text-6xl">
              Find your next opportunity.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-[1.9] text-[#5b6460]">
              Explore openings by team and work location. Select a role to read
              its full details, then apply directly for that position.
            </p>
          </div>
          <p className="self-start rounded-full bg-[#e4f0e7] px-4 py-2.5 text-[11px] font-bold text-[#0f4a2c] md:self-end">
            {jobs.length} {jobs.length === 1 ? "position" : "positions"}{" "}
            available
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 grid gap-3 md:grid-cols-[1.6fr_0.8fr_0.8fr]">
          <label className="relative block">
            <span className="sr-only">Search by job title or keywords</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b6460]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by job title or keywords..."
              className="w-full rounded-2xl border border-black/10 bg-white py-4 pl-11 pr-4 text-xs text-[#1f2623] outline-none placeholder:text-[#7a847f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20"
            />
          </label>
          <FilterSelect
            label="Filter by location"
            icon={MapPin}
            value={location}
            onChange={setLocation}
            allLabel="All locations"
            options={locations}
          />
          <FilterSelect
            label="Filter by department"
            icon={Briefcase}
            value={department}
            onChange={setDepartment}
            allLabel="All departments"
            options={departments}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-12 text-center text-sm text-[#5b6460]">
            No roles match your search. Try a different keyword, or clear the
            filters to see all {jobs.length} openings.
          </div>
        ) : (
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {/* List */}
            <ul
              className="space-y-3 lg:max-h-[720px] lg:overflow-y-auto lg:pr-2"
              aria-label="Open positions"
            >
              {filtered.map((job) => {
                const on = selected?.slug === job.slug;
                return (
                  <li key={job.slug}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(job.slug)}
                      aria-pressed={on}
                      className={`flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651] ${
                        on
                          ? "border-2 border-[#0b7a43] bg-[#eaf4ec]"
                          : "border border-black/10 bg-white hover:bg-[#f6faf6]"
                      }`}
                    >
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b7a43]">
                          {dept(job)}
                        </span>
                        <span className="mt-2 block text-lg font-bold tracking-[-0.02em] text-[#12392a]">
                          {job.title}
                        </span>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#e4eee6] px-2.5 py-1.5 text-[11px] font-bold text-[#0f4a2c]">
                          <MapPin className="h-3 w-3" aria-hidden />{" "}
                          {job.location}
                        </span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0e9] text-[#12392a]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>

                    {/* Mobile: detail opens right under the chosen card */}
                    {on && (
                      <div className="mt-3 lg:hidden">
                        <JobDetail job={job} onApply={onApply} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop: sticky detail panel */}
            {selected && (
              <div className="hidden lg:sticky lg:top-28 lg:block lg:h-[720px]">
                <JobDetail job={selected} onApply={onApply} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
