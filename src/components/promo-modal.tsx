"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";


const COOKIE_NAME = "promoModalShown";
const INTERVAL_SECONDS = 1*60; // 30 minutes

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
}

export function PromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
   if(getCookie(COOKIE_NAME)) return;

    // Slight delay so it doesn't fight the page's own load-in.
    const timer = setTimeout(() => {
      setOpen(true);
      setCookie(COOKIE_NAME, "true", INTERVAL_SECONDS);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Q-Store is now online"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-forest-deep/60 transition-colors hover:bg-black/10 hover:text-forest-deep"
        >
          <X className="h-4 w-4" />
        </button>

        <a
          href="https://www.qstore.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/qstore.jpg"
            alt="Q-Store is now online — visit us at www.Qstore.ph"
            className="block w-full"
          />
        </a>
      </div>
    </div>
  );
}
