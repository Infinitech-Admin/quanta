import { Suspense } from "react";
import { BrandsHero } from "@/components/brands/Hero";
import { BrandsShowcase } from "@/components/brands/BrandsShowcase";
import { InstitutionalProductsShowcase } from "@/components/brands/InstitutionalProductsShowcase";
import { getBrandsGroupedByCategory } from "@/lib/brands";
import { getInstitutionalProducts } from "@/lib/institutional-products";
import { BrandsShowcaseSkeleton } from "@/components/skeleton/BrandSkeleton";
import { InstitutionalProductsSkeleton } from "@/components/skeleton/InstitutionalProductsSkeleton";

export default function BrandsPage() {
  return (
    <div>
      {/* Hero is static copy — no need to gate it behind the data fetch */}
      <BrandsHero />

      {/* Only the part that actually depends on fetched data suspends */}
      <Suspense fallback={<BrandsShowcaseSkeleton />}>
        <BrandsShowcaseSection />
      </Suspense>

      {/* Separate boundary — institutional products load independently
          of brands, so one slow fetch doesn't block the other section. */}
      <Suspense fallback={<InstitutionalProductsSkeleton />}>
        <InstitutionalProductsSection />
      </Suspense>
    </div>
  );
}

async function BrandsShowcaseSection() {
  const categories = await getBrandsGroupedByCategory();
  return <BrandsShowcase categories={categories} />;
}

async function InstitutionalProductsSection() {
  const products = await getInstitutionalProducts();
  return <InstitutionalProductsShowcase products={products} />;
}
