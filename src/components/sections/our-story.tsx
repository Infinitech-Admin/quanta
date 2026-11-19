"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/videos/quanta.mp4";
const BG_IMAGE = "/MAIN-BANNER.png";

const stats = [
  { value: "2003", label: "Our beginnings" },
  { value: "20+ years", label: "Serving everyday needs" },
  { value: "11 brands", label: "Across four consumer categories" },
  { value: "Homes to institutions", label: "Consumer and B2B solutions" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/** Decorative background: soft green gradient with faint "2003" and arcs. */
function StoryBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      {/* green tint over the image: lighter glow centre-left, darker toward the edges (keeps text readable) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 85% at 24% 45%, rgba(8,124,61,0.85) 0%, rgba(6,108,55,0.85) 42%, rgba(5,91,47,0.88) 78%, rgba(4,80,41,0.9) 100%)",
        }}
      />
      {/* slightly darker right side for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 70% at 82% 40%, rgba(2,45,22,0.28) 0%, transparent 70%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1907 664"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        {/* big faint "2003", only its top shows above the bottom edge */}
        <text
          x="1300"
          y="705"
          fontSize="190"
          fontWeight="800"
          fill="#3fb374"
          fillOpacity="0.14"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          2003
        </text>

        {/* bottom-centre arcs */}
        <ellipse
          cx="870"
          cy="710"
          rx="105"
          ry="125"
          stroke="#3fb374"
          strokeOpacity="0.25"
          strokeWidth="2"
          transform="rotate(-20 870 710)"
        />
        <ellipse
          cx="880"
          cy="715"
          rx="85"
          ry="100"
          stroke="#3fb374"
          strokeOpacity="0.15"
          strokeWidth="2"
          transform="rotate(-20 880 715)"
        />
      </svg>
    </div>
  );
}

export function OurStory() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#066c37] text-white">
      <StoryBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-24 xl:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,460px)_minmax(0,612px)] lg:justify-between">
          {/* ── Copy ── */}
          <div>
            <motion.p
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white/70 ring-4 ring-white/15" />
              Our Story
              <span className="text-white/50">/</span>
              Rooted since 2003
            </motion.p>

            {/* Explicit breaks so it is always 3 lines like the design */}
            <motion.h2
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="mt-6 text-5xl font-bold leading-[1.08] tracking-[-0.045em] lg:whitespace-nowrap lg:text-[58px]"
            >
              More than paper.
              <br />
              More than 20
              <br />
              years of care.
            </motion.h2>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="mt-6 h-[3px] w-14 rounded-full bg-white/50" />

              <p className="mt-8 text-[15px] font-semibold leading-[1.8]">
                Quanta Paper Corporation is a Philippine paper manufacturer
                committed to making quality, affordable, and hygienic essentials
                part of everyday life.
              </p>
              <p className="mt-3 text-[13px] leading-[1.9] text-white/90">
                Since 2003, we have grown our product portfolio and capabilities
                to serve households, retailers, businesses, and institutions.
                Our story is built on dependable products, customer-focused
                solutions, and a long-term commitment to responsible growth.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-[#00a651] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#009147]"
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/group-of-companies"
                className="text-sm font-bold text-white transition-opacity hover:opacity-80"
              >
                Meet Our Group of Companies →
              </Link>
            </motion.div>
          </div>

          {/* ── Video card ── */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="rounded-[22px] bg-white/5 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#0b2a1f]">
              <video
                className="aspect-[8/5] w-full bg-[#333] object-cover"
                src={VIDEO_SRC}
                controls
                playsInline
                preload="metadata"
              />
              <div className="flex items-center justify-between px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em]">
                <span className="flex items-center gap-2 text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9be37a]" />
                  The Quanta Story
                </span>
                <a
                  href={VIDEO_SRC}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 normal-case tracking-normal text-white hover:underline"
                >
                  Add / preview video
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Journey in brief: label row + stats strip ── */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mt-20"
        >
          <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>Our journey in brief</span>
            <span className="text-[#8fe0b0]/80">
              Then, now, and what comes next
            </span>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/20 bg-white/[0.06] md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col items-center justify-center px-4 py-7 text-center ${
                  i > 0 ? "md:border-l md:border-white/20" : ""
                } ${i % 2 === 1 ? "border-l border-white/20 md:border-l" : ""} ${
                  i > 1 ? "border-t border-white/20 md:border-t-0" : ""
                }`}
              >
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
