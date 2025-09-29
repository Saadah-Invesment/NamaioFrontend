
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import Pricing from "@/components/Pricing";
import type { Metadata } from "next";
import HelpCenter from "./HelpCenter";

export const metadata: Metadata = {
    title: "Tezcai Help Center | Contact Support & Get Assistance",
    description:
        "Visit the Tezcai Help Center to get support, find answers to your questions, and contact our team via email for assistance with automated crypto trading.",
    alternates: {
        canonical: "/help-center",
    },
};


function HelpCenterSection() {

    return (
        <div>
            <Header />
            <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
            <HelpCenter />
            <br />
            <Footer />
        </div>
    )
}

export default HelpCenterSection;