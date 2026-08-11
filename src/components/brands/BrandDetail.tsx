"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { BrandSlugDetailSkeleton } from "@/components/skeleton/BrandSkeleton";

interface Brand {
  name: string;
  slug: string;
  color: string;
  gradient: string;
  image?: string;
  description: string;
  categoryId: string;
  categoryLabel: string;
  features?: string[];
}

export function BrandDetail({ brand }: { brand: Brand }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <BrandSlugDetailSkeleton />;
  }

  return (
    <>
      {/* ── Detail — product card + copy + features, stacks on mobile ── */}
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
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${brand.gradient} shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]`}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                {brand.image ? (
                  <Image
                    src={brand.image}
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
                    <li key={feature} className="flex items-start gap-3">
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
      </section>
    </>
  );
}
