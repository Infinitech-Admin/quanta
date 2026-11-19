// Static institutional products. Images live in /public/institutional/.
// To add a product: add an item to a family. To add a family: add a new block.
// Item numbers (Item 01, 02, ...) are assigned automatically from the order below.

export type InstitutionalItem = {
  id: string;
  name: string;
  image: string; // path inside /public
};

type RawFamily = {
  title: string;
  description: string;
  items: InstitutionalItem[];
};

export type InstitutionalFamily = {
  title: string;
  description: string;
  items: { product: InstitutionalItem; itemNumber: number }[];
};

const RAW_FAMILIES: RawFamily[] = [
  {
    title: "Jumbo Roll Dispensers",
    description:
      "Reliable dispensing solutions for high-traffic facilities. Designed to provide convenient, controlled tissue dispensing while supporting cleanliness and efficiency.",
    items: [
      {
        id: "jumbo-roll-tissue-dispenser",
        name: "Jumbo Roll Tissue Dispenser",
        image: "/institutional/jumbo-roll-tissue-dispenser.png",
      },
      {
        id: "jumbo-coreless-tissue-roll",
        name: "Jumbo Coreless Tissue Roll",
        image: "/institutional/jumbo-coreless-tissue-roll.png",
      },
      {
        id: "centerpull-square-plastic-dispenser",
        name: "Centerpull Square Plastic Dispenser",
        image: "/institutional/centerpull-square-plastic-dispenser.png",
      },
      {
        id: "jumbo-tissue-roll",
        name: "Jumbo Tissue Roll",
        image: "/institutional/jumbo-tissue-roll.png",
      },
      {
        id: "center-pull-stainless-dispenser",
        name: "Center Pull Stainless Dispenser",
        image: "/institutional/center-pull-stainless-dispenser.png",
      },
    ],
  },
  {
    title: "Interfolded Paper Towel",
    description:
      "Efficient hand-drying for everyday facility needs, with convenient one-at-a-time dispensing.",
    items: [
      {
        id: "interfolded-paper-towel-dispenser",
        name: "Interfolded Paper Towel Dispenser",
        image: "/institutional/interfolded-paper-towel-dispenser.png",
      },
      {
        id: "interfolded-paper-towel-wrapped",
        name: "Interfolded Paper Towel – Wrapped",
        image: "/institutional/interfolded-paper-towel-wrapped.png",
      },
      {
        id: "interfolded-paper-towel-boxed",
        name: "Interfolded Paper Towel – Boxed",
        image: "/institutional/interfolded-paper-towel-boxed.png",
      },
    ],
  },
  {
    title: "Facial Tissue",
    description:
      "Soft and accessible facial tissue solutions for offices, hospitality spaces, and other facilities.",
    items: [
      {
        id: "upright-facial-tissue-box",
        name: "Upright Facial Tissue Box",
        image: "/institutional/upright-facial-tissue-box.png",
      },
      {
        id: "flat-facial-tissue-dispenser",
        name: "Flat Facial Tissue Dispenser",
        image: "/institutional/flat-facial-tissue-dispenser.png",
      },
      {
        id: "facial-tissue",
        name: "Facial Tissue",
        image: "/institutional/facial-tissue.png",
      },
    ],
  },
  {
    title: "Table Napkin Dispensers",
    description:
      "Convenient dispensing options paired with table napkins for a cleaner, more efficient dining experience.",
    items: [
      {
        id: "interleaved-tissue-dispenser",
        name: "Interleaved Tissue Dispenser",
        image: "/institutional/interleaved-tissue-dispenser.png",
      },
      {
        id: "interleaved-table-napkin",
        name: "Interleaved Table Napkin",
        image: "/institutional/interleaved-table-napkin.png",
      },
      {
        id: "table-napkin",
        name: "Table Napkin",
        image: "/institutional/table-napkin.png",
      },
    ],
  },

  {
    title: "Handroll Dispensers",
    description:
      "Controlled dispensing and practical hand-drying solutions for high-traffic areas.",
    items: [
      {
        id: "handroll-tissue-dispenser",
        name: "Handroll Tissue Dispenser",
        image: "/institutional/handroll-tissue-dispenser.png",
      },
      {
        id: "handroll-tissue-dispenser-auto-cut",
        name: "Handroll Tissue Dispenser Auto Cut",
        image: "/institutional/handroll-tissue-dispenser-auto-cut.png",
      },
      {
        id: "handroll-tissue",
        name: "Handroll Tissue",
        image: "/institutional/handroll-tissue.png",
      },
    ],
  },
  {
    title: "Bathroom Tissue",
    description: "Bathroom tissue rolls for everyday facilities.",
    items: [
      {
        id: "bathroom-tissue-roll",
        name: "Bathroom Tissue Roll",
        image: "/institutional/bathroom-tissue-roll.png",
      },
    ],
  },
  {
    title: "Hand Soap Dispensers",
    description:
      "Manual and automatic handwashing solutions, plus fragrance and sanitizer options.",
    items: [
      {
        id: "manual-hand-soap-dispenser-300ml",
        name: "Manual Hand Soap Dispenser 300 ml",
        image: "/institutional/manual-hand-soap-dispenser-300ml.png",
      },
      {
        id: "manual-hand-soap-dispenser-1000ml",
        name: "Manual Hand Soap Dispenser 1000 ml",
        image: "/institutional/manual-hand-soap-dispenser-1000ml.png",
      },
      {
        id: "automatic-hand-soap-dispenser",
        name: "Automatic Hand Soap Dispenser",
        image: "/institutional/automatic-hand-soap-dispenser.png",
      },
      {
        id: "strawberry-scent",
        name: "Strawberry Scent",
        image: "/institutional/strawberry-scent.png",
      },
      {
        id: "peppermint-scent",
        name: "Peppermint Scent",
        image: "/institutional/peppermint-scent.png",
      },
      {
        id: "apple-scent-sanitizer",
        name: "Apple Scent Sanitizer",
        image: "/institutional/apple-scent-sanitizer.png",
      },
    ],
  },
];

// Assign continuous item numbers across all families.
let counter = 0;
export const INSTITUTIONAL_FAMILIES: InstitutionalFamily[] = RAW_FAMILIES.map(
  (f) => ({
    title: f.title,
    description: f.description,
    items: f.items.map((product) => ({ product, itemNumber: ++counter })),
  }),
);

export const INSTITUTIONAL_ITEM_COUNT = counter;
