export type Department = "Corporate" | "Logistics & Operations";

export type Job = {
  slug: string;
  title: string;
  location: string;
  department: Department;
  summary?: string;
  education?: string[];
  workExperience?: string[];
  skills?: string[];
  responsibilities?: string[];
  verified: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// Point this at your Laravel app, e.g. https://api.quantapaper.com/api
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api";

/**
 * All active job listings, for the /careers grid.
 * Cached for 60s (ISR) — new/edited listings in the admin panel show up
 * within a minute without needing a redeploy. Lower/raise as needed.
 */
export async function getJobs(): Promise<Job[]> {
  try {
    console.log("Fetching jobs from:", `${API_BASE_URL}/job-listings`);
    const res = await fetch(`${API_BASE_URL}/job-listings`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch job listings (${res.status})`);
    }

    const json: ApiResponse<Job[]> = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("getJobs failed:", error);
    return [];
  }
}

/**
 * A single job by slug, for /careers/[slug].
 * Returns null for "not found" or "inactive" — both should 404 on the page.
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/job-listings/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Failed to fetch job listing (${res.status})`);
    }

    const json: ApiResponse<Job> = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.error("getJobBySlug failed:", error);
    return null;
  }
}
