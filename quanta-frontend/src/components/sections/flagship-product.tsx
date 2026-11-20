"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Your existing product image in /public/brands/. The design shows a wide
// photo (products on a wooden table, plants in the background); a cutout PNG
// also works, but the right side will look better with the full scene photo.
const PRODUCT_IMAGE = "/brands/fresh-tissue.png";

export function FlagshipProduct() {
  return (
    <section className="bg-[#f7f6f2] px-6 pb-12 pt-0 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-[#1b5c3f] shadow-sm md:grid-cols-[45fr_55fr]"
      >
        {/* ── Copy panel ── */}
        <div
          className="relative flex flex-col justify-center overflow-hidden px-8 py-12 md:px-12"
          style={{
            background: "linear-gradient(135deg, #1a5a3d 0%, #1f6849 100%)",
          }}
        >
          {/* thin decorative circle, centred on the panel's top-right corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[235px] -top-[235px] h-[470px] w-[470px] rounded-full border border-white/10"
          />

          <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-[#cfe8a8]">
            Featured Product
          </p>
          <h2 className="relative mt-4 text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Fresh Premium
            <br />
            Eco-Pulp
          </h2>
          <p className="relative mt-5 max-w-md text-sm leading-[1.9] text-white/90">
            Discover a tissue line featuring plant-based pulp such as sugarcane
            and bamboo—part of Quanta&apos;s approach to paper innovation.
          </p>

          <div className="relative mt-8">
            <Link
              href="/brands#brands"
              className="inline-flex items-center gap-2 rounded-full bg-[#f7f6f2] px-6 py-3.5 text-[13px] font-bold text-[#0b5a32] transition-colors hover:bg-white"
            >
              Explore Paper Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── Product photo ── */}
        <div className="relative min-h-[260px] md:min-h-[317px]">
          <Image
            src={PRODUCT_IMAGE}
            alt="Fresh Premium Eco-Pulp tissue products on a wooden table"
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
