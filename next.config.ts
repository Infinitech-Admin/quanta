import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Allowed values for the <Image quality={...} /> prop.
    // Without this, newer Next.js versions fall back to 75 and the Q banners look pixelated.
    qualities: [75, 90, 100],

    // Dev only: the optimizer refuses localhost / private IPs by default,
    // which is why http://localhost:8000 images show up blank.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "infinitech-api14.site",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
