// Pure helpers (no server imports) so client components can use them.
// The API only returns { id, name, image }. Families are derived from the
// product name. If your API later returns a `family` string, it wins.

export interface GroupableProduct {
  id: string;
  name: string;
  image: string | null;
  family?: string | null;
}

export interface ProductFamily<T extends GroupableProduct = GroupableProduct> {
  title: string;
  description: string;
  items: { product: T; itemNumber: number }[];
}

const FAMILIES: { title: string; description: string; match: RegExp }[] = [
  {
    title: "Jumbo Roll Dispensers",
    description:
      "Reliable dispensing solutions for high-traffic facilities. Designed to provide convenient, controlled tissue dispensing while supporting cleanliness and efficiency.",
    match: /jumbo|center ?pull/i,
  },
  {
    title: "Interfolded Paper Towel",
    description:
      "Efficient hand-drying for everyday facility needs, with convenient one-at-a-time dispensing.",
    match: /interfold|paper towel|hand towel/i,
  },
  {
    title: "Facial Tissue",
    description:
      "Soft and accessible facial tissue solutions for offices, hospitality spaces, and other facilities.",
    match: /facial/i,
  },
  {
    title: "Table Napkin Dispensers",
    description:
      "Convenient dispensing options paired with table napkins for a cleaner, more efficient dining experience.",
    match: /napkin|interleaved/i,
  },
  {
    title: "Handroll Dispensers",
    description:
      "Controlled dispensing and practical hand-drying solutions for high-traffic areas.",
    match: /hand ?roll/i,
  },
  {
    title: "Bathroom Tissue",
    description: "Bathroom tissue rolls for everyday facilities.",
    match: /bathroom/i,
  },
  {
    title: "Hand Soap Dispensers",
    description:
      "Manual and automatic handwashing solutions, plus fragrance and sanitizer options.",
    match: /soap|sanitizer|scent/i,
  },
];

export function groupInstitutionalProducts<T extends GroupableProduct>(
  products: T[],
  query = "",
): ProductFamily<T>[] {
  const q = query.trim().toLowerCase();
  const buckets = new Map<string, ProductFamily<T>>();

  products.forEach((product, index) => {
    // Item numbers come from the original order so they stay stable while searching.
    const itemNumber = index + 1;
    if (q && !product.name.toLowerCase().includes(q)) return;

    const known =
      FAMILIES.find((f) => f.title === product.family) ??
      FAMILIES.find((f) => f.match.test(product.name));

    // No matching family -> not shown (no more "More products" group).
    if (!known) return;

    const bucket = buckets.get(known.title) ?? {
      title: known.title,
      description: known.description,
      items: [],
    };
    bucket.items.push({ product, itemNumber });
    buckets.set(known.title, bucket);
  });

  const order = FAMILIES.map((f) => f.title);
  return [...buckets.values()].sort(
    (a, b) => order.indexOf(a.title) - order.indexOf(b.title),
  );
}
