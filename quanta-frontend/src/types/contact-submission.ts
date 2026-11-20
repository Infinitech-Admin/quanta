export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
}

// Skip these if you already have equivalent generic types
// (e.g. reused from job-listing.ts) — no need to duplicate them.
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
