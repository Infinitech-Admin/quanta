// types/news.ts

// Raw shape returned by Laravel
export type ApiNewsImage = { id: number; image: string; sort_order: number };

export type ApiNews = {
  id: number;
  title: string;
  slug: string;
  category: string; // free text
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  published_at: string;
  images: ApiNewsImage[];
};

export type ApiListResponse<T> = {
  success: boolean;
  message?: string;
  data: T[];
};

// Shape used by the public pages (URLs already absolute)
export type News = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  date: string; // YYYY-MM-DD
  cover: string | null; // cover_image, or first gallery image as fallback
  gallery: string[];
};
