

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import GeneralFaq from "@/components/GeneralFaq";

import Header from "@/components/Header";
import SignalFAQ from "@/components/SignalFAQ";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ProfitSharing FAQ | Tezcai",
  description:
    "Find answers to frequently asked questions about Tezcai. Learn how our smart trading software works, account setup, security, pricing, and more.",
  alternates: {
    canonical: "/faq", // 👈 becomes https://tezcai.com/faq
  },
};
function ProfitSharingFaqSection() {

  return (
    <div>
      <Header />
      <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
      <FAQ />
      <Footer />
    </div>
  )
}

export default ProfitSharingFaqSection;