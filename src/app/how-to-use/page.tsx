'use client'


import Footer from "@/components/Footer";
import FooterDisclaimer from "@/components/FooterDisclimer";
import Header from "@/components/Header";
import HowToUse from "@/components/HowToUse";

function HowToUseSection() {

    return (
        <div>
            <Header />
           
            <HowToUse />
            <br />
            <FooterDisclaimer />
            <Footer />
        </div>
    )
}

export default HowToUseSection;