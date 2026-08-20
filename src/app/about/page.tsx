import type { Metadata } from "next";
import { Fraunces, Roboto } from "next/font/google";
import { Hero } from "@/components/about/Hero";
import { OurHistory } from "@/components/about/OurHistory";
import { DistributionCenters } from "@/components/about/DistributionCenters";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { CoreValues } from "@/components/about/CoreValues";
import { Certifications } from "@/components/about/Certifications";
import { HeadOffice } from "@/components/about/HeadOffice";
// import { ClosingCta } from "@/components/about/ClosingCta";

// ————————————————————————————————————————————————————————————————
// Type system
// Fraunces: a warm, slightly industrial serif — used with restraint for
// display moments only (headlines, big stats, pull quotes).
// Inter: quiet, legible workhorse for everything people actually read.
// Both are exposed as CSS variables on <main> below, so every section
// component can reference font-[var(--font-display)] / --font-body
// without importing next/font itself.
// ————————————————————————————————————————————————————————————————
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "About Us | Quanta Paper Corporation",
  description:
    "Established in 2003, Quanta Paper Corporation is the Philippines' largest tissue manufacturer — built on quality, sustainability, and care for the Filipino household.",
};

export default function AboutPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#145C36",
          "--forest-deep": "#0B3B22",
          "--forest-light": "#4c8a55",
          "--forest-vivid": "#2ea043",
          "--paper": "#F6F2E7",
          "--mustard": "#dbac6f",
          "--kraft": "#B07A32",
          "--mist": "#E4EDE6",
        } as React.CSSProperties
      }
    >
      <Hero />
      <OurHistory />
      <HeadOffice />
      <DistributionCenters />
      <CoreValues />
      <WhoWeAre />

      <Certifications />
      {/* <ClosingCta /> */}
    </main>
  );
}
