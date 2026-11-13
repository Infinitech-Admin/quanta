import { getJobs } from "@/lib/jobs-data";
import { CareersBoard } from "@/components/careers/CareersBoard";

// Server component: fetches jobs once, then the client board handles
// search, filters, the detail panel and the application form.
export async function JobListings() {
  const jobs = await getJobs();
  return <CareersBoard jobs={jobs} />;
}
