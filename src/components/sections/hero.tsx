"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// import { PaperEdge } from "@/components/paper-edge";

const YOUTUBE_VIDEO_ID = "A9AgNdfVH2g";
// Same sunbeam-forest style as the hero background, for visual consistency
const VIDEO_THUMB =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop";

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative isolate flex min-h-[88vh] w-full items-center overflow-hidden bg-forest-deep sm:min-h-[80vh]">
      {/* Background photograph */}

      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop"
        alt="Sunlight filtering through a green pine forest"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Forest-toned gradient so text stays legible without hiding the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left column — copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -380 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light">
                Rooted since 2003
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -380 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
                Over 20 years of paper, made with the forest in mind.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -380 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
                High-quality, affordable, hygienic, and environment-friendly
                paper products — grown from two decades of care for people and
                the planet.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -380 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Button variant="sun" size="lg" asChild>
                  <Link href="/brands">Explore Our Brands</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -380 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right column — video */}
          <motion.div
            initial={{ opacity: 0, x: 390 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-cream/20 shadow-2xl shadow-black/40 ring-1 ring-black/10"
                aria-label="Play video"
              >
                <div className="aspect-video w-full">
                  <Image
                    src={VIDEO_THUMB}
                    alt="Preview of our paper-making story video"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Darken for contrast + play affordance */}
                <div className="absolute inset-0 bg-forest-deep/20 transition-colors group-hover:bg-forest-deep/30" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                    <Play className="ml-1 h-6 w-6 fill-forest-deep text-forest-deep sm:h-7 sm:w-7" />
                  </span>
                </span>

                <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-forest-deep/60 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                  Play Video
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Signature deckled paper edge — bridges the photo into the paper-cream page */}
      {/* <div className="absolute inset-x-0 bottom-0 z-10 translate-y-px">
        <PaperEdge fill="fill-cream" />
      </div> */}

      {/* Video lightbox modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsVideoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsVideoOpen(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
              title="Rooted since 2003 — our story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
