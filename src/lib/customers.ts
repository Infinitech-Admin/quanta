import { getApiUrl } from "@/lib/api-url";

export interface Customer {
  id: string;
  name: string;
  logo: string | null;
  sort_order: number;
  is_active: boolean;
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

/**
 * Active customers only (the public /api/customers route already filters
 * to is_active === true on the Laravel side — see CustomerController::index).
 */
export async function getAllCustomers(): Promise<Customer[]> {
  const res = await fetch(`${getApiUrl()}/api/customers`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];

  const body: ApiListResponse<Customer> = await res.json();
  if (!body.success) return [];

  return [...body.data].sort((a, b) => a.sort_order - b.sort_order);
}
