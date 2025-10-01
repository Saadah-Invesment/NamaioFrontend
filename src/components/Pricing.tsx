"use client"
import Link from "next/link";
import {
  FiCheck,
  FiStar,
  FiArrowRight,
  FiTrendingUp,
  FiHelpCircle,
  FiCalendar,
  FiPercent,
  FiPieChart,
  FiGift
} from "react-icons/fi";

export default function Pricing() {
  const plans = [
    {
      name: "Signals",
      price: "$9.99",
      period: "/month",
      description:
        "For traders who prefer manual control, but want Namaio’s smart precision.",
      features: [
        "Smart Filtered Trade Signals",
        "Momentum Identification",
        "Trend Confirmation",
        "Volume Analysis",
        "Clear Entry & Exit Points",
        "Easy Delivery — Signals sent instantly to your dashboard, email, or Telegram (your choice)"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29.99",
      period: "/month",
      description: "Best for users who want more trades and more results",
      features: [
        "Everything in Signals plus:",
        "Unlimited High-Probability Trades",
        "Priority Support (<4 Hour Response)",
        "Live Chat Support",
        "Weekly Pro Insights Report"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For funds, prop firms & high-net-worth investors",
      features: [
        "White label bot",
        "Dedicated account manager",
        "Custom smart strategies",
        "Bulk onboarding",
        "API/webhook integration",
        "Priority execution",
        "Custom KPIs reporting",
        "Optional third-party security audits",
        "On-site/virtual training"
      ],
      cta: "Request Demo",
      popular: false
    }
  ];

  return (
    <section
      id="pricing"
      className="pb-10 pt-10 px-4 sm:px-6 lg:px-8 bg-white text-primary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-200/40 to-blue-300/40 px-6 py-3 rounded-full border border-cyan-300/50">
              <FiStar className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-primary">Pricing</h2>
            </div>
          </div>
          <h2 className="text-2xl md:text-2xl font-bold mb-5 text-primary">
            Simple Subscription + Performance Based Profit Share
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            We keep the monthly fee low because our incentives align with yours,
            we earn when you earn.
            <br />
            Profit share: 15% of net monthly profits.
          </p>

          {/* Early Adopter Offer */}
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md">
            🚀 Early Adopter Offer: Sign up Today and get your first month{" "}
            <strong>FREE</strong>!
          </div>

          <p className="text-xl text-gray-700 font-semibold mx-auto my-5 max-w-3xl">
            Payment is required only when you earn profits. If a month brings no
            profit, you pay nothing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col h-full border rounded-2xl p-6 transition-all ${plan.popular
                  ? "border-cyan-600 hover:border-cyan-500 shadow-lg bg-white"
                  : "border-gray-200 hover:border-cyan-500 bg-white shadow-lg"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-3xl font-bold mb-2 text-center text-primary">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-3 text-center">
                  {plan.description}
                </p>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold mb-1 text-secondary">
                    {plan.price}
                    {plan.period && (
                      <span className="text-lg text-gray-500 ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                {plan.name !== "Enterprise" && (
                  <div className="text-sm text-gray-600 mb-4 flex items-center">
                    <FiGift className="w-4 h-4 mr-2 text-green-500" />
                    <span>Pay yearly & get 2 months free</span>
                  </div>
                )}
                {plan.name !== "Signals" && (
                  <div className="text-sm text-gray-600 mb-6 flex items-center">
                    <FiPieChart className="w-4 h-4 mr-2 text-cyan-500" />
                    <span>15% profit share on net realized profits</span>
                  </div>
                )}

                <Link
                  href={plan.name === "Enterprise" ? "/help-center" : "/register"}
                  className="block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow"
                >
                  {plan.cta} <FiArrowRight className="inline ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center bg-gradient-to-r from-cyan-100 to-blue-100 text-primary text-sm font-semibold px-6 py-3 rounded-full border border-cyan-200">
          <p className="text-lg mx-auto">
            No commitments , you can leave the plan anytime if it doesn’t suit you.
          </p>
        </div>
      </div>
    </section>
  );
}
