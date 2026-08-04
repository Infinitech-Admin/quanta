"use client";

import { motion } from "framer-motion";
export function FoundationFunds() {
  return (
    <section className="bg-[var(--mist)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--kraft)]">
              Quanta Foundation, Inc.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="mt-4 font-[var(--font-display)] text-3xl italic text-[var(--color-forest)] sm:text-4xl">
              Two funds, one purpose
            </h2>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Educational Support Fund */}
          <div className="rounded-2xl bg-[var(--paper)] p-8 shadow-sm ring-1 ring-[var(--leaf)]/15">
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.25em] text-[var(--forest)]">
                The Quanta Educational Support Fund
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="mt-3 font-[var(--font-display)] text-2xl italic text-[var(--forest-deep)]">
                Big dreams come in small packages.
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <blockquote className="mt-5 border-l-2 border-[var(--kraft)] pl-4 font-[var(--font-body)] text-sm italic leading-relaxed text-[var(--ink)]/75">
                &ldquo;I&apos;m hungry most of the time, but I still want to go
                to school, because I want to learn, I want to be successful, so
                that I can take good care of my family when I grow up.&rdquo;
                <span className="mt-2 block not-italic text-xs text-[var(--ink)]/50">
                  — recalled by Steven Leung, President and CEO of Quanta Paper
                  Corporation
                </span>
              </blockquote>
            </motion.div>

            <div className="mt-5 space-y-4 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/80">
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  It is unfortunate that many Filipino children go to school
                  hungry and struggle to give full attention in class — weak
                  attention span, lower energy, and poor learning retention
                  often follow.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  Quanta Foundation, Inc. sponsors daily meals for hundreds of
                  underprivileged Filipino children by partnering with public
                  schools across the country, fueling their body, mind, and
                  spirit through proper nutrition.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  QFI funds also support the education of Quanta scholars —
                  covering school fees, books, and school supplies.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Environmental Care Fund */}
          <div className="rounded-2xl bg-[var(--paper)] p-8 shadow-sm ring-1 ring-[var(--leaf)]/15">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.25em] text-[var(--forest)]">
                The Quanta Environmental Care Fund
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="mt-3 font-[var(--font-display)] text-2xl italic text-[var(--forest-deep)]">
                Mother Earth needs our help.
              </h3>
            </motion.div>
            <div className="mt-5 space-y-4 font-[var(--font-body)] text-sm leading-relaxed text-[var(--ink)]/80">
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  Since the 1970s, humanity has been in ecological overshoot —
                  using up the earth&apos;s resources faster than they can
                  regenerate. At current rates, it would take the equivalent of
                  1.75 Earths to sustain our consumption and absorb our waste.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  Climate change is the clearest signal of this crisis: rising
                  temperatures, melting glaciers, and rising sea levels threaten
                  coastal cities and future generations alike.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p>
                  QFI&apos;s Environmental Care Fund supports organizations
                  dedicated to preserving natural resources — tree planting,
                  environmental awareness campaigns, and community education
                  among them. We believe that by sustaining Mother Earth, she
                  will sustain us in return.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
