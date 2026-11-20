"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { values } from "./content";
import { Wrap, SectionHead } from "./ui";

// Fixed-size stage (px) measured from the reference design.
const STAGE_W = 920;
const STAGE_H = 540;
const CX = 460; // ring center
const CY = 298;
const RINGS = [180, 120, 63]; // outer -> inner ring radii (px)

// Pin centers (px, inside the stage) and where each label sits.
//  above  -> label sits above the pin, centered
//  right  -> label sits below the pin, left edge lined up with the pin
//  left   -> label sits below the pin, right edge lined up with the pin
type Place = { x: number; y: number; side: "above" | "right" | "left" };
const PLACES: Place[] = [
  { x: 460, y: 67, side: "above" }, // 01
  { x: 702, y: 101, side: "right" }, // 02
  { x: 739, y: 274, side: "right" }, // 03
  { x: 590, y: 471, side: "right" }, // 04
  { x: 328, y: 471, side: "left" }, // 05
  { x: 180, y: 274, side: "left" }, // 06
  { x: 217, y: 101, side: "left" }, // 07
];

// Hover descriptions, keyed by value name (must match the names in ./content).
const DESCRIPTIONS: Record<string, string> = {
  "Passion for Excellence":
    "We continuously improve our processes, embrace innovation, and strive to deliver quality in everything we do.",
  Integrity:
    "We uphold honesty, transparency, and accountability, ensuring that we do what is right in every decision and action.",
  "Care for Others":
    "We treat everyone with respect and compassion, fostering a safe, supportive, and inclusive environment for all.",
  Teamwork:
    "We collaborate, share ideas, and support one another, combining our strengths to achieve common goals and greater results.",
  "Customer Focus":
    "We understand our customers' needs and deliver reliable products, consistent quality, and responsive service that build lasting trust.",
  "Love for Mother Earth":
    "We promote responsible resource use, reduce waste, and adopt sustainable practices to help protect the environment for future generations.",
  Resourcefulness:
    "We think creatively, adapt to challenges, and maximize available resources to develop practical, efficient, and innovative solutions.",
};

const PIN = 28; // pin diameter (px)
const TIP_W = 260; // tooltip width (px)

export function CoreValues() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const tooltipStyle = (p: Place): React.CSSProperties => {
    // Keep the card clear of the label the pointer is on.
    // "above" labels sit over the pin, so lift the card above the label too.
    const top = p.side === "above" ? p.y - 23 - 56 : p.y - 22;
    return {
      left: p.x,
      top,
      width: TIP_W,
      transform: "translate(-50%, -100%)",
    };
  };

  return (
    <section className="bg-[#f2f4ef] py-24">
      <Wrap>
        <SectionHead
          id="values"
          center
          eyebrow="Core values"
          title="Seven rings. One standard."
          copy="The principles that shape the way we work, care for people, and build for the future."
        />

        {/* lg+: fixed-size radial layout */}
        <div
          className="relative mx-auto mt-24 mb-24 hidden lg:block"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          <svg
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            width={STAGE_W}
            height={STAGE_H}
            className="absolute inset-0 overflow-visible"
            aria-hidden
          >
            {RINGS.map((r) => (
              <circle
                key={r}
                cx={CX}
                cy={CY}
                r={r}
                fill="none"
                stroke="#b8a04a"
                strokeWidth="1.5"
              />
            ))}
            {values.map((_, i) => (
              <motion.line
                key={i}
                x1={CX}
                y1={CY}
                x2={PLACES[i].x}
                y2={PLACES[i].y}
                stroke="#b8a04a"
                strokeWidth="2"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
              />
            ))}
          </svg>

          {/* center hub (covers the inner end of the spokes) */}
          <div
            className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#e8e8e0] ring-1 ring-[#b8a04a]/60"
            style={{ left: CX, top: CY }}
          >
            <span className="text-4xl font-bold leading-none text-[var(--green-deep)]">
              07
            </span>
            <span className="mt-1 text-[11px] tracking-widest text-[var(--ink)]/60">
              VALUES
            </span>
          </div>

          {values.map(([n, c], i) => {
            const p = PLACES[i];
            const isActive = active === i;
            const label: React.CSSProperties =
              p.side === "above"
                ? {
                    left: p.x,
                    top: p.y - 23,
                    transform: "translate(-50%, -100%)",
                  }
                : p.side === "right"
                  ? { left: p.x - PIN / 2, top: p.y + 24 }
                  : {
                      left: p.x + PIN / 2,
                      top: p.y + 24,
                      transform: "translateX(-100%)",
                    };
            const align =
              p.side === "above"
                ? "text-center"
                : p.side === "right"
                  ? "text-left"
                  : "text-right";

            const hoverProps = {
              onMouseEnter: () => setActive(i),
              onMouseLeave: () => setActive(null),
              onFocus: () => setActive(i),
              onBlur: () => setActive(null),
            };

            return (
              <div key={n}>
                <span
                  tabIndex={0}
                  aria-describedby={isActive ? `value-tip-${i}` : undefined}
                  {...hoverProps}
                  className={`absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--green)] text-[11px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#b8a04a] ${
                    isActive
                      ? "bg-[var(--green-deep)] text-white"
                      : "bg-white text-[var(--green-deep)]"
                  }`}
                  style={{ left: p.x, top: p.y }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  {...hoverProps}
                  className={`absolute cursor-pointer whitespace-nowrap ${align}`}
                  style={label}
                >
                  <h3 className="text-base font-bold leading-6 text-[var(--green-deep)]">
                    {n}
                  </h3>
                  <p className="mt-1 text-xs italic leading-4 text-[var(--ink)]/55">
                    {c}
                  </p>
                </div>
              </div>
            );
          })}

          {/* hover description card */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                id={`value-tip-${active}`}
                role="tooltip"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute z-30 rounded-xl border border-[#b8a04a]/50 bg-white p-4 text-left shadow-lg"
                style={tooltipStyle(PLACES[active])}
              >
                <h4 className="text-sm font-bold text-[var(--green-deep)]">
                  {values[active][0]}
                </h4>
                <p className="mt-1 text-xs leading-5 text-[var(--ink)]/75">
                  {DESCRIPTIONS[values[active][0]]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* below lg: simple grid (no hover on touch, so descriptions are shown) */}
        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:hidden">
          {values.map(([n, c], i) => (
            <li key={n} className="text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[var(--green)] text-sm font-bold text-[var(--green-deep)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-sm font-bold text-[var(--green-deep)]">
                {n}
              </h3>
              <p className="mt-1 text-xs italic text-[var(--ink)]/55">{c}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--ink)]/75">
                {DESCRIPTIONS[n]}
              </p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
