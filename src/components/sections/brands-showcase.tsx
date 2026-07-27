"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Brand {
  slug: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  image?: string; // path sa /public, e.g. "/brands/kami.png"
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
      },
      {
        slug: "kami",
        name: "Kami",
        description:
          "The best tissue for every Filipino home. Made with 100% Virgin Pulp for the best and softest quality while giving value for money. Kahit saan, kahit kailan... KAMI ang makakasama mo.",
        color: "#b91c1c",
        gradient: "from-rose-700 via-rose-500 to-pink-300",
        image: "/brands/kami.png",
      },
      {
        slug: "smart-choice",
        name: "Smart Choice",
        description:
          "Always the best choice — the first Giant Roll Tissue with over 1000 thicker sheets made from Virgin Pulp using innovative Pure-soft technology.",
        color: "#ea580c",
        gradient: "from-orange-500 via-amber-400 to-teal-300",
        image: "/brands/smart-choice.png",
      },
      {
        slug: "vanita",
        name: "Vanitá",
        description:
          "The most luxurious tissue made with the choicest 100% virgin fiber — hypo-allergenic, hygienic, and the softest quality. Luxuriously Beautiful, Elegantly Strong.",
        color: "#1e3a8a",
        gradient: "from-blue-900 via-indigo-700 to-slate-400",
        image: "/brands/vanita.png",
      },
      {
        slug: "fresh",
        name: "Fresh",
        description:
          "Made of 100% recycled paper, so no trees are harmed in making them — with no artificial bleaching agents, only state-of-the-art paper-making technology for soft, clean, absorbent tissue.",
        color: "#15803d",
        gradient: "from-emerald-700 via-green-500 to-lime-300",
        image: "/brands/fresh.png",
      },
      {
        slug: "harmony",
        name: "Harmony",
        description:
          "The best choice for every dinner table — at home, in restaurants, or cafés. Ultra-hygienic table napkins at an affordable price, made from 100% recycled paper.",
        color: "#dc2626",
        gradient: "from-red-600 via-red-500 to-blue-700",
        image: "/brands/harmony.png",
      },
      {
        slug: "fresh-eco-hygiene",
        name: "Fresh by Eco Hygiene",
        description:
          "Eco-Hygiene Institutional Sales Corporation, a member of the Quanta Group of Companies, caters to institutional customers like hotels, resorts, restaurants, hospitals and government offices.",
        color: "#065f46",
        gradient: "from-emerald-900 via-teal-700 to-emerald-500",
        image: "/brands/fresh-eco-hygiene.png",
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
      },
      {
        slug: "prime-care",
        name: "Prime Care",
        description:
          "Show your loved ones how much you care with PrimeCare Adult Diapers — made with the best materials to keep sick or elderly loved ones dry and comfortable.",
        color: "#7c3aed",
        gradient: "from-violet-600 via-purple-500 to-fuchsia-300",
        image: "/brands/prime-care.png",
      },
      {
        slug: "life-defender",
        name: "Life Defender",
        description:
          "An FDA-approved disposable face mask that provides optimum protection from bacteria and viruses — a breakthrough product made by Filipinos for the Filipino.",
        color: "#0f172a",
        gradient: "from-slate-800 via-slate-600 to-slate-400",
        image: "/brands/life-defender.png",
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
      },
      {
        slug: "teabiotic",
        name: "TeaBiotic",
        description:
          "A highly innovative toothpaste with probiotics for a cleaner and healthier mouth. Cleans deep. Strengthens. Protects. Level up your oral care with TeaBiotic.",
        color: "#16a34a",
        gradient: "from-green-600 via-teal-500 to-emerald-300",
        image: "/brands/teabiotic.png",
      },
    ],
  },
];

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
