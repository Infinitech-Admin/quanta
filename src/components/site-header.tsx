"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
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

// One pill size for BOTH header states, so spacing never shifts on scroll.
// 38px tall, 10px bold caps, auto width from px-7.
const pill =
  "inline-flex h-[38px] items-center justify-center whitespace-nowrap rounded-full px-7 text-[10px] font-bold uppercase tracking-wide transition-colors";

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

  // Transparent only while the hero is on screen (home page).
  // Pages without a #hero (news, about, etc.) always get the solid header.
  React.useEffect(() => {
    const hero = document.getElementById("hero");

    const onScroll = () => {
      setScrolled(hero ? window.scrollY > hero.offsetHeight - 100 : true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[90px] md:h-[100px] transition-colors duration-300",
        scrolled
          ? "border-b border-black/[0.07] bg-[#f7f6f2]"
          : "bg-forest-deep/95 supports-[backdrop-filter]:bg-forest-deep/30",
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
            className="h-12 w-auto md:h-14"
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
                  "relative whitespace-nowrap py-1 text-[12px] font-medium uppercase tracking-[0.01em] transition-colors",
                  "after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
                  scrolled
                    ? cn(
                        "text-[#1f2623] hover:text-[#00A651] after:bg-[#00A651]",
                        active && "text-[#00A651] after:scale-x-100",
                      )
                    : cn(
                        "text-cream hover:text-sun-light after:bg-sun",
                        active && "text-sun-light after:scale-x-100",
                      ),
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
            className={cn(
              pill,
              scrolled
                ? "bg-[#00A651] text-white hover:bg-[#00B85A]"
                : "bg-sun text-forest-deep hover:bg-sun-light",
            )}
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className={cn(
              pill,
              "border-2",
              scrolled
                ? "border-[#0a1f15] bg-[#0B6E3E] text-white hover:bg-[#0A5A33]"
                : "border-cream/60 text-cream hover:bg-cream/10",
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
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                  scrolled
                    ? "text-forest-deep hover:bg-forest/10"
                    : "text-cream hover:bg-cream/10",
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:w-80 bg-forest-deep text-cream border-l border-cream/10"
            >
              <SheetHeader>
                <SheetTitle className="text-cream">Menu</SheetTitle>
              </SheetHeader>
              {/* Same list and order as desktop (Home is now part of mainNav) */}
              <nav className="mt-8 flex flex-col gap-1">
                {mainNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-cream/10",
                        active ? "bg-cream/10 text-sun-light" : "text-cream/90",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 mt-6 border-t border-cream/15 pt-6">
                <Button
                  variant="sun"
                  className="w-full text-base py-6 font-semibold shadow-sm"
                  asChild
                >
                  <Link
                    href="http://tissuemarket.com/"
                    target="_blank"
                    onClick={() => setOpen(false)}
                  >
                    Shop Now
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-cream/40 text-cream hover:bg-cream/10"
                  asChild
                >
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Get In Touch
                  </Link>
                </Button>
              </div>

              {/* Quick contact info */}
              <div className="mt-6 space-y-3 border-t border-cream/15 pt-6">
                <Link
                  href="tel:+63285339250"
                  className="flex items-center gap-3 text-sm text-cream/80 transition-colors hover:text-sun-light"
                >
                  <Phone className="h-4 w-4 shrink-0 text-sun-light" />
                  (632) 8533.9250
                </Link>
                <Link
                  href="mailto:wecare@quantapaper.com"
                  className="flex items-center gap-3 text-sm text-cream/80 transition-colors hover:text-sun-light"
                >
                  <Mail className="h-4 w-4 shrink-0 text-sun-light" />
                  wecare@quantapaper.com
                </Link>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex gap-3 border-t border-cream/15 pt-6">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-sun-light hover:text-sun-light"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
