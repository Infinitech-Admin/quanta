import { cache } from "react";
import { getApiUrl } from "@/lib/api-url";

// Departments come from the admin panel, so this is a plain string.
export type Department = string;

export type JobSection = {
  title: string;
  items: string[];
};

export type Job = {
  slug: string;
  title: string;
  location: string;
  department: Department;
  summary?: string;
  sections: JobSection[];
  // Legacy fields, kept so other pages that still use them don't break
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

type RawJob = {
  slug: string;
  title: string;
  location: string;
  department: string;
  job_summary?: string | null;
  summary?: string | null;
  sections?:
    | { title?: string | null; items?: (string | null)[] | null }[]
    | null;
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

function toSections(raw: RawJob): JobSection[] {
  // 1) Custom sections from the admin panel
  if (Array.isArray(raw.sections) && raw.sections.length > 0) {
    return raw.sections
      .map((s) => ({
        title: (s.title ?? "").trim(),
        items: (s.items ?? [])
          .map((i) => String(i ?? "").trim())
          .filter((i) => i !== ""),
      }))
      .filter((s) => s.title !== "" || s.items.length > 0);
  }

  // 2) Fallback: old listings that only have the four fixed fields
  const legacy: [string, string[] | null | undefined][] = [
    ["Key Responsibilities", raw.key_responsibilities ?? raw.responsibilities],
    ["Education", raw.education],
    ["Work Experience", raw.work_experience ?? raw.workExperience],
    ["Competencies and Skills", raw.competencies_skills ?? raw.skills],
  ];

  return legacy
    .filter(([, items]) => Array.isArray(items) && items.length > 0)
    .map(([title, items]) => ({ title, items: items as string[] }));
}

function toJob(raw: RawJob): Job {
  return {
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    department: raw.department,
    summary: raw.job_summary ?? raw.summary ?? undefined,
    sections: toSections(raw),
    education: raw.education ?? [],
    workExperience: raw.work_experience ?? raw.workExperience ?? [],
    skills: raw.competencies_skills ?? raw.skills ?? [],
    responsibilities: raw.key_responsibilities ?? raw.responsibilities ?? [],
    verified: raw.verified ?? raw.is_active ?? true,
  };
}

// getApiUrl() returns the host WITHOUT "/api".
// Lazy on purpose: calling it at module scope crashes the build when
// LARAVEL_API_URL isn't set, before any try/catch can handle it.
function getApiBaseUrl(): string {
  return `${getApiUrl()}/api`;
}

/** All ACTIVE job listings for /careers (public route). */
export async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/job-listings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok)
      throw new Error(`Failed to fetch job listings (${res.status})`);

    const json: ApiResponse<RawJob[]> = await res.json();
    return (json.data ?? []).filter((j) => j.is_active !== false).map(toJob);
  } catch (error) {
    console.error("getJobs failed:", error);
    return [];
  }
}

/**
 * One active job by slug, for /careers/[slug]. Null = not found/inactive.
 * Wrapped in cache() so generateMetadata and the page share one request.
 */
export const getJobBySlug = cache(async (slug: string): Promise<Job | null> => {
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/job-listings/${encodeURIComponent(slug)}`,
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
});
