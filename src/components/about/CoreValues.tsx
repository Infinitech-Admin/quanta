"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "./ui";
import { coreValues } from "./content";
import { motion } from "framer-motion";
import { CoreValuesSkeleton } from "@/components/skeleton/AboutSkeleton";

// Position each value on a circle, starting at 12 o'clock, going clockwise.
// nodeRadius: where the numbered dot sits. labelRadius: where the text
// block sits, pushed further out so it never overlaps the ring.
function useRadialLayout(count: number, nodeRadius = 30, labelRadius = 40) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    let align: "left" | "right" | "center" = "center";
    if (cos > 0.35) align = "left";
    else if (cos < -0.35) align = "right";

    return {
      nodeX: 50 + nodeRadius * cos,
      nodeY: 50 + nodeRadius * sin,
      labelX: 50 + labelRadius * cos,
      labelY: 50 + labelRadius * sin,
      align,
    };
  });
}

export function CoreValues() {
  const [isLoading, setIsLoading] = useState(true);
  const layout = useRadialLayout(coreValues.length);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CoreValuesSkeleton />;
  }

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 text-[var(--color-forest-deep)]">
      {/* Background image layer */}
      <Image
        src="/core_values.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none z-0 object-cover opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="text-center">
          <Eyebrow className="justify-center text-[var(--color-forest)]">
            Our Core Values
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-[var(--font-display)] text-2xl leading-tight sm:text-3xl">
            Seven Rings. One Standard.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-forest-deep)]/55">
            Slice a roll and you will find rings running all the way through —
            ours carry these.
          </p>
        </div>

        {/* Desktop / tablet: a literal cross-section — values radiate
            from a center hub the way growth rings radiate through a
            roll of paper. This is the signature element.
            pt-14 gives the top label room to sit above the circle's
            own bounding box without colliding with the intro copy. */}
        <div className="relative mx-auto mt-16 hidden aspect-square max-w-[420px] pt-14 lg:block">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="var(--color-forest-deep)"
              strokeOpacity="0.12"
              strokeWidth="0.4"
            />
            <circle
              cx="50"
              cy="50"
              r="17"
              fill="none"
              stroke="var(--color-forest-deep)"
              strokeOpacity="0.08"
              strokeWidth="0.4"
            />
            {layout.map((p, i) => (
              <motion.line
                key={coreValues[i].name}
                x1="50"
                y1="50"
                x2={p.nodeX}
                y2={p.nodeY}
                stroke="var(--color-sun)"
                strokeOpacity="0.5"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              />
            ))}
          </svg>

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--color-forest-deep)]/15 bg-[var(--color-cream,#F7F5EF)] text-center">
            <span className="font-[var(--font-display)] text-lg text-[var(--color-forest)]">
              07
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-[var(--color-forest-deep)]/50">
              Values
            </span>
          </div>

          {layout.map((p, i) => {
            const v = coreValues[i];
            return (
              <motion.div
                key={v.name}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                style={{ left: `${p.nodeX}%`, top: `${p.nodeY}%` }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08 + 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-sun)] bg-white font-[var(--font-display)] text-[10px] text-[var(--color-sun)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            );
          })}

          {layout.map((p, i) => {
            const v = coreValues[i];
            const textAlign =
              p.align === "left"
                ? "text-left"
                : p.align === "right"
                  ? "text-right"
                  : "text-center";
            const translateX =
              p.align === "left"
                ? "0%"
                : p.align === "right"
                  ? "-100%"
                  : "-50%";

            return (
              <div
                key={`${v.name}-label`}
                className={`absolute w-28 -translate-y-1/2 ${textAlign}`}
                style={{
                  left: `${p.labelX}%`,
                  top: `${p.labelY}%`,
                  transform: `translate(${translateX}, -50%)`,
                }}
              >
                <h3 className="font-[var(--font-display)] text-xs leading-tight text-[var(--color-forest-deep)]">
                  {v.name}
                </h3>
                <p className="mt-1 text-[10px] italic leading-snug text-[var(--color-forest)]/70">
                  {v.copy}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile / small tablet fallback: the radial layout doesn't
            have room to breathe below lg, so it collapses to a 2-up
            card grid instead of a stacked list. */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:hidden">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-sun)] font-[var(--font-display)] text-sm text-[var(--color-sun)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[var(--font-display)] text-sm text-[var(--color-forest-deep)]">
                {v.name}
              </h3>
              <p className="mt-1 text-xs italic leading-snug text-[var(--color-forest)]/70">
                {v.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
