import Image from "next/image";
import Link from "next/link";

import { contactInfo, footerNav, siteConfig } from "@/lib/site-config";

// Adjust these hrefs to match your routes.
const exploreLinks = [
  { label: "Our Brands", href: "/brands", external: false },
  { label: "For Businesses", href: "/institutional-products", external: false },
  { label: "Request a Quote", href: "/contact", external: false },
  { label: "Shop Now", href: "http://tissuemarket.com/", external: true },
];

const linkClass =
  "text-[13px] text-white/90 transition-colors hover:text-white hover:underline underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#046A3C] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Go to homepage" className="inline-block">
              <Image
                src="/images/footer-logo-hd.png"
                alt="Quanta Paper Corporation"
                width={518}
                height={124}
                unoptimized
                className="h-16 w-auto sm:h-20"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-white/90">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-[13px] text-white/50">
              Founded in 2003 · Philippines
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold">Explore</h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={linkClass}
                  >
                    {item.label}
                    {item.external && " ↗"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="text-sm font-bold">Get in Touch</h3>
            <ul className="mt-5 space-y-3 text-[13px] text-white/90">
              <li>{contactInfo.address}</li>
              <li>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className={linkClass}
                >
                  {contactInfo.email}
                </Link>
              </li>
              <li>
                <Link
                  href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
                  className={linkClass}
                >
                  {contactInfo.phone}
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/contact" className={linkClass}>
                  Contact the right team →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
            {" · Powered by "}
            <Link
              href="https://infinitechphil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Infinitech Advertising Corporation
            </Link>
          </p>
          <p>Embracing sustainability. Delivering quality.</p>
        </div>
      </div>
    </footer>
  );
}
