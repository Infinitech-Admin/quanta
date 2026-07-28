export interface Brand {
  slug: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  image?: string;
  features?: string[];
}

export interface Category {
  id: string;
  label: string;
  intro: string;
  brands: Brand[];
}

export const categories: Category[] = [
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
        features: [
          "Made from internationally certified Premium Eco-Pulp",
          "Blended with alternative plant-based pulp",
          "High absorbency for everyday hygiene",
        ],
      },
      {
        slug: "kami",
        name: "Kami",
        description:
          "The best tissue for every Filipino home. Made with 100% Virgin Pulp for the best and softest quality while giving value for money. Kahit saan, kahit kailan... KAMI ang makakasama mo.",
        color: "#b91c1c",
        gradient: "from-rose-700 via-rose-500 to-pink-300",
        image: "/brands/kami.png",
        features: [
          "100% Virgin Pulp for a soft, durable sheet",
          "Everyday value pricing for Filipino households",
          "Available in multiple pack sizes",
        ],
      },
      {
        slug: "smart-choice",
        name: "Smart Choice",
        description:
          "Always the best choice — the first Giant Roll Tissue with over 1000 thicker sheets made from Virgin Pulp using innovative Pure-soft technology.",
        color: "#ea580c",
        gradient: "from-orange-500 via-amber-400 to-teal-300",
        image: "/brands/smart-choice.png",
        features: [
          "First Giant Roll Tissue in its category",
          "Over 1,000 sheets per roll",
          "Made with Pure-soft technology for extra softness",
        ],
      },
      {
        slug: "vanita",
        name: "Vanitá",
        description:
          "The most luxurious tissue made with the choicest 100% virgin fiber — hypo-allergenic, hygienic, and the softest quality. Luxuriously Beautiful, Elegantly Strong.",
        color: "#1e3a8a",
        gradient: "from-blue-900 via-indigo-700 to-slate-400",
        image: "/brands/vanita.png",
        features: [
          "100% virgin fiber, hypo-allergenic",
          "Luxuriously soft, elegantly strong",
          "Premium tier for discerning households",
        ],
      },
      {
        slug: "fresh",
        name: "Fresh",
        description:
          "Made of 100% recycled paper, so no trees are harmed in making them — with no artificial bleaching agents, only state-of-the-art paper-making technology for soft, clean, absorbent tissue.",
        color: "#15803d",
        gradient: "from-emerald-700 via-green-500 to-lime-300",
        image: "/brands/fresh.png",
        features: [
          "100% recycled paper — no trees harmed",
          "No artificial bleaching agents",
          "Soft, clean, and highly absorbent",
        ],
      },
      {
        slug: "harmony",
        name: "Harmony",
        description:
          "The best choice for every dinner table — at home, in restaurants, or cafés. Ultra-hygienic table napkins at an affordable price, made from 100% recycled paper.",
        color: "#dc2626",
        gradient: "from-red-600 via-red-500 to-blue-700",
        image: "/brands/harmony.png",
        features: [
          "Ultra-hygienic table napkins",
          "Made from 100% recycled paper",
          "Trusted in homes, restaurants, and cafés",
        ],
      },
      {
        slug: "fresh-eco-hygiene",
        name: "Fresh by Eco Hygiene",
        description:
          "Eco-Hygiene Institutional Sales Corporation, a member of the Quanta Group of Companies, caters to institutional customers like hotels, resorts, restaurants, hospitals and government offices.",
        color: "#065f46",
        gradient: "from-emerald-900 via-teal-700 to-emerald-500",
        image: "/brands/fresh-eco-hygiene.png",
        features: [
          "Serves hotels, resorts, and hospitals",
          "Institutional-grade hygiene standards",
          "Part of the Quanta Group of Companies",
        ],
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
        features: [
          "Keeps babies dry and comfortable",
          "Diapers and wipes in one family line",
          "Best value for growing families",
        ],
      },
      {
        slug: "prime-care",
        name: "Prime Care",
        description:
          "Show your loved ones how much you care with PrimeCare Adult Diapers — made with the best materials to keep sick or elderly loved ones dry and comfortable.",
        color: "#7c3aed",
        gradient: "from-violet-600 via-purple-500 to-fuchsia-300",
        image: "/brands/prime-care.png",
        features: [
          "Designed for elderly and bedridden care",
          "High-absorbency adult diapers",
          "Made with premium, skin-friendly materials",
        ],
      },
      {
        slug: "life-defender",
        name: "Life Defender",
        description:
          "An FDA-approved disposable face mask that provides optimum protection from bacteria and viruses — a breakthrough product made by Filipinos for the Filipino.",
        color: "#0f172a",
        gradient: "from-slate-800 via-slate-600 to-slate-400",
        image: "/brands/life-defender.png",
        features: [
          "FDA-approved disposable face mask",
          "Filters bacteria and viruses",
          "Made by Filipinos for the Filipino",
        ],
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
        features: [
          "Charcoal-tapered filaments reduce oral odor",
          "Made in a fully automated German facility",
          "Soft bristles improve gum circulation",
        ],
      },
      {
        slug: "teabiotic",
        name: "TeaBiotic",
        description:
          "A highly innovative toothpaste with probiotics for a cleaner and healthier mouth. Cleans deep. Strengthens. Protects. Level up your oral care with TeaBiotic.",
        color: "#16a34a",
        gradient: "from-green-600 via-teal-500 to-emerald-300",
        image: "/brands/teabiotic.png",
        features: [
          "Toothpaste formulated with probiotics",
          "Cleans deep and strengthens enamel",
          "Protects against everyday oral issues",
        ],
      },
    ],
  },
];

export type BrandWithCategory = Brand & {
  categoryId: string;
  categoryLabel: string;
};

export const allBrands: BrandWithCategory[] = categories.flatMap((cat) =>
  cat.brands.map((brand) => ({
    ...brand,
    categoryId: cat.id,
    categoryLabel: cat.label,
  })),
);

export function findBrandBySlug(slug: string): BrandWithCategory | undefined {
  return allBrands.find((b) => b.slug === slug);
}

export function getRelatedBrands(slug: string, limit = 4): BrandWithCategory[] {
  const brand = findBrandBySlug(slug);
  if (!brand) return [];
  return allBrands
    .filter((b) => b.categoryId === brand.categoryId && b.slug !== slug)
    .slice(0, limit);
}
