"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
    }

    if (password !== confirmPassword) {
      setError("Those passwords don't match.");
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    if (phone.length < 13) {
      setError("Use at least 13 characters for your phone.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          email,
          phone,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "We couldn't create your account. Try again.");
        return;
      }

      toast({
        title: "Register successful",
        description: "Account created! Please check your email to confirm.",
      });
      
      router.push("/");
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
          htmlFor="fullName"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
        >
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Rivera"
          className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
        />
      </div>

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
          placeholder="you@example.com"
          className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="phone"
          autoComplete="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+639XXXXXXXXX"
          className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
        >
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
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
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
        >
          Confirm password
        </label>
        <div className="relative mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 pr-11 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-deep/50 hover:text-forest-deep"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-forest-deep/70">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-forest-deep/30 text-forest-deep focus-visible:ring-2 focus-visible:ring-sun/40"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

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
            Creating account…
          </span>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-sm text-forest-deep/70">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-forest-deep underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
