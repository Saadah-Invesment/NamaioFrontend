import type { Metadata } from "next";

import TermsAndConditions from "./TermsAndConditions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// move your UI into a client component

export const metadata: Metadata = {
  title: "Terms and Conditions | Namaio",
  description:
    "Read the Terms and Conditions of Namaio to understand the rules, guidelines, and responsibilities while using our trading platform.",
  alternates: {
    canonical: "/terms-and-conditions", // https://namaio.com/terms-and-conditions
  },
};

export default function TermsAndConditionsPage() {
  return (<div>
    <Header />
    <TermsAndConditions />
    <br />
    <Footer />
  </div>);
}
