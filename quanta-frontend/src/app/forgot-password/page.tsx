import type { Metadata } from "next";
import Image from "next/image";

import { FadeIn } from "@/components/auth/FadeIn";
import ChangePasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Change password",
  description: "Update your account password.",
};

export default function ChangePasswordPage() {
  return (
    <section className="relative isolate flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-[#a7e667] px-4 py-16">
      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop"
        alt="Sunlight filtering through a green pine forest"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 via-forest-deep/40 to-forest-deep/60" />

      <FadeIn x={0}>
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light backdrop-blur-xl">
              Rooted since 2003
            </span>
          </div>

          <div className="rounded-2xl border border-cream/20 bg-cream/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-black/10 backdrop-blur-xl sm:p-10">
            <h2 className="font-serif text-2xl text-forest-deep">
              Change your password
            </h2>
            <p className="mt-1 text-sm text-forest-deep/60">
              Enter your current password and choose a new one.
            </p>

            <ChangePasswordForm />
          </div>

          <p className="mt-5 text-center text-xs text-cream/70">
            © {new Date().getFullYear()} Quanta Paper Corporation
          </p>
        </div>
      </FadeIn>
    </section>
  );
}