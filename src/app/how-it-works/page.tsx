

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How Tezcai Works | Automated Crypto Trading Explained",
  description:
    "Learn how Tezcai’s automated crypto trading platform works with smart strategies that trade on your exchange to maximize results.",
  alternates: {
    canonical: "/how-it-works",
  },
};

function HowItWorksSection() {

  return (
    <div>
      <Header />
      <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
      <HowItWorks />
      <br />
      <Footer />
    </div>
  )
}

export default HowItWorksSection;
