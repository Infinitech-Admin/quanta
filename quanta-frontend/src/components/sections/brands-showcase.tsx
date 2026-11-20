import { getBrandsGroupedByCategory } from "@/lib/brands";
import { BrandsMarquee } from "@/components/sections/brands-marquee";

export async function BrandsShowcase() {
  const categories = await getBrandsGroupedByCategory();
  return <BrandsMarquee categories={categories} />;
}
