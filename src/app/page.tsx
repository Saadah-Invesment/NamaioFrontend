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
      <Testimonials />
      <FinalCallSection />
     
      <FooterDisclaimer />
      <GeneralFaq />
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
