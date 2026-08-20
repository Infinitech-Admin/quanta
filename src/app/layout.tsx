import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import RootLayout from "@/components/RootLayout";
import "./globals.css";
import { Toaster } from "sonner";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ————————————————————————————————————————————————————————————————
// Replace with your actual production domain — required for
// canonical URLs, OpenGraph image resolution, and sitemap references.
// ————————————————————————————————————————————————————————————————
const siteUrl = "https://www.quantapaper.com.ph";
const siteName = "Quanta Paper Corporation";
const siteDescription =
  "Quanta Paper Corporation has provided high-quality, affordable, hygienic, and environment-friendly tissue and paper products to Filipino households and businesses for over 20 years.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Hygienic Paper Products`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Quanta Paper",
    "tissue paper Philippines",
    "hygienic paper products",
    "toilet paper manufacturer Philippines",
    "napkin manufacturer",
    "paper towel supplier Philippines",
    "eco-friendly tissue paper",
  ],
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: siteName,
  publisher: siteName,
  category: "Manufacturing",

  // Canonical + language alternates
  alternates: {
    canonical: "/",
  },

  // Search engine crawling directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Stops browsers/OSes from auto-linking things like the phone number
  // or address in JSON-LD/body copy into tap-to-call or map links —
  // worth disabling on a corporate site where that's rarely wanted.
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Social share previews (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName,
    title: `${siteName} | Hygienic Paper Products`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  // Twitter/X card preview
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Hygienic Paper Products`,
    description: siteDescription,
    images: ["/og-image.jpg"],
    site: "@quantapaper",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  // Uncomment and fill in once you have these from Search Console / Bing Webmaster Tools
  // verification: {
  //   google: "your-google-site-verification-code",
  //   other: { "msvalidate.01": "your-bing-verification-code" },
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B3B22",
};

// ————————————————————————————————————————————————————————————————
// JSON-LD structured data — helps Google understand this is a real
// company, surfaces rich results (knowledge panel, sitelinks, local
// business info), and connects your site to your social profiles.
//
// Two entities on purpose: `Organization` describes the company,
// `WebSite` describes this specific site (and is what lets Google
// show your site name instead of a raw URL in search results). They
// share an @id-free, name/url overlap deliberately — that's expected
// and is how Google's own examples model it.
// ————————————————————————————————————————————————————————————————
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  foundingDate: "2003",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 1000,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "149-A Rev. Aglipay St., Bgy. Old Zaniga",
    addressLocality: "Mandaluyong City",
    addressCountry: "PH",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+63-2-8533-9250",
      contactType: "customer service",
      email: "wecare@quantapaper.com",
      areaServed: "PH",
      availableLanguage: ["en", "fil"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/quantapaper/",
    "https://www.instagram.com/quantapaper_ph/",
    "https://www.youtube.com/channel/UCpm4vyQ1WcpBVkAd7ElQsEQ",
    "https://www.tiktok.com/@quantapaper",
    "https://twitter.com/quantapaper",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  // If/when a real on-site search page exists, add a `potentialAction`
  // SearchAction here to unlock Google's sitelinks search box. Leaving
  // it out for now since a fabricated search URL would be worse than
  // no SearchAction at all.
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        <RootLayout>
          <Toaster richColors position="top-right" closeButton />
          {children}
        </RootLayout>
        <Analytics />
      </body>
    </html>
  );
}
