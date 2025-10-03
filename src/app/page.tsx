'use client';
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HowItWorks from "@/components/HowitWorks";
import Security from "@/components/Security";
import UserJourney from "@/components/UserJourney";
import AffiliateSection from "@/components/AffiliateSection";
import { useEffect, useState } from "react";

import Differentiators from "@/components/WhyTezcai";
import FinalCallSection from "@/components/FinalCallSection";
import FooterDisclaimer from "@/components/FooterDisclimer";
import TradingPlatformsSection from "@/components/TradingPlatforms";
import HowToUse from "@/components/HowToUse";
import SignalFAQ from "@/components/SignalFAQ";
import GeneralFaq from "@/components/GeneralFaq";
import AffiliateFaq from "@/components/AffiliateFaq";
import BenchmarkSection from "@/components/BenchmarkSection";
import NamaioLogo from "@/components/Logo/NamaioLogo";
import BrokerSection from "@/components/BrokerSection";

const Home: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // This effect runs only on the client side
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem("tezcai_token");
  //     const role = localStorage.getItem("tezcai_role");

  //     if (token) {
  //       // Redirect to dashboard if token exists
  //       window.location.href = `/${role}/dashboard`;
  //     } else {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="w-screen h-screen flex flex-col items-center justify-center bg-background text-white relative overflow-hidden">
  //       <div className="relative z-10 flex flex-col items-center">
  //         {/* Logo with glow effect */}
  //         <div className="mb-8 relative">

  //           <div className="relative bg-background backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
  //             <NamaioLogo />
  //           </div>
  //         </div>
  //         {/* Loading text with typewriter effect */}
  //         <div className="text-center">
  //           <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary  to-primary bg-clip-text text-transparent mb-2">
  //             Initializing Namaio
  //           </h2>
  //         </div>


  //         <div className="mt-6">
  //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //         </div>


  //       </div>




  //     </div>
  //   );
  // }


  return (
    <>
      <Header />
      <Hero />
      {/* <BenchmarkSection /> */}
      <HowItWorks />
      <Pricing />
      {/* <AffiliateSection /> */}
      <BrokerSection />
      {/* <Differentiators /> */}
      <Security />
      {/* <TradingPlatformsSection /> */}
      {/* <Pricing /> */}
      <FinalCallSection />
      {/* <Testimonials /> */}
      <FooterDisclaimer />
      {/* <GeneralFaq />
      <AffiliateFaq />
      <FAQ />
      <SignalFAQ /> */}
      <Footer />
      {/* <UserJourney /> */}
    </>
  );
};

export default Home;
