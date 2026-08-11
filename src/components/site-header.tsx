"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
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

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  React.useEffect(() => {
    const hero = document.getElementById("hero");

    const onScroll = () => {
      if (!hero) return;

      setScrolled(window.scrollY > hero.offsetHeight - 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[90px] md:h-[100px] transition-colors duration-300",
        scrolled
          ? "bg-cream/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-cream/80"
          : "bg-forest-deep/95 supports-[backdrop-filter]:bg-forest-deep/30",
      )}
    >
      <div className="mx-auto flex h-25 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Go to homepage">
          <Logo dark={!scrolled} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-md font-medium tracking-wide transition-colors py-1 ",
                  "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
                  scrolled
                    ? cn(
                        "text-forest-deep hover:text-forest-light after:bg-forest",
                        active && "text-forest after:scale-x-100",
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

        {/* Desktop actions — fixed: was "hidden flex lg:block" which
            broke row layout (block wins over flex at lg), collapsing
            the three buttons instead of laying them out side by side. */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <Button variant={scrolled ? "light" : "sun"} size="sm" asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>

          {/* Shop Now is now visually distinct from Login instead of
              sharing the exact same variant. */}
          <Button variant="accent" size="sm" asChild>
            <Link href="http://tissuemarket.com/" target="_blank">
              Shop Now
            </Link>
          </Button>

          <Button variant={scrolled ? "sun" : "outline"} size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile nav trigger */}
        <div className="lg:hidden">
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
            <SheetContent side="right" className="w-[85%] sm:w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-forest/10",
                    pathname === "/"
                      ? "bg-forest/10 text-forest"
                      : "text-forest-deep",
                  )}
                >
                  Home
                </Link>
                {mainNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-forest/10",
                        active
                          ? "bg-forest/10 text-forest"
                          : "text-forest-deep",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 mt-6 border-t border-border pt-6">
                <Button className="w-full" asChild>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Get In Touch
                  </Link>
                </Button>

                <Button variant="accent" className="w-full" asChild>
                  <Link
                    href="http://tissuemarket.com/"
                    target="_blank"
                    onClick={() => setOpen(false)}
                  >
                    Shop Now
                  </Link>
                </Button>

                <Button variant="sun" className="w-full" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>

              {/* Quick contact info */}
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <Link
                  href="tel:+63285339250"
                  className="flex items-center gap-3 text-sm text-forest-deep/80 transition-colors hover:text-forest"
                >
                  <Phone className="h-4 w-4 shrink-0 text-forest" />
                  (632) 8533.9250
                </Link>
                <Link
                  href="mailto:wecare@quantapaper.com"
                  className="flex items-center gap-3 text-sm text-forest-deep/80 transition-colors hover:text-forest"
                >
                  <Mail className="h-4 w-4 shrink-0 text-forest" />
                  wecare@quantapaper.com
                </Link>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex gap-3 border-t border-border pt-6">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-forest-deep/70 transition-colors hover:border-forest hover:text-forest"
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
