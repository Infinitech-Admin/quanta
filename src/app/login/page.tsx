import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/auth/FadeIn";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account.",
};

// Server component: no client-side state lives here. All interactivity
// (form fields, submit handling, entrance motion) is delegated to small
// "use client" children below, so the page itself stays server-rendered.
export default function LoginPage() {
  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden bg-[#a7e667]">
      {/* Background photograph, same treatment as the marketing Hero */}
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
        {/* Left — brand copy, matches Hero's voice */}
        <div className="max-w-lg">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light backdrop-blur-xl">
              Rooted since 2003
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-cream sm:text-5xl">
              Welcome back to the mill.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
              Sign in to manage your orders, track deliveries, and keep up with
              what&apos;s growing at Quanta.
            </p>
          </FadeIn>
        </div>

        {/* Right — login card */}
        <FadeIn delay={0.15} x={40}>
          <div className="mx-auto w-full max-w-md rounded-2xl border border-cream/20 bg-cream/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-black/10 backdrop-blur-xl sm:p-10">
            <h2 className="font-serif text-2xl text-forest-deep">Sign in</h2>
            <p className="mt-1 text-sm text-forest-deep/60">
              Enter your details to continue.
            </p>

            <LoginForm />

            <p className="mt-8 text-center text-xs text-forest-deep/50">
              By continuing you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
