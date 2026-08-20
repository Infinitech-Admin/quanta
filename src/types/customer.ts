export interface Customer {
  id: string;
  name: string;
  logo: string | null; // relative Laravel path, e.g. "/customers/abc.png" — run through getImageUrl()
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type CustomerFormValues = Omit<
  Customer,
  "id" | "created_at" | "updated_at"
>;
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
