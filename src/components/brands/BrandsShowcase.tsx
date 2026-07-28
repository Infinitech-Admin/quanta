"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/brands";

// Angle spread between neighboring cards in the fan, in degrees.
const FAN_STEP = 5;

export function BrandsShowcase() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory)!;
  const mid = (current.brands.length - 1) / 2;
  const count = current.brands.length;

  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun)] mb-4">
            Our Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--color-forest-deep)]">
            Brands We&apos;ve Grown
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === cat.id
                  ? "bg-[var(--color-forest-deep)] text-white"
                  : "bg-white text-[var(--color-forest-deep)] hover:bg-[var(--color-cream-dim)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category intro */}
        <p className="text-center text-sm text-[var(--color-forest-deep)]/70 max-w-2xl mx-auto mb-12">
          {current.intro}
        </p>

        {/* Fanned card row — width and overlap scale with brand count so everything fits, no scroll */}
        <div className="relative">
          <div className="flex justify-center items-end flex-wrap gap-y-8 px-2 pt-10 pb-8">
            {current.brands.map((brand, index) => {
              const angle = (index - mid) * FAN_STEP;
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  style={
                    {
                      "--tilt": `${angle}deg`,
                      width: `min(${Math.floor(100 / count)}%, 220px)`,
                      marginLeft:
                        index === 0 ? 0 : "clamp(-2.5rem, -4vw, -1rem)",
                      zIndex: index,
                    } as React.CSSProperties
                  }
                  className="group relative flex flex-shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] ring-1 ring-black/5 origin-bottom rotate-[var(--tilt)] transition-all duration-500 ease-out will-change-transform hover:z-50 hover:-translate-y-6 hover:rotate-0 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.4)]"
                >
                  <div
                    className={`relative aspect-[3/4] w-full rounded-xl bg-gradient-to-br ${brand.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                    {brand.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="relative z-10 h-full w-full object-contain p-6"
                      />
                    ) : (
                      <span className="relative z-10 font-serif text-3xl font-bold text-white/90">
                        {brand.name.charAt(0)}
                      </span>
                    )}

                    <div className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-700" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Grounding shadow to seat the fan on the page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-6 w-[70%] max-w-2xl rounded-full bg-black/15 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
