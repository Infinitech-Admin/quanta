// types/gallery.ts

export const GALLERY_CATEGORIES = [
  "gift-giving",
  "tree-planting",
  "orphanage",
  "warehouse",
  "lot",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  "gift-giving": "Gift Giving",
  "tree-planting": "Tree Planting",
  orphanage: "Orphanage",
  warehouse: "Warehouse",
  lot: "Lot",
};

export interface GalleryImage {
  id: number;
  image: string; // relative path from Laravel, e.g. "images/gallery/lot/uuid.jpg"
  category: GalleryCategory;
  sort_order: number;
}

export interface GalleryFormValues {
  category: GalleryCategory;
  sort_order: number;
  file: File | null; // null when editing without changing the image
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
