"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";
import type { BrandCategoryGroup } from "@/lib/brands";

interface BrandsMarqueeProps {
  categories: BrandCategoryGroup[];
}

export function BrandsMarquee({ categories }: BrandsMarqueeProps) {
  const [paused, setPaused] = useState(false);

  // One flat list of every brand across all categories
  const brands = categories.flatMap((c) => c.brands);
  if (brands.length === 0) return null;

  const categoryLine = categories.map((c) => c.label).join(" · ");

  // One "half" of the track. It's rendered twice so the loop is seamless.
  const logos = (hidden = false) => (
    <div
      className="flex shrink-0 items-center gap-16 pr-16"
      aria-hidden={hidden || undefined}
    >
      {brands.map((brand) => {
        const src = getImageUrl(brand.image);
        return (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            tabIndex={hidden ? -1 : undefined}
            aria-label={brand.name}
            className="flex h-[88px] shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105"
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={hidden ? "" : brand.name}
                className="h-full w-auto max-w-[200px] object-contain"
                draggable={false}
              />
            ) : (
              <span className="text-2xl font-bold text-[#0f4a2c]">
                {brand.name}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      {/* keyframes for the loop; paused via animation-play-state */}
      <style>{`
        @keyframes quanta-brands-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .quanta-brands-track { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a651]">
              Our Brands
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#1f2623] md:text-5xl">
              Brands we&rsquo;ve grown.
            </h2>
          </div>

          <div className="max-w-md md:pb-1">
            <p className="text-sm leading-[1.9] text-[#5b6460]">
              A growing family of consumer and institutional brands—each created
              for different routines, preferences, and spaces.
            </p>
            <Link
              href="/brands"
              className="mt-4 inline-block text-sm font-bold text-[#00a651] transition-opacity hover:opacity-80"
            >
              Explore All Our Brands →
            </Link>
          </div>
        </motion.div>

        {/* ── Logo marquee, faded at both edges ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="group/marquee mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div
            className="quanta-brands-track flex w-max"
            style={{
              animation: `quanta-brands-marquee ${brands.length * 4}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {logos()}
            {logos(true)}
          </div>
        </motion.div>

        {/* ── Footer row ── */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#5b6460]">{categoryLine}</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-3 text-xs font-bold text-[#0f4a2c] transition-colors hover:bg-black/5"
            >
              {paused ? (
                <Play className="h-3 w-3 fill-current" />
              ) : (
                <Pause className="h-3 w-3 fill-current" />
              )}
              {paused ? "Play" : "Pause"}
            </button>

            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0b5a32] px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-[#094a29]"
            >
              Explore all {brands.length} brands
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
