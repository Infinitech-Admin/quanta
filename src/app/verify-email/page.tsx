"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/auth/FadeIn";

type Status = "loading" | "approved" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [message, setMessage] = useState(
    token ? "" : "Invalid verification link. No token provided.",
  );
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email/${token}`, {
          method: "GET",
        });

        const data = await response.json();

        if (cancelled) return;

        if (response.ok && data.success) {
          setStatus("approved");
          setMessage(data.message || "Email verified successfully!");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. Please try again.");
          const hint =
            data.message?.includes("Invalid or expired") ||
            data.message?.includes("already verified")
              ? "If you already clicked this link, your email may be verified — try logging in. Otherwise, request a new verification email."
              : data.message ||
                "The link may have expired or already been used.";
          setDebugInfo(hint);
        }
      } catch (error) {
        if (cancelled) return;
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
        setDebugInfo(error instanceof Error ? error.message : "Unknown error");
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    verifyEmail();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
            {/* ── LOADING ── */}
            {status === "loading" && (
              <div className="flex flex-col items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest-deep/15 bg-forest-deep/5">
                  <Loader2 className="h-8 w-8 animate-spin text-forest-deep" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-forest-deep">
                    Verifying your email
                  </h2>
                  <p className="mt-2 text-sm text-forest-deep/60">
                    Hang tight, this will only take a moment…
                  </p>
                </div>
              </div>
            )}

            {/* ── SUCCESS ── */}
            {status === "approved" && (
              <div className="flex flex-col items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-600/25 bg-emerald-600/10">
                  <CheckCircle className="h-8 w-8 text-emerald-700" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-forest-deep">
                    You&apos;re all set 🎉
                  </h2>
                  <p className="mt-2 text-sm text-forest-deep/70">{message}</p>
                  <p className="mt-1 text-xs text-forest-deep/40">
                    Redirecting to login in 3 seconds…
                  </p>
                </div>

                <div className="w-full rounded-xl border border-emerald-600/20 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-800">
                  ✓ Your account is now active
                </div>

                <Button variant="sun" size="lg" asChild className="w-full">
                  <Link href="/login">Go to Login →</Link>
                </Button>
              </div>
            )}

            {/* ── ERROR ── */}
            {status === "error" && (
              <div className="flex flex-col items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-600/25 bg-red-600/10">
                  <XCircle className="h-8 w-8 text-red-700" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-forest-deep">
                    Verification failed
                  </h2>
                  <p className="mt-2 text-sm text-forest-deep/70">{message}</p>
                </div>

                <div className="w-full rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3 text-left text-sm text-red-800">
                  {debugInfo ||
                    "The link may have expired or already been used."}
                </div>

                <div className="flex w-full gap-3">
                  <Button variant="sun" size="lg" asChild className="flex-1">
                    <Link href="/verify-pending">Resend Email</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="flex-1"
                  >
                    <Link href="/login">Go to Login</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-cream/70">
            © {new Date().getFullYear()} Quanta Paper Corporation
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#a7e667]">
          <Loader2 className="h-10 w-10 animate-spin text-forest-deep" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
