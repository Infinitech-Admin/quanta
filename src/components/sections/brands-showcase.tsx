"use client";

import { useState } from "react";
import Link from "next/link";

interface Brand {
  slug: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  image?: string; // small thumbnail card, path sa /public, e.g. "/brands/kami.png"
  heroImage?: string; // big preview panel image, e.g. "/brands/hero/kami.png"
}

interface Category {
  id: string;
  label: string;
  intro: string;
  brands: Brand[];
}

// Totoong data mula sa quantapaper.com.ph/brands
const categories: Category[] = [
  {
    id: "paper",
    label: "Paper",
    intro:
      "Our flagship product, Fresh Bathroom Tissue uses 100% recycled paper — the only one of its kind in the market today. Our premium paper brands utilize virgin pulp from man-made forest sources with Forest Stewardship certificates.",
    brands: [
      {
        slug: "fresh-premium-eco-pulp",
        name: "Fresh Premium Eco-Pulp",
        description:
          "High grade tissue that is absorbent, hygienic and environment-friendly, made from Premium Eco-Pulp mixed with alternative plant-based pulp from internationally certified sources.",
        color: "#16a34a",
        gradient: "from-green-600 via-green-500 to-emerald-400",
        image: "/brands/fresh-premium-eco-pulp.png",
        heroImage: "/brands/hero/fresh-premium-eco-pulp.png",
      },
      {
        slug: "kami",
        name: "Kami",
        description:
          "The best tissue for every Filipino home. Made with 100% Virgin Pulp for the best and softest quality while giving value for money. Kahit saan, kahit kailan... KAMI ang makakasama mo.",
        color: "#b91c1c",
        gradient: "from-rose-700 via-rose-500 to-pink-300",
        image: "/brands/kami.png",
        heroImage: "/brands/hero/kami.png",
      },
      {
        slug: "smart-choice",
        name: "Smart Choice",
        description:
          "Always the best choice — the first Giant Roll Tissue with over 1000 thicker sheets made from Virgin Pulp using innovative Pure-soft technology.",
        color: "#ea580c",
        gradient: "from-orange-500 via-amber-400 to-teal-300",
        image: "/brands/smart-choice.png",
        heroImage: "/brands/hero/smart-choice.png",
      },
      {
        slug: "vanita",
        name: "Vanitá",
        description:
          "The most luxurious tissue made with the choicest 100% virgin fiber — hypo-allergenic, hygienic, and the softest quality. Luxuriously Beautiful, Elegantly Strong.",
        color: "#1e3a8a",
        gradient: "from-blue-900 via-indigo-700 to-slate-400",
        image: "/brands/vanita.png",
        heroImage: "/brands/hero/vanita.png",
      },
      {
        slug: "fresh",
        name: "Fresh",
        description:
          "Made of 100% recycled paper, so no trees are harmed in making them — with no artificial bleaching agents, only state-of-the-art paper-making technology for soft, clean, absorbent tissue.",
        color: "#15803d",
        gradient: "from-emerald-700 via-green-500 to-lime-300",
        image: "/brands/fresh.png",
        heroImage: "/brands/hero/fresh.png",
      },
      {
        slug: "harmony",
        name: "Harmony",
        description:
          "The best choice for every dinner table — at home, in restaurants, or cafés. Ultra-hygienic table napkins at an affordable price, made from 100% recycled paper.",
        color: "#dc2626",
        gradient: "from-red-600 via-red-500 to-blue-700",
        image: "/brands/harmony.png",
        heroImage: "/brands/hero/harmony.png",
      },
      {
        slug: "fresh-eco-hygiene",
        name: "Fresh by Eco Hygiene",
        description:
          "Eco-Hygiene Institutional Sales Corporation, a member of the Quanta Group of Companies, caters to institutional customers like hotels, resorts, restaurants, hospitals and government offices.",
        color: "#065f46",
        gradient: "from-emerald-900 via-teal-700 to-emerald-500",
        image: "/brands/fresh-eco-hygiene.png",
        heroImage: "/brands/hero/fresh-eco-hygiene.png",
      },
    ],
  },
  {
    id: "personal-care",
    label: "Personal Care",
    intro:
      "With these high-quality and affordable personal care products, we want you to take care of yourself and the people you love.",
    brands: [
      {
        slug: "sweetbaby",
        name: "Sweetbaby",
        description:
          "Diapers and wipes that keep babies dry, clean, and comfortable while giving parents the best value for their money. More sweet moments with SweetBaby!",
        color: "#0ea5e9",
        gradient: "from-sky-500 via-sky-400 to-blue-200",
        image: "/brands/sweetbaby.png",
        heroImage: "/brands/hero/sweetbaby.png",
      },
      {
        slug: "prime-care",
        name: "Prime Care",
        description:
          "Show your loved ones how much you care with PrimeCare Adult Diapers — made with the best materials to keep sick or elderly loved ones dry and comfortable.",
        color: "#7c3aed",
        gradient: "from-violet-600 via-purple-500 to-fuchsia-300",
        image: "/brands/prime-care.png",
        heroImage: "/brands/hero/prime-care.png",
      },
      {
        slug: "life-defender",
        name: "Life Defender",
        description:
          "An FDA-approved disposable face mask that provides optimum protection from bacteria and viruses — a breakthrough product made by Filipinos for the Filipino.",
        color: "#0f172a",
        gradient: "from-slate-800 via-slate-600 to-slate-400",
        image: "/brands/life-defender.png",
        heroImage: "/brands/hero/life-defender.png",
      },
    ],
  },
  {
    id: "oral-care",
    label: "Oral Care",
    intro:
      "Because good oral hygiene is not only about brushing your teeth, we came up with oral care products that are efficient and effective while giving the best value for money.",
    brands: [
      {
        slug: "fresh-toothbrush",
        name: "Fresh Toothbrush",
        description:
          "Manufactured in a fully automated German-made facility with charcoal-tapered filaments that effectively remove oral odor. Soft, flexible bristles that massage and improve gum circulation.",
        color: "#0891b2",
        gradient: "from-cyan-600 via-cyan-400 to-teal-200",
        image: "/brands/fresh-toothbrush.png",
        heroImage: "/brands/hero/fresh-toothbrush.png",
      },
      {
        slug: "teabiotic",
        name: "TeaBiotic",
        description:
          "A highly innovative toothpaste with probiotics for a cleaner and healthier mouth. Cleans deep. Strengthens. Protects. Level up your oral care with TeaBiotic.",
        color: "#16a34a",
        gradient: "from-green-600 via-teal-500 to-emerald-300",
        image: "/brands/teabiotic.png",
        heroImage: "/brands/hero/teabiotic.png",
      },
    ],
  },
];

export function BrandsShowcase() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory)!;

  const [selectedSlug, setSelectedSlug] = useState(current.brands[0].slug);

  // Reset the preview to the first brand whenever the category changes.
  // This adjusts state during render instead of inside a useEffect —
  // the recommended pattern for "derived state that resets when a
  // prop/state changes" — which avoids an extra wasted re-render and
  // satisfies the react-hooks/set-state-in-effect lint rule.
  const [prevCategory, setPrevCategory] = useState(activeCategory);
  if (prevCategory !== activeCategory) {
    setPrevCategory(activeCategory);
    setSelectedSlug(current.brands[0].slug);
  }

  const selectedBrand =
    current.brands.find((b) => b.slug === selectedSlug) ?? current.brands[0];

  return (
    <section className="py-24 px-6 md:px-16 bg-[var(--color-sage-light)]">
      <div className="max-w-5xl mx-auto">
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
        <p className="text-center text-sm text-[var(--color-forest-deep)]/70 max-w-2xl mx-auto mb-10">
          {current.intro}
        </p>

        {/* ———————————————————————— Big preview panel (clickable card) ———————————————————————— */}
        <Link
          href={`/brands/${selectedBrand.slug}`}
          className={`group relative block h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-br ${selectedBrand.gradient} shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 sm:h-96`}
        >
          {/* Hero image covers the entire card */}
          {selectedBrand.heroImage || selectedBrand.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selectedBrand.heroImage ?? selectedBrand.image}
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

        {/* ———————————————————————— Thumbnail selector ———————————————————————— */}
        <div className="mt-10">
          <div className="flex flex-wrap justify-center gap-4 px-2">
            {current.brands.map((brand) => {
              const isSelected = brand.slug === selectedBrand.slug;
              return (
                <button
                  key={brand.slug}
                  type="button"
                  onClick={() => setSelectedSlug(brand.slug)}
                  aria-pressed={isSelected}
                  aria-label={`Preview ${brand.name}`}
                  className={`group relative flex w-[110px] shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:w-[130px] ${
                    isSelected
                      ? "-translate-y-1 ring-2 ring-[var(--color-sun)] shadow-md"
                      : "ring-black/5"
                  }`}
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
                        className="relative z-10 h-full w-full object-contain p-4"
                      />
                    ) : (
                      <span className="relative z-10 font-serif text-2xl font-bold text-white/90">
                        {brand.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
