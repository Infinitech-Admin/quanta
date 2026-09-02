import { getBrandsGroupedByCategory } from "@/lib/brands";
import { BrandsShowcase as BrandsShowcaseUI } from "@/components/brands/BrandsShowcase";

export async function BrandsShowcase() {
  const categories = await getBrandsGroupedByCategory();
  return <BrandsShowcaseUI categories={categories} />;
}
