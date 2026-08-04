"use client";

import { motion } from "framer-motion";

import { ShieldCheck, Leaf, BadgeCheck } from "lucide-react";

const certs = [
  { name: "ISO 9001:2015", detail: "Quality management", icon: ShieldCheck },
  {
    name: "Green Choice Philippines",
    detail: "Environmental seal",
    icon: Leaf,
  },
  { name: "Halal IDCP", detail: "Halal certified", icon: BadgeCheck },
];

export function Certifications() {
  return (
    <section className="paper-grain relative overflow-hidden bg-[var(--color-sage-light)] py-16 md:py-20 px-6 md:px-16">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="mb-10 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[var(--color-forest-light)] border-2 border-[var(--color-forest-vivid)]" />
            <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-[var(--color-forest-vivid)]">
              Tested and certified
            </p>
            <span className="h-px w-10 bg-[var(--color-forest-light)] border-2 border-[var(--color-forest-vivid)]" />
          </div>
        </motion.div>

        <div className="grid items-center gap-14 md:grid-cols-2">
          {/* certificate plaque */}

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-sm pt-10">
                {/* seal, stamped onto the top edge of the plaque */}
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[var(--color-forest-light)] bg-[var(--color-forest-deep)] shadow-md">
                    <span className="font-serif text-xl italic text-[var(--color-cream)]">
                      Q
                    </span>
                  </div>
                  <svg
                    width="44"
                    height="18"
                    viewBox="0 0 52 22"
                    className="absolute left-1/2 -bottom-2 -translate-x-1/2"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 0 L1 20 L15 13 Z"
                      fill="var(--color-forest-deep)"
                    />
                    <path
                      d="M42 0 L51 20 L37 13 Z"
                      fill="var(--color-forest-deep)"
                    />
                  </svg>
                </div>

                {/* the plaque itself */}
                <div className="relative rounded-sm border border-[var(--color-forest-light)]/50 bg-white px-7 pb-7 pt-12 shadow-[0_20px_40px_-20px_rgba(30,59,42,0.35)]">
                  <div className="pointer-events-none absolute inset-[6px] rounded-sm border border-[var(--color-forest-light)]/20" />

                  <p className="relative mb-1 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-forest-deep)]">
                    Quanta Paper
                  </p>
                  <div className="relative mx-auto mb-4 h-px w-16 bg-[var(--color-forest-light)]/50" />

                  <div className="relative divide-y divide-dashed divide-[var(--color-forest-light)]/30">
                    {certs.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-forest-vivid)]/40 bg-[var(--color-sage-light)]">
                          <cert.icon className="h-4 w-4 text-[var(--color-forest-vivid)]" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-forest-deep)]">
                            {cert.name}
                          </p>
                          <p className="text-[11px] text-[var(--color-forest-deep)]/60">
                            {cert.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* copy */}

          <div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="font-serif font-extrabold mb-4 text-3xl text-[var(--color-forest)] md:text-4xl font-semibold">
                100% trusted by many
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mb-3 leading-relaxed text-sm md:text-base text-[var(--color-forest-deep)]/80">
                To ensure the consistent quality of our products and services,
                we put in place an{" "}
                <strong className="text-[var(--color-forest-deep)]">
                  ISO 9001:2015
                </strong>{" "}
                certified Quality Management System that aims to meet customer,
                statutory and regulatory requirements. Year-round compliance
                audits help us remain steadfast in our commitment to create
                products people can rely on, every day.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mb-3 leading-relaxed text-sm md:text-base text-[var(--color-forest-deep)]/80">
                We&apos;re the only tissue manufacturer in the Philippines whose
                paper products carry the Green Choice Seal of Approval —
                certifying sustainable practices that protect the environment,
                in accordance with standards set by the{" "}
                <strong className="text-[var(--color-forest-deep)]">
                  Philippine Center of Environmental Protection and Sustainable
                  Development (PCEPSDI)
                </strong>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="leading-relaxed text-sm md:text-base text-[var(--color-forest-deep)]/80">
                Our Halal certification guarantees our products and services
                meet the requirements of Islamic law, making them acceptable for
                the Muslim population.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
