// Central place for contact details and outbound links used on /brands.
// Replace the QStore fallback with your real storefront URL (or set the env var).
// Contact page route. Change if yours differs (e.g. "/get-in-touch").
export const CONTACT_PAGE_URL = "/contact";

export const QSTORE_URL = process.env.NEXT_PUBLIC_QSTORE_URL ?? "#";

export const INSTITUTIONAL_CONTACTS = {
  landline: {
    label: "Landline",
    value: "(02) 8533 9250",
    href: "tel:+63285339250",
  },
  mobile: {
    label: "Mobile",
    value: "+63 917 564 9961",
    href: "tel:+639175649961",
  },
  email: {
    label: "Email",
    value: "quanta.institutionals@quantapaper.com",
    href: "mailto:quanta.institutionals@quantapaper.com",
  },
  website: {
    label: "Website",
    value: "www.quantapapercorporation.com",
    href: "https://www.quantapapercorporation.com",
  },
} as const;

export const HERO_IMAGE = "/brands/hero-tissue.jpg"; // tissue roll + napkins photo
export const INSTITUTIONAL_HERO_IMAGE = "/brands/eco-hygiene-dispenser.jpg"; // wall dispenser photo
