"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eyebrow, LeafSpray } from "./ui";
import { motion } from "framer-motion";
import { HeroSkeleton } from "@/components/skeleton/AboutSkeleton";

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-forest-deep)] pt-24 sm:pt-32 md:pt-24 text-[var(--color-cream)]">
      <Image
        src="/images/about/plant-floor.jpg"
        alt="Quanta Paper technicians on the manufacturing floor in Mabalacat, Pampanga"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--color-forest-vivid)]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-forest-deep)]/95 via-[var(--color-forest-deep)]/50 to-transparent" />

      <LeafSpray className="pointer-events-none absolute -right-6 -top-10 h-64 w-40 rotate-[135deg] text-[var(--color-cream)]/25" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow className="text-[var(--color-sun)]">About Us</Eyebrow>
          <h1 className="mt-4 max-w-xl font-[var(--font-display)] text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-cream)]/85 sm:text-lg">
            We&apos;re committed to delivering quality products and exceptional
            service that stand out — trusted by customers, partners, and
            communities alike.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
