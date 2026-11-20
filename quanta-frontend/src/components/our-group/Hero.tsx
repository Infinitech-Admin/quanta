"use client";

import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PILLARS, scrollToId } from "./pillars";

/** Oversized translucent "Q" used as the hero backdrop. */
function QBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="q-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <circle
        cx="400"
        cy="380"
        r="285"
        stroke="url(#q-ring)"
        strokeWidth="140"
      />
      <rect
        x="470"
        y="520"
        width="420"
        height="120"
        rx="14"
        fill="url(#q-ring)"
        transform="rotate(42 680 580)"
      />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0b6238_0%,#06482a_100%)] pt-[100px] text-white">
      {/* Depth: soft light from the upper left, big Q on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_15%,rgba(60,170,100,0.35),transparent_70%)]"
      />
      <QBackdrop className="pointer-events-none absolute -right-48 -top-32 w-[900px] max-w-none" />
      <QBackdrop className="pointer-events-none absolute -left-16 bottom-4 hidden w-28 opacity-40 sm:block" />

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
          className="rounded-[28px] border border-white/15 bg-white/[0.04] p-8 backdrop-blur-[2px]"
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
