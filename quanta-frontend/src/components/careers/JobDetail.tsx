"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
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
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="mt-6 font-[var(--font-display)] text-3xl italic leading-tight sm:text-4xl">
              {job.title}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mt-3 flex items-center gap-1.5 font-[var(--font-body)] text-sm text-[var(--sunlight)]">
              <MapPin className="h-4 w-4" />
              {job.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job content */}
      <section className="bg-[var(--paper)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/*
            Form first in DOM order (order-1) so on mobile it shows right
            after the banner, before the job description. On desktop it
            becomes a sticky sidebar (order-2, lg:sticky) that stays in
            view alongside the content instead of trailing at the very
            bottom of the page.
          */}
          <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-start">
            <aside className="order-1 lg:order-2 lg:sticky lg:top-10">
              <JobApplicationForm jobTitle={job.title} />
            </aside>

            <div className="order-2 lg:order-1">
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

                  {job.education?.length ? (
                    <JobSection title="Education" items={job.education} />
                  ) : null}

                  {job.workExperience?.length ? (
                    <JobSection
                      title="Work Experience"
                      items={job.workExperience}
                    />
                  ) : null}

                  {job.skills?.length ? (
                    <JobSection
                      title="Competencies and Skills"
                      items={job.skills}
                      grid
                    />
                  ) : null}

                  {job.responsibilities?.length ? (
                    <JobSection
                      title="Key Responsibilities"
                      items={job.responsibilities}
                    />
                  ) : null}
                </div>
              ) : (
                <div className="rounded-2xl bg-[var(--mist)] p-6 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/70 ring-1 ring-[var(--leaf)]/15">
                  Full job details for this position haven&apos;t been added
                  yet. Contact our HR team at{" "}
                  <a
                    href="mailto:human.resources@quantapaper.com"
                    className="font-medium text-[var(--forest)] underline underline-offset-2"
                  >
                    human.resources@quantapaper.com
                  </a>{" "}
                  for the complete job description, or submit your application
                  and indicate your desired position.
                </div>
              )}
            </div>
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
