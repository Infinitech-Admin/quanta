"use client";

import Image from "next/image";
import { Eyebrow, Icon, PaperRollMark, type IconShape } from "./ui";
import { specs, historyMilestones } from "./content";
import { motion } from "framer-motion";

const specIcons: Record<string, IconShape> = {
  Founded: "target",
  Workforce: "people",
  "Paper machines": "compass",
  "Converting lines": "route",
  "Plant footprint": "leaf",
  Location: "storefront",
};

export function OurHistory() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-[var(--color-cream)]">
      <Image src="/bg-innerpage.jpg" alt="" fill className="object-cover" />
      {/* Green gradient wash — darker now so text stays legible, photo still shows through */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest-deep)]/95 via-[var(--color-forest)]/92 to-[var(--color-forest-vivid)]/88" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Eyebrow className="text-[var(--color-sun)]">Our History</Eyebrow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="mt-4 font-[var(--font-display)] text-2xl leading-tight text-[var(--color-cream)] sm:text-3xl">
              Two decades of doing more with less.
            </h2>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* Timeline */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-cream)]/20" />
            </motion.div>
            <div className="space-y-10">
              {historyMilestones.map((m, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.2 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div key={m.year} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-sun)] bg-[var(--color-forest-deep)]" />
                    <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sun)]">
                      {m.year}
                    </span>
                    <h3 className="mt-2 font-[var(--font-fraunces)] text-xl text-[var(--color-cream)]">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-cream)]/90">
                      {m.copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Spec sheet */}
          <motion.div
            initial={{ opacity: 0, x: 380 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <aside className="relative self-start overflow-hidden rounded-lg border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/[0.06] p-8 backdrop-blur-sm">
              <PaperRollMark className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 text-[var(--color-cream)]/20" />
              <p className="font-[var(--font-display)] text-sm italic text-[var(--color-sun)]">
                The plant, by the numbers
              </p>
              <dl className="mt-6 divide-y divide-[var(--color-cream)]/15">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <dt className="flex items-center gap-2.5 text-sm text-[var(--color-cream)]/80">
                      <Icon
                        shape={specIcons[s.label] ?? "target"}
                        className="h-4 w-4 flex-none text-[var(--color-sun)]"
                      />
                      {s.label}
                    </dt>
                    <dd className="font-[var(--font-display)] text-xl text-[var(--color-cream)]">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
