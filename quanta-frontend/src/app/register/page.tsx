import type { Metadata } from "next";
import Image from "next/image";

import { FadeIn } from "@/components/auth/FadeIn";
import { SignupForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your account.",
};

// Server component: same split as the login page — interactivity and
// motion live in small "use client" children, the page itself doesn't.
export default function RegisterPage() {

  
  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[#a7e667]">
      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop"
        alt="Sunlight filtering through a green pine forest"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 via-forest-deep/40 to-forest-deep/60" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* Left — brand copy */}
        <div className="max-w-lg">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light backdrop-blur-xl">
              Rooted since 2003
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-cream sm:text-5xl">
              Join two decades of care for people and the planet.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
              Create an account to place orders, save your favorites, and
              track deliveries from Quanta.
            </p>
          </FadeIn>
        </div>

        {/* Right — signup card */}
        <FadeIn delay={0.15} x={40}>
          <div className="mx-auto w-full max-w-md rounded-2xl border border-cream/20 bg-cream/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-black/10 backdrop-blur-xl sm:p-10">
            <h2 className="font-serif text-2xl text-forest-deep">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-forest-deep/60">
              It only takes a minute.
            </p>

            <SignupForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}