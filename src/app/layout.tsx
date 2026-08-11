import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";

import RootLayout from "@/components/RootLayout";
import { Toaster } from "@/components/ui/use-toast";
import "./globals.css";

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
// ————————————————————————————————————————————————————————————————
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
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
      </head>
      <body>
        <RootLayout>
          <Toaster />
          {children}
        </RootLayout>
      </body>
    </html>
  );
}