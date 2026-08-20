import { getApiUrl } from "@/lib/api-url";

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  features: string[];
  category: string; // "Paper" | "Personal Care" | "Oral Care"
  color: string;
  gradient: string; // CSS gradient value, e.g. "linear-gradient(135deg, ...)"
  image: string | null; // relative Laravel path, e.g. "/brands/kami.png" — run through getImageUrl() before rendering
  heroImage: string | null;
  images: string[]; // gallery image paths — run each through getImageUrl() before rendering
  sort_order: number;
  is_active: boolean;
}

export interface BrandWithCategory extends Brand {
  categoryId: string;
  categoryLabel: string;
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

interface ApiItemResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

function toCategoryId(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function withCategory(brand: Brand): BrandWithCategory {
  return {
    ...brand,
    categoryId: toCategoryId(brand.category),
    categoryLabel: brand.category,
  };
}

/**
 * Every publicly-visible brand (the public /api/brands route already
 * filters to is_active === true on the Laravel side — see
 * BrandController::index).
 */
export async function getAllBrands(): Promise<BrandWithCategory[]> {
  const res = await fetch(`${getApiUrl()}/api/brands`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];

  const body: ApiListResponse<Brand> = await res.json();
  if (!body.success) return [];

  return body.data.map(withCategory);
}

export async function findBrandBySlug(
  slug: string,
): Promise<BrandWithCategory | null> {
  const res = await fetch(`${getApiUrl()}/api/brands/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;

  const body: ApiItemResponse<Brand> = await res.json();
  if (!body.success) return null;

  return withCategory(body.data);
}

export async function getRelatedBrands(
  slug: string,
  limit = 4,
): Promise<BrandWithCategory[]> {
  const all = await getAllBrands();
  const current = all.find((b) => b.slug === slug);
  if (!current) return [];

  return all
    .filter((b) => b.slug !== slug && b.category === current.category)
    .slice(0, limit);
}

// The backend has no concept of a category "intro" paragraph — that copy
// only ever lived in the old mock data. Keeping it here as a static map
// keyed by category label until/unless it becomes admin-editable too.
const CATEGORY_INTROS: Record<string, string> = {
  Paper:
    "Our flagship product, Fresh Bathroom Tissue uses 100% recycled paper — the only one of its kind in the market today. Our premium paper brands utilize virgin pulp from man-made forest sources with Forest Stewardship certificates.",
  "Personal Care":
    "With these high-quality and affordable personal care products, we want you to take care of yourself and the people you love.",
  "Oral Care":
    "Because good oral hygiene is not only about brushing your teeth, we came up with oral care products that are efficient and effective while giving the best value for money.",
};

// Explicit display order for category tabs. Anything not listed here
// falls to the end, sorted in whatever order the API returns it, so a
// new category doesn't need a code change to appear — it just won't
// have a "preferred" spot until someone adds it here.
const CATEGORY_ORDER: string[] = ["Paper", "Personal Care", "Oral Care"];

function categorySortIndex(label: string): number {
  const index = CATEGORY_ORDER.indexOf(label);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

export interface BrandCategoryGroup {
  id: string;
  label: string;
  intro: string;
  brands: BrandWithCategory[];
}

/**
 * Groups the flat brand list into the category tabs BrandsShowcase
 * renders. Categories with zero active brands are dropped so an empty
 * tab never shows up. Tabs are ordered per CATEGORY_ORDER above, not
 * by whatever order the API happens to return brands in.
 */
export async function getBrandsGroupedByCategory(): Promise<
  BrandCategoryGroup[]
> {
  const brands = await getAllBrands();

  const byCategory = new Map<string, BrandWithCategory[]>();

  for (const brand of brands) {
    const list = byCategory.get(brand.category) ?? [];

    list.push(brand);
    byCategory.set(brand.category, list);
  }

  return Array.from(byCategory.entries())
    .map(([category, brandsInCat]) => ({
      id: toCategoryId(category),
      label: category,
      intro: CATEGORY_INTROS[category] ?? "",
      brands: [...brandsInCat].sort((a, b) => a.sort_order - b.sort_order),
    }))
    .sort((a, b) => categorySortIndex(a.label) - categorySortIndex(b.label));
}
