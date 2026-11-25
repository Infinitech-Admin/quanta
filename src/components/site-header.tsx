"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/site-config";
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

// Slightly slimmer pills than before (36px tall, px-6).
// Same size in every state so spacing never shifts.
const pill =
  "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-6 text-[11px] font-bold uppercase tracking-wide transition-colors";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/quantapaper/",
    Icon: FacebookMark,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/quantapaper_ph/",
    Icon: InstagramMark,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCpm4vyQ1WcpBVkAd7ElQsEQ",
    Icon: YouTubeMark,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@quantapaper",
    Icon: TikTokMark,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/quantapaper",
    Icon: TwitterMark,
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Exact match, or a child route (so "/about" doesn't match "/about-something").
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Header is always white; scrolling only adds a soft border + shadow.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] bg-white transition-shadow duration-300 md:h-[88px]",
        scrolled
          ? "border-b border-black/[0.06] shadow-sm"
          : "border-b border-transparent",
      )}
    >
      {/* Three zones: logo | nav (centred in the free space) | actions */}
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-6 px-4 sm:px-6 xl:px-4">
        <Link href="/" className="shrink-0" aria-label="Go to homepage">
          <Image
            src="/header-logo.png"
            alt="Quanta Paper Corporation"
            width={579}
            height={168}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 xl:flex">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap py-1 text-[12px] font-medium uppercase tracking-[0.01em] text-[#1f2623] transition-colors hover:text-[#00A651]",
                  "after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#00A651] after:transition-transform after:duration-200",
                  active && "text-[#00A651] after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions: two equal pills, 8px apart */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            href="http://tissuemarket.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(pill, "bg-[#00A651] text-white hover:bg-[#00843D]")}
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className={cn(
              pill,
              "border-2 border-[#00A651] bg-white text-[#00A651] hover:bg-[#00A651]/10",
            )}
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile nav trigger */}
        <div className="ml-auto xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#00A651] transition-colors hover:bg-[#00A651]/10"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] border-l border-black/10 bg-white text-[#1f2623] sm:w-80 [&>button]:text-[#00A651]"
            >
              {/* Inner wrapper gives everything breathing room from the edges */}
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8">
                <SheetHeader className="px-0">
                  <SheetTitle className="text-[#00A651]">Menu</SheetTitle>
                </SheetHeader>

                {/* Same list and order as desktop */}
                <nav className="mt-6 flex flex-col gap-1">
                  {mainNav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-[#00A651]/10 text-[#00A651]"
                            : "text-[#1f2623] hover:bg-[#00A651]/5 hover:text-[#00A651]",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Buttons: smaller height, inset from the edges */}
                <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6">
                  <Link
                    href="http://tissuemarket.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#00A651] text-sm font-semibold text-white transition-colors hover:bg-[#00843D]"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full border-2 border-[#00A651] bg-white text-sm font-semibold text-[#00A651] transition-colors hover:bg-[#00A651]/10"
                  >
                    Get In Touch
                  </Link>
                </div>

                {/* Quick contact */}
                <div className="mt-6 space-y-3 border-t border-black/10 pt-6">
                  <Link
                    href="tel:+63285339250"
                    className="flex items-center gap-3 text-sm text-[#1f2623]/80 transition-colors hover:text-[#00A651]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#00A651]" />
                    (632) 8533.9250
                  </Link>
                  <Link
                    href="mailto:wecare@quantapaper.com"
                    className="flex items-center gap-3 text-sm text-[#1f2623]/80 transition-colors hover:text-[#00A651]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#00A651]" />
                    wecare@quantapaper.com
                  </Link>
                </div>

                {/* Social icons */}
                <div className="mt-6 flex gap-3 border-t border-black/10 pt-6">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00A651]/40 text-[#00A651] transition-colors hover:bg-[#00A651] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
