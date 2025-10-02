"use client"
import React from "react";
import { FiAward } from "react-icons/fi";
import Image from "next/image";

const BrokerSection = () => {
  return (
    <section id="brokers" className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 text-primary">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full border border-blue-300 shadow-sm">
              <FiAward className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-primary">
                Broker Partnerships
              </h2>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Trade Safely With Our Regulated Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            Namaio works with globally regulated brokers.
            To use our software, you must open an account with one of our partner brokers.
            This ensures security, compliance,
            and seamless connectivity between your funds and Namaio’s trading engine.
          </p>
        </div>

        {/* Logos Section */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center">
          <div className="flex justify-center">
            <Image
              src="/brokers/exness.png"
              alt="Exness"
              width={160}
              height={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/brokers/forexcom.png"
              alt="FOREX.com"
              width={160}
              height={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/brokers/vantage.png"
              alt="Vantage"
              width={160}
              height={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/brokers/tickmill.png"
              alt="Tickmill"
              width={160}
              height={60}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div> */}

        {/* Security Note */}
        <div className="text-center mt-12">
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Your funds always remain <span className="font-semibold text-secondary">100% in your broker account</span>.
            Namaio never touches your money, you stay in full control at all times.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokerSection;
