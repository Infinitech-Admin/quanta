"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function JoinCta() {
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
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-[var(--font-display)] text-3xl italic sm:text-4xl">
            Don&apos;t see the right fit yet?
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mt-4 font-[var(--font-body)] text-base text-[var(--paper)]/80">
            We&apos;re always looking for deserving individuals to grow with the
            Quanta family. Reach out and let&apos;s talk about where you could
            fit in.
          </p>
        </motion.div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            // animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-sun)] hover:bg-[var(--color-sun-light)] text-[var(--color-forest-deep)] px-7 py-3 text-sm font-[var(--font-body)]  text-[var(--forest-deep)] transition-transform hover:scale-[1.02] hover:bg-[var(--color-sun-light)]"
            >
              {/* className="inline-flex items-center justify-center rounded-full bg-[var(--leaf)] px-8 py-3 font-[var(--font-body)] text-sm font-semibold text-[var(--forest-deep)] transition-transform hover:scale-[1.02]" */}
              Contact Us
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            // animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <a
              href="mailto:wecare@quantapaper.com"
              className="mt-8 inline-flex items-center gap-2 font-[var(--font-body)] text-sm text-[var(--paper)]/70 transition-colors hover:text-[var(--sunlight)]"
            >
              <Mail className="h-4 w-4" />
              wecare@quantapaper.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
