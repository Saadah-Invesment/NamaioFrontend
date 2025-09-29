"use client"
import React from 'react';
import GradientButton from './UI/GradientLinkButton';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';


export default function SplitHero() {
  return (
    <div className="bg-gray-900 text-white flex flex-col items-center">
      <div className=" lg:mx-5   w-full">
        <div className="relative bg-gray-900">
          {/* Background Image with 30% opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('/images/tezcai-hero-bg.webp')" }}
          ></div>

          {/* Content with relative to stay above */}
          <div className="relative grid lg:grid-cols-2 gap-5 items-center px-6 lg:px-12 py-16">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4">
                  <h1 className="text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-white">
                    Automated <br className="hidden lg:block" />
                    Crypto Trading
                  </h1>

                  {/* Button next to heading */}
                  <Link href="/register" passHref>
                    <p
                      className="mt-4 lg:mt-0 lg:ml-5 inline-block rounded-full bg-gradient-to-r from-green-400 to-green-400 px-6 py-2 text-lg font-semibold text-black shadow-lg hover:from-green-600 hover:to-green-800 transition text-center"
                    >
                      Free for 1 Month
                    </p>
                  </Link>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white/90 leading-relaxed">
                    Keep custody of your funds. Connect your exchange and let{" "}
                    <span className="text-secondary font-semibold">Tezcai</span> execute
                    smart intraday trades.
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed">
                    No overtrading. No emotions. Just disciplined, data-driven performance
                    ~1 to 2% profit per day.
                  </p>
                </div>
              </div>



              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <GradientButton
                  className="flex items-center justify-center"
                  href="/login"
                >
                  Start Free Trial⚡
                </GradientButton>
                <a
                  href="/register"
                  className="px-8 py-4 font-semibold border-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                  style={{
                    borderColor: "#7efefd",
                    color: "#7efefd",
                    backgroundColor: "transparent",
                  }}
                >
                  Become an Affiliate <FiArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 border border-gray-700">
                  Non-custodial (no withdrawals)
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 border border-gray-700">
                  Risk controls built-in
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 border border-gray-700">
                  Free 1-month trial
                </span>
              </div>
            </div>

            {/* Right Column - Image Section */}
            <div className="flex justify-center">
              <div className="bg-gray-800/40 p-2 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <Image
                  width={800}
                  height={600}
                  src="/images/hero.webp"
                  alt="Live Proof of Trading Results"
                  className="rounded-xl shadow-lg"
                  loading='lazy'
                />
                <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  This is a snapshot of your dashboard after one day of trading.
                </div>
                <p className="ml-4 text-xs text-gray-400">
                  Past performance does not indicate future results.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* Why Choose Tezcai */}
      <div className="space-y-8 mx-4 mt-2">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Why Choose Tezcai
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:bg-gray-800/80 relative">
            <div className="text-center space-y-3">
              <span className="text-2xl lg:text-3xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                Smart Trading
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                We trade smartly to increase profits for our users.
              </h4>
            </div>
            <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
              {/* Historical */}
            </div>
          </div>
          <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:bg-gray-800/80 relative">
            <div className="text-center space-y-3">
              <span className="text-3xl lg:text-4xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                100%
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Funds remain in your exchange account
              </h4>
            </div>
            <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
              {/* Historical */}
            </div>
          </div>




          <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:bg-gray-800/80 relative">
            <div className="text-center space-y-3">
              <span className="text-3xl lg:text-4xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                ~1 to 2%
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                * Proven track record of daily trading gains
              </h4>
            </div>
            <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
              Historical
            </div>
          </div>



          <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:bg-gray-800/80 relative">
            <div className="text-center space-y-3">
              <span className="text-3xl lg:text-4xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                15%
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Performance-based profit share
              </h4>
            </div>
            <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
              {/* Historical */}
            </div>
          </div>

        </div>

        <div className="text-center text-gray-200 text-lg mt-4">
          * All metrics shown are based on historical performance and may not be indicative of future results.
        </div>
      </div>


    </div>

  );
}
