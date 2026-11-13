"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  Package,
  Scroll,
  Search,
  Smile,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";
import type { BrandCategoryGroup } from "@/lib/brands";

const QSTORE_URL = "https://tissuemarket.com";
const CONTACT_PATH = "/contact";

// Short one-liners for each panel header. Falls back to the category intro.
const CATEGORY_TAGLINES: Record<string, string> = {
  Paper:
    "Bathroom tissue, kitchen towels, napkins, and everyday paper essentials.",
  "Personal Care": "Everyday care for you and the people you love.",
  "Baby Care": "Gentle, dependable essentials for little ones.",
  "Oral Care": "Efficient, effective oral hygiene at the best value.",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Paper: Scroll,
  "Personal Care": Sparkles,
  "Baby Care": Baby,
  "Oral Care": Smile,
};

type Brand = BrandCategoryGroup["brands"][number];

/**
 * Optional extra fields the modal can use if your brand data has them.
 * Everything falls back to existing fields, so nothing breaks if they're missing.
 */
type BrandExtras = {
  tagline?: string;
  story?: string | string[]; // paragraph(s); first is shown bold as the lead
  setsApart?: string;
  suits?: string;
  accent?: string; // header background, e.g. "#c2185b"
  storeUrl?: string; // per-brand QStore link
};

export function BrandsShowcase({
  categories,
}: {
  categories: BrandCategoryGroup[];
}) {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{
    brand: Brand;
    categoryLabel: string;
  } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => active === "all" || c.id === active)
      .map((c) => ({
        ...c,
        brands: c.brands.filter(
          (b) =>
            !q ||
            b.name.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q) ||
            b.features.some((f) => f.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.brands.length > 0);
  }, [categories, active, query]);

  const total = visible.reduce((n, c) => n + c.brands.length, 0);

  return (
    <section className="bg-[#eff1ea] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0f4a2c]">
            Brands we&rsquo;ve grown
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#12392a] md:text-5xl">
            Get to know our brands.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.9] text-[#5b6460]">
            Each Quanta brand has its own purpose, audience, and everyday
            advantages. Explore what makes them different.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter brands by category"
            className="flex flex-wrap gap-2.5"
          >
            {[{ id: "all", label: "All brands" }, ...categories].map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`rounded-full border px-5 py-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651] ${
                    on
                      ? "border-[#0b5a32] bg-[#0b5a32] text-white shadow-md"
                      : "border-black/10 bg-white text-[#0f4a2c] hover:bg-[#f4f8f5]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="lg:w-64">
            <label className="relative block">
              <span className="sr-only">Search a brand</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5b6460]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a brand"
                className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-10 pr-4 text-xs text-[#1f2623] outline-none placeholder:text-[#7a847f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20"
              />
            </label>
          </div>
        </div>
        <p
          className="mt-3 text-right text-[11px] text-[#5b6460]"
          aria-live="polite"
        >
          Showing {total} {total === 1 ? "brand" : "brands"}
        </p>

        {/* Category panels */}
        <div className="mt-4 space-y-8">
          {visible.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center text-sm text-[#5b6460]">
              No brands match &ldquo;{query}&rdquo;. Try a different name, or
              clear the search.
            </div>
          )}

          {visible.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.label] ?? Package;
            const tagline = CATEGORY_TAGLINES[cat.label] ?? cat.intro;
            return (
              <motion.div
                key={cat.id}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_-20px_rgba(15,74,44,0.35)] ring-1 ring-black/5"
              >
                <div className="flex flex-col gap-3 bg-gradient-to-r from-[#1f6b45] via-[#3f8a5f] to-[#7bad84] px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#1f6b45]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-3xl font-bold tracking-[-0.03em]">
                      {cat.label}
                    </h3>
                  </div>
                  {tagline && (
                    <p className="max-w-sm text-xs leading-relaxed text-white/90 sm:text-right">
                      {tagline}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {cat.brands.map((brand) => {
                    const src = getImageUrl(brand.image);
                    return (
                      <article
                        key={brand.id}
                        className="group flex flex-col rounded-2xl border border-black/[0.06] bg-[#fdfdf9] p-5 transition-shadow duration-200 hover:shadow-lg"
                      >
                        <div className="flex h-[120px] items-center justify-center">
                          {src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={src}
                              alt=""
                              className="max-h-full w-auto max-w-[150px] object-contain drop-shadow-md"
                              draggable={false}
                            />
                          ) : (
                            <span className="text-2xl font-bold text-[#0f4a2c]">
                              {brand.name}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-5 text-sm font-bold text-[#12392a]">
                          {brand.name}
                        </h4>
                        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-xs leading-[1.7] text-[#5b6460]">
                          {brand.description}
                        </p>

                        <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                          {brand.features.slice(0, 2).map((f) => (
                            <li
                              key={f}
                              className="line-clamp-2 rounded-2xl bg-[#e4eee6] px-2.5 py-1 text-[10px] font-bold leading-snug text-[#0f4a2c]"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() =>
                            setSelected({ brand, categoryLabel: cat.label })
                          }
                          className="mt-5 flex shrink-0 items-center justify-between rounded-full border border-[#00a651] px-5 py-3 text-xs font-bold text-[#0f4a2c] transition-colors hover:bg-[#00a651] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
                        >
                          Explore brand
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </article>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <BrandModal
            brand={selected.brand}
            categoryLabel={selected.categoryLabel}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function BrandModal({
  brand,
  categoryLabel,
  onClose,
}: {
  brand: Brand;
  categoryLabel: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const extras = brand as Brand & BrandExtras;
  const src = getImageUrl(brand.image);

  const accent = extras.accent ?? "#0b5a32";
  const tagline = extras.tagline ?? brand.description;
  const paragraphs = Array.isArray(extras.story)
    ? extras.story
    : extras.story
      ? [extras.story]
      : [brand.description];
  const [lead, ...rest] = paragraphs;
  const setsApart = extras.setsApart ?? brand.features[0];
  const suits = extras.suits;
  const storeUrl = extras.storeUrl ?? QSTORE_URL;
  const contactHref = `${CONTACT_PATH}?brand=${encodeURIComponent(brand.slug)}`;

  // Close on Escape, lock body scroll, focus the close button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-[#fdfdf9] shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative px-8 pb-10 pt-8 text-white"
          style={{
            background: `radial-gradient(circle at 75% 20%, rgba(255,255,255,0.22), transparent 45%), ${accent}`,
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
            {categoryLabel} &middot; Brand preview
          </p>
          <div className="mt-6 flex h-[110px] items-center">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={`${brand.name} logo`}
                className="max-h-full w-auto max-w-[180px] object-contain drop-shadow-lg"
                draggable={false}
              />
            ) : (
              <span className="text-4xl font-bold">{brand.name}</span>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close brand preview"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#12392a] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 pt-8">
          <h3
            id="brand-modal-title"
            className="text-3xl font-bold tracking-[-0.03em] text-[#12392a]"
          >
            {brand.name}
          </h3>
          <p className="mt-3 text-base text-[#5b6460]">{tagline}</p>

          <hr className="my-6 border-black/10" />

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f6a3c]">
            The brand story
          </p>
          <p className="mt-4 text-sm font-bold leading-[1.9] text-[#12392a]">
            {lead}
          </p>
          {rest.map((p, i) => (
            <p key={i} className="mt-4 text-sm leading-[1.9] text-[#4a534f]">
              {p}
            </p>
          ))}

          {(setsApart || suits) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {setsApart && (
                <div className="rounded-2xl bg-[#eef2ea] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#3f7a58]">
                    What sets it apart
                  </p>
                  <p className="mt-3 text-sm text-[#12392a]">{setsApart}</p>
                </div>
              )}
              {suits && (
                <div className="rounded-2xl bg-[#eef2ea] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#3f7a58]">
                    Who it may suit
                  </p>
                  <p className="mt-3 text-sm text-[#12392a]">{suits}</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#00a651] bg-[#00a651] px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-[#008a43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
            >
              Visit QStore
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href={contactHref}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0f4a2c]/40 bg-white px-6 py-3 text-xs font-bold text-[#0f4a2c] transition-colors hover:bg-[#f4f8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
            >
              Ask about this brand
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
