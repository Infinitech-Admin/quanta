import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Hero } from "@/components/our-group/Hero";
import { CompanyTabs } from "@/components/our-group/CompanyTabs";
// import { FoundationFunds } from "@/components/our-group/FoundationFunds";
import { ClosingCta } from "@/components/our-group/ClosingCta";

// Type system
// Fraunces: a warm, slightly industrial serif, used with restraint for
// display moments only (headlines, big stats, pull quotes).
// Inter: quiet, legible workhorse for everything people actually read.
// Both are variable fonts, so no explicit weight list is needed.
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Group of Companies | Quanta Paper Corporation",
  description:
    "Quanta Paper Corporation, Quanta Paper Marketing, Eco Hygiene Institutional Sales, and Quanta Foundation — four companies united by one guiding principle: a sustainable future.",
};

export default function OurGroupOfCompaniesPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} relative overflow-hidden bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)]`}
      style={
        {
          "--ink": "#16241B",
          "--forest": "#3E7B3F",
          "--forest-deep": "#1F4D2E",
          "--forest-light": "#4c8a55",
          "--forest-vivid": "#2ea043",
          "--leaf": "#6FA85A",
          "--sunlight": "#B8C97A",
          "--paper": "#F7F5EC",
          "--kraft": "#B07A32",
          "--mist": "#E1EDD9",
        } as CSSProperties
      }
    >
      <Hero />
      <CompanyTabs />
      {/* <FoundationFunds /> */}
      <ClosingCta />
    </main>
  );
}
