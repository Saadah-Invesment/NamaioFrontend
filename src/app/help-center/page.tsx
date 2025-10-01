
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowitWorks";
import Pricing from "@/components/Pricing";
import type { Metadata } from "next";
import HelpCenter from "./HelpCenter";

export const metadata: Metadata = {
    title: "Namaio Help Center | Contact Support & Get Assistance",
    description:
        "Visit the Namaio Help Center to get support, find answers to your questions, and contact our team via email for assistance with automated crypto trading.",
    alternates: {
        canonical: "/help-center",
    },
};


function HelpCenterSection() {

    return (
        <div>
            <Header />

            <HelpCenter />
            <br />
            <Footer />
            <h1 className="text-white text-xs" > Namaio | Smart Forex Automation</h1>
        </div>
    )
}

export default HelpCenterSection;