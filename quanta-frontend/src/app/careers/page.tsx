import type { Metadata } from "next";
import { Suspense } from "react";
import { CareersHero } from "@/components/careers/CareersHero";
import { JobListings } from "@/components/careers/JobListings";
import { CareersCta } from "@/components/careers/CareersCta";
import { JobListingsSkeleton } from "@/components/skeleton/CareersSkeleton";

export const metadata: Metadata = {
  title: "Careers At Quanta | Quanta Paper Corporation",
  description:
    "At Quanta, we offer employment opportunities to deserving individuals who possess the required competencies and character expected of a Quanta employee. Join the Quanta family and grow with us.",
};

// The page now uses the site-wide font like the rest of the redesign, so the
// Fraunces/Roboto setup and the --paper/--forest CSS variables are gone.
// CareersCulture and the fake setTimeout loading states were removed.
export default function CareersPage() {
  return (
    <main className="bg-[#f7f6f2] text-[#1f2623]">
      <CareersHero />
      <Suspense fallback={<JobListingsSkeleton />}>
        <JobListings />
      </Suspense>
      <CareersCta />
    </main>
  );
}
