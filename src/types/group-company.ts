export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "cards"; items: string[] }
  | { type: "heading"; eyebrow?: string; text: string }
  | { type: "image"; url: string; alt?: string };

export type GroupCompany = {
  id: string;
  slug: string;
  short_name: string;
  full_name: string;
  tagline: string | null;
  content: ContentBlock[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type GroupCompanyFormValues = {
  short_name: string;
  full_name: string;
  tagline: string;
  content: ContentBlock[];
  sort_order: number;
  is_active: boolean;
};

export type ApiListResponse<T> = {
  success: boolean;
  message?: string;
  data: T[];
};

export type ApiItemResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ApiUploadResponse = {
  success: boolean;
  message?: string;
  data: { url: string; filename: string };
};
