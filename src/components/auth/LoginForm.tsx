"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        const attempts = failedAttempts + 1;

        setFailedAttempts(attempts);

        if (attempts >= 5) {
          router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
          return;
        }

        setError(
          `That email and password don't match. ${
            5 - attempts
          } attempt${5 - attempts === 1 ? "" : "s"} remaining.`,
        );

        return;
      }

      // Reset on successful login
      setFailedAttempts(0);

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@example.com"
          className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
          >
            Password
          </label>
        </div>

        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 pr-11 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-deep/50 hover:text-forest-deep"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Forgot password - right aligned */}
        <div className="mt-2 flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-forest-deep/60 underline-offset-4 hover:text-forest-deep hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="sun"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-center text-sm text-forest-deep/70">
        New to the mill?{" "}
        <Link
          href="/register"
          className="font-medium text-forest-deep underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
