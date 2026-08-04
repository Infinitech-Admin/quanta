"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroSkeleton } from "@/components/skeleton/HomeSkeleton";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error toggling video playback:", error);
    }
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsVideoOpen(false);
  };

  if (isLoading) {
    setTimeout(() => setIsLoading(false), 4000);
    return <HeroSkeleton />;
  }

  return (
    <section className="relative z-10 isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[#a7e667] sm:min-h-[90vh]">
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
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/40 via-forest-deep/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#a7e667]/20 via-[#a7e667]/10 to-[#a7e667]/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left column — copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light">
                Rooted since 2003
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
                Over 20 years of paper, made with the forest in mind.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200 }}
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
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Button variant="sun" size="lg" asChild>
                  <Link href="/brands">Explore Our Brands</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
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
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="group relative block w-full overflow-hidden rounded-2xl border border-cream/20 shadow-2xl shadow-black/40 ring-1 ring-black/10">
                <div className="aspect-video w-full">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="/videos/quanta.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-50 hover:bg-slate-200 px-3 py-1.5 text-xs font-medium text-green-900 backdrop-blur-sm transition-colors"
                aria-label="Open full video"
              >
                Full Video
              </button>
              <button
                type="button"
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-slate-50 hover:bg-slate-200 px-3 py-1.5 text-xs font-medium text-green-900 backdrop-blur-sm transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5 fill-green-900 text-green-900" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-green-900 text-green-900" />
                )}
                {isPlaying ? "Pause Video" : "Play Video"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full video lightbox */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeVideo}
              className="absolute right-4 top-4 z-50 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 p-2"
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
      )}
    </section>
  );
}
