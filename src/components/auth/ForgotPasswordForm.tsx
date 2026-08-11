"use client";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";

export default function ChangePasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast({
          variant: "default",
          title: "Check your email",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to send reset email. Please try again.",
        });
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Success state after email is sent
  if (submitted) {
    return (
      <>
        <div className="mx-auto mt-6 mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-forest-deep/15 bg-forest-deep/5">
          <Mail className="h-8 w-8 text-forest-deep" />
        </div>

        <h2 className="text-center font-serif text-2xl text-forest-deep">
          Check your email
        </h2>

        <div className="mt-4 rounded-xl border border-forest-deep/10 bg-white/50 p-4">
          <p className="text-sm text-forest-deep/70">
            We&apos;ve sent a password reset link to:
          </p>
          <p className="mt-1 text-base font-semibold text-forest-deep">
            {email}
          </p>
        </div>

        <ul className="mt-6 space-y-2 text-left text-sm text-forest-deep/70">
          <li className="flex items-start gap-2">
            <span className="text-sun">•</span>
            <span>
              The link will expire in <strong className="text-forest-deep">1 hour</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sun">•</span>
            <span>Check your spam/junk folder if you don&apos;t see the email</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sun">•</span>
            <span>If you don&apos;t receive an email, please try again or contact support</span>
          </li>
        </ul>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setEmail("");
            }}
            className="w-full rounded-xl bg-gradient-to-r from-sun to-sun-light px-4 py-3 font-semibold text-forest-deep shadow-lg transition-opacity hover:opacity-90"
          >
            Send another email
          </button>

          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-forest-deep/70 transition-colors hover:text-forest-deep"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </>
    );
  }

  // Email form
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
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
            required
            autoFocus
            className="mt-2 w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
          />
          <p className="mt-2 text-xs text-forest-deep/50">
            Enter the email address associated with your account
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-sun to-sun-light px-4 py-3 font-semibold text-forest-deep shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending reset link…
            </span>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-forest-deep/70 transition-colors hover:text-forest-deep"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </>
  );
}