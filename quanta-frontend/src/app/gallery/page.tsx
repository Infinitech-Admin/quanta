// app/gallery/page.tsx
import type { Metadata } from "next";
import { Gallery, type GalleryImage } from "@/components/gallery/Gallery";
import { getApiUrl } from "@/lib/api-url";

export const metadata: Metadata = {
  title: "Gallery",
};

// Backend stores paths relative to Laravel's public/ folder
// (e.g. "images/gallery/gift-giving/uuid.jpg"), so the frontend
// needs to prefix them with the API's own origin, not Next's.
function toAbsoluteUrl(relativePath: string): string {
  return `${getApiUrl()}/${relativePath}`;
}

type ApiGalleryImage = {
  id: number;
  image: string;
  category: GalleryImage["category"];
  sort_order: number;
};

async function getImages(): Promise<GalleryImage[]> {
  try {
    const res = await fetch(`${getApiUrl()}/api/gallery`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to load gallery images:", res.status);
      return [];
    }

    const json = await res.json();

    if (!json.success || !Array.isArray(json.data)) {
      console.error("Unexpected gallery response shape:", json);
      return [];
    }

    return json.data.map((img: ApiGalleryImage) => ({
      src: toAbsoluteUrl(img.image),
      category: img.category,
    }));
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getImages();

  return (
    // min-h-screen ensures the page always fills at least the viewport
    // height, even when the gallery is empty. Without it, a short empty
    // state made the whole page shorter than the viewport, which pushed
    // the footer up and left a mismatched-color gap below it.
    <main className="relative min-h-screen overflow-hidden bg-[#F7F5EC] pt-20 sm:pt-24">
      <Gallery images={images} />
    </main>
  );
}
