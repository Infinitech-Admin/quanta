// types/job-application.ts
export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface JobApplication {
  id: number;
  job_listing_id: number | null;
  job_slug: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  full_name: string;
  phone: string;
  email: string;
  position: string;
  location: string;
  portfolio: string | null;
  introduction: string | null;
  cv_original_name: string;
  cv_mime: string | null;
  cv_size: number | null;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationListResponse {
  success: boolean;
  message?: string;
  data: JobApplication[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  reviewing: "bg-amber-50 text-amber-700",
  shortlisted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
  hired: "bg-green-100 text-green-800",
};
