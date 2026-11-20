"use client";

import { useState } from "react";
import Image from "next/image";
import { centers } from "./content";
import { Wrap, SectionHead, Eyebrow, card } from "./ui";

// City positions on the pin-free ph-map.png, as % of the image (left, top).
// Index 0 = pin #1. Estimated from your screenshot; fine-tune with the
// click helper on <figure> below.
const PINS: [number, number][] = [
  [69.9, 42.5], // 1 Tacloban
  [48.0, 52.4], // 2 Iloilo
  [64.9, 54.1], // 3 Cebu
  [56.3, 57.3], // 4 Bacolod
  [75.9, 65.7], // 5 Cagayan de Oro
  [79.1, 74.9], // 6 Davao
];

export function DistributionCenters() {
  const [active, setActive] = useState<number | null>(null);
  let n = 0;

  return (
    <section className="bg-[var(--paper)] py-24">
      <Wrap>
        <SectionHead
          id="distribution"
          eyebrow="Distribution Centers"
          copy="Explore the distribution centers and regional branches that help bring Quanta products to communities across the Philippines."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.35fr]">
          <figure
            className="relative mx-auto w-full max-w-sm"
            // TEMP: click a pin on the page to log its exact [left, top] %.
            // Copy the values into PINS, then delete this handler.
            // onClick={(e) => {
            //   const r = e.currentTarget.getBoundingClientRect();
            //   console.log(
            //     `[${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}, ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}],`
            //   );
            // }}
          >
            {/* Use the PNG's real pixel size so the % positions line up */}
            <Image
              src="/ph-map-distributions.png"
              alt="Map of the Philippines with numbered Quanta distribution centers"
              width={409} // <- your PNG's real width
              height={478} // <- your PNG's real height
              className="h-auto w-full"
              priority
            />

            {PINS.map(([left, top], i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Location ${i + 1}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                >
                  {/* glow ring, only visible when active */}
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-full bg-[var(--green)] transition-all duration-300 ${
                      isActive
                        ? "scale-[2] animate-pulse opacity-40"
                        : "scale-50 opacity-0"
                    }`}
                  />
                  {/* numbered pin: always visible, lights up when active */}
                  <span
                    className={`pointer-events-none relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow-md transition-all duration-300 ${
                      isActive
                        ? "z-10 scale-125 bg-[var(--green)] ring-4 ring-[var(--green)]/30"
                        : "bg-[var(--green-deep)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                </button>
              );
            })}

            <figcaption className="mt-3 text-center text-xs text-[var(--ink)]/55">
              6 featured locations
            </figcaption>
          </figure>

          <div className="space-y-8">
            {centers.map((g) => (
              <div key={g.group}>
                <Eyebrow>{g.group}</Eyebrow>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {g.items.map(([name, addr]) => {
                    const idx = n++;
                    const isActive = active === idx;
                    return (
                      <li
                        key={name}
                        tabIndex={0}
                        onMouseEnter={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(idx)}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive(idx)}
                        className={`${card} flex gap-3 p-5 transition-all duration-300 ${
                          isActive
                            ? "border-[var(--green)] bg-[var(--green)]/10 shadow-lg ring-1 ring-[var(--green)]"
                            : ""
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white transition-colors ${
                            isActive
                              ? "bg-[var(--green)]"
                              : "bg-[var(--green-deep)]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-[15px] font-bold leading-snug text-[var(--green-deep)]">
                            {name}
                          </h3>
                          <p className="mt-1.5 text-xs leading-5 text-[var(--ink)]/65">
                            {addr}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
