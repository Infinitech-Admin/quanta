"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      // TODO: point this at your actual API route / email service.
      // e.g. Resend, Formspree, SendGrid, or a Next.js route handler
      // at app/api/contact/route.ts that emails wecare@quantapaper.com.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--forest)]/20 bg-white/60 p-10 text-center">
        <h3 className="font-[var(--font-display)] text-2xl text-[var(--forest-deep)]">
          Message sent
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
          Thanks for reaching out — our Customer Care team will get back to you
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--forest)]/15 bg-white/60 p-8 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-[0.15em] text-[var(--ink)]/50"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-[var(--forest)]/20 bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--forest)]"
            placeholder="Juan Dela Cruz"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.15em] text-[var(--ink)]/50"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-[var(--forest)]/20 bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--forest)]"
            placeholder="juan@email.com"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="subject"
          className="text-xs uppercase tracking-[0.15em] text-[var(--ink)]/50"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-[var(--forest)]/20 bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--forest)]"
          placeholder="How can we help?"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-[0.15em] text-[var(--ink)]/50"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-lg border border-[var(--forest)]/20 bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--forest)]"
          placeholder="Tell us more..."
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--forest-vivid)] px-8 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--forest)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
