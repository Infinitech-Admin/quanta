// components/brands/InstitutionalProductsShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";
import type { InstitutionalProduct } from "@/lib/institutional-products";

interface InstitutionalProductsShowcaseProps {
  products: InstitutionalProduct[];
}

export function InstitutionalProductsShowcase({
  products,
}: InstitutionalProductsShowcaseProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* <span className="inline-block rounded-full border border-[var(--color-sun)]/40 px-4 py-1 text-xs tracking-widest uppercase text-[var(--color-sun)] mb-4">
              Institutional
            </span> */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-serif text-3xl font-bold md:text-4xl mb-4 text-[var(--color-forest)]">
              Institutional Products
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-center text-sm text-[var(--color-forest-deep)]/70 max-w-2xl mx-auto">
              Everyday hygiene essentials for offices, hotels, hospitals, and
              commercial spaces — from tissue systems to hand soap, sanitizer,
              and more.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, index) => {
            const imageUrl = getImageUrl(product.image);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: (index % 10) * 0.08,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-sage-light)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain p-6"
                    />
                  ) : (
                    <span className="font-serif text-4xl font-bold text-[var(--color-forest)]/40">
                      {product.name.charAt(0)}
                    </span>
                  )}
                </div>
                <p className="text-center text-sm font-medium text-[var(--color-forest-deep)]">
                  {product.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
