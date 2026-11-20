"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-16 md:py-[68px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#e7f0e6] px-8 py-12 md:px-[60px] md:py-[58px]"
      >
        {/* soft decorative ring, top right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[47px] -top-[104px] h-[310px] w-[310px] rounded-full border-[45px] border-[#dcebdc]"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-[#1f2623] md:text-5xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 max-w-[500px] text-sm leading-[1.9] text-[#5b6460]">
              Whether you&apos;re looking for quality everyday essentials,
              reliable business solutions, or partnership opportunities,
              we&apos;re here to help you find what you need.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 rounded-full bg-[#00a651] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#009147]"
            >
              Explore Our Products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#0b6b3a] px-6 py-3.5 text-sm font-bold text-[#0b5a32] transition-colors hover:bg-[#0b6b3a]/10"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
