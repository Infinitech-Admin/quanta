import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { PaperEdge } from "@/components/paper-edge";
import { Separator } from "@/components/ui/separator";
import { contactInfo, footerNav, siteConfig } from "@/lib/site-config";

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedInMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4v11h2.94v-11ZM5.47 7.2A1.7 1.7 0 1 0 5.47 3.8a1.7 1.7 0 0 0 0 3.4ZM20 13.4c0-3-1.6-4.4-3.75-4.4-1.73 0-2.5.95-2.94 1.62V8.5H10.4c.04.83 0 11 0 11h2.9v-6.14c0-.33.02-.66.12-.9.27-.66.87-1.35 1.9-1.35 1.34 0 1.88 1.02 1.88 2.52V19.5H20v-6.1Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto bg-forest-deep text-cream">
      <PaperEdge fill="fill-forest-deep" className="-translate-y-px" />

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "Facebook", href: "https://facebook.com", Icon: FacebookMark },
                { label: "Instagram", href: "https://instagram.com", Icon: InstagramMark },
                { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInMark },
              ].map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-sun hover:text-sun-light"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-sun-light">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-sun-light">
              Resources
            </h3>
            <ul className="mt-5 space-y-3">
              {footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-sun-light">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun-light" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sun-light" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sun-light" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-cream/10" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Grown with care, made to last.</p>
        </div>
      </div>
    </footer>
  );
}
