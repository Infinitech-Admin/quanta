"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type Department = "Corporate" | "Logistics & Operations";

type Job = {
  slug: string;
  title: string;
  location: string;
  department: Department;
};

const jobs: Job[] = [
  {
    slug: "business-control",
    title: "Business Control",
    location: "Mandaluyong",
    department: "Corporate",
  },
  {
    slug: "admin-staff",
    title: "Admin Staff",
    location: "Pampanga",
    department: "Corporate",
  },
  {
    slug: "accounting-supervisor",
    title: "Accounting Supervisor",
    location: "Pampanga",
    department: "Corporate",
  },
  {
    slug: "logistic-officer",
    title: "Logistic Officer",
    location: "Tacloban",
    department: "Logistics & Operations",
  },
  {
    slug: "dc-supervisor",
    title: "DC Supervisor",
    location: "Davao and Tacloban",
    department: "Logistics & Operations",
  },
  {
    slug: "logistic-coordinator",
    title: "Logistic Coordinator",
    location: "Cebu",
    department: "Logistics & Operations",
  },
];

const filters: Array<"All" | Department> = [
  "All",
  "Corporate",
  "Logistics & Operations",
];

export function JobListings() {
  const [activeFilter, setActiveFilter] = useState<"All" | Department>("All");

  const visibleJobs =
    activeFilter === "All"
      ? jobs
      : jobs.filter((job) => job.department === activeFilter);

  return (
    <section className="bg-[var(--mist)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--mustard)]">
              Current Openings
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="mt-4 font-[var(--font-display)] text-3xl italic text-[var(--forest-deep)] sm:text-4xl">
              Find your place with us
            </h2>
          </motion.div>
        </div>

        {/* Department filter tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2 font-[var(--font-body)] text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-[var(--color-forest-vivid)] text-[var(--paper)]"
                    : "bg-[var(--paper)] text-[var(--forest-deep)] ring-1 ring-[var(--leaf)]/20 hover:bg-[var(--leaf)]/20"
                }`}
              >
                {filter}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Ticket-stub job cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {visibleJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 180 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="group relative flex overflow-hidden rounded-2xl bg-[var(--paper)] ring-1 ring-[var(--leaf)]/15 transition-colors hover:bg-[var(--leaf)]/5"
              >
                {/* Perforated stub divider — the paper-roll motif */}
                <div className="relative flex w-3 shrink-0 items-center bg-[var(--color-forest-light)]">
                  <div className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[var(--mist)]" />
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, var(--mist) 2.5px, transparent 2.5px)",
                      backgroundSize: "12px 16px",
                      backgroundPosition: "center",
                    }}
                    aria-hidden
                  />
                  <div className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[var(--mist)]" />
                </div>

                <div className="flex flex-1 items-center justify-between gap-4 p-6">
                  <div>
                    <span className="font-[var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mustard)]">
                      {job.department}
                    </span>
                    <h3 className="mt-1.5 font-[var(--font-display)] text-lg italic text-[var(--forest-deep)]">
                      {job.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 font-[var(--font-body)] text-sm text-[var(--ink)]/70">
                      <MapPin className="h-3.5 w-3.5 text-[var(--forest)]" />
                      {job.location}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--forest)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {visibleJobs.length === 0 && (
          <p className="mt-10 text-center font-[var(--font-body)] text-sm text-[var(--ink)]/60">
            No openings in this department right now. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
