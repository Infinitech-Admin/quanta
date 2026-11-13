"use client";

import Link from "next/link";
import { BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const certs = [
  {
    eyebrow: "Quality Management",
    name: "ISO 9001:2015",
    detail: "Quality management system",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Environmental Recognition",
    name: "Green Choice Philippines",
    detail: "Environmental seal program",
    icon: Leaf,
  },
  {
    eyebrow: "Halal Certification",
    name: "Halal IDCP",
    detail: "Halal certification",
    icon: BadgeCheck,
  },
];

export function Certifications() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
        >
          <h2 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-[#0f3f2a] md:text-5xl">
            Backed by standards.
            <br />
            Built on trust.
          </h2>

          <p className="max-w-[410px] border-l border-[#3b7d57] py-1 pl-6 text-sm leading-[1.9] text-[#5b6460] md:mt-2">
            Quality matters in every product we make. Our commitment is
            supported by recognized quality-management, environmental, and Halal
            standards.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {certs.map(({ eyebrow, name, detail, icon: Icon }, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center rounded-2xl border border-b-[5px] border-black/[0.07] border-b-[#2a8a57] bg-gradient-to-b from-white to-[#fafcfa] px-6 pb-9 pt-7 text-center shadow-[0_18px_40px_-22px_rgba(15,63,42,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* concentric icon rings */}
              <div className="flex h-[118px] w-[118px] items-center justify-center rounded-full bg-[#e9f2ea]">
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#bcdcc7] bg-[#e1f1e6]">
                  <Icon
                    className="h-10 w-10 text-[#1f7a4a]"
                    strokeWidth={1.4}
                  />
                </div>
              </div>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3d7a5b]">
                {eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0f3f2a]">
                {name}
              </h3>
              <p className="mt-2 text-[13px] text-[#5b6460]">{detail}</p>
            </motion.article>
          ))}
        </div>

        {/* ── Footer row ── */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         
          <Link
            href="/about"
            className="text-sm font-bold text-[#00a651] transition-opacity hover:opacity-80"
          >
            Learn More About Quanta →
          </Link>
        </div>
      </div>
    </section>
  );
}
