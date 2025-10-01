

import AffiliateFaq from "@/components/AffiliateFaq";

import Footer from "@/components/Footer";


import Header from "@/components/Header";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AffiliateFaq FAQ | Namaio",
  description:
    "Find answers to frequently asked questions about Namaio. Learn how our smart trading software works, account setup, security, pricing, and more.",
  alternates: {
    canonical: "/faq", // 👈 becomes https://namaio.com/faq
  },
};
function AffiliateFaqSection() {

  return (
    <div>
      <Header />
      <h1 className="text-gray-900 text-xs" > Namaio | Automated Crypto Trading</h1>
      <AffiliateFaq />
      <Footer />
    </div>
  )
}

export default AffiliateFaqSection;