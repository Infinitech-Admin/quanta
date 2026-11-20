// lib/institutional-products.ts
import { getApiUrl } from "@/lib/api-url";

export interface InstitutionalProduct {
  id: string;
  name: string;
  image: string | null; // run through getImageUrl() before rendering
}

const FALLBACK_INSTITUTIONAL_PRODUCTS: InstitutionalProduct[] = [
  "Jumbo Roll Tissue Dispenser",
  "Jumbo Coreless Tissue Roll",
  "Centerpull Square Plastic Dispenser",
  "Jumbo Tissue Roll",
  "Center Pull Stainless Dispenser",
  "Interfolded Paper Towel Dispenser",
  "Interfolded Paper Towel – Wrapped",
  "Interfolded Paper Towel – Boxed",
  "Upright Facial Tissue Box",
  "Flat Facial Tissue Dispenser",
  "Facial Tissue",
  "Interleaved Tissue Dispenser",
  "Interleaved Table Napkin",
  "Table Napkin",
  "Handroll Tissue Dispenser",
  "Handroll Tissue Dispenser Auto Cut",
  "Handroll Tissue",
  "Bathroom Tissue Roll",
  "Manual Hand Soap Dispenser 300 ml",
  "Manual Hand Soap Dispenser 1000 ml",
  "Automatic Hand Soap Dispenser",
  "Strawberry Scent",
  "Peppermint Scent",
  "Apple Scent Sanitizer",
].map((name, index) => ({
  id: `eco-hygiene-${index + 1}`,
  name,
  image: null,
}));

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
  try {
    const res = await fetch(`${getApiUrl()}/api/institutional-products`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const body: ApiListResponse<InstitutionalProduct> = await res.json();
      if (body.success && body.data.length > 0) return body.data;
    }
  } catch {
    // The institutional range must remain visible during API outages.
  }

  return FALLBACK_INSTITUTIONAL_PRODUCTS;
}
