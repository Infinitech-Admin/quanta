"use client";
import { motion, useReducedMotion } from "framer-motion";
import { milestones, specs } from "./content";
import { Wrap, SectionHead, Eyebrow } from "./ui";

export function OurHistory() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[var(--paper)] py-24">
      <Wrap>
        <SectionHead
          id="history"
          center
          eyebrow="Our history"
          title="Built on experience. Focused on the future."
        />
        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Timeline is a real sequence, so numbered nodes stay; the line draws in once */}
          <motion.div
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-6 hidden h-px origin-left bg-[var(--green)]/50 md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          {milestones.map((m, i) => (
            <div key={m.title} className="relative flex flex-col items-center">
              <span className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[var(--green)] text-sm font-bold text-white shadow-md">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-6 w-px bg-[var(--green)]/60" />
              <div className="w-full flex-1 rounded-2xl border-t-2 border-[var(--green)] bg-white p-7 text-center shadow-[0_8px_30px_-12px_rgba(0,60,30,.18)]">
                <Eyebrow className="!text-[10px] !tracking-[0.18em]">
                  {m.tag}
                </Eyebrow>
                <h3 className="mt-3 text-xl font-bold leading-snug text-[var(--green-deep)]">
                  {m.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-[var(--ink)]/65">
                  {m.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {specs.map(([v, l]) => (
            <div
              key={l}
              className="rounded-2xl bg-[var(--green)] px-4 py-6 text-center text-white"
            >
              <dd className="text-2xl font-bold">{v}</dd>
              <dt className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/80">
                {l}
              </dt>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}
