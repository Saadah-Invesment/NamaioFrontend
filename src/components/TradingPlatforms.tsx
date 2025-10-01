"use client"
import Link from 'next/link';
import React from 'react';
import { FiGlobe, FiDollarSign, FiShield, FiTrendingUp, FiMapPin } from 'react-icons/fi';
import GradientButton from './UI/GradientLinkButton';

const TradingPlatformsSection = () => {




  const platformRecommendations = [
    {
      region: "Asia, Africa & Latin America",
      priority: "Standard",
      platforms: [
        {
          name: "Binance",
          status: "Primary",
          fee: "0.2% per round-trip",
          features: ["Strong liquidity", "Global coverage", "Low fees"],
          description: "Most widely used platform in these regions with strong liquidity, global coverage, and low fees."
        },
        {
          name: "OKX",
          status: "Primary",
          fee: "0.18 % per round-trip",
          features: ["Strong liquidity", "Global coverage", "Low fees"],
          description: "Most widely used platform in these regions with strong liquidity, global coverage, and low fees."
        }
      ],
      explanation: (
        <>
          <p>
            These are the most widely used platforms in these regions, with strong liquidity,
            global coverage, and low fees (~0.18 to 0.2% per round-trip).

          </p>
          <p className="mt-2 text-md text-gray-400">
            We recommend that you start trading with the amount of US&nbsp;$3,000 or an equivalent amount.
            Please do not add more than US&nbsp;$2,000,000.
          </p>
        </>
      ),
    },
    {
      region: "MENA (Middle East & North Africa)",
      priority: "Standard",
      platforms: [
        {
          name: "OKX",
          status: "Primary",
          fee: "0.18% per round-trip",
          features: ["UAE Licensed", "Regional expansion", "Competitive fees"],
          description: "Licensed in the UAE and expanding across the region, offering competitive fees."
        },
        {
          name: "Binance",
          status: "Secondary",
          fee: "0.2% per round-trip",
          features: ["Global liquidity", "Wide retail access"],
          description: "Provides global liquidity and wide retail access."
        }
      ],
      explanation: (
        <>
          <p>
            OKX is licensed in the UAE and expanding across the region, offering competitive fees (~0.18%). Binance provides global liquidity and wide retail access.

          </p>
          <p className="mt-2 text-md text-gray-400">
            We recommend that you start trading with the amount of US&nbsp;$3,000 or an equivalent amount.
            Please do not add more than US&nbsp;$2,000,000.
          </p>
        </>
      ),

      coverage: "UAE, Bahrain, Saudi Arabia, and the wider MENA region."
    },
    {
      region: "UK & Europe",
      priority: "Standard",
      platforms: [
        {
          name: "Revolut X",
          status: "Primary",
          fee: "0.18% per round-trip",
          features: ["Fully regulated", "European banking", "Safe"],
          description: "Safe, fully regulated, and directly connected to European banking."
        }
      ],
      explanation: "Safe, fully regulated, and directly connected to European banking. Offers competitive fees (~0.18% per round-trip)."
    },
    {
      region: "USA & Canada",
      priority: "Standard",
      platforms: [
        {
          name: "Gemini ActiveTrader",
          status: "Primary",
          fee: "0.2% per round-trip : (with $10,000 fund in your wallet you can achieve this %)",
          features: ["Fully regulated", "US & CA compliant", "Low fees"],
          description: "Fully regulated in both the US and Canada. With Namaio's trading style, even smaller accounts quickly qualify for low fees."
        }
      ],
      explanation: "Fully regulated in both the US and Canada. With Namaio's trading style, even smaller accounts quickly qualify for low fees, if you go for pro account (~0.2% per round-trip)."
    }
  ];

  const whyTezcai = [
    {
      icon: FiDollarSign,
      title: "Lowest possible fees",
      description: "So more profit stays with your crypto account wallet"
    },
    {
      icon: FiShield,
      title: "Trusted regulation",
      description: "For safety and compliance where available."
    },
    {
      icon: FiTrendingUp,
      title: "Seamless integration",
      description: "To keep Namaio running smoothly for your trading."
    }
  ];

  return (
    <div id="trading-platforms" className="bg-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 pb-10 w-full">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gray-800 px-8 py-4 rounded-full border border-blue-500/30 mb-8">
            <FiGlobe className="w-7 h-7 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Which Exchange Should You Use With Namaio?
            </h2>
          </div>

          <h2 className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Namaio works worldwide, but the best exchange for you depends on where you live.
            To give you the best results, we recommend the following platforms by region:
          </h2>
        </div>

        {/* Platform Recommendations */}
        <div className="space-y-8 mb-16">
          {platformRecommendations.map((region, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 ${region.priority === 'High Priority'
                ? 'border-blue-400/50'
                : 'border-gray-600/50'
                } hover:border-blue-500/50 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
            >
              {region.priority === 'High Priority' && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    High Priority
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <FiMapPin className="text-blue-400" />
                    {region.region}
                  </h2>
                  {region.coverage && (
                    <p className="text-blue-300 font-medium">Coverage: {region.coverage}</p>
                  )}
                </div>
              </div>

              <div className={`grid md:grid-cols-${(region.region === "USA & Canada" || region.region === "UK & Europe") ? "1" : "2"} gap-6 mb-6`}>
                {region.platforms.map((platform, idx) => (
                  <div key={idx} className="bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-gray-600/30 ">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                      {region.region === "MENA (Middle East & North Africa)" && <span className={`px-3 py-1 rounded-full text-xs font-semibold ${platform.status === 'Primary'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                        {platform.status}
                      </span>}
                    </div>

                    {region.region !== "MENA (Middle East & North Africa)" && <div >
                      <span className="text-blue-400 font-semibold">Fee: </span>
                      <span className="text-white">{platform.fee}</span>
                    </div>}

                    {/* <div className="flex flex-wrap gap-2 mb-3">
                      {platform.features.map((feature, featureIdx) => (
                        <span key={featureIdx} className="bg-gray-700/50 px-3 py-1 rounded-full text-xs text-gray-300">
                          {feature}
                        </span>
                      ))}
                    </div> */}

                    {/* <p className="text-gray-400 text-sm">{platform.description}</p> */}
                  </div>
                ))}
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Why: </span>
                  {region.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why We Recommend Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-600/50 hover:border-blue-500/50 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            {/* <FiShield className="text-blue-400" /> */}
            ⚖️ Why We Recommend Specific Exchanges
          </h2>

          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg">We choose exchanges for three key reasons</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyTezcai.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-500/20 p-6 rounded-2xl border border-blue-500/30 mb-4">
                    <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-300">{reason.description}</p>
                  </div>
                </div>
              );
            })}

          </div>
          <div className='flex justify-center ' >
            <h6 className="text-lg text-gray-300 ">
              Wherever you are in the world, Namaio connects you to the best exchange for your region,
              so you can trade confidently while we handle the rest.
            </h6>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-8 rounded-2xl bborder border-gray-600/50 hover:border-blue-500/50">

          <br />
          <p className="text-xl text-gray-300 mb-6 max-w-7xl mx-auto">
            If you Know a reliable trading platform with API access?
            Share it with us and we'll test and integrate it into Namaio,
            so the community can benefit from more trusted options.
          </p>


          <GradientButton href='/help-center' >Suggest Platform</GradientButton>


        </div>


      </div>
    </div>
  );
};

export default TradingPlatformsSection;