"use client"
import { FiShield, FiClock, FiTrendingUp, FiBarChart2, } from 'react-icons/fi';
import { SiBinance } from "react-icons/si";
import { FaWallet } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import GradientButton from './UI/GradientLinkButton';
export default function HowItWorks() {
  const steps = [
    {
      title: "Connect your Crypto Exchange account securely via read-only API (e.g, Binance)",
      description: "Connect your exchange API with trading permission enabled and withdrawals disabled. We never take custody.",
      icon: FaLink,

    },
    {
      title: "Make sure that you have funds in your Crypto Exchange account",
      description: "Start with any amount you’re comfortable with. However, we recommend starting with around US $3,000 (or the equivalent in your local currency). Please do not add more than US $2,000,000.",

      icon: FaWallet,
    },

    {
      title: "Let Tezcai trade automatically while you simply track performance",
      description: "Enable 24/7 automated trading . Our smart software handles all market analysis and execution.",
      icon: MdOutlineAutoAwesome,

    }
  ];

  return (
    <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-5">
            <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
              <FiBarChart2 className="w-6 h-6 text-blue-400" /> {/* Added explicit size */}
              <h2 className="text-2xl font-bold text-white">How It Works</h2> {/* Adjusted text size */}
            </div>
          </div>
          <h2 className="text-2xl md:text-2xl font-bold mb-5 text-white">
            Get Started in 3 Simple Steps
          </h2>

          <p className="text-xl text-gray-300 max-w-5xl mx-auto">
            Go live in under 5 minutes,
            Instant activation  you can make your first trade today.
            {/* From setup to profit, we make crypto trading automation effortless.
            Your funds stay secure in your own Binance account. */}
          </p>

        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-5">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
              {/* Step Header */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-900 p-3 text-primary">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
              </div>
              {/* Description */}
              <p className="text-gray-300 mb-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready To Start Your Smart Trading Journey ?
            </h3>

            <p className="text-lg text-gray-300 mb-6">
              Every user gets a real-time dashboard showing all trades, profit/loss, and success rate.
            </p>

            <div className="w-full flex justify-center pt-4">
              <GradientButton href='/register'> Get Started ⚡</GradientButton>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4 text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-blue-400" />
                <span>5-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4 text-purple-400" />
                <span>Fast setup</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}