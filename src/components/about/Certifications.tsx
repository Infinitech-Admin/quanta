"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eyebrow } from "./ui";
import { certifications } from "./content";
import { motion } from "framer-motion";
import { AboutCertificationsSkeleton } from "@/components/skeleton/AboutSkeleton";

// A medal, not a badge: solid disc + a two-tail ribbon hanging beneath it,
// each tail cut to a V at the bottom via clip-path. Everything stays
// upright — no rotation, no scatter — the shape itself carries the
// "earned, not printed" idea instead of a tilt effect.
function Medal({ mark }: { mark: string }) {
  const ribbonTail = "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)";

  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute top-[52px] flex gap-1">
        <span
          className="h-9 w-4 bg-[var(--color-sun)]"
          style={{ clipPath: ribbonTail }}
        />
        <span
          className="h-9 w-4 bg-[var(--color-sun)]/70"
          style={{ clipPath: ribbonTail }}
        />
      </div>
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-forest)] shadow-sm">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-dashed border-[var(--color-cream)]/50">
          <span className="px-1 text-center font-[var(--font-display)] text-[11px] font-semibold leading-none text-[var(--color-cream)]">
            {mark}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AboutCertificationsSkeleton />;
  }

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-cream,#F7F5EF)] py-24 text-[var(--color-forest-deep)]">
      {/* Background image layer */}
      <Image
        src="/certifications.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="pointer-events-none z-0 object-cover opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center sm:px-10">
        <Eyebrow className="justify-center text-[var(--color-forest)]">
          Our Certifications
        </Eyebrow>
        <h2 className="mx-auto mt-4 max-w-xl font-[var(--font-display)] text-2xl leading-tight sm:text-3xl">
          Certified. Trusted. Assured.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-4">
          {certifications.map((c, index) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col items-center"
            >
              <Medal mark={c.mark} />

              <span className="mt-8 h-4 text-[11px] uppercase tracking-[0.15em] text-[var(--color-forest)]/70">
                {"year" in c && c.year ? `Awarded ${c.year}` : ""}
              </span>
              <h3 className="mt-1.5 font-[var(--font-display)] text-sm leading-tight sm:text-base">
                {c.title}
              </h3>
              <p className="mt-1.5 max-w-[15rem] text-xs leading-relaxed text-[var(--color-forest-deep)]/60">
                {c.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
