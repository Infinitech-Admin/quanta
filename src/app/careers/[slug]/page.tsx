import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import { JobDetail } from "@/components/careers/JobDetail";
import { jobs } from "@/lib/jobs-data";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

type PageParams = { slug: string };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return { title: "Job Not Found | Quanta Paper Corporation" };
  return {
    title: `${job.title} | Quanta Paper Corporation`,
    description: job.summary ?? `${job.title} opening at ${job.location}.`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <main
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#3E7B3F",
          "--forest-deep": "#1F4D2E",
          "--leaf": "#6FA85A",
          "--forest-light": "#4c8a55",
          "--forest-vivid": "#2ea043",
          "--sunlight": "#B8C97A",
          "--paper": "#F7F5EC",
          "--kraft": "#B07A32",
          "--mist": "#E1EDD9",
        } as CSSProperties
      }
    >
      <JobDetail job={job} />
    </main>
  );
}
