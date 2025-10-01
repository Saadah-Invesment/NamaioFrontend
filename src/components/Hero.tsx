"use client"
import React from 'react';
import GradientButton from './UI/GradientLinkButton';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';


export default function SplitHero() {
  return (
    <div className="bg-background text-white flex flex-col items-center">
      <div className=" lg:mx-5   w-full">
        <div className="relative bg-background">
          {/* Background Image with 30% opacity */}
          {/* <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('/images/namaio-hero-bg.webp')" }}
          ></div> */}

          {/* Content with relative to stay above */}
          <div className="relative grid lg:grid-cols-2 gap-5 items-center px-6 lg:px-12 py-16">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex flex-col justify-between lg:flex-row lg:items-end lg:gap-2">
                  <h1 className="text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-primary">
                    Smart  Forex
                    <br className="hidden lg:block" />
                    Automation

                  </h1>


                  {/* Button next to heading */}
                  <Link href="/register" passHref>
                    <p
                      className="mt-4 lg:-ml-3 inline-block rounded-full bg-secondary px-6 py-2 text-lg font-semibold text-primary shadow-lg hover:bg-primary hover:text-white transition text-center"
                    >
                      Free for 1 Month
                    </p>
                  </Link>
                </div>

                <div className="space-y-2">
                  <h2 className="mt-2 text-4xl lg:text-4xl font-semibold leading-tight tracking-tight text-primary">
                    Built for Traders Who Want Results.
                  </h2>
                  <p className="text-lg text-primary leading-relaxed">
                    Namaio is your smart Forex trading assistant. Connected directly to your brokerage account, it
                    executes trades automatically on your behalf  smarter, faster, and with discipline. You remain in full
                    control
                  </p>
                </div>
              </div>



              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <GradientButton
                  className="flex items-center justify-center"
                  href="/login"
                >
                  Start Trading Today ⚡
                </GradientButton>
                {/* <a
                  href="/register"
                  className="px-8 py-4 font-semibold border-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                  style={{
                    borderColor: "#7efefd",
                    color: "#7efefd",
                    backgroundColor: "transparent",
                  }}
                >
                  Become an Affiliate <FiArrowRight className="w-4 h-4" />
                </a> */}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm rounded-full bg-primary text-gray-200 border border-gray-700">
                  Non-custodial (no withdrawals)
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-primary text-gray-200 border border-gray-700">
                  Risk controls built-in
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-primary text-gray-200 border border-gray-700">
                  Free 1-month trial
                </span>
              </div>
            </div>

            {/* Right Column - Image Section */}
            <div className="flex justify-center">
              <div className="">
                <Image
                  width={800}
                  height={600}
                  src="/images/namaio-logo.png"
                  alt="Live Proof of Trading Results"
                  // className="rounded-xl shadow-lg"
                  loading='lazy'
                />
                {/* <div className="mt-4 flex items-center gap-2 text-white text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  This is a snapshot of your dashboard after one day of trading.
                </div>
                <p className="ml-4 text-xs text-gray-400">
                  Past performance does not indicate future results.
                </p> */}
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* Why Choose Namaio */}
      <div className="space-y-8 mx-4 mt-2 mb-10">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            Why Choose Namaio
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plug & Play */}
          <div className="bg-primary p-6 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 group relative">
            <div className="text-center space-y-3">
              <span className="text-2xl lg:text-2xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                Plug & Play
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Connect instantly with leading brokerages (MT5 / API).
              </h4>
            </div>
          </div>

          {/* Smart Automation */}
          <div className="bg-primary p-6 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 group relative">
            <div className="text-center space-y-3">
              <span className="text-2xl lg:text-2xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                Smart Automation
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Not just copy-trading , real decision-making powered by automation.
              </h4>
            </div>
          </div>

          {/* Transparent Model */}
          <div className="bg-primary p-6 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 group relative">
            <div className="text-center space-y-3">
              <span className="text-2xl lg:text-2xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                Transparent Model
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Simple subscription + profit-sharing. No hidden charges.
              </h4>
            </div>
          </div>

          {/* Fund Safety */}
          <div className="bg-primary p-6 rounded-xl border border-gray-700 hover:border-secondary transition-all duration-300 group relative">
            <div className="text-center space-y-3">
              <span className="text-2xl lg:text-2xl font-bold text-secondary block transition-transform group-hover:scale-110 duration-300">
                Fund Safety
              </span>
              <h4 className="text-sm lg:text-base font-semibold text-white leading-tight">
                Your funds always stay 100% with your broker , we never touch your money.
              </h4>
            </div>
          </div>

        </div>

        {/* <div className="text-center text-gray-200 text-lg mt-4">
          * All metrics shown are based on historical performance and may not be indicative of future results.
        </div> */}
      </div>


    </div>

  );
}
