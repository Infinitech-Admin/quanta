"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/videos/quanta.mp4";

const stats = [
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

export function OurStory() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay when the video scrolls into view, pause when it leaves.
  // Browsers only allow autoplay for muted videos; viewers can unmute
  // with the player controls.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay blocked: viewer can press play */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#066c37] text-white">
      {/* `unoptimized` serves the original PNG as-is (no WebP/AVIF compression),
          which avoids blocky banding on the smooth green gradient. */}
      <Image
        src="/images/MAIN-BANNER-2.png"
        alt=""
        fill
        priority
        unoptimized
        aria-hidden
        className="pointer-events-none object-cover object-[75%_center]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-12 sm:px-6 lg:pb-14 lg:pt-16 xl:px-0">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-12">
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
              className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:mt-6 lg:whitespace-nowrap lg:text-[58px]"
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
              <div className="mt-5 h-[3px] w-14 rounded-full bg-white/50" />

              <p className="mt-5 text-[15px] font-semibold leading-[1.7]">
                Quanta Paper Corporation is a Philippine paper manufacturer
                committed to making quality, affordable, and hygienic essentials
                part of everyday life.
              </p>
              <p className="mt-2 text-[13px] leading-[1.8] text-white/90">
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
              className="mt-6 flex flex-wrap items-center gap-4 lg:mt-9 lg:gap-6"
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
              {/* No fixed aspect ratio: the video keeps its own size */}
              <video
                ref={videoRef}
                className="block h-auto w-full bg-[#333]"
                src={VIDEO_SRC}
                controls
                muted
                playsInline
                preload="auto"
              />
              <div className="flex items-center px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] lg:py-4">
                <span className="flex items-center gap-2 text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9be37a]" />
                  The Quanta Story
                </span>
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
          className="mt-10 lg:mt-14"
        >
          <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>Our journey in brief</span>
            <span className="text-[#8fe0b0]/80">
              Then, now, and what comes next
            </span>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/20 bg-white/[0.06] md:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col items-center justify-center px-4 py-4 text-center md:py-6 ${
                  i === stats.length - 1 && stats.length % 2 === 1
                    ? "col-span-2 md:col-span-1"
                    : ""
                } ${i > 0 ? "md:border-l md:border-white/20" : ""} ${i % 2 === 1 ? "border-l border-white/20 md:border-l" : ""} ${
                  i > 1 ? "border-t border-white/20 md:border-t-0" : ""
                }`}
              >
                <p className="text-xl font-bold tracking-tight md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-white/80">
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
