"use client";

import { Eyebrow } from "./ui";
import { certifications } from "./content";
import { motion } from "framer-motion";

export function Certifications() {
  return (
    <section className="section-green-gradient py-24 text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow>Certifications</Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mt-4 max-w-2xl font-[var(--font-fraunces)] text-2xl leading-tight text-[var(--color-cream)] sm:text-3xl">
            Held to standards we don&apos;t set ourselves.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((c, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                key={c.title}
                className="h-[280px] md:h-[360px] xl:h-[290px] rounded-sm border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5 p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[var(--color-sun)] font-[var(--font-fraunces)] text-[11px] tracking-tight text-[var(--color-sun)]">
                    {c.mark}
                  </span>
                  <span className="text-sm text-[var(--color-cream)]/55">
                    Awarded {c.year}
                  </span>
                </div>
                <h3 className="mt-5 font-[var(--font-fraunces)] text-xl text-[var(--color-cream)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/75">
                  {c.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
