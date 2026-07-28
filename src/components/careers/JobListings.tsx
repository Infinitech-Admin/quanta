import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

type Job = {
  slug: string;
  title: string;
  location: string;
};

const jobs: Job[] = [
  {
    slug: "business-control",
    title: "Business Control",
    location: "Mandaluyong",
  },
  { slug: "admin-staff", title: "Admin Staff", location: "Pampanga" },
  { slug: "logistic-officer", title: "Logistic Officer", location: "Tacloban" },
  {
    slug: "dc-supervisor",
    title: "DC Supervisor",
    location: "Davao and Tacloban",
  },
  {
    slug: "logistic-coordinator",
    title: "Logistic Coordinator",
    location: "Cebu",
  },
  {
    slug: "accounting-supervisor",
    title: "Accounting Supervisor",
    location: "Pampanga",
  },
];

export function JobListings() {
  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--kraft)]">
            Current Openings
          </span>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl italic text-[var(--forest-deep)] sm:text-4xl">
            Find your place with us
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {jobs.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-[var(--mist)] p-6 ring-1 ring-[var(--leaf)]/15 transition-colors hover:bg-[var(--leaf)]/10"
            >
              <div>
                <h3 className="font-[var(--font-display)] text-lg italic text-[var(--forest-deep)]">
                  {job.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 font-[var(--font-body)] text-sm text-[var(--ink)]/70">
                  <MapPin className="h-3.5 w-3.5 text-[var(--forest)]" />
                  {job.location}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--forest)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
