// Keep this list in sync with the category tabs rendered in
// components/brands/BrandsShowcase.tsx
export const BRAND_CATEGORIES = [
  "Paper",
  "Personal Care",
  "Oral Care",
] as const;

export type BrandCategory = (typeof BRAND_CATEGORIES)[number];

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  // Short checkmark bullets shown under the description, e.g.
  // ["Made from internationally certified Premium Eco-Pulp", ...]
  features: string[];
  category: BrandCategory;
  color: string; // hex, e.g. "#16a34a"
  gradient: string; // CSS gradient value, e.g. "linear-gradient(135deg, #0f7a37 0%, #16a34a 50%, #4ade80 100%)"
  image: string | null; // thumbnail card path, e.g. "/brands/kami.png"
  heroImage: string | null; // big preview panel path, e.g. "/brands/hero/kami.png"
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type BrandFormValues = Omit<Brand, "id" | "created_at" | "updated_at">;

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
