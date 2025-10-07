
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import Pricing from "@/components/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Namaio Pricing Plans | Automated Forex Trading.",
    description:
        "Explore Namaio’s pricing plans for automated crypto trading. Choose the plan that fits your trading style and start smarter trading today.",
    alternates: {
        canonical: "/pricing",
    },
};


function PricingSection() {

    return (
        <div>
            <Header />

            <Pricing />
            <br />
            <Footer />
            <h1 className="text-white text-xs" > Namaio | Smart Forex Automation</h1>
        </div>
    )
}

export default PricingSection;