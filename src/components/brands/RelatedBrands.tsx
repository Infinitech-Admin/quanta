"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import type { BrandWithCategory } from "@/data/brands";

interface RelatedBrandsProps {
  brand: BrandWithCategory;
  related: BrandWithCategory[];
}

export function RelatedBrands({ related, brand }: RelatedBrandsProps) {
  return (
    <>
      {related.length > 0 && (
        <section className="border-t border-[var(--color-forest-deep)]/10 bg-white px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="mb-8 font-serif text-2xl text-[var(--color-forest-deep)] sm:text-3xl">
                More from {brand.categoryLabel}
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {related.map((item, index) => (
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
                  <Link
                    href={`/brands/${item.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl bg-[var(--color-sage-light)] p-1.5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient}`}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-4"
                          sizes="(min-width: 768px) 25vw, 45vw"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-serif text-2xl font-bold text-white/90">
                          {item.name.charAt(0)}
                        </span>
                      )}
                      <div className="absolute bottom-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-3 w-3 text-slate-700" />
                      </div>
                    </div>
                    <p className="mt-3 px-1 pb-2 text-sm font-semibold text-[var(--color-forest-deep)]">
                      {item.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
