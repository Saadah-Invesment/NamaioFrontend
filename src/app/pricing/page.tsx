
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import Pricing from "@/components/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tezcai Pricing Plans | Affordable Automated Crypto Trading",
    description:
        "Explore Tezcai’s pricing plans for automated crypto trading. Choose the plan that fits your trading style and start smarter trading today.",
    alternates: {
        canonical: "/pricing",
    },
};


function PricingSection() {

    return (
        <div>
            <Header />
            <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
            <Pricing />
            <br />
            <Footer />
        </div>
    )
}

export default PricingSection;