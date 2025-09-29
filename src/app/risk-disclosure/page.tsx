import type { Metadata } from "next";

import RiskDisclosure from "./RiskDisclosure";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// move your UI into a client component

export const metadata: Metadata = {
  title: "Risk Disclosure | Tezcai",
  description:
    "Understand the risks involved in trading with Tezcai’s platform. Read our Risk Disclosure for important safety and investment information.",
  alternates: {
    canonical: "/risk-disclosure", // https://tezcai.com/risk-disclosure
  },
};


export default function RiskDisclosurePage() {
  return (
    <div>
      <Header />
      <RiskDisclosure />
      <br />
      <Footer />
    </div>
  )
}
