import { getJobs } from "@/lib/jobs-data";
import { JobListingsClient } from "@/components/careers/JobListingsClient";

// Server Component: does the fetch, then hands data to the client
// component that owns the filter-tab interactivity. Wrap this in
// <Suspense fallback={<JobListingsSkeleton />}> where it's used so the
// rest of the page (hero, culture, CTA) renders immediately.
export async function JobListings() {
  const jobs = await getJobs();
  return <JobListingsClient jobs={jobs} />;
}
