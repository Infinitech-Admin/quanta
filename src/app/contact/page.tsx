import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Quanta Paper Corporation",
  description:
    "Get in touch with Quanta Paper Corporation — trunk line, fax, office locations, and department contacts.",
};

export default function Page() {
  return <ContactPageClient />;
}