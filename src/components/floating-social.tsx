"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Share2, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Minimal inline marks — lucide-react no longer ships brand/logo icons. */
function FacebookMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.3 4.24 15.32 4.15 14.2 4.15c-2.34 0-3.95 1.43-3.95 4.05V10.5H7.75v3h2.5V21h3.25Z" />
    </svg>
  );
}
function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.49-.86-2.15c-.82-.86-1.74-.86-2.16-.91C15.64 4 12 4 12 4h-.01s-3.64 0-6.58.14c-.42.05-1.34.05-2.16.91C2.6 5.71 2.4 7.2 2.4 7.2S2.19 8.94 2.19 10.69v1.63c0 1.75.21 3.49.21 3.49s.2 1.49.85 2.15c.82.87 1.9.84 2.38.93 1.73.17 7.36.22 7.36.22s3.64 0 6.58-.15c.42-.05 1.34-.05 2.16-.91.65-.66.86-2.15.86-2.15s.21-1.74.21-3.49v-1.63c0-1.75-.21-3.49-.21-3.49ZM9.98 14.6V8.98l5.4 2.82-5.4 2.8Z" />
    </svg>
  );
}
function TikTokMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 3h-2.9v12.4a2.75 2.75 0 1 1-2-2.65V9.7a5.65 5.65 0 1 0 4.9 5.6V9.3a7.6 7.6 0 0 0 4.4 1.4V7.7a4.75 4.75 0 0 1-4.4-4.7Z" />
    </svg>
  );
}
function TwitterMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 10.7 20.3 3h-1.6l-5.8 6.7L8.3 3H3l7 10.1L3 21h1.6l6.2-7.1 5 7.1H21l-7.4-10.3Zm-2.2 2.5-.7-1L5 4.3h2.4l4.6 6.6.7 1 6 8.6h-2.4l-4.9-7Z" />
    </svg>
  );
}

const socials = [
  {
    icon: FacebookMark,
    href: "https://www.facebook.com/quantapaper/",
    label: "Facebook",
    className: "bg-[#1877F2] hover:bg-[#1465D8]",
  },
  {
    icon: InstagramMark,
    href: "https://www.instagram.com/quantapaper_ph/",
    label: "Instagram",
    className:
      "bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] hover:opacity-90",
  },
  {
    icon: YouTubeMark,
    href: "https://www.youtube.com/channel/UCpm4vyQ1WcpBVkAd7ElQsEQ",
    label: "YouTube",
    className: "bg-[#FF0000] hover:bg-[#D90000]",
  },
  {
    icon: TikTokMark,
    href: "https://www.tiktok.com/@quantapaper",
    label: "TikTok",
    className: "bg-black hover:bg-neutral-800",
  },
  {
    icon: TwitterMark,
    href: "https://twitter.com/quantapaper",
    label: "Twitter",
    className: "bg-black hover:bg-neutral-800",
  },
  {
    icon: Mail,
    href: "mailto:wecare@quantapaper.com",
    label: "Email",
    className: "bg-[#EA4335] hover:bg-[#D33B2C]",
  },
  {
    icon: Phone,
    href: "tel:+63285339250",
    label: "Phone",
    className: "bg-[#25D366] hover:bg-[#1FB855]",
  },
];

export function FloatingSocial() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center sm:right-6">
      {/* Mobile toggle — only one icon visible, expands the rest on click */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close social links" : "Open social links"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-deep text-cream shadow-lg transition-transform active:scale-95 md:hidden"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <Share2 className="h-5 w-5" />
        )}
      </button>

      {/* Icon list — always visible on desktop, collapsible on mobile */}
      <div
        className={cn(
          "flex flex-col items-center gap-3 md:mt-0 md:flex md:max-h-none md:opacity-100",
          "overflow-hidden transition-all duration-300 ease-out",
          open
            ? "mt-3 max-h-96 opacity-100"
            : "mt-0 max-h-0 opacity-0 md:overflow-visible",
        )}
      >
        {socials.map(({ icon: Icon, href, label, className }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className={cn(
              "flex h-11 w-11 flex-none items-center justify-center rounded-full text-white shadow-md transition-colors",
              className,
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
