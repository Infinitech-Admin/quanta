import { Hero } from "@/components/sections/hero";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { BrandsShowcase } from "@/components/sections/brands-showcase";
import { FlagshipProduct } from "@/components/sections/flagship-product";
import { Certifications } from "@/components/sections/certifications";
import { OurCustomers } from "@/components/sections/our-customers";
import { GroupOfCompanies } from "@/components/sections/group-of-companies";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <BrandsShowcase />
      <FlagshipProduct />
      <Certifications />
      <OurCustomers />
      <GroupOfCompanies />
      <CtaBanner />
    </>
  );
}
