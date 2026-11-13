export const DEPARTMENTS = ["Corporate", "Logistics & Operations"] as const;

export interface JobSection {
  title: string;
  items: string[];
}

export interface JobListing {
  id: number;
  title: string;
  slug: string;
  location: string;
  department: (typeof DEPARTMENTS)[number];
  job_summary: string | null;

  // New: custom sections (label + lines) entered by the admin.
  sections?: JobSection[] | null;

  // Legacy fixed fields. Optional so old rows still work and new rows
  // don't need them. Safe to remove once every listing has been re-saved.
  education?: string[];
  work_experience?: string[];
  competencies_skills?: string[];
  key_responsibilities?: string[];

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
  sections: JobSection[];
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
