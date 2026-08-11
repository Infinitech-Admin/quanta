"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CompanyTabsSkeleton } from "@/components/skeleton/GroupCompaniesSkeleton";

type Company = {
  id: string;
  shortName: string;
  fullName: string;
  tagline?: string;
  paragraphs: string[];
  bullets?: string[];
};

const companies: Company[] = [
  {
    id: "quanta-paper-corporation",
    shortName: "Quanta Paper Corporation",
    fullName: "Quanta Paper Corporation",
    tagline:
      "To contribute to building a sustainable future is our key guiding principle.",
    paragraphs: [
      "At Quanta, we define success as the ability to sustain the business through the Triple Bottom Line (Elkington, 1994) — Profit, People and Planet.",
      "We invest in top-of-the-line equipment, and world class research and development that make us a competitive player in the market.",
      "We invest in our people by providing a work environment that is conducive to their personal and professional growth.",
      "We are an eco-friendly company founded on the belief that protecting our environment is as important as achieving business success.",
      "We differentiate ourselves from our competitors by using post-consumer fiber or wastepaper as raw materials to produce eco-friendly paper products like bathroom tissues, table napkins and paper towels. We also offer premium-grade tissue paper products using virgin pulp responsibly harvested from man-made tree farms certified by the Forest Stewardship Council (FSC).",
    ],
  },
  {
    id: "quanta-paper-marketing",
    shortName: "Quanta Paper Marketing, Inc.",
    fullName: "Quanta Paper Marketing, Inc.",
    paragraphs: [
      "Quanta Paper Marketing, Inc. is a member of the Quanta Group of Companies that caters to the retail industry through strong partnerships with distributors, national and local key accounts, wholesalers, as well as small and medium size retailers.",
      "We offer a diversified product portfolio that includes tissue paper, baby care, feminine care, oral care, cleaning solutions, and personal protection products.",
      "We have a well-established Consumer Sales network deployed across strategic locations nationwide. As your principal, we understand every unique challenge in your business, which is why we provide sales and marketing support to ensure sales targets are steadily achieved.",
      "We constantly equip our consumer sales team with practical skills and tools they can effectively use in the trade — a reliable ally in moving your business forward and beyond.",
      "We value the confidence that our customers and business partners have entrusted in us. From distribution partnership to social responsibility program collaborations, in every step of our trade journey, we grow together.",
    ],
  },
  {
    id: "eco-hygiene",
    shortName: "Eco Hygiene Institutional Sales Corp.",
    fullName: "Eco Hygiene Institutional Sales Corporation",
    tagline:
      "We and the company we serve are partners in protecting Mother Earth.",
    paragraphs: [
      "Ecohygiene Institutional Sales Corporation is a member of the Quanta Group of Companies that caters to institutional customers like hotels, resorts, restaurants, hospitals and private government offices.",
      "We can customize products and services according to your needs and preference. Our Institutional Sales Team is well trained and experienced in understanding the needs of your business or agency for high quality, cost-effective products.",
      "We are a one-stop-shop for your tissue, hygiene, and cleaning requirements, offering multiple options from our wide portfolio of products and services:",
    ],
    bullets: [
      "Tissue paper products in various formats",
      "Hygiene products for personal care and protection",
      "Cleaning products for waste collection and sanitation needs",
      "Dispensers that ensure safe and hygienic access to products",
    ],
  },
  {
    id: "quanta-foundation",
    shortName: "Quanta Foundation, Inc.",
    fullName: "Quanta Foundation, Inc.",
    paragraphs: [
      "Quanta Foundation, Inc. (QFI) was established in July 2019 to further expand and institutionalize the numerous community development, charity work and financial support programs implemented by Quanta Paper Corporation.",
      "It is the advocacy of QFI to create positive changes in the lives of young children and influence significant developments in communities around the country, with a special focus on education and the environment.",
      "A portion of Quanta's gross sales is placed in Quanta Foundation, Inc. to fund its programs, categorized into the Quanta Educational Support Fund and the Quanta Environmental Care Fund.",
    ],
  },
];

export function CompanyTabs() {
  const [activeId, setActiveId] = React.useState(companies[0].id);
  const active = companies.find((c) => c.id === activeId) ?? companies[0];

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <CompanyTabsSkeleton />;
  }
  return (
    <section className="bg-[var(--paper)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Tab triggers */}
        <div
          role="tablist"
          aria-label="Our group of companies"
          className="flex flex-wrap justify-center gap-2 border-b border-[var(--leaf)]/25 pb-4"
        >
          {companies.map((company) => (
            <button
              key={company.id}
              role="tab"
              aria-selected={activeId === company.id}
              onClick={() => setActiveId(company.id)}
              className={cn(
                "rounded-full px-4 py-2 font-[var(--font-body)] text-sm font-medium tracking-wide transition-colors",
                activeId === company.id
                  ? "bg-[var(--color-forest-vivid)] text-[var(--paper)]"
                  : "text-[var(--ink)]/70 hover:bg-[var(--mist)] hover:text-[var(--forest-deep)]",
              )}
            >
              {company.shortName}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div role="tabpanel" className="mt-12">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-[var(--font-display)] text-2xl italic text-[var(--color-forest)] sm:text-3xl">
              {active.fullName}
            </h2>
          </motion.div>
          {active.tagline ? (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-3 font-[var(--font-display)] text-lg text-[var(--forest)]">
                {active.tagline}
              </p>
            </motion.div>
          ) : null}

          <div className="mt-6 space-y-4 font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80">
            {active.paragraphs.map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p key={index}>{p}</p>
              </motion.div>
            ))}
          </div>

          {active.bullets ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {active.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-lg bg-[var(--mist)] px-4 py-3 font-[var(--font-body)] text-sm text-[var(--ink)]/85"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
