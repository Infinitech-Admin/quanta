"use client";

import Image from "next/image";
import { Eyebrow } from "./ui";
import { motion } from "framer-motion";

export function Hero() {
  return (
    // <section className="relative isolate overflow-hidden text-[var(--color-cream)]">
    <section className="relative overflow-hidden bg-[var(--forest-deep)] pt-24 sm:pt-32 md:pt-24 text-[var(--paper)]">
      <Image
        src="/images/about/plant-floor.jpg"
        alt="Quanta Paper technicians on the manufacturing floor in Mabalacat, Pampanga"
        fill
        priority
        className="object-cover"
      />
      {/* Vivid green wash — darker now so text stays legible over the photo */}
      <div className="absolute inset-0 bg-[var(--color-forest-vivid)]/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-deep)]/85 via-[var(--color-forest-deep)]/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow className="text-[var(--color-sun)]">
            Since 2003 · Mabalacat, Pampanga
          </Eyebrow>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            About Us
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-cream)] sm:text-lg">
            From four machines and fewer than fifty people, to the largest
            tissue manufacturer in the Philippines — built one roll, one hire,
            one habit of doing things properly, at a time.
          </p>
        </motion.div>
      </div>

      {/* torn-paper transition into the next section */}
      <svg
        className="relative block w-full text-[var(--color-cream)]"
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 16 L0 7 L40 10 L85 5 L130 9 L175 3 L220 8 L265 5 L310 10 L355 4 L400 8 L445 2 L490 9 L535 6 L580 11 L625 5 L670 8 L715 3 L760 9 L805 5 L850 8 L895 2 L940 9 L985 5 L1030 8 L1075 3 L1120 9 L1160 5 L1200 7 L1200 16 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}