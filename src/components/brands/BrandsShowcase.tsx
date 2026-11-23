"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  Scroll,
  Search,
  Smile,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getImageUrl, getRemoteImageUrl } from "@/lib/image-url";
import type { BrandCategoryGroup } from "@/lib/brands";

const QSTORE_URL = "https://tissuemarket.com";
const CONTACT_PATH = "/contact";

/* -------------------------------------------------------------------------
 * STATIC CONTENT — edit copy here. Images come from the API by default;
 * add `image: "/brands/xxx.png"` (file in /public/brands) to use a static one.
 * NOTE: a brand's `slug` (or `name`) must match the brand in the admin page,
 * otherwise its admin image can't be found.
 * ---------------------------------------------------------------------- */

type StaticBrand = {
  slug: string;
  name: string;
  description: string;
  features: [string, string];
  accent: string; // modal header colour
  story: string[]; // first paragraph is shown bold as the lead
  note?: string; // small provisional-copy box
  setsApart: string;
  suits: string;
  image?: string; // optional static image (fallback when API has none)
};

type StaticCategory = {
  id: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  headerClass: string;
  brands: StaticBrand[];
};

const CATEGORIES: StaticCategory[] = [
  {
    id: "paper",
    label: "Paper",
    tagline:
      "Bathroom tissue, kitchen towels, napkins, and everyday paper essentials.",
    icon: Scroll,
    headerClass: "bg-gradient-to-r from-[#1f6b45] via-[#3f8a5f] to-[#7bad84]",
    brands: [
      {
        slug: "kami",
        name: "Kami",
        description:
          "Quality, affordable tissue made for practical Filipino households.",
        features: ["Everyday value", "Multi-purpose"],
        accent: "#c2185b",
        story: [
          "Kami is a Filipino tissue brand designed for everyday households that want quality tissue products at an affordable price. The brand caters primarily to the mass market, particularly Filipino families who are practical with their spending but still value reliability and comfort in the products they use daily.",
          "The name “KAMI”, which means “WE” in Filipino, reflects the brand’s philosophy: it represents collective Filipino resilience, unity, and everyday life. KAMI positions itself as a brand for the people — approachable, relatable, and proudly Filipino. In a category dominated by established hygiene brands, KAMI seeks to differentiate itself through authentic communication and strong community connection to become a trusted household companion.",
        ],
        setsApart: "Everyday practical tissue for the family.",
        suits:
          "Families and shoppers looking for household tissue for regular use.",
      },
      {
        // Slug matches the admin ("vanita") so its admin image is found.
        slug: "vanita",
        name: "Vanita Premium",
        description: "Premium tissue that elevates everyday comfort.",
        features: ["Premium feel", "Softness-focused"],
        accent: "#2d4f94",
        story: [
          "In a world where comfort is often treated as an afterthought, Vanita redefines the everyday essential into an experience of pure indulgence. Designed for those who appreciate the finer details of daily living, our premium line of tissue variants brings together exceptional strength, smoothness, and timeless elegance.",
        ],
        setsApart: "An elevated choice within the tissue category.",
        suits: "Shoppers and retailers looking for a premium-feel alternative.",
      },
      {
        slug: "fresh",
        name: "Fresh",
        description:
          "Nature-inspired essentials for fresh, comfortable routines.",
        features: ["Eco-conscious", "Everyday tissue"],
        accent: "#0f8a55",
        story: [
          "Everyday essentials for a fresher way of living.",
          "Fresh is a brand inspired by the simplicity of nature and the comfort of everyday cleanliness. From household necessities to personal-care essentials, Fresh brings together quality, practicality, and a refreshing approach to daily routines.",
          "With a commitment to making everyday moments feel cleaner, more comfortable, and naturally refreshing, Fresh encourages everyone to embrace a simple philosophy of care in everyday life.",
        ],
        setsApart: "An environmentally minded option in the paper range.",
        suits:
          "Households and buyers prioritizing environmental considerations in tissue selection.",
      },
      {
        slug: "smart-choice",
        name: "Smart Choice",
        description: "Quality and great value, everyday made smarter.",
        features: ["Budget-conscious", "Practical choice"],
        accent: "#e8661a",
        story: [
          "Smart Choice is a tissue brand created for modern families who value quality, practicality, and affordability in their everyday essentials. Designed to meet the needs of busy households, Smart Choice offers reliable and comfortable tissue products with generous sheet counts, helping families enjoy a dependable supply that lasts longer and keeps up with their daily needs. By combining quality, convenience, and value, the brand makes everyday essentials a smarter choice for every home.",
          "The name “Smart Choice” reflects the brand’s belief that caring starts with making thoughtful decisions. It represents a practical approach to everyday living—choosing products that deliver the right balance of quality, comfort, and value without compromising on what matters most. More than just an everyday tissue brand, Smart Choice aims to be a reliable household companion, helping families stay prepared for life’s little messes and everyday moments of care. Guided by its tagline, “Everyday Made Smarter,” the brand celebrates how small, smart choices can make everyday living easier.",
        ],
        setsApart: "Make everyday tissue buying straightforward.",
        suits: "Price-sensitive shoppers and value-oriented retail channels.",
      },
      {
        slug: "harmony",
        name: "Harmony",
        description: "Practical kitchen companions from prep to clean-up.",
        features: ["Balanced value", "Daily essentials"],
        accent: "#c93a3a",
        story: [
          "Good Food Brings People Together.",
          "Harmony makes everyday kitchen activities easier—from first prep to the final clean-up.",
        ],
        setsApart: "A well-rounded option for regular household use.",
        suits: "Shoppers seeking dependable day-to-day paper essentials.",
      },
    ],
  },
  {
    id: "personal-care",
    label: "Personal Care",
    tagline: "Comfort and protection essentials for practical, everyday care.",
    icon: Sparkles,
    headerClass: "bg-gradient-to-r from-[#2f7d62] via-[#5f9c84] to-[#8fb09f]",
    brands: [
      {
        slug: "prime-care",
        name: "Prime Care",
        description:
          "Personal care essentials designed around day-to-day comfort and dependable care.",
        features: ["Daily care", "Dependable basics"],
        accent: "#3a5894",
        story: [
          "PrimeCare offers personal care essentials designed for day-to-day comfort and practical use. Its focus is on dependable products that make routine hygiene easier.",
        ],
        note: "Short provisional brand overview. Replace with approved official brand narrative before publication.",
        setsApart: "Comfort and practicality for everyday personal needs.",
        suits: "Buyers seeking personal care staples for recurring needs.",
        image: "/brands/prime-care.png", // static image (put file in public/brands/)
      },
      {
        slug: "perfect",
        name: "Perfect",
        description: "Feminine care built around confidence and comfort.",
        features: ["Care & comfort", "Routine-ready"],
        accent: "#7a3f96",
        story: [
          "Perfect is a Filipino feminine care brand dedicated to providing women with comfort, confidence, and reliable protection through every stage of life. Starting with menstrual pants, Perfect aims to evolve into a comprehensive feminine care brand offering accessible everyday essentials and premium personal care solutions tailored to women’s changing needs.",
        ],
        setsApart: "Make everyday care feel simple and comfortable.",
        suits: "Shoppers looking for accessible personal care solutions.",
        image: "/brands/perfect.png", // static image (put file in public/brands/)
      },
      {
        slug: "life-defender",
        name: "Life Defender",
        description:
          "Protection-led hygiene products for safety-conscious daily routines.",
        features: ["Protective care", "Hygiene"],
        accent: "#1b6ec2",
        story: [
          "Life Defender focuses on hygiene and personal-protection essentials for people and organizations that value practical, everyday preparedness.",
        ],
        note: "Short provisional brand overview. Replace with approved official brand narrative before publication.",
        setsApart: "A hygiene-focused option for protection-minded users.",
        suits:
          "Individuals and businesses sourcing practical protection essentials.",
      },
    ],
  },
  {
    id: "baby-care",
    label: "Baby Care",
    tagline: "Gentle care made for little ones and trusted by parents.",
    icon: Baby,
    headerClass: "bg-[#00a651]",
    brands: [
      {
        slug: "sweetbaby",
        name: "Sweetbaby",
        description: "Gentle, reliable diaper care for growing families.",
        features: ["Gentle care", "For babies"],
        accent: "#5b84d8",
        story: [
          "Sweet Baby is a Filipino baby diaper brand committed to providing quality, comfort, and reliable protection at an affordable price. Created with the everyday needs of babies and parents in mind, Sweet Baby makes baby care more accessible, helping families enjoy every precious milestone with confidence and peace of mind.",
          "With Sweet Baby, caring for your little one becomes simpler, more comfortable, and a little sweeter.",
        ],
        setsApart: "Care that supports everyday baby routines.",
        suits: "Parents and retailers looking for baby care products.",
      },
    ],
  },
  {
    id: "oral-care",
    label: "Oral Care",
    tagline: "Everyday oral hygiene essentials for clean, confident routines.",
    icon: Smile,
    headerClass: "bg-gradient-to-r from-[#1f7a6c] via-[#5d9a86] to-[#9bbfa6]",
    brands: [
      {
        slug: "teabiotic",
        name: "TeaBiotic",
        description:
          "Family-friendly oral care with a wellness-oriented approach.",
        features: ["Freshness-focused", "Oral care"],
        accent: "#0f7f90",
        story: [
          "TeaBiotic is a modern, family-friendly oral care brand that promotes healthier smiles through better everyday oral hygiene. With its focus on probiotics and white tea essence, the brand brings a wellness-oriented approach to oral care, encouraging individuals and families to build healthier daily habits.",
          "Offering oral care essentials for both adults and children, TeaBiotic aims to make everyday oral hygiene simple, approachable, and enjoyable. Guided by its core message, “Better Care, Healthier Smile,” the brand strives to become a trusted companion in caring for every family’s smile.",
        ],
        setsApart: "A daily routine centered on a fresh, clean feel.",
        suits: "Shoppers seeking oral care options for regular use.",
        image: "/brands/teabiotic.png", // static image (put file in public/brands/)
      },
      {
        slug: "fresh-toothbrush",
        name: "Fresh Toothbrush",
        description:
          "A practical everyday toothbrush option for comfortable oral care routines.",
        features: ["Toothbrush", "Daily brushing"],
        accent: "#18814f",
        story: [
          "Fresh Toothbrush extends the Fresh family into oral care, offering a practical option for the daily brushing routines of individuals and families.",
          "With its accessible approach to everyday hygiene, the brand supports simple, consistent oral care habits and a cleaner, fresher feeling every day.",
        ],
        setsApart: "Reliable oral care essentials for everyday use.",
        suits: "Individuals and families choosing an everyday toothbrush.",
        image: "/brands/fresh-toothbrush.png", // static image (put file in public/brands/)
      },
    ],
  },
];

const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

type Selected = { brand: StaticBrand; categoryLabel: string };

/* -------------------------------------------------------------------------
 * BrandImage — tries each URL in `sources` in order. If one fails to load
 * (404, wrong origin), it moves to the next. When all fail, it shows the
 * brand name as text instead of a broken image.
 * ---------------------------------------------------------------------- */

function BrandImage({
  sources,
  name,
  alt = "",
  imgClassName,
  textClassName,
}: {
  sources: string[];
  name: string;
  alt?: string;
  imgClassName: string;
  textClassName: string;
}) {
  const [index, setIndex] = useState(0);
  const src = sources[index];

  if (!src) return <span className={textClassName}>{name}</span>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      draggable={false}
      onError={() => setIndex((i) => i + 1)}
    />
  );
}

/* -------------------------------------------------------------------------
 * Component
 * ---------------------------------------------------------------------- */

export function BrandsShowcase({
  categories,
}: {
  categories: BrandCategoryGroup[];
}) {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected | null>(null);

  // Image resolution order (each is tried until one loads):
  //   1. API image on the Laravel server (matched by slug or name)
  //   2. API image path on this frontend (/brands/... in /public)
  //   3. Static `image` set on the brand above
  //   4. The brand name is shown as text
  const imageFor = useMemo(() => {
    const map = new Map<string, string | null>();
    for (const c of categories) {
      for (const b of c.brands) {
        map.set(norm(b.slug), b.image);
        map.set(norm(b.name), b.image);
      }
    }
    return (brand: StaticBrand): string[] => {
      const path = map.get(norm(brand.slug)) ?? map.get(norm(brand.name));
      const list = [
        getRemoteImageUrl(path),
        getImageUrl(path),
        brand.image ?? null,
      ].filter((s): s is string => Boolean(s));
      return Array.from(new Set(list));
    };
  }, [categories]);

  // Dev-only: warn in the console about brands that still have no image.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    CATEGORIES.forEach((c) =>
      c.brands.forEach((b) => {
        if (imageFor(b).length === 0) {
          console.warn(
            `[BrandsShowcase] Walang image: ${b.name} (slug: ${b.slug})`,
          );
        }
      }),
    );
  }, [imageFor]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => active === "all" || c.id === active)
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
  }, [active, query]);

  const total = visible.reduce((n, c) => n + c.brands.length, 0);
  const allCount = CATEGORIES.reduce((n, c) => n + c.brands.length, 0);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section className="bg-[#eff1ea] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-[-0.04em] text-[#12392a] md:text-5xl">
            Brands We&rsquo;ve Grown
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.9] text-[#5b6460]">
            Get to know the distinct identities, products, and purposes of our
            brands, each bringing something different to the people and
            communities we serve
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter brands by category"
            className="flex flex-wrap gap-2.5"
          >
            {[{ id: "all", label: "All brands" }, ...CATEGORIES].map((c) => {
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
          Showing {total === allCount ? "all " : ""}
          {total} {total === 1 ? "brand" : "brands"}
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
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_-20px_rgba(15,74,44,0.35)] ring-1 ring-black/5"
              >
                <div
                  className={`flex flex-col gap-3 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between ${cat.headerClass}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#1f6b45]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-3xl font-bold tracking-[-0.03em]">
                      {cat.label}
                    </h3>
                  </div>
                </div>

                <div
                  className={`grid gap-4 p-4 sm:grid-cols-2 ${
                    LG_COLS[Math.min(cat.brands.length, 5)] ?? "lg:grid-cols-4"
                  }`}
                >
                  {cat.brands.map((brand) => {
                    const sources = imageFor(brand);
                    return (
                      <article
                        key={brand.slug}
                        role="button"
                        tabIndex={0}
                        aria-label={`Explore ${brand.name}`}
                        onClick={() =>
                          setSelected({ brand, categoryLabel: cat.label })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected({ brand, categoryLabel: cat.label });
                          }
                        }}
                        className="group flex cursor-pointer flex-col rounded-2xl border border-black/[0.06] bg-[#fdfdf9] p-5 transition-shadow duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
                      >
                        <div className="flex h-[120px] items-center justify-center">
                          <BrandImage
                            key={sources.join("|")}
                            sources={sources}
                            name={brand.name}
                            imgClassName="max-h-full w-auto max-w-[150px] object-contain drop-shadow-md"
                            textClassName="text-2xl font-bold text-[#0f4a2c]"
                          />
                        </div>

                        <h4 className="mt-5 text-sm font-bold text-[#12392a]">
                          {brand.name}
                        </h4>
                        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-xs leading-[1.7] text-[#5b6460]">
                          {brand.description}
                        </p>

                        <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                          {brand.features.map((f) => (
                            <li
                              key={f}
                              className="rounded-2xl bg-[#e4eee6] px-2.5 py-1 text-[10px] font-bold leading-snug text-[#0f4a2c]"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div
                          aria-hidden="true"
                          className="mt-5 flex shrink-0 items-center justify-between rounded-full border border-[#00a651] px-5 py-3 text-xs font-bold text-[#0f4a2c] transition-colors group-hover:bg-[#00a651] group-hover:text-white"
                        >
                          Explore brand
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
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
            sources={imageFor(selected.brand)}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function BrandModal({
  brand,
  categoryLabel,
  sources,
  onClose,
}: {
  brand: StaticBrand;
  categoryLabel: string;
  sources: string[];
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [lead, ...rest] = brand.story;
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
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-[#fdfdf9] shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative shrink-0 px-8 pb-6 pt-6 text-white"
          style={{
            background: `radial-gradient(circle at 75% 20%, rgba(255,255,255,0.22), transparent 45%), ${brand.accent}`,
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
            {categoryLabel} &middot; Brand preview
          </p>
          <div className="mt-4 flex h-[80px] items-center">
            <BrandImage
              key={sources.join("|")}
              sources={sources}
              name={brand.name}
              alt={`${brand.name} logo`}
              imgClassName="max-h-full w-auto max-w-[180px] object-contain drop-shadow-lg"
              textClassName="text-4xl font-bold"
            />
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
        <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-6 pt-6">
          <h3
            id="brand-modal-title"
            className="text-3xl font-bold tracking-[-0.03em] text-[#12392a]"
          >
            {brand.name}
          </h3>
          <p className="mt-3 text-base text-[#5b6460]">{brand.description}</p>

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
          {brand.note && (
            <p className="mt-4 rounded-xl bg-[#eef2ea] px-4 py-3 text-[11px] text-[#7a847f]">
              {brand.note}
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#eef2ea] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#3f7a58]">
                What sets it apart
              </p>
              <p className="mt-3 text-sm text-[#12392a]">{brand.setsApart}</p>
            </div>
            <div className="rounded-2xl bg-[#eef2ea] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#3f7a58]">
                Who it may suit
              </p>
              <p className="mt-3 text-sm text-[#12392a]">{brand.suits}</p>
            </div>
          </div>
        </div>

        {/* Actions — always visible */}
        <div className="shrink-0 border-t border-black/10 bg-[#fdfdf9] px-8 py-4">
          <div className="flex flex-wrap gap-3">
            <a
              href={QSTORE_URL}
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
