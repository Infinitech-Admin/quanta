"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";

import { toast } from "@/components/ui/use-toast";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!tokenParam || !emailParam) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description:
          "This password reset link is invalid. Please request a new one.",
      });
    } else {
      setToken(tokenParam);
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      toast({
        variant: "destructive",
        title: "Invalid reset link",
        description:
          "This password reset link is invalid. Please request a new one.",
      });
      return;
    }

    if (!formData.password || !formData.password_confirmation) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all fields",
      });
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast({
        variant: "destructive",
        title: "Invalid password",
        description: passwordError,
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure both passwords match",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast({
          variant: "default",
          title: "Password reset successful",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Reset failed",
          description: data.message || "Failed to reset password",
        });
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "Unable to connect to the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <>
        <div className="mx-auto mt-6 mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-forest-deep/15 bg-forest-deep/5">
          <CheckCircle className="h-8 w-8 text-forest-deep" />
        </div>

        <h2 className="text-center font-serif text-2xl text-forest-deep">
          Password reset successful
        </h2>

        <p className="mt-4 text-center text-sm text-forest-deep/70">
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>

        <div className="mt-6">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sun to-sun-light px-4 py-3 font-semibold text-forest-deep shadow-lg transition-opacity hover:opacity-90"
          >
            Go to login
          </Link>
        </div>
      </>
    );
  }

  // Reset password form
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
          >
            New password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 pr-12 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-deep/50 transition-colors hover:text-forest-deep"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="block text-xs font-medium uppercase tracking-[0.15em] text-forest-deep/70"
          >
            Confirm new password
          </label>
          <div className="relative mt-2">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-forest-deep/15 bg-white/70 px-4 py-3 pr-12 text-sm text-forest-deep placeholder:text-forest-deep/40 outline-none transition-colors focus-visible:border-sun focus-visible:ring-2 focus-visible:ring-sun/40"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-deep/50 transition-colors hover:text-forest-deep"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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
              Resetting password…
            </span>
          ) : (
            "Reset password"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-forest-deep/70 transition-colors hover:text-forest-deep"
        >
          Back to login
        </Link>
      </div>
    </>
  );
}