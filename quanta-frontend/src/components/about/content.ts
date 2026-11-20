import type { IconShape } from "./ui";

export const nav = [
  ["Our History", "history"],
  ["Mission & Vision", "mission"],
  ["Core Values", "values"],
  ["Where to Find Us", "locations"],
  ["Distribution Centers", "distribution"],
  ["Certifications", "certifications"],
] as const;

export const milestones = [
  {
    tag: "2003 / Our beginning",
    title: "Four machines, fifty people",
    copy: "Quanta Paper Corporation opened its doors in November 2003 with four paper-making machines and four converting lines, working with post-consumer fiber and steadily building a foothold in the industry.",
  },
  {
    tag: "2010 / Growth shift",
    title: "A move toward premium tissue",
    copy: "As demand evolved, Quanta began sourcing virgin pulp from FSC-certified, man-made forests—deliberately scaling quality while remaining careful about materials and responsible sourcing.",
  },
  {
    tag: "Today / Ongoing progress",
    title: "Protecting the environment as we grow",
    copy: "The company now runs multiple paper-making and converting lines across a 70-hectare site in Mabalacat, Pampanga, supported by a workforce of more than a thousand.",
  },
];

export const specs = [
  ["2003", "Founded"],
  ["1,000+", "Workforce"],
  ["5", "Paper machines"],
  ["30+", "Converting lines"],
  ["70 ha", "Plant footprint"],
  ["Pampanga", "Manufacturing site"],
];

export const vision =
  "A reputable brand builder of high-quality, affordable, hygienic and environment-friendly products with concern, care, and love—people can rely on every day.";
export const mission =
  "Build a market-centric and highly competent organization through innovative and caring solutions for all partners and stakeholders. We learn, grow, and contribute together as one.";

/* ---------- Added: used by WhoWeAre (5-column grid) ---------- */
export const brandPromise: string[] = [
  "High-quality products made to a consistent standard.",
  "Affordable, so every household can rely on them.",
  "Hygienic from the mill floor to the shelf.",
  "Environment-friendly in materials and methods.",
  "Made with concern, care, and love.",
];

/* ---------- Added: used by WhoWeAre (4-column grid) ---------- */
export const growthModel: {
  title: string;
  copy: string;
  shape: IconShape;
}[] = [
  {
    title: "Learn",
    copy: "We listen to partners and markets, and keep improving how we work.",
    shape: "leaf",
  },
  {
    title: "Grow",
    copy: "We scale quality deliberately, one brand and one line at a time.",
    shape: "roll",
  },
  {
    title: "Contribute",
    copy: "We give back to the people and communities who rely on us.",
    shape: "heart",
  },
  {
    title: "Together as one",
    copy: "We protect the environment and move forward as one team.",
    shape: "drop",
  },
];

export const values = [
  ["Passion for Excellence", "Continuous Improvement"],
  ["Integrity", "Responsibility & Accountability"],
  ["Care for Others", "Concern & Respect"],
  ["Teamwork", "Collaboration & Unity"],
  ["Customer Focus", "Service & Reliability"],
  ["Love for Mother Earth", "Care for Environment"],
  ["Resourcefulness", "Creativity & Flexibility"],
];

export const places = [
  {
    tag: "Paper Mill",
    title: "Mabalacat, Pampanga",
    lines: ["Brgy. Paralayunan, City of Mabalacat, Pampanga"],
    note: "Where the paper is made",
  },
  {
    tag: "Head Office",
    title: "Mandaluyong City",
    lines: ["149-A Rev. Aglipay St., Brgy. Old Zaniga, Mandaluyong City"],
    note: "Where orders are managed",
  },
];
export const landline = [
  "(02) 3404193",
  "(02) 533-9250",
  "(02) 533-9832",
  "(02) 5310161 · (02) 5310160",
];
export const mobile = [
  "Globe: 09175649957",
  "Sun: 09228796191",
  "Mobile: 09328655843",
  "Fax: (02) 533 7295",
];

export const centers = [
  {
    group: "Visayas / Distribution Centers",
    items: [
      [
        "Tacloban Distribution Center",
        "Lot No. 813 Danison Street, Brgy. 56, Tacloban City",
      ],
      ["Iloilo Distribution Center", "Diversion Road, Mandurriao, Iloilo City"],
      [
        "Cebu Distribution Center",
        "Cassanta Soong Road, Lapu-Lapu City, Mactan, Cebu",
      ],
      [
        "Bacolod Distribution Center",
        "San Juan Street, Brgy. Banago, Bacolod City",
      ],
    ],
  },
  {
    group: "Mindanao / Branches",
    items: [
      [
        "Cagayan de Oro Branch",
        "Lam Compound, Zone 4B, Igpit, Opol, Misamis Oriental, Cagayan de Oro",
      ],
      [
        "Davao Branch",
        "KM 14 Toreno Compound, Diversion Road, Banacan, Davao City",
      ],
    ],
  },
];

export const certs = [
  {
    mark: "ISO",
    tag: "Awarded 2013 / 2018",
    title: "ISO 9001:2015",
    copy: "A quality management system built to consistently meet customer, statutory, and regulatory requirements.",
  },
  {
    mark: "GC",
    tag: "Awarded 2011",
    title: "Green Choice Philippines",
    copy: "The National Eco-Labeling Programme seal, following ISO 14020 / 14024, for clean manufacturing and environmentally preferable products.",
  },
  {
    mark: "FSC",
    tag: "Recognized",
    title: "FSC Certified",
    copy: "Premium tissue products made from virgin pulp certified by the Forest Stewardship Council—wood fibers sourced responsibly.",
  },
  {
    mark: "HAL",
    tag: "Awarded 2017",
    title: "Halal Certification",
    copy: "Awarded by the Office of Muslim Affairs, confirming products and services meet the requirements of Islamic law.",
  },
];
