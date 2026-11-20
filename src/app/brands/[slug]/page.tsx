import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBrands, findBrandBySlug, getRelatedBrands } from "@/lib/brands";
import { BrandsHero } from "@/components/brands/Hero";
import { BrandDetail } from "@/components/brands/BrandDetail";
import { RelatedBrands } from "@/components/brands/RelatedBrands";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await findBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Quanta Paper`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await findBrandBySlug(slug);

  if (!brand) notFound();

  const related = await getRelatedBrands(slug);

  return (
    <main>
      <BrandsHero />
      <BrandDetail brand={brand} />
      <RelatedBrands brand={brand} related={related} />
    </main>
  );
}
