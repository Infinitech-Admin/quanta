"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { QSTORE_URL } from "./constants";

interface BrandsHeroProps {
  brandCount?: number;
  categories?: string[];
}

const DEFAULT_CATEGORIES = ["Paper", "Personal Care", "Baby Care", "Oral Care"];

export function BrandsHero({
  brandCount,
  categories = DEFAULT_CATEGORIES,
}: BrandsHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#00693e] via-[#006239] to-[#005a34] text-white">
      {/* soft glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[-10%] h-[360px] w-[460px] rounded-[50%] bg-[#7fc79a]/25 blur-3xl"
      />

      {/*
        The site navbar is fixed (~90px tall), so the top padding clears it.
        If your navbar height changes, set --navbar-height on :root.
      */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-[calc(var(--navbar-height,90px)+3rem)] sm:px-10 md:pb-24 md:pt-[calc(var(--navbar-height,90px)+4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {brandCount ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/90">
              {brandCount} brands <span className="mx-2">•</span>{" "}
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </p>
          ) : (
            <p className="h-[14px]" aria-hidden />
          )}

          <h1 className="mt-5 max-w-3xl text-[2.5rem] font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Find the right brand for every shelf, every shopper, and every home.
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-[1.9] text-white/85">
            From paper essentials to personal, baby, and oral care,
            Quanta&rsquo;s portfolio serves different needs and
            lifestyles—making it easier for households, buyers, and distributors
            to find the right fit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#brands"
              className="inline-flex items-center gap-6 rounded-full bg-[#00a651] px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#009447] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore our brands
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={QSTORE_URL}
              className="inline-flex items-center gap-6 rounded-full border border-white/60 px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Visit QStore
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href="#brands"
                  className="inline-block rounded-full bg-white px-4 py-2.5 text-[11px] font-bold text-[#0f4a2c] transition-colors hover:bg-[#e8f3ec]"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
