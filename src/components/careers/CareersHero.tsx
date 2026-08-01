"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "20+ Years", sub: "Serving Filipino homes" },
  { label: "Nationwide", sub: "Branches across the Philippines" },
  { label: "One Family", sub: "Built on care and trust" },
];

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-deep)] px-4 py-10 text-[var(--paper)] sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 20%, var(--sunlight) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 80% 70%, var(--forest-vivid) 0%, transparent 60%), " +
            "linear-gradient(135deg, var(--forest-light) 0%, var(--forest-vivid) 100%)",
          opacity: 0.55,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--leaf)", opacity: 0.25 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "var(--sunlight)", opacity: 0.2 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--paper) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 sm:px-10 sm:py-20 mb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="py-2 font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sunlight)]">
            Careers At Quanta
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="mt-4 font-[var(--font-display)] text-4xl italic leading-tight sm:text-5xl">
            Be Part of the Quanta Family
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mx-auto mt-6 max-w-xl font-[var(--font-body)] text-lg leading-relaxed text-[var(--paper)]/85">
            We offer opportunities to deserving individuals with the
            competencies and character of a Quanta employee — and the chance to
            grow, be recognized, and feel like family at every phase of your
            career.
          </p>
        </motion.div>
      </div>

      {/* Ticket-stub stat row — perforated dividers echo the paper-roll motif
          used again on the job cards below. */}
      <div className="relative mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl bg-[var(--paper)]/10 ring-1 ring-[var(--paper)]/15 backdrop-blur-sm sm:flex-row">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              key={stat.label}
              className={`relative flex-1 ml-7 px-6 py-6 text-center ${
                index > 0
                  ? "border-t border-[var(--paper)]/15 sm:border-t-0 sm:border-l sm:border-dashed"
                  : ""
              }`}
            >
              <p className="font-[var(--font-display)] text-xl italic text-[var(--sunlight)] sm:text-2xl">
                {stat.label}
              </p>
              <p className="mt-1 font-[var(--font-body)] text-xs text-[var(--paper)]/70 sm:text-sm">
                {stat.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
