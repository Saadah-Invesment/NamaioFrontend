

import AffiliateFaq from "@/components/AffiliateFaq";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import GeneralFaq from "@/components/GeneralFaq";

import Header from "@/components/Header";
import SignalFAQ from "@/components/SignalFAQ";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ | Tezcai",
  description:
    "Find answers to frequently asked questions about Tezcai. Learn how our smart trading software works, account setup, security, pricing, and more.",
  alternates: {
    canonical: "/faq", // 👈 becomes https://tezcai.com/faq
  },
};
function FaqSection() {

    return (
        <div>
            <Header />
            <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
            <GeneralFaq />
            <AffiliateFaq />
            <FAQ />
            <SignalFAQ />
            <Footer />
        </div>
    )
}

export default FaqSection;