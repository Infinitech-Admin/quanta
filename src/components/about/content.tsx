// Coordinates are approximate % position (left, top) for pin placement
// over a Philippines map image — calibrate these against your actual
// map asset once it's added to /public/images/about/.
export const distributionCenters = [
  {
    name: "Tacloban Distribution Center",
    address: "Lot No. 813 Danison Street, Brgy. 56, Tacloban City",
    x: 64,
    y: 52,
  },
  {
    name: "Iloilo Distribution Center",
    address: "Diversion Road, Mandurriao, Iloilo City",
    x: 46,
    y: 52,
  },
  {
    name: "Cebu Distribution Center",
    address: "Cassanta Soong Road, Lapu-Lapu City, Mactan, Cebu",
    x: 57,
    y: 55,
  },
  {
    name: "Bacolod Distribution Center",
    address: "San Juan Street, Brgy. Banago, Bacolod City",
    x: 50,
    y: 56,
  },
  {
    name: "Cagayan De Oro Branch",
    address:
      "Lam Compound, Zone 4B, Igpit, Opol, Misamis Oriental, Cagayan De Oro",
    x: 55,
    y: 70,
  },
  {
    name: "Davao Branch",
    address: "KM 14 Toreno Compound, Diversion Road, Banacan, Davao City",
    x: 62,
    y: 78,
  },
] as const;

export const specs = [
  { label: "Founded", value: "2003" },
  { label: "Workforce", value: "1,000+" },
  { label: "Paper machines", value: "5" },
  { label: "Converting lines", value: "30+" },
  { label: "Plant footprint", value: "70 ha" },
  { label: "Location", value: "Mabalacat, Pampanga" },
];

export const brandPromise = [
  "Totally clean and hygienic tissue and personal care products.",
  "Strong advocacy in recycling, and reducing waste and carbon footprint.",
  "Products built on genuine research and development.",
  "Manufacturing held to strict sustainability practices.",
  "High quality, priced for everyday Filipino households.",
];

export const growthModel = [
  {
    title: "Everywhere it's needed",
    copy: "In supermarkets and sari-sari stores as much as hotels, restaurants, and corporate accounts.",
    shape: "storefront",
  },
  {
    title: "Nationwide reach",
    copy: "A network of distributors, wholesalers, and partners across Luzon, Visayas, and Mindanao.",
    shape: "route",
  },
  {
    title: "Built around the customer",
    copy: "Sales, marketing, and R&D that start from what people actually need.",
    shape: "compass",
  },
  {
    title: "Online and evolving",
    copy: "A growing presence in e-commerce and social platforms alongside the traditional trade.",
    shape: "cart",
  },
] as const;

// icon shapes reference the shared <Icon /> component in ui.tsx
// Copy matches the exact phrasing from the Core Values deck — 7 values total.
export const coreValues = [
  {
    name: "Passion for Excellence",
    copy: "Continuous Improvement",
    shape: "star",
  },
  {
    name: "Integrity",
    copy: "Responsibility & Accountability",
    shape: "shield",
  },
  {
    name: "Care for Others",
    copy: "Concern & Respect",
    shape: "heart",
  },
  {
    name: "Customer Focus",
    copy: "Fulfill & Exceed Customer Expectations",
    shape: "target",
  },
  {
    name: "Teamwork",
    copy: "Collaboration & Commitment",
    shape: "people",
  },
  {
    name: "Love for Mother Earth",
    copy: "Care for Environment",
    shape: "leaf",
  },
  {
    name: "Resourcefulness",
    copy: "Creativity & Flexibility",
    shape: "compass",
  },
] as const;

export const historyMilestones = [
  {
    year: "2003",
    title: "Four machines, fifty people",
    copy: "Quanta Paper Corporation opened its doors in November 2003 with just four paper-making machines and four converting lines, working post-consumer fiber. It was enough to earn a foothold in an industry that didn't make room for newcomers easily.",
  },
  {
    year: "2010",
    title: "A shift toward premium tissue",
    copy: "As demand shifted, Quanta began sourcing virgin pulp from FSC-certified, man-made forests — deliberately capped in volume, and deliberately careful about where the raw material came from.",
  },
  {
    year: "Today",
    title: "Protecting the environment as we grow",
    copy: "That instinct has stayed the constant. The company now runs five paper machines and more than thirty converting machines across a 70-hectare site in Mabalacat, Pampanga, with a workforce of over a thousand.",
  },
] as const;

// Added FSC Certified — it's in the client's certification deck but was
// missing here. Kept ISO 9001 / Green Choice / Halal as you had them.
export const certifications = [
  {
    mark: "ISO 9001",
    year: "2013 / 2018",
    title: "ISO 9001:2008 \u2192 ISO 9001:2015",
    copy: "A quality management system built to consistently meet customer, statutory, and regulatory requirements.",
  },
  {
    mark: "GC",
    year: "2011",
    title: "Green Choice Philippines",
    copy: "The National Eco-Labeling Programme seal, following ISO 14020 / 14024, for clean manufacturing and environmentally preferable products.",
  },
  {
    mark: "FSC",
    title: "FSC Certified",
    copy: "Premium tissue products made from virgin pulp certified by the Forest Stewardship Council — wood fibers sourced responsibly, protecting habitats, soil, and worker rights.",
  },
  {
    mark: "HAL",
    year: "2017",
    title: "Halal Certification",
    copy: "Awarded by the Office of Muslim Affairs, confirming products and services meet the requirements of Islamic law.",
  },
] as const;
