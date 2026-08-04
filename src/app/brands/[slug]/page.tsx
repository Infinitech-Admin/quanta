import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allBrands, findBrandBySlug, getRelatedBrands } from "@/data/brands";
import { Hero } from "@/components/brands/Hero";
import { BrandDetail } from "@/components/brands/BrandDetail";
import { RelatedBrands } from "@/components/brands/RelatedBrands";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allBrands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Quanta Paper`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);

  if (!brand) notFound();

  const related = getRelatedBrands(slug);

  return (
    <main>
      <Hero brand={brand} />
      <BrandDetail brand={brand} />

      <RelatedBrands brand={brand} related={related} />
    </main>
  );
}
