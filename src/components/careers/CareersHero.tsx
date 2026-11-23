"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function CareersHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#00693e] via-[#006239] to-[#005a34] text-white">
      {/* Q background image: kasing-taas ng section, naka-right, buo ang Q. Ang fade ay nasa image mismo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 aspect-[2576/978] h-full opacity-60 md:opacity-100"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 35%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        }}
      >
        <Image
          src="/images/MAIN-BANNER-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 1200px, 100vw"
          quality={90}
          className="object-cover"
        />
      </div>

      {/* Top padding clears the fixed navbar (set --navbar-height if it changes) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl px-6 pb-20 pt-[calc(var(--navbar-height,90px)+3rem)] text-center md:pb-28 md:pt-[calc(var(--navbar-height,90px)+4.5rem)]"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/90">
          Join our team
        </p>

        <h1 className="mt-7 text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl">
          Build your career with us
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-[15px] leading-[1.9] text-white/85">
          Explore opportunities to bring your skills, ideas, and passion to a
          company committed to quality, care, and making everyday essentials
          better.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#positions"
            className="inline-flex items-center gap-4 rounded-full bg-[#04472a] px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#033a22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Open Positions <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="#apply"
            className="inline-flex items-center gap-4 rounded-full bg-[#04472a] px-6 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#033a22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            How to Apply <ArrowDown className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
