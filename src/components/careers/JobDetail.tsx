import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft } from "lucide-react";
import type { Job } from "@/lib/jobs-data";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";

export function JobDetail({ job }: { job: Job }) {
  return (
    <>
      {/* Header banner */}
      <section className="relative isolate overflow-hidden px-4 pt-40 pb-32 sm:pt-48 sm:pb-40 text-[var(--paper)] sm:px-6 lg:px-8">
        <Image
          src="/work-with-us.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--forest-deep)99 0%, var(--forest-deep)66 45%, var(--forest-deep)b3 100%)",
          }}
          aria-hidden
        />
        {/* Light darkening wash so text stays legible over the photo without hiding it */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/10"
          aria-hidden
        />

        <div
          className="relative mx-auto max-w-4xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 font-[var(--font-body)] text-sm text-[var(--paper)]/75 transition-colors hover:text-[var(--paper)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all openings
          </Link>
          <h1 className="mt-6 font-[var(--font-display)] text-3xl italic leading-tight sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-3 flex items-center gap-1.5 font-[var(--font-body)] text-sm text-[var(--sunlight)]">
            <MapPin className="h-4 w-4" />
            {job.location}
          </p>
        </div>
      </section>

      {/* Job content */}
      <section className="bg-[var(--paper)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {job.verified ? (
            <div className="space-y-10">
              {job.summary ? (
                <div>
                  <h2 className="font-[var(--font-display)] text-xl italic text-[var(--forest-deep)]">
                    Job Summary
                  </h2>
                  <p className="mt-3 font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80">
                    {job.summary}
                  </p>
                </div>
              ) : null}

              {job.education ? (
                <JobSection title="Education" items={job.education} />
              ) : null}

              {job.workExperience ? (
                <JobSection
                  title="Work Experience"
                  items={job.workExperience}
                />
              ) : null}

              {job.skills ? (
                <JobSection
                  title="Competencies and Skills"
                  items={job.skills}
                  grid
                />
              ) : null}

              {job.responsibilities ? (
                <JobSection
                  title="Key Responsibilities"
                  items={job.responsibilities}
                />
              ) : null}
            </div>
          ) : (
            <div className="rounded-2xl bg-[var(--mist)] p-6 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/70 ring-1 ring-[var(--leaf)]/15">
              Full job details for this position haven&apos;t been added yet.
              Contact our HR team at{" "}
              <a
                href="mailto:human.resources@quantapaper.com"
                className="font-medium text-[var(--forest)] underline underline-offset-2"
              >
                human.resources@quantapaper.com
              </a>{" "}
              for the complete job description, or submit your application below
              and indicate your desired position.
            </div>
          )}

          <div className="mt-16 border-t border-[var(--leaf)]/15 pt-16">
            <JobApplicationForm jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}

function JobSection({
  title,
  items,
  grid,
}: {
  title: string;
  items: string[];
  grid?: boolean;
}) {
  return (
    <div>
      <h2 className="font-[var(--font-display)] text-xl italic text-[var(--forest-deep)]">
        {title}
      </h2>
      <ul
        className={grid ? "mt-4 grid gap-3 sm:grid-cols-2" : "mt-4 space-y-3"}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/80"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
