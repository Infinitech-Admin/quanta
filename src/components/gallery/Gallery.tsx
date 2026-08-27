// components/gallery/Gallery.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type Category =
  | "gift-giving"
  | "tree-planting"
  | "orphanage"
  | "warehouse"
  | "lot";

export type GalleryImage = {
  src: string;
  category: Category;
};

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "gift-giving", label: "Gift Giving" },
  { key: "tree-planting", label: "Tree Planting" },
  { key: "orphanage", label: "Orphanage" },
  { key: "warehouse", label: "Warehouse" },
  { key: "lot", label: "Lot" },
];

const PAGE_SIZE = 12;

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<Category | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filtering while the lightbox is open could point at a stale index
  // (or one that no longer exists in the filtered set), and pagination
  // should restart from the first page whenever the filter changes.
  // Rather than doing this in a useEffect (which would cause an extra
  // render pass), we track the filter that produced the current state
  // and adjust synchronously during render when it changes — the
  // React-recommended pattern for "resetting state when a prop changes".
  // See: https://react.dev/learn/you-might-not-need-an-effect
  const [prevActive, setPrevActive] = useState(active);
  if (active !== prevActive) {
    setPrevActive(active);
    setLightboxIndex(null);
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = useMemo(
    () =>
      active === "all"
        ? images
        : images.filter((img) => img.category === active),
    [active, images],
  );

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const hasMore = visibleCount < filtered.length;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3">
          <FilterButton
            label="All"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat.key}
              label={cat.label}
              active={active === cat.key}
              onClick={() => setActive(cat.key)}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-[#16241B]/40">No images yet.</p>
          </div>
        ) : (
          <>
            <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6 [column-fill:_balance]">
              {visible.map((img, i) => (
                <GalleryTile
                  key={img.src + i}
                  src={img.src}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center sm:mt-10">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + PAGE_SIZE, filtered.length),
                    )
                  }
                  className="rounded-full border border-[#16241B]/15 bg-transparent px-6 py-2 text-sm font-medium text-[#16241B]/70 transition-colors duration-200 hover:border-[#B07A32]/50 hover:text-[#16241B]"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </section>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
        active
          ? "border-[#B07A32] bg-[#B07A32] text-white"
          : "border-[#16241B]/15 bg-transparent text-[#16241B]/70 hover:border-[#B07A32]/50 hover:text-[#16241B]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function GalleryTile({ src, onClick }: { src: string; onClick: () => void }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 block aspect-[4/3] w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#E1EDD9] shadow-sm transition-transform duration-300 ease-out hover:scale-[1.015] hover:shadow-lg sm:mb-5 lg:mb-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="block h-full w-full object-cover"
      />
    </button>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const goPrev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  const goNext = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);

    // Lock background scroll while the lightbox is open.
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = original;
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
    >
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Wraps the image so the close button can be positioned relative
          to the image's own corner, not the screen's corner. */}
      <div
        className="relative max-h-full max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index].src}
          alt=""
          className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-colors hover:bg-red-700 sm:right-3 sm:top-3"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
