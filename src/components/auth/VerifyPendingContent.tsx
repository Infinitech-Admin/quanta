"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/auth/FadeIn";
import { toast } from "@/components/ui/use-toast";

export function VerifyPendingContent() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const [email, setEmail] = useState(emailFromUrl);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // 404 — no account exists for this email
        if (response.status === 404) {
          toast({
            variant: "destructive",
            title: "No account found",
            description:
              data.message ||
              "We couldn't find an account with that email address.",
          });
          return;
        }

        // 400 — account exists but is already verified; resending is a
        // no-op, so point them straight to login instead.
        if (response.status === 400) {
          toast({
            variant: "default",
            title: "Already verified",
            description:
              data.message ||
              "This email is already verified.",
          });
          return;
        }

        // 422 — validation error (e.g. malformed email)
        if (response.status === 422) {
          toast({
            variant: "destructive",
            title: "Invalid email",
            description: data.message || "Please enter a valid email address.",
          });
          return;
        }

        // Fallback for anything else (500, etc.)
        toast({
          variant: "destructive",
          title: "Failed to resend",
          description: data.message || "Could not resend verification email",
        });
        return;
      }

      toast({
        variant: "default",
        title: "Email sent!",
        description: "Please check your inbox for the verification link",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          {/* Brand mark */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/80 bg-sun/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sun-light backdrop-blur-xl">
              Rooted since 2003
            </span>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-cream/20 bg-cream/95 p-8 text-center shadow-2xl shadow-black/40 ring-1 ring-black/10 backdrop-blur-xl sm:p-10">
            <div className="flex flex-col items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest-deep/15 bg-forest-deep/5">
                <Mail className="h-8 w-8 text-forest-deep" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-forest-deep">
                  Verify your email
                </h2>
                <p className="mt-2 text-sm text-forest-deep/70">
                  We&apos;ve sent a verification link to your email address.
                  Check your inbox and click the link to activate your account.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-left">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
                />
              </div>

              <Button
                onClick={handleResend}
                variant="sun"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Resend verification email
                  </span>
                )}
              </Button>
            </div>

            <div className="mt-6 border-t border-forest-deep/10 pt-6 text-center">
              <p className="mb-2 text-sm text-forest-deep/60">
                Already verified?
              </p>
              <Link
                href="/login"
                className="font-medium text-forest-deep underline-offset-4 hover:underline"
              >
                Go to Login
              </Link>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-cream/70">
            © {new Date().getFullYear()} Quanta Paper Corporation
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
