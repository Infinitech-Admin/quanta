"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";
import type { BrandCategoryGroup, BrandWithCategory } from "@/lib/brands";

interface BrandsShowcaseProps {
  categories: BrandCategoryGroup[];
}

export function BrandsShowcase({ categories }: BrandsShowcaseProps) {
  // All hooks must run on every render, in the same order — so they have
  // to sit above the `categories.length === 0` early return below, not
  // after it. Falling back to an empty-string id when there's nothing to
  // show keeps these safe to call unconditionally.
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const current =
    categories.find((c) => c.id === activeCategory) ?? categories[0];

  const [selectedSlug, setSelectedSlug] = useState(
    current?.brands[0]?.slug ?? "",
  );

  // Reset the preview to the first brand whenever the category changes.
  // This adjusts state during render instead of inside a useEffect —
  // the recommended pattern for "derived state that resets when a
  // prop/state changes" — which avoids an extra wasted re-render and
  // satisfies the react-hooks/set-state-in-effect lint rule.
  const [prevCategory, setPrevCategory] = useState(activeCategory);
  if (prevCategory !== activeCategory) {
    setPrevCategory(activeCategory);
    setSelectedSlug(current?.brands[0]?.slug ?? "");
  }

  if (categories.length === 0 || !current) return null;

  const selectedBrand: BrandWithCategory | undefined =
    current.brands.find((b) => b.slug === selectedSlug) ?? current.brands[0];

  if (!selectedBrand) return null;

  const selectedImage = getImageUrl(
    selectedBrand.heroImage ?? selectedBrand.image,
  );

  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun)] mb-4">
              Our Portfolio
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-serif text-3xl font-bold md:text-4xl mb-4 text-[var(--color-forest)]">
              Brands We&apos;ve Grown
            </h2>
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? "bg-[var(--color-forest-vivid)] text-white"
                    : "bg-white text-[var(--color-forest-deep)] hover:bg-[var(--color-moss)]/50"
                }`}
              >
                {cat.label}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Category intro */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-center text-sm text-[var(--color-forest-deep)]/70 max-w-2xl mx-auto mb-10">
            {current.intro}
          </p>
        </motion.div>

        {/* ———————————————————————— Big preview panel (clickable card) ———————————————————————— */}
        <motion.div
          initial={{ opacity: 0, scale: 1.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            href={`/brands/${selectedBrand.slug}`}
            className="group relative block h-80 w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 sm:h-96"
            style={{ backgroundImage: selectedBrand.gradient }}
          >
            {/* Hero image covers the entire card */}
            {selectedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedImage}
                alt={selectedBrand.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-8xl font-bold text-white/90">
                  {selectedBrand.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Bottom scrim so the name stays readable over any image */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Brand name, overlaid on the image */}
            <div className="absolute inset-x-0 bottom-0 px-8 pb-6 text-center text-white">
              <h3 className="font-serif text-2xl sm:text-3xl">
                {selectedBrand.name}
              </h3>
            </div>
          </Link>
        </motion.div>

        {/* ———————————————————————— Thumbnail selector ———————————————————————— */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-4 px-2">
            {current.brands.map((brand, index) => {
              const isSelected = brand.slug === selectedBrand.slug;
              const thumbImage = getImageUrl(brand.image);
              return (
                <motion.div
                  key={brand.slug}
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(brand.slug)}
                    aria-pressed={isSelected}
                    aria-label={`Preview ${brand.name}`}
                    className={`group relative flex w-[110px] shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-2 hover:shadow-md sm:w-[130px] ${
                      isSelected
                        ? "-translate-y-1 ring-2 ring-[var(--color-sun)] shadow-md"
                        : "ring-black/5"
                    }`}
                  >
                    <div
                      className="relative aspect-[3/4] w-full flex items-center justify-center overflow-hidden rounded-xl"
                      style={{ backgroundImage: brand.gradient }}
                    >
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, white 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }}
                      />
                      {thumbImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbImage}
                          alt={brand.name}
                          className="relative z-10 h-full w-full object-contain p-4"
                        />
                      ) : (
                        <span className="relative z-10 font-serif text-2xl font-bold text-white/90">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
