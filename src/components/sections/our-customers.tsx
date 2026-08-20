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
    <section className="bg-white px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-forest-deep)]/50">
            Trusted by
          </span>
          <h2 className="mt-3 font-serif text-3xl text-[var(--color-forest-deep)] sm:text-4xl">
            Our Customers
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-forest-deep)]/20" />
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {customers.map((customer, index) => {
            const logoUrl = getImageUrl(customer.logo);
            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 12) * 0.04,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="group relative flex h-24 items-center justify-center rounded-xl bg-[var(--color-sage-light)] p-4 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md hover:ring-black/10"
              >
                {logoUrl ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={logoUrl}
                      alt={customer.name}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 150px, (min-width: 640px) 200px, 45vw"
                    />
                  </div>
                ) : (
                  <span className="text-center text-sm font-medium text-gray-400">
                    {customer.name}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
