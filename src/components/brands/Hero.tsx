"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/about/ui";
import Image from "next/image";
import type { BrandWithCategory } from "@/data/brands";
import {
  BrandSlugHeroSkeleton,
} from "@/components/skeleton/BrandSkeleton";


export function Hero({ brand }: { brand: BrandWithCategory }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <BrandSlugHeroSkeleton />;
  }
  
  return (
    /* ── Hero — normal top-down flow with generous, explicit spacing.
          Nothing is pinned to an edge with justify-between anymore. ── */
    <section className="relative isolate overflow-hidden text-[var(--color-cream)]">
      <Image
        src="/bg-innerpage.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${brand.color}f7 0%, ${brand.color}e8 45%, var(--color-forest-deep)f2 100%)`,
        }}
      />
      {/* Extra darkening wash so text stays legible over lighter brand colors */}
      <div className="absolute inset-0 bg-black/20" />

      <div
        className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-32 sm:pb-24"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
      >
        {/* Back link */}
        <Link
          href="/brands"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-black/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all brands
        </Link>

        {/* Breadcrumb */}
        <nav className="mt-8 mb-4 flex flex-wrap items-center gap-2 text-xs text-[var(--color-cream)]/80">
          <Link
            href="/brands"
            className="hover:text-[var(--color-cream)] transition"
          >
            Brands
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/brands?category=${brand.categoryId}`}
            className="hover:text-[var(--color-cream)] transition"
          >
            {brand.categoryLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--color-cream)]">{brand.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow>{brand.categoryLabel}</Eyebrow>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="mt-4 max-w-2xl font-[var(--font-display)] text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {brand.name}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
