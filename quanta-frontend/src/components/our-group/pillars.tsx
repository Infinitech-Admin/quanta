import type { ComponentType, SVGProps } from "react";
import { Factory, Heart, Store } from "lucide-react";

type IconType = ComponentType<{ className?: string }>;

/** Soap/tissue dispenser mark (no matching lucide icon). */
export function DispenserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <rect x="9" y="6.5" width="6" height="5" rx="1" />
      <path d="M10 16h4" />
    </svg>
  );
}

export type Pillar = {
  key: "manufacturing" | "retail" | "institutional" | "community";
  /** Small label on the company card */
  category: string;
  /** Title in the hero summary card */
  heroTitle: string;
  heroSub: string;
  /** Short description on the company card */
  description: string;
  Icon: IconType;
  /** Used to match an API company to its pillar by name/slug */
  match: RegExp;
};

export const PILLARS: Pillar[] = [
  {
    key: "manufacturing",
    category: "Manufacturing",
    heroTitle: "Manufacturing",
    heroSub: "Paper products & responsible processes",
    description: "Manufacturing, innovation and responsible sourcing",
    Icon: Factory,
    match: /paper corporation|manufactur/i,
  },
  {
    key: "retail",
    category: "RETAIL & TRADE EXPERTISE",
    heroTitle: "RETAIL & TRADE EXPERTISE",
    heroSub: "Making quality accessible nationwide",
    description: "Consumer brands, sales and trade partnerships",
    Icon: Store,
    match: /marketing|retail/i,
  },
  {
    key: "institutional",
    category: "Institutional Hygiene",
    heroTitle: "Institutional Solutions",
    heroSub: "Professional hygiene for businesses",
    description: "Tissue, dispensers, hygiene and cleaning products",
    Icon: DispenserIcon,
    match: /eco.?hygiene|institutional/i,
  },
  {
    key: "community",
    category: "Community Impact",
    heroTitle: "Community Impact",
    heroSub: "Care for people and the environment",
    description: "Education, environmental care and community support",
    Icon: Heart,
    match: /foundation|community/i,
  },
];

/** Match a company to a pillar by name/slug, falling back to its position. */
export function pillarFor(
  company: { fullName: string; shortName: string; slug: string },
  index: number,
): Pillar {
  const haystack = `${company.fullName} ${company.shortName} ${company.slug}`;
  // Check the more specific names first so "Quanta Paper Marketing" is not
  // mistaken for the manufacturer.
  const order = [1, 2, 3, 0];
  for (const i of order) {
    if (PILLARS[i].match.test(haystack)) return PILLARS[i];
  }
  return PILLARS[index % PILLARS.length];
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
