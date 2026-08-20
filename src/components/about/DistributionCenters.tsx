"use client";

import Image from "next/image";
import { Eyebrow, TimelineNode } from "./ui";
import { distributionCenters } from "./content";
import { motion } from "framer-motion";

export function DistributionCenters() {
  return (
    <section className="bg-white py-24 text-[var(--color-forest-deep)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="text-center">
          <Eyebrow className="justify-center text-[var(--color-forest)]">
            Where We Reach
          </Eyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-[var(--font-display)] text-2xl leading-tight sm:text-3xl">
            Our Distribution Centers
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Map already has numbered pins baked into the image itself,
              so no overlay markers here — just the plain image. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
            <Image
              src="/ph-map.png"
              alt="Map of the Philippines showing Quanta Paper distribution centers"
              fill
              className="object-contain"
            />
          </div>

          {/* Numbered list, same style language as Our History's
              timeline nodes so the two sections feel related */}
          <div className="flex flex-col gap-8">
            {distributionCenters.map((d, index) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.4 }}
                className="flex items-start gap-4"
              >
                <TimelineNode className="h-9 w-9 shrink-0 border-[var(--color-forest)] bg-[var(--color-forest)] text-sm font-semibold text-white">
                  {index + 1}
                </TimelineNode>
                <div>
                  <h3 className="font-[var(--font-display)] text-base text-[#16281f]">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4b5b52]">
                    {d.address}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
