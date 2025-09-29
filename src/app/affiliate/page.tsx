
import AffiliateSection from "@/components/AffiliateSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tezcai Affiliate Program | Earn Lifetime Commissions",
  description:
    "Join the Tezcai Affiliate Program and earn commissions by referring traders to our automated crypto trading platform. Start promoting Tezcai today.",
  alternates: {
    canonical: "/affiliate",
  },
};

function Affiliate() {

  return (
    <div>
      <Header />
      <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
      <AffiliateSection />
      <Footer />
    </div>
  )
}

export default Affiliate;