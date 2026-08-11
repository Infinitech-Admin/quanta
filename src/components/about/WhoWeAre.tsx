"use client";

import { useState } from "react";
import { Eyebrow, Icon, PaperRollMark, type IconShape } from "./ui";
import { brandPromise, growthModel } from "./content";
import { motion } from "framer-motion";
import { WhoWeAreSkeleton } from "@/components/skeleton/AboutSkeleton";

export function WhoWeAre() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <WhoWeAreSkeleton />;
  }

  return (
    <section className="section-green-gradient paper-grain relative overflow-hidden text-[var(--color-cream)]">
      <PaperRollMark className="pointer-events-none absolute -right-20 -top-24 h-[380px] w-[380px] text-[var(--color-sun)] opacity-[0.1]" />

      <div className="relative mx-auto max-w-6xl border-x border-[var(--color-cream)]/10 px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-cream)]/15 py-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Eyebrow>Who We Are</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="mt-3 max-w-xl font-[var(--font-fraunces)] text-2xl leading-[1.05] text-[var(--color-cream)] sm:text-3xl">
                Rooted in vision, grown by mission.
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="max-w-[220px] text-right text-sm leading-relaxed text-[var(--color-cream)]/60">
              Field notes on how we grow — from soil to shelf.
            </p>
          </motion.div>
        </div>

        <div className="grid border-b border-[var(--color-cream)]/15 sm:grid-cols-12">
          <div className="py-10 sm:col-span-7 sm:border-r sm:border-[var(--color-cream)]/15 sm:pr-10">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sun)]">
                Vision
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-4 font-[var(--font-fraunces)] text-[26px] leading-snug text-[var(--color-cream)] sm:text-2xl">
                A reputable brand builder of high-quality, affordable, hygienic,
                and environment-friendly products — made with concern, care, and
                love.
              </p>
            </motion.div>
          </div>
          <div className="py-10 sm:col-span-5 sm:pl-10">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sun)]">
                Mission
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-4 text-base leading-relaxed text-[var(--color-cream)]/80">
                Build a market-centric, highly competent organization through
                innovative and caring solutions for every stakeholder. We learn,
                grow, and contribute together as one.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="border-b border-[var(--color-cream)]/15 py-3">
          <motion.div
            initial={{ opacity: 0, x: -180 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-cream)]/45">
              Our Brand Promise — {brandPromise.length} rings, no exceptions
            </p>
          </motion.div>
        </div>
        <div className="grid divide-y divide-[var(--color-cream)]/15 border-b border-[var(--color-cream)]/15 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {brandPromise.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -180 }}
              whileInView={{ opacity: 1, x: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                key={line}
                className="flex flex-col gap-3 mx-5 py-7 pr-6 first:pl-0 sm:pl-6"
              >
                <span className="font-[var(--font-fraunces)] text-sm text-[var(--color-sun)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] leading-relaxed text-[var(--color-cream)]/85">
                  {line}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-4">
          {growthModel.map((g, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -180 }}
              whileInView={{ opacity: 1, x: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                key={g.title}
                className={`mx-2 py-9 pr-6 first:pl-0 sm:pl-6 ${
                  index !== growthModel.length - 1
                    ? "border-b border-[var(--color-cream)]/15 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <Icon
                  shape={g.shape as IconShape}
                  className="h-7 w-7 text-[var(--color-sun)]"
                />
                <h4 className="mt-4 font-[var(--font-fraunces)] text-lg text-[var(--color-cream)]">
                  {g.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/70">
                  {g.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
