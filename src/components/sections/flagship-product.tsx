"use client";

import { motion } from "framer-motion";
import { FlagshipProductSkeleton } from "../skeleton/HomeSkeleton";
import { useState } from "react";

export function FlagshipProduct() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <FlagshipProductSkeleton />;
  }

  return (
    <section className="section-green-gradient relative overflow-hidden py-14 md:py-16 px-6 md:px-16">
      {/* soft ambient glow, top right — gives the green depth instead of a flat gradient */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* left: story */}
        <div className="text-[var(--color-cream)] z-10">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[var(--color-sun)]" />
              <p className="text-sm font-extrabold tracking-widest uppercase text-[var(--color-sun-light)]">
                Our Flagship Product
              </p>
            </div>
          </motion.div>

          {/* leaf-shaped brand mark — swap for /brands/fresh-logo.png if you have the real file */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative h-36 w-44 mb-6">
              <svg
                viewBox="0 0 120 100"
                className="h-full w-full drop-shadow-sm"
              >
                <path
                  d="M10 55 C10 20 45 5 105 8 C108 55 85 92 30 92 C16 92 10 75 10 55 Z"
                  fill="var(--color-forest-deep)"
                  stroke="var(--color-sun)"
                  strokeWidth="3"
                />
                <text
                  x="60"
                  y="52"
                  textAnchor="middle"
                  fill="var(--color-cream)"
                  fontSize="26"
                  fontStyle="italic"
                  fontFamily="Georgia, serif"
                >
                  Fresh
                </text>
                <text
                  x="22"
                  y="71"
                  textAnchor="start"
                  fill="var(--color-cream-dim)"
                  fontSize="6.5"
                  letterSpacing="0.3"
                  textLength="66"
                  lengthAdjust="spacingAndGlyphs"
                  fontFamily="ui-sans-serif, system-ui"
                >
                  BATHROOM TISSUE
                </text>
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl leading-tight mb-2">
              FRESH PREMIUM
              <br />
              <span className="text-[var(--color-sun-light)]">ECO-PULP</span>
            </h2>
            {/* fiber-strand underline — small hand-drawn nod to the pulp itself */}
            <svg
              width="130"
              height="12"
              viewBox="0 0 130 12"
              className="mb-4"
              aria-hidden="true"
            >
              <path
                d="M2 7 C 18 1, 32 12, 48 6 S 78 0, 94 6 S 122 11, 128 5"
                stroke="var(--color-sun)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>{" "}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="border-l-2 border-[var(--color-sun)] pl-3 mb-4">
              <p className="font-bold text-base uppercase tracking-wide text-[var(--color-sun-light)]">
                Made with premium eco-pulp
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-[var(--color-cream)]/85 mb-3 max-w-md leading-relaxed text-sm md:text-base">
              The NEW FRESH offers high quality tissue thats absorbent,
              hygienic, and environment-friendly, with an attractive packaging
              design. It is made from Premium Eco-Pulp — high quality
              eco-friendly materials mixed with{" "}
              <span className="font-semibold text-[var(--color-sun-light)]">
                sustainable plant-based pulp
              </span>{" "}
              such as sugarcane and bamboo plant. Using FRESH, we help save the
              environment, save energy, protect our natural resources and
              preserve our trees.
            </p>
          </motion.div>

          {/* feature chips instead of a third plain paragraph */}
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              "Sugarcane & bamboo pulp",
              "Fully biodegradable",
              "Trees kept standing",
            ].map((label, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 0C6 4 2 5 0 8c3 0 4.5-1 6-3.5C7.5 7 9 8 12 8c-2-3-6-4-6-8Z"
                      fill="var(--color-sun-light)"
                    />
                  </svg>
                  <span className="text-xs font-medium text-[var(--color-cream)]">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* right: image bleeds toward the edge, oversized, with feathered edges so the PNG's flat rectangle disappears into the green */}

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative h-[260px] md:h-[400px] overflow-visible">
            {/* soft glow behind the roll for depth */}
            <div className="absolute right-[-48%] md:right-[-54%] top-[58%] h-[150%] md:h-[175%]-translate-y-1/2 rounded-full bg-white/10 blur-2xl" />

            {/* grounding shadow so the roll feels staged, not floating */}
            <div className="absolute bottom-[12%] right-[2%] h-8 w-56 rounded-full bg-black/20 blur-md" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brands/fresh-tissue.png"
              alt="Fresh premium eco-pulp tissue roll"
              className="absolute right-[-20%] sm:right-[-48%] md:right-[-54%] top-[44%] lg:top-[55%] h-[150%] sm:h-[150%] md:h-[175%] w-auto max-w-none -translate-y-[46%] object-contain motion-safe:transition-transform motion-safe:duration-700 hover:-rotate-2"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 62% 62% at 55% 50%, black 58%, transparent 88%)",
                maskImage:
                  "radial-gradient(ellipse 62% 62% at 55% 50%, black 58%, transparent 88%)",
              }}
            />

            {/* gold-ringed badge, echoing the logo's gold outline */}
            <div className="absolute bottom-[6%] left-[18%] flex h-16 w-16 sm:h-20 sm:w-20 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-[var(--color-sun)] bg-[var(--color-forest-deep)]/90 text-center shadow-md">
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[var(--color-cream)]">
                100%
              </span>
              <span className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-wide text-[var(--color-cream-dim)] leading-tight px-1">
                Eco-Pulp
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
