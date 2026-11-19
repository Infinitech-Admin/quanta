"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PILLARS, scrollToId } from "./pillars";

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#06482a] pt-[100px] text-white">
      {/* Background image: public/MAIN-BANNER.png */}
      <Image
        src="/MAIN-BANNER.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        aria-hidden
      />

      {/* Green overlay so the text stays readable. Lower the /xx values to show more of the photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#06482a]/90 via-[#0b6238]/75 to-[#06482a]/60"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:pb-28 lg:pt-20">
        {/* Left: message */}
        <motion.div {...fadeUp()}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">
            The Quanta Group of Companies
          </p>

          <h1 className="mt-8 text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            <span className="block">One vision.</span>
            <span className="block">Four ways to</span>
            <span className="block">make an impact.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/90">
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
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#F7F5EC] px-6 py-3 text-sm font-semibold text-[#0a5c34] shadow-lg shadow-black/20 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06482a]"
          >
            Explore the organizations behind Quanta
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>

        {/* Right: the four pillars */}
        <motion.div
          {...fadeUp(0.15)}
          className="rounded-[28px] border border-white/15 bg-[#06482a]/40 p-8 backdrop-blur-sm"
        >
          <ol className="relative space-y-7 before:absolute before:bottom-6 before:left-6 before:top-6 before:border-l before:border-dashed before:border-white/25">
            {PILLARS.map(({ key, heroTitle, heroSub, Icon }) => (
              <li key={key} className="relative flex items-center gap-5">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#2fbf6a]/60 bg-[#0a4f2d] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[17px] font-semibold leading-tight">
                    {heroTitle}
                  </p>
                  <p className="mt-1 text-[13px] text-white/75">{heroSub}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
