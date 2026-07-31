"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--forest-light)] px-4 py-20 text-center text-[var(--paper)] sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 30%, var(--leaf) 0%, transparent 55%)",
          opacity: 0.3,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-[var(--font-display)] text-3xl italic sm:text-4xl">
            Growing together, one partnership at a time.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut"  }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mt-4 font-[var(--font-body)] text-base text-[var(--paper)]/80">
            Whether you&apos;re a retail partner, an institutional buyer, or
            looking to join our team — we&apos;d love to hear from you.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut"  }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-sun)] px-8 py-3 font-[var(--font-body)] text-sm font-semibold text-[var(--forest-deep)] transition-transform hover:scale-[1.02]"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
