"use client";

import { useState } from "react";
import { Eyebrow, Icon, type IconShape } from "./ui";
import { coreValues } from "./content";
import { motion } from "framer-motion";
import { CoreValuesSkeleton } from "@/components/skeleton/AboutSkeleton";

export function CoreValues() {
    const [isLoading, setIsLoading] = useState(true);
  
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 4000);
      return <CoreValuesSkeleton />;
    }
  
  return (
    <section className="section-green-gradient py-24 text-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Eyebrow>Our Core Values</Eyebrow>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mt-4 max-w-2xl font-[var(--font-fraunces)] text-2xl leading-tight text-[var(--color-cream)] sm:text-3xl">
            Six things we don&apos;t compromise on.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div key={v.name}>
                <Icon
                  shape={v.shape as IconShape}
                  className="h-9 w-9 text-[var(--color-sun)]"
                />
                <h3 className="mt-4 font-[var(--font-fraunces)] text-xl text-[var(--color-cream)]">
                  {v.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-cream)]/75">
                  {v.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
