"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[700px] w-full items-center overflow-hidden bg-[#4f7a6b] lg:min-h-[780px]">
      {/* Background photograph */}
      <Image
        src="/images/HOMEPAGE-BANNER.png"
        alt="Quanta Paper Corporation factory building surrounded by greenery"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#4f7a6b]/50 opacity-10" />

      {/* Light wash: just enough on the left for legibility, photo stays clear */}
      <div className="absolute inset-0 bg-[#3d6556]/60"/>

      {/* pt-40 clears the overlaid navbar (~94px) so the eyebrow isn't tucked under it */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 xl:px-0">
        <div className="max-w-[640px]">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-white"
          >
            Quanta Paper Corporation · Philippines
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            Embracing sustainability.
            <br />
            Delivering quality.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 max-w-[480px] text-base font-medium leading-[1.85] text-white/90"
          >
            From home and personal care essentials to professional hygiene
            solutions, Quanta brings quality and value to Filipino homes,
            businesses, and institutions.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#00a651] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#009147]"
            >
              Explore Our Products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 rounded-full bg-[#04472a] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#033a22]"
            >
              For Businesses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
