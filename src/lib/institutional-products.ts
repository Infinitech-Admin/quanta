// lib/institutional-products.ts
import { getApiUrl } from "@/lib/api-url";

export interface InstitutionalProduct {
  id: string;
  name: string;
  image: string | null; // run through getImageUrl() before rendering
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
}

/**
 * Every publicly-visible institutional product (the public
 * /api/institutional-products route should already filter to
 * is_active === true on the Laravel side, same as brands).
 */
export async function getInstitutionalProducts(): Promise<
  InstitutionalProduct[]
> {
  const res = await fetch(`${getApiUrl()}/api/institutional-products`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];

  const body: ApiListResponse<InstitutionalProduct> = await res.json();

  if (!body.success) return [];

  return body.data;
}
