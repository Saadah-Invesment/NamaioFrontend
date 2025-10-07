

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "How Namaio Works |  Automated Forex Trading.",
  description:
    "Learn how Namaio’s automated crypto trading platform works with smart strategies that trade on your exchange to maximize results.",
  alternates: {
    canonical: "/how-it-works",
  },
};

function HowItWorksSection() {

  return (
    <div>
      <Header />
      <HowItWorks />
      <Footer />
      <h1 className="text-white text-xs" > Namaio | Smart Forex Automation</h1>
    </div>
  )
}

export default HowItWorksSection;
