export const DEPARTMENTS = ["Corporate", "Logistics & Operations"] as const;

export interface JobListing {
  id: number;
  title: string;
  slug: string;
  location: string;
  department: (typeof DEPARTMENTS)[number];
  job_summary: string | null;
  education: string[];
  work_experience: string[];
  competencies_skills: string[];
  key_responsibilities: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JobListingFormValues {
  title: string;
  slug: string;
  location: string;
  department: (typeof DEPARTMENTS)[number];
  job_summary: string;
  education: string[];
  work_experience: string[];
  competencies_skills: string[];
  key_responsibilities: string[];
  is_active: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
