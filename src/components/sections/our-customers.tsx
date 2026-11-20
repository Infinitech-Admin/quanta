"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/image-url";

interface Customer {
  id: string;
  name: string;
  logo: string | null;
  sort_order: number;
  is_active: boolean;
}

// The design includes a small placeholder note under the grid. Set this to
// false (or delete the <p> below) once the client approves the real logos.
const SHOW_LAYOUT_NOTE = true;

export function OurCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCustomers() {
      try {
        const res = await fetch("/api/customers");
        const json = await res.json();
        if (!cancelled && res.ok && json.success) {
          setCustomers(
            [...json.data].sort(
              (a: Customer, b: Customer) => a.sort_order - b.sort_order,
            ),
          );
        }
      } catch (err) {
        console.error("Failed to load customers:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadCustomers();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isLoading && customers.length === 0) return null;

  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-[#1f2623] md:text-5xl">
            Our Customers
          </h2>
        </motion.div>

        {/* ── Logo grid: 4 per row ── */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[101px] animate-pulse rounded-xl border border-black/[0.07] bg-white"
                />
              ))
            : customers.map((customer, index) => {
                const logoUrl = getImageUrl(customer.logo);
                return (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (index % 8) * 0.05,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    // Solid white card: logos with a white background blend
                    // into it (see mix-blend-multiply on the image below).
                    className="group flex h-[101px] items-center justify-center rounded-xl border border-black/[0.07] bg-white px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {logoUrl ? (
                      // Same fixed box for every logo, so each one is
                      // scaled to the same height/width limit.
                      <div className="relative h-14 w-full max-w-[180px]">
                        <Image
                          src={logoUrl}
                          alt={customer.name}
                          fill
                          quality={100}
                          className="object-contain mix-blend-multiply"
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 300px, 400px"
                        />
                      </div>
                    ) : (
                      <span className="text-center text-base font-bold text-[#0f4a2c]/70">
                        {customer.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
        </div>

        {SHOW_LAYOUT_NOTE && !isLoading && (
          <p className="mt-5 text-center text-[10px] text-[#6b7a70]">
            Names are for layout demonstration based on your current homepage;
            replace with officially approved client logos, subject to permission
            and current relationship status.
          </p>
        )}
      </div>
    </section>
  );
}
