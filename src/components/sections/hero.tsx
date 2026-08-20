"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HeroSkeleton } from "@/components/skeleton/HomeSkeleton";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop";

// Stagger the copy block's children instead of hand-tuning each duration
const fadeInUp = {
  hidden: { opacity: 0, x: -200 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 1 + i * 0.15, ease: "easeOut" as const },
  }),
};

function VideoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-50 items-center justify-center rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20"
        >
          <X />
        </button>

        <video
          ref={videoRef}
          className="aspect-video w-full rounded-xl"
          src="/videos/quanta.mp4"
          controls
          autoPlay
        />
      </div>
    </div>
  );
}

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Was previously calling setState directly in the render body, which is
  // unsafe in React (extra renders, no cleanup on unmount). useEffect fixes it.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative z-10 isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[#a7e667] sm:min-h-[90vh]">
      {/* Background photograph */}
      <Image
        src={HERO_IMAGE}
        alt="Sunlight filtering through a green pine forest"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Forest-toned gradient so text stays legible without hiding the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/40 via-forest-deep/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#a7e667]/20 via-[#a7e667]/10 to-[#a7e667]/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light backdrop-blur-xl">
              Rooted since 2003
            </span>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Quality, affordable, hygienic — since 2003.
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg">
              Over 20 years providing high-quality, affordable, hygienic, and
              environment-friendly products — made with concern, care, and love.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button variant="sun" size="lg" asChild>
              <Link href="/brands">Explore Our Brands</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">About Us</Link>
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => setIsVideoOpen(true)}
            >
              Play Video
            </Button>
          </motion.div>
        </div>
      </div>

      {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
    </section>
  );
}
