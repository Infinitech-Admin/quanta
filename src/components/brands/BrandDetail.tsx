"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";
import type { BrandWithCategory } from "@/lib/brands";

export function BrandDetail({ brand }: { brand: BrandWithCategory }) {
  const image = getImageUrl(brand.image);
  const gallery = (brand.images ?? [])
    .map((url) => getImageUrl(url))
    .filter((url): url is string => Boolean(url));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }
  function closeLightbox() {
    setLightboxIndex(null);
  }
  function showPrev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + gallery.length) % gallery.length,
    );
  }
  function showNext() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
  }

  return (
    <>
      <section className="bg-[var(--color-sage-light)] px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          {/* Product card */}
          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]"
                style={{ backgroundImage: brand.gradient }}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                {image ? (
                  <Image
                    src={image}
                    alt={brand.name}
                    fill
                    className="relative z-10 object-contain p-8"
                    sizes="(min-width: 1024px) 380px, 320px"
                  />
                ) : (
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    <span className="font-serif text-6xl font-bold text-white/90">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-6 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: brand.color }}
                  aria-hidden="true"
                />
                <span className="text-xs uppercase tracking-widest text-[var(--color-forest-deep)]/60">
                  {brand.categoryLabel}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-serif text-3xl text-[var(--color-forest-deep)] sm:text-4xl">
                {brand.name}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-forest-deep)]/80 sm:text-lg">
                {brand.description}
              </p>
            </motion.div>

            {brand.features && brand.features.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {brand.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <li className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${brand.color}1a` }}
                      >
                        <Check
                          className="h-3 w-3"
                          style={{ color: brand.color }}
                        />
                      </span>
                      <span className="text-sm text-[var(--color-forest-deep)]/80 sm:text-base">
                        {feature}
                      </span>
                    </li>
                  </motion.div>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Gallery — masonry layout so each product photo keeps its
            natural aspect ratio instead of being cropped/padded into a
            forced square. */}
        {gallery.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-serif text-2xl text-[var(--color-forest-deep)] sm:text-3xl"
            >
              Gallery
            </motion.h3>

            <div className="mt-6 columns-2 gap-4 sm:columns-3 lg:columns-4">
              {gallery.map((url, index) => (
                <motion.button
                  key={url + index}
                  type="button"
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: (index % 8) * 0.05,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/*
                    eslint-disable-next-line @next/next/no-img-element --
                    Intentional: this is a CSS-columns masonry grid, and each
                    tile's height must come from the photo's own natural
                    aspect ratio (that's the whole point of "masonry" here).
                    `next/image` needs either an explicit width/height or a
                    `fill` parent with a fixed aspect ratio — we only have a
                    bare URL with no known dimensions, so either option would
                    force a guessed ratio and break the layout. The lightbox
                    version below already uses `next/image` since it renders
                    at one fixed size where `fill` works correctly.
                  */}
                  <img
                    src={url}
                    alt={`${brand.name} gallery image ${index + 1}`}
                    loading="lazy"
                    className="h-auto max-h-[420px] w-full rounded-lg object-contain transition duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/5">
                    <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4 text-[var(--color-forest-deep)]" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[lightboxIndex]}
                alt={`${brand.name} gallery image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
