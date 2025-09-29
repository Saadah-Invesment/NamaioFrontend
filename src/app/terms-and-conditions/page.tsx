import type { Metadata } from "next";

import TermsAndConditions from "./TermsAndConditions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// move your UI into a client component

export const metadata: Metadata = {
  title: "Terms and Conditions | Tezcai",
  description:
    "Read the Terms and Conditions of Tezcai to understand the rules, guidelines, and responsibilities while using our trading platform.",
  alternates: {
    canonical: "/terms-and-conditions", // https://tezcai.com/terms-and-conditions
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
