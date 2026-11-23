"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "./pillars";

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#06482a] pt-[100px] text-white">
      {/* Background image: public/images/MAIN-BANNER-2.png
          Shown as-is (no dark overlay) so the colors match the Our Story and News sections.
          `unoptimized` serves the original file without WebP/AVIF compression.
          object-[75%_center] keeps the "Q" in view instead of cropping it.
          Try object-[60%_center] or object-right to shift it. */}
      <Image
        src="/images/MAIN-BANNER-2.png"
        alt=""
        fill
        priority
        unoptimized
        className="-z-10 object-cover object-[75%_center]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
        {/* Message */}
        <motion.div {...fadeUp()}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">
            Quanta Group of Companies
          </p>

          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em] lg:mt-6">
            <span className="block">One vision.</span>
            <span className="block">Four ways to</span>
            <span className="block">make an impact.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/90 lg:mt-6 lg:text-lg lg:leading-8">
            Four connected companies, each with a distinct role. Together, we
            work toward long-term growth that puts{" "}
            <strong className="font-semibold text-white">
              Profit, People, and Planet
            </strong>{" "}
            at the center of our decisions.
          </p>

          <a
            href="#companies"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("companies");
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F7F5EC] px-6 py-3 text-sm font-semibold text-[#0a5c34] shadow-lg shadow-black/20 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06482a] lg:mt-8"
          >
            Explore the organizations behind Quanta
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
