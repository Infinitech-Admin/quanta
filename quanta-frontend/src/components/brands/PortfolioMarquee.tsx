"use client";

import { useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { getImageUrl } from "@/lib/image-url";
import type { BrandCategoryGroup } from "@/lib/brands";

export function PortfolioMarquee({
  categories,
}: {
  categories: BrandCategoryGroup[];
}) {
  const [paused, setPaused] = useState(false);
  const brands = categories.flatMap((c) => c.brands);
  if (brands.length === 0) return null;

  // Rendered twice so translateX(-50%) loops seamlessly.
  const logos = (hidden = false) => (
    <div
      className="flex shrink-0 items-center gap-20 pr-20"
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
            className="flex h-[88px] shrink-0 items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00a651]"
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={hidden ? "" : brand.name}
                className="h-full w-auto max-w-[180px] object-contain"
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
    <section className="bg-[#fdfdf9] pb-14 pt-20 md:pt-24">
      <style>{`
        @keyframes quanta-portfolio-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .quanta-portfolio-track { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0f4a2c]">
          The Quanta portfolio
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#12392a] md:text-5xl">
          Find the right product for every need.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.9] text-[#5b6460]">
          Discover the distinct brands that bring Quanta&rsquo;s paper, personal
          care, baby care, and oral care essentials to everyday life.
        </p>
      </div>

      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className="quanta-portfolio-track flex w-max"
          style={{
            animation: `quanta-portfolio-marquee ${brands.length * 4}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {logos()}
          {logos(true)}
        </div>
      </div>
    </section>
  );
}
