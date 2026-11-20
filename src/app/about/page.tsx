import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Hero } from "@/components/about/Hero";
// import { SectionNav } from "@/components/about/SectionNav";
import { OurHistory } from "@/components/about/OurHistory";
import { MissionVision } from "@/components/about/MissionVision";
import { CoreValues } from "@/components/about/CoreValues";
import { Locations } from "@/components/about/Locations";
import { DistributionCenters } from "@/components/about/DistributionCenters";
import { ClosingCta } from "@/components/about/ClosingCta";

const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "About Us | Quanta Paper Corporation",
  description:
    "Established in 2003, Quanta Paper Corporation is built on quality, sustainability, and care for the Filipino household.",
};

export default function AboutPage() {
  return (
    <main
      className={`${body.variable} font-[var(--font-body)] text-[var(--ink)] [scroll-behavior:smooth]`}
      style={
        {
          "--ink": "#222826",
          "--green": "#006b3f",
          "--green-deep": "#0b3b22",
          "--paper": "#f7f6f2",
        } as React.CSSProperties
      }
    >
      <Hero />
      {/* <SectionNav /> */}
      <OurHistory />
      <MissionVision />
      <CoreValues />
      <Locations />
      <DistributionCenters />
      <ClosingCta />
    </main>
  );
}
