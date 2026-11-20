import { Suspense } from "react";
import { BrandsHero } from "@/components/brands/Hero";
import { PortfolioMarquee } from "@/components/brands/PortfolioMarquee";
import { BrandsShowcase } from "@/components/brands/BrandsShowcase";
import { InstitutionalProductsShowcase } from "@/components/brands/InstitutionalProductsShowcase";
import { QStoreCta } from "@/components/brands/QStoreCta";
import { getBrandsGroupedByCategory } from "@/lib/brands";
import { BrandsShowcaseSkeleton } from "@/components/skeleton/BrandSkeleton";

// getBrandsGroupedByCategory() is called by several sections below. Next dedupes
// identical fetch() calls within one render, so this is still a single request.
export default function BrandsPage() {
  return (
    <div className="bg-[#f7f6f2]">
      {/* Static fallback = hero without live counts, so it never pops in late */}
      <Suspense fallback={<BrandsHero />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[420px] bg-[#fdfdf9]" />}>
        <MarqueeSection />
      </Suspense>

      <div id="brands" className="scroll-mt-24">
        <Suspense fallback={<BrandsShowcaseSkeleton />}>
          <ShowcaseSection />
        </Suspense>
      </div>

      <div id="institutional" className="scroll-mt-24">
        <InstitutionalProductsShowcase />
      </div>

      <QStoreCta />
    </div>
  );
}

async function HeroSection() {
  const categories = await getBrandsGroupedByCategory();
  const brandCount = categories.reduce((n, c) => n + c.brands.length, 0);
  return (
    <BrandsHero
      brandCount={brandCount}
      categories={categories.map((c) => c.label)}
    />
  );
}

async function MarqueeSection() {
  const categories = await getBrandsGroupedByCategory();
  return <PortfolioMarquee categories={categories} />;
}

async function ShowcaseSection() {
  const categories = await getBrandsGroupedByCategory();
  return <BrandsShowcase categories={categories} />;
}
