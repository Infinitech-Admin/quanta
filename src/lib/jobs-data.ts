import { getApiUrl } from "@/lib/api-url";

// Departments come from the admin panel, so this is a plain string.
export type Department = string;

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

// Shape Laravel's JobListing transform() returns (snake_case). The camelCase
// names are accepted too, so either API shape works.
type RawJob = {
  slug: string;
  title: string;
  location: string;
  department: string;
  job_summary?: string | null;
  summary?: string | null;
  education?: string[] | null;
  work_experience?: string[] | null;
  workExperience?: string[] | null;
  competencies_skills?: string[] | null;
  skills?: string[] | null;
  key_responsibilities?: string[] | null;
  responsibilities?: string[] | null;
  is_active?: boolean;
  verified?: boolean;
};

function toJob(raw: RawJob): Job {
  return {
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    department: raw.department,
    summary: raw.job_summary ?? raw.summary ?? undefined,
    education: raw.education ?? [],
    workExperience: raw.work_experience ?? raw.workExperience ?? [],
    skills: raw.competencies_skills ?? raw.skills ?? [],
    responsibilities: raw.key_responsibilities ?? raw.responsibilities ?? [],
    verified: raw.verified ?? raw.is_active ?? true,
  };
}

// Same base-URL helper as brands, so careers hits the same Laravel host.
// getApiUrl() returns the host WITHOUT "/api".
const API_BASE_URL = `${getApiUrl()}/api`;

/** All ACTIVE job listings for /careers (public route, see backend/). */
export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/job-listings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok)
      throw new Error(`Failed to fetch job listings (${res.status})`);

    const json: ApiResponse<RawJob[]> = await res.json();
    return (json.data ?? [])
      .filter((j) => j.is_active !== false) // safety net if inactive ever leak through
      .map(toJob);
  } catch (error) {
    console.error("getJobs failed:", error);
    return [];
  }
}

/** One active job by slug, for /careers/[slug]. Null = not found/inactive. */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/job-listings/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch job listing (${res.status})`);

    const json: ApiResponse<RawJob> = await res.json();
    return json.data ? toJob(json.data) : null;
  } catch (error) {
    console.error("getJobBySlug failed:", error);
    return null;
  }
}
