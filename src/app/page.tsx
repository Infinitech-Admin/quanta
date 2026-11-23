import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { SolutionsPicker } from "@/components/sections/solutions-picker";
import { OurStory } from "@/components/sections/our-story";
import { QuantaPromise } from "@/components/sections/quanta-promise";
import { BrandsShowcase } from "@/components/sections/brands-showcase";
import { BrandsShowcaseSkeleton } from "@/components/skeleton/HomeSkeleton";
import { FlagshipProduct } from "@/components/sections/flagship-product";

import { OurCustomers } from "@/components/sections/our-customers";
import { Certifications } from "@/components/sections/certifications";
import { Newsroom } from "@/components/sections/newsroom";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <SolutionsPicker />
      <OurStory />
      <QuantaPromise />
      <Suspense fallback={<BrandsShowcaseSkeleton />}>
        <BrandsShowcase />
      </Suspense>
      <FlagshipProduct />
      <Certifications />
      <OurCustomers />

      {/* async server component (fetches /api/news), so it gets its own Suspense */}
      <Suspense fallback={null}>
        <Newsroom />
      </Suspense>
      <CtaBanner />
    </>
  );
}
