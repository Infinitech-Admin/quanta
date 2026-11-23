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
    // Buong screen ang taas (100svh), kaya hindi makikita ang next section
    // hangga't hindi nag-i-scroll. Naka-cover ang photo gaya ng reference ng client.
    // min-h-[640px] para kasya ang text sa maiikling screen.
    <section className="relative isolate h-svh min-h-[640px] w-full overflow-hidden bg-[#4f7a6b]">
      <Image
        src="/images/HOMEPAGE-BANNER.png"
        alt="Quanta Paper Corporation factory building surrounded by greenery"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[70%_center]"
      />

      {/* Soft gradient sa text side lang */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f22]/55 via-[#0b2f22]/20 to-transparent" />

      {/* pt-24 = pantulak sa content para hindi sumagi sa navbar (~94px) */}
      <div className="relative z-10 flex h-full items-center pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
          <div className="max-w-[640px]">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
            >
              Quanta Paper Corporation · Philippines
            </motion.p>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl"
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
              className="mt-7 max-w-[480px] text-base font-medium leading-[1.85] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
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
      </div>
    </section>
  );
}
