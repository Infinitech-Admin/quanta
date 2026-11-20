// app/gallery/loading.tsx

const FILTER_COUNT = 6; // "All" + 5 categories
const TILE_HEIGHTS = [220, 280, 180, 260, 200, 240, 300, 190, 250]; // varied heights for a natural masonry feel

export default function GalleryLoading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F5EC] pt-20 sm:pt-24">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Filter pills skeleton */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3">
            {Array.from({ length: FILTER_COUNT }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 animate-pulse rounded-full bg-[#16241B]/10 sm:h-9 sm:w-24"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>

          {/* Masonry tile skeleton, mirrors Gallery's columns layout */}
          <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6 [column-fill:_balance]">
            {TILE_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="mb-4 block w-full animate-pulse break-inside-avoid overflow-hidden rounded-2xl bg-[#16241B]/10 sm:mb-5 lg:mb-6"
                style={{ height: h, animationDelay: `${(i % 4) * 120}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
