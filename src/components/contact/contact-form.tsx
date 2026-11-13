"use client";

import { useState, type FormEvent } from "react";

// Laravel route: POST /api/inquiries. If Next.js and Laravel are on different
// domains, set NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-api.com/api/inquiries
const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/api/inquiries";

// Must match the topics in App\Models\Inquiry::TOPICS (Laravel validates them
// and decides which team mailbox receives the inquiry).
const TOPICS = [
  "General inquiry",
  "Product or customer support",
  "Business quotation",
  "Distribution opportunity",
  "Institutional sales",
  "Credit and collection",
  "Careers and HR",
];

const inputCls =
  "w-full rounded-lg border border-black/10 bg-[#fdfdf9] px-4 py-3.5 text-xs text-[#1f2623] outline-none placeholder:text-[#7a847f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/20";
const labelCls = "mb-2 block text-xs font-bold text-[#12392a]";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      topic: String(fd.get("topic") ?? TOPICS[0]),
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Surface Laravel's first validation message when there is one
        const data = await res.json().catch(() => null);
        const first = data?.errors
          ? (Object.values(data.errors).flat()[0] as string | undefined)
          : data?.message;
        throw new Error(typeof first === "string" ? first : String(res.status));
      }

      form.reset();
      setStatus("sent");
      setMessage(
        "Inquiry sent. Our team will reply within one to two business days.",
      );
    } catch (err) {
      setStatus("error");
      const detail =
        err instanceof Error && !/^\d+$/.test(err.message) ? err.message : "";
      setMessage(
        detail ||
          "We couldn’t send your inquiry. Check your connection and try again, or email wecare@quantapaper.com.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] bg-white p-8 shadow-[0_24px_60px_-28px_rgba(15,74,44,0.35)] ring-1 ring-black/5"
    >
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[#1f2623]">
        Send an inquiry
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="topic" className={labelCls}>
            What are you contacting us about?
          </label>
          <select
            id="topic"
            name="topic"
            defaultValue={TOPICS[0]}
            className={inputCls}
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className={labelCls}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={150}
            autoComplete="name"
            placeholder="Your name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company / Organization (optional)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={150}
            autoComplete="organization"
            placeholder="Company name"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            placeholder="09XX XXX XXXX"
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={3000}
            placeholder="Products needed, order volume, location, or other details..."
            className={`${inputCls} resize-y`}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-[#00a651] px-8 py-4 text-xs font-bold text-white transition-colors hover:bg-[#008f45] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]"
          >
            {status === "sending" ? "Sending…" : "Send inquiry ↗"}
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-[11px] leading-relaxed ${status === "error" ? "text-[#b42318]" : "text-[#0f4a2c]"}`}
          >
            {message}
          </p>
        </div>
      </div>
    </form>
  );
}
