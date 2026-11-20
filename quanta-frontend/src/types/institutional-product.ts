export interface InstitutionalProduct {
  id: string;
  name: string;
  image: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface InstitutionalProductFormValues {
  name: string;
  image: string | null;
  is_active: boolean;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
