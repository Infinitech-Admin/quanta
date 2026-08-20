"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Icon, TimelineNode, type IconShape } from "./ui";
import { historyMilestones, specs } from "./content";
import { motion } from "framer-motion";
import { OurHistorySkeleton } from "@/components/skeleton/AboutSkeleton";

const specIcons: Record<string, IconShape> = {
  Founded: "target",
  Workforce: "people",
  "Paper machines": "compass",
  "Converting lines": "route",
  "Plant footprint": "leaf",
  Location: "storefront",
};

export function OurHistory() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <OurHistorySkeleton />;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-forest)] via-[var(--color-forest-deep)] to-[var(--color-forest)] py-24 text-[var(--color-cream)]">
      {/* Soft radial glow behind the timeline so the section doesn't
          read as a flat block of green */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--color-sun)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-10">
        <Eyebrow className="justify-center text-[var(--color-sun)]">
          Our History
        </Eyebrow>
        <h2 className="mx-auto mt-4 max-w-xl font-[var(--font-display)] text-2xl leading-tight text-[var(--color-cream)] sm:text-3xl">
          Built on Experience. Focused on the Future.
        </h2>

        <div className="relative mt-20">
          {/* Line draws in left-to-right on scroll instead of just
              appearing, so the timeline feels like it's unrolling */}
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-[var(--color-sun)]/40 sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          />
          <div className="grid gap-14 sm:grid-cols-3 sm:gap-6">
            {historyMilestones.map((m, index) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2 + 0.3,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col items-center"
              >
                <TimelineNode className="h-12 w-12 border-2 border-[var(--color-sun)] bg-[var(--color-forest)] text-base text-[var(--color-sun)] shadow-[0_0_0_6px_var(--color-forest)]">
                  {index + 1}
                </TimelineNode>
                <span className="mt-5 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--color-sun)]">
                  {m.year}
                </span>
                <h3 className="mt-2 font-[var(--font-display)] text-xl text-[var(--color-cream)]">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-[var(--color-cream)]/60">
                  {m.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {specs.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-2 rounded-lg border-t-2 border-[var(--color-sun)] bg-[var(--color-cream)]/95 px-4 py-6 text-[var(--color-forest-deep)] shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                shape={specIcons[s.label] ?? "target"}
                className="h-6 w-6 text-[var(--color-forest)] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-[var(--font-display)] text-xl">
                {s.value}
              </span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-forest-deep)]/60">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
