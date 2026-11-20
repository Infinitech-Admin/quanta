"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { QSTORE_URL } from "./constants";

// Kept optional so existing callers that still pass these props don't break.
interface BrandsHeroProps {
  brandCount?: number;
  categories?: string[];
}

export function BrandsHero(_props: BrandsHeroProps) {
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
          <h1 className="max-w-3xl text-[2.5rem] font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Find your everyday need
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
        </motion.div>
      </div>
    </section>
  );
}
