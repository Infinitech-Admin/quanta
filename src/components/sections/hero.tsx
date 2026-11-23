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
    // Below 2xl: fixed min height so the text always fits.
    // 2xl and up: the hero takes the photo's own shape (1863 x 844), so
    // object-cover doesn't crop or zoom the photo.
    <section className="relative isolate flex min-h-[700px] w-full items-center overflow-hidden bg-[#4f7a6b] 2xl:aspect-[1863/844] 2xl:min-h-0">
      {/* Background photograph */}
      <Image
        src="/images/HOMEPAGE-BANNER.png"
        alt="Quanta Paper Corporation factory building surrounded by greenery"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[65%_center] 2xl:object-center"
      />

      {/* Tint only the text side for legibility; the building stays clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d2a]/65 via-[#0b3d2a]/25 to-transparent" />

      {/* pt-32 clears the overlaid navbar (~94px) so the eyebrow isn't tucked under it */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 xl:px-0">
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
