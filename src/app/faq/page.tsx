

import AffiliateFaq from "@/components/AffiliateFaq";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import GeneralFaq from "@/components/GeneralFaq";

import Header from "@/components/Header";
import SignalFAQ from "@/components/SignalFAQ";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQ | Namaio",
  description:
    "Find answers to frequently asked questions about Namaio. Learn how our smart trading software works, account setup, security, pricing, and more.",
  alternates: {
    canonical: "/faq", // 👈 becomes https://namaio.com/faq
  },
};
function FaqSection() {

  return (
    <div>
      <Header />

      <GeneralFaq />
      {/* <AffiliateFaq />
      <FAQ />
      <SignalFAQ /> */}
      <Footer />
      <h1 className="text-white text-xs" > Namaio | Smart Forex Automation</h1>
    </div>
  )
}

export default FaqSection;