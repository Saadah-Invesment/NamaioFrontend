"use client"
import { FiShield, FiClock, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import { FaWallet } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { FaLink, FaShareNodes } from "react-icons/fa6";
import GradientButton from './UI/GradientLinkButton';

export default function HowItWorks() {
  const steps = [
    {
      title: "Open an account with a partner broker",
      description: "Choose one of our regulated brokerage partners. They handle KYC, custody, and compliance.",
      icon: FaWallet,
    },
    {
      title: "Link your account to Namaio",
      description: "Connect via MT5 or broker API. Secure, seamless, safe.",
      icon: FaLink,
    },
    {
      title: "Activate the Bot",
      description: "Our smart engine begins analyzing and executing trades automatically.",
      icon: MdOutlineAutoAwesome,
    },
    {
      title: "Share the Success",
      description: "Subscription covers your access. Profit-sharing ensures Namaio only earns when you do.",
      icon: FaShareNodes,
    }
  ];

  return (
    <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-50 via-cyan-50  text-primary pt-16 pb-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">

          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-200/40 to-blue-300/40 px-6 py-3 rounded-full border border-cyan-300/50">
              <FiBarChart2 className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-primary">How It Works</h2>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Go live in under 5 minutes , instant activation so you can make your first trade today.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-background p-6 rounded-2xl border border-white hover:border-secondary  hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-300/20 to-blue-500/20 text-secondary group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-lg text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center bg-white p-10 rounded-2xl border border-gray-200 hover:border-secondary shadow-md mb-5">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Ready To Start Your Smart Forex Automation Trading Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Every user gets a real-time dashboard showing all trades, profit/loss, and success rate.
          </p>
          <div className="w-full flex justify-center pt-4">
            <GradientButton href='/register'>Get Started ⚡</GradientButton>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FiShield className="w-5 h-5 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-5 h-5 text-blue-500" />
              <span>5-Minute Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="w-5 h-5 text-purple-500" />
              <span>Growth Focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
