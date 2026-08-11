"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/about/ui";
import { BrandsShowcase } from "@/components/brands/BrandsShowcase";
import { motion } from "framer-motion";
import {
  BrandsHeroSkeleton,
  BrandsShowcaseSkeleton,
} from "@/components/skeleton/BrandSkeleton";

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return (
      <div>
        <BrandsHeroSkeleton />
        <BrandsShowcaseSkeleton />
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero — matches the site's forest theme ──────── */}
      <section className="relative isolate overflow-hidden py-24 text-[var(--color-cream)] sm:py-32">
        <Image
          src="/bg-innerpage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest-vivid)]/70 via-[var(--color-forest)]/88 to-[var(--color-forest-vivid)]/80" />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Eyebrow className="text-[var(--color-sun)]">
              12 Brands · 3 Categories
            </Eyebrow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="mt-4 max-w-2xl font-[var(--font-display)] text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Every shelf, every home, every need.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-cream)]/80 sm:text-lg">
              From tissue to toothpaste, each brand under Quanta Paper is built
              on the same promise — quality, affordability, and care for the
              planet that supplies it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Fanned brand showcase — the visual centerpiece ── */}
      <BrandsShowcase />
    </div>
  );
}
