"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Drop the product photos in /public/images/ (about 1200x550, wide crop).
const cards = [
  {
    eyebrow: "For Everyday Living",
    title: "For Your Home",
    text: "Discover tissues, personal care, and hygiene essentials made for everyday Filipino households.",
    cta: "Browse Consumer Products",
    href: "/brands#brands",
    image: "/images/solutions-home.jpg",
    alt: "Quanta consumer products: bathroom tissue, facial tissue, wipes and personal care",
  },
  {
    eyebrow: "For Workplaces & Establishments",
    title: "For Your Business",
    text: "Explore institutional hygiene solutions and supply options for offices, hotels, restaurants, and more.",
    cta: "Explore Business Solutions",
    href: "/brands#institutional",
    image: "/images/solutions-business.jpg",
    alt: "Quanta ECO institutional tissue, soap and dispensers on wooden stands",
  },
];

export function SolutionsPicker() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a651]">
            How can we help?
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#1f2623] md:text-5xl">
            Find the right Quanta solutions for you.
          </h2>
          <p className="mt-4 text-sm text-[#5b6460] md:text-base">
            Different needs. One place to start. Choose what you&apos;re looking
            for.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-[1160px] gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Whole card is the link, jumping to its section on /brands */}
              <Link
                href={card.href}
                className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a651] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[570/260] w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 570px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="px-7 pb-7 pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00a651]">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#1f2623]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5b6460]">
                    {card.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#00a651]">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
