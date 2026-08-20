"use client";

import { useState } from "react";
import Link from "next/link";
import { LeafSpray } from "./ui";
import { motion } from "framer-motion";
import { ClosingCtaSkeleton } from "@/components/skeleton/AboutSkeleton";

export function ClosingCta() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <ClosingCtaSkeleton />;
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-forest-deep)] px-6 py-24 text-[var(--color-cream)] sm:px-10">
      {/* Leaf accents, mirrored left and right — echoes the reference's
          foliage framing the closing statement */}
      <LeafSpray className="pointer-events-none absolute -left-8 -bottom-10 h-56 w-36 text-[var(--color-cream)]/10" />
      <LeafSpray className="pointer-events-none absolute -right-8 -top-10 h-56 w-36 rotate-180 text-[var(--color-cream)]/10" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="mx-auto max-w-2xl font-[var(--font-display)] text-3xl leading-snug sm:text-4xl">
            Let&apos;s Build a Better Tomorrow, Together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-cream)]/75">
            We welcome the opportunity to work with partners who share our
            values and commitment to quality.
          </p>
          <Link
            href="/careers"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-sun)] px-7 py-3 text-sm font-semibold text-[var(--color-forest-deep)] transition-colors hover:bg-[var(--color-sun-light)]"
          >
            Contact Us
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
