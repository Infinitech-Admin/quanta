import type { Pillar } from "./pillars";

/**
 * Static content for the "Our group of companies" page.
 * Edit the text here — no admin panel or API needed.
 *
 * Text conventions:
 *   **bold**   inside paragraphs
 *   *italic*   inside headlines → green italic second line
 */

export type IconKey =
  | "factory"
  | "leaf"
  | "people"
  | "portfolio"
  | "store"
  | "heart"
  | "check"
  | "pallet"
  | "droplet"
  | "dispenser";

export type CardItem = { icon: IconKey; title: string; text: string };
export type ChipItem = { icon: IconKey; text: string };

export type Program = {
  image: { src: string; alt: string };
  /** Small white label over the photo */
  label: string;
  eyebrow: string;
  /** Use "\n" for a line break */
  heading: string;
  paragraphs: string[];
  toggleLabel: string;
  quote?: string;
  more: string[];
};

export type Section =
  | { kind: "columns"; items: { title: string; text: string }[] }
  | { kind: "chips"; eyebrow: string; items: ChipItem[] }
  | {
      kind: "cards";
      eyebrow: string;
      /** Optional. When omitted, the eyebrow is shown as a larger heading. */
      heading?: string;
      intro?: string;
      items: CardItem[];
    }
  | { kind: "programs"; items: Program[] };

export type Company = {
  id: string;
  pillar: Pillar["key"];
  fullName: string;
  headline: string;
  paragraphs: string[];
  /** Logo shown inside the company card */
  logo?: { src: string; alt: string };
  /** Picture beside the intro (ignored when `stats` is set) */
  image?: { src: string; alt: string };
  stats?: {
    items: { value: string; label: string }[];
    tags?: string[];
  };
  sections: Section[];
  cta: { title: string; text: string; label: string; href: string };
};

/* Put the photos in /public/images/our-group/ with these file names
   (or change the paths below). */
const IMG = "/images/our-group";

/* Logos live in /public/logos/ (add a `logo` to the companies that have none yet). */
const LOGO = "/logos";

export const COMPANIES: Company[] = [
  /* ------------------------------------------------------------ */
  /* 01 · Manufacturing                                            */
  /* ------------------------------------------------------------ */
  {
    id: "quanta-paper-corporation",
    pillar: "manufacturing",
    fullName: "Quanta Paper Corporation",
    logo: {
      src: `${LOGO}/quanta-paper-corporation.png`,
      alt: "Quanta Paper Corporation logo",
    },
    headline: "Making the essentials *people rely on.*",
    paragraphs: [
      "To contribute to building a sustainable future is our key guiding principle. At Quanta, we measure long-term success through the **triple bottom line of Profit, People, and Planet.**",
    ],
    image: {
      src: `${IMG}/manufacturing.jpg`,
      alt: "Quanta paper mill production line",
    },
    sections: [
      {
        kind: "columns",
        items: [
          {
            title: "Profit",
            text: "Strengthening our business for long-term viability.",
          },
          {
            title: "People",
            text: "Creating opportunities for employees and partners.",
          },
          {
            title: "Planet",
            text: "Considering the environment in how we operate.",
          },
        ],
      },
      {
        kind: "cards",
        eyebrow: "How we operate",
        items: [
          {
            icon: "factory",
            title: "Technology & innovation",
            text: "We invest in top-of-the-line equipment and world-class research and development to keep our manufacturing capabilities competitive.",
          },
          {
            icon: "leaf",
            title: "Environmental responsibility",
            text: "Protecting the environment is as important to our business as achieving commercial success.",
          },
          {
            icon: "people",
            title: "Investing in our people",
            text: "We provide a workplace that encourages both personal and professional growth.",
          },
          {
            icon: "portfolio",
            title: "Thoughtful material choices",
            text: "We use post-consumer fiber and wastepaper to create eco-friendly tissue products, while also offering premium-grade tissue made with virgin pulp from FSC-certified, responsibly managed man-made tree farms.",
          },
        ],
      },
    ],
    cta: {
      title: "Discover the Quanta story",
      text: "Learn more about our history, operations, values and standards.",
      label: "About Quanta Paper",
      href: "/about", // TODO: confirm route
    },
  },

  /* ------------------------------------------------------------ */
  /* 02 · Retail & trade                                           */
  /* ------------------------------------------------------------ */
  {
    id: "quanta-paper-marketing",
    pillar: "retail",
    fullName: "Quanta Paper Marketing, Inc.",
    headline: "Making quality accessible, *from shelf to home.*",
    paragraphs: [
      "Quanta Paper Marketing serves the retail industry through partnerships with distributors, national and local key accounts, wholesalers, and small and medium-sized retailers.",
    ],
    image: {
      src: `${IMG}/marketing.jpg`,
      alt: "Quanta plant with delivery trucks leaving the gate",
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Retail and Trade",
        items: [
          {
            icon: "portfolio",
            title: "Broad product portfolio",
            text: "Our diversified range includes tissue paper, baby care, feminine care, oral care, cleaning solutions, and personal protection products.",
          },
          {
            icon: "people",
            title: "Sales teams that support partners",
            text: "We equip our consumer sales teams with practical skills and tools that help retailers and partners move their businesses forward.",
          },
          {
            icon: "store",
            title: "Established consumer sales network",
            text: "Our sales network serves strategic locations nationwide. We work with partners on marketing and sales support to help achieve their targets.",
          },
          {
            icon: "heart",
            title: "Partnership built on trust",
            text: "We value the confidence customers and business partners place in Quanta and strive to deliver the best value for that trust.",
          },
        ],
      },
    ],
    cta: {
      title: "Explore the brands we’ve grown",
      text: "See Quanta’s range of everyday paper, care and hygiene essentials.",
      label: "Explore Our Brands",
      href: "/our-brands", // TODO: confirm route
    },
  },

  /* ------------------------------------------------------------ */
  /* 03 · Institutional hygiene                                    */
  /* ------------------------------------------------------------ */
  {
    id: "eco-hygiene",
    pillar: "institutional",
    fullName: "Eco Hygiene Institutional Sales Corp.",
    logo: {
      src: `${LOGO}/eco-hygiene.png`,
      alt: "Eco Hygiene Institutional Sales Corp. logo",
    },
    headline: "Complete hygiene care, *tailored to your facility.*",
    paragraphs: [
      "Eco Hygiene serves institutional clients including hotels, resorts, restaurants, hospitals, and government and private offices. We customize products and services to meet the requirements of each business or agency.",
    ],
    image: {
      src: `${IMG}/eco-hygiene.jpg`,
      alt: "Team packing tissue rolls on a production line",
    },
    sections: [
      {
        kind: "chips",
        eyebrow: "One-stop hygiene solutions",
        items: [
          { icon: "pallet", text: "Tissue in various formats" },
          { icon: "droplet", text: "Personal hygiene & protection" },
          { icon: "leaf", text: "Cleaning & sanitation" },
          { icon: "dispenser", text: "Paper & soap dispensers" },
        ],
      },
      {
        kind: "cards",
        eyebrow: "What we offer",
        intro:
          "Our trained institutional sales team helps organizations choose quality, cost-effective products for customers and employees, supported by a broad range of hygiene and cleaning options.",
        items: [
          {
            icon: "leaf",
            title: "Recycled tissue options",
            text: "Our eco-friendly tissue is made using 100% recycled paper, helping reduce wastepaper.",
          },
          {
            icon: "check",
            title: "Green Choice recognition",
            text: "Eco Hygiene states that its brand holds the Green Choice Seal of Approval and undergoes regular compliance assessments.",
          },
          {
            icon: "people",
            title: "An experienced institutional team",
            text: "Our sales team works with businesses and government accounts to understand requirements and recommend suitable, cost-effective hygiene solutions.",
          },
          {
            icon: "portfolio",
            title: "Responsibly sourced premium tissue",
            text: "Our premium tissue products use virgin pulp from FSC-certified sources, supporting responsible wood-fiber sourcing.",
          },
          {
            icon: "heart",
            title: "More than a supplier",
            text: "We aim to be a long-term partner in our shared aspiration for a more sustainable future.",
          },
        ],
      },
    ],
    cta: {
      title: "Let’s find your hygiene solution.",
      text: "Tell us your facility needs and our team can help explore suitable options.",
      label: "Request a Quotation",
      href: "/contact", // TODO: confirm route
    },
  },

  /* ------------------------------------------------------------ */
  /* 04 · Community                                                */
  /* ------------------------------------------------------------ */
  {
    id: "quanta-foundation",
    pillar: "community",
    fullName: "Quanta Foundation, Inc.",
    headline: "A commitment to care *beyond the business.*",
    paragraphs: [
      "Established in **July 2019**, Quanta Foundation, Inc. formalized the company’s community development, charitable work, and financial support programs. With a focus on children’s education and environmental stewardship, its work aims to create lasting positive change.",
      "A portion of Quanta’s gross sales is allocated to support the Foundation’s programs.",
    ],
    stats: {
      items: [
        { value: "2019", label: "Established" },
        { value: "02", label: "Areas of focus" },
      ],
      tags: ["Education", "Environmental care"],
    },
    sections: [
      {
        kind: "programs",
        items: [
          {
            image: {
              src: `${IMG}/foundation-educations.jpg`,
              alt: "Quanta scholars holding their certificates",
            },
            label: "Educational Support Fund",
            eyebrow: "01 / Supporting young learners",
            heading: "Big dreams come in\nsmall packages.",
            paragraphs: [
              "The Foundation supports daily meals for children through partnerships with public schools, helping young learners receive the nutrition they need to focus on their education.",
              "It also helps Quanta scholars through school fees, books, and school supplies.",
            ],
            toggleLabel: "Read the story behind the program",
            quote:
              "“I’m hungry most of the time, but I still want to go to school, because I want to learn. I want to be successful, so that I can take good care of my family when I grow up.”",
            more: [
              "The conviction of one young scholar inspired a renewed determination to help other children with similar aspirations, as shared by Steven Leung, President and CEO of Quanta Paper Corporation.",
              // TODO: the screenshot cuts off after "Quanta" — paste the rest
              // of this paragraph here.
              "Many children struggle to concentrate when they attend school hungry.",
            ],
          },
          {
            image: {
              src: `${IMG}/foundation-environment.jpg`,
              alt: "Tree-planting event with Foundation volunteers",
            },
            label: "Environmental Care Fund",
            eyebrow: "02 / Protecting natural resources",
            heading: "Mother Earth\nneeds our help.",
            paragraphs: [
              "The Foundation supports organizations dedicated to conserving natural resources and promoting environmental responsibility.",
              "Initiatives include tree planting and nurturing, environmental awareness campaigns, and community education.",
            ],
            toggleLabel: "Read about our environmental commitment",
            more: [
              "Human activity places increasing pressure on the environment through overconsumption of resources, climate change, overharvesting, and improper waste disposal. The Foundation’s Environmental Care Fund focuses on supporting efforts to conserve resources and protect the world future generations will inherit.",
              "Through tree planting, environmental awareness, and community education, the program encourages the shared responsibility of sustaining Mother Earth.",
            ],
          },
        ],
      },
    ],
    cta: {
      title: "Explore our community commitment.",
      text: "Learn more about the initiatives and values driving Quanta Foundation.",
      label: "Our Commitment",
      href: "/sustainability",
    },
  },
];
