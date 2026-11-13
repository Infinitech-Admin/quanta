import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Hero } from "@/components/our-group/Hero";
import { CompanyExplorer } from "@/components/our-group/CompanyExplorer";
import { ClosingCta } from "@/components/our-group/ClosingCta";

// One quiet, legible family for the whole page. Headlines get their
// personality from weight and tight tracking instead of a second typeface.
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
      className={`${body.variable} relative overflow-hidden bg-[#F7F7F2] font-[var(--font-body)] text-[#16241B]`}
    >
      {/* 1. Hero: "One vision. Four ways to make an impact." */}
      <Hero />

      {/* 2. Meet the companies (cards) → 3. selected company detail →
          4. "How we operate" (manufacturing only) / community banner (community only) */}
      <CompanyExplorer />

      {/* 5. "Let's grow something meaningful." */}
      <ClosingCta />
    </main>
  );
}
