import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { CareersHero } from "@/components/careers/CareersHero";
import { JobListings } from "@/components/careers/JobListings";
import { JoinCta } from "@/components/careers/JoinCta";

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

export const metadata: Metadata = {
  title: "Careers At Quanta | Quanta Paper Corporation",
  description:
    "At Quanta, we offer employment opportunities to deserving individuals who possess the required competencies and character expected of a Quanta employee. Join the Quanta family and grow with us.",
};

export default function CareersPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#3E7B3F",
          "--forest-deep": "#1F4D2E",
          "--leaf": "#6FA85A",
          "--sunlight": "#B8C97A",
          "--paper": "#F7F5EC",
          "--kraft": "#B07A32",
          "--mist": "#E1EDD9",
        } as CSSProperties
      }
    >
      <CareersHero />
      <JobListings />
      <JoinCta />
    </main>
  );
}
