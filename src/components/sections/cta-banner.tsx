"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CtaBannerSkeleton } from "../skeleton/HomeSkeleton";

export function CtaBanner() {
   const [isLoading, setIsLoading] = useState(true);
  
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 4000);
      return <CtaBannerSkeleton />;
    }

  return (
    <section className="section-green-gradient py-20 px-6 md:px-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        // animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-cream)] max-w-2xl mx-auto mb-6">
          Let&apos;s grow something together.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-[var(--color-cream)]/70 max-w-xl mx-auto mb-8">
          Reach out for inquiries, partnerships, or product information.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Button
          asChild
          className="bg-[var(--color-sun)] hover:bg-[var(--color-sun-light)] text-[var(--color-forest-deep)]"
        >
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </motion.div>
    </section>
  );
}
