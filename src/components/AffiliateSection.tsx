"use client"
import React from 'react';
import { FiArrowRight, FiDollarSign, FiTrendingUp, FiAward, FiBarChart2, FiUser, FiCheckCircle, FiGift } from 'react-icons/fi';
import { FaLink } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import GradientButton from './UI/GradientLinkButton';



const AffiliateSection = () => {
  return (
    <div id="affiliate" className="pt-5 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 mt-5 w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-10">
            <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
              <FiAward className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Affiliate Program</h2>
            </div>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Turn Your Network Into <br />
            Lifetime Earnings
          </h2>
          <p className="text-xl text-gray-300 max-w-5xl mx-auto">
            Tezcai is live, you can start seeding affiliates today.
            Refer traders to Tezcai and earn up to 2% of their trading of user’s profits for life. Your earnings are automatically tracked and updated in your real-time affiliate dashboard.
            <br />
            <span className="text-xl text-gray-300">Affiliates earn from actual profits.</span>
          </p>

          {/* Soft Launch Banner */}
          <h6 className="text-base mt-8 inline-block bg-gray-800/50 border border-blue-500/50 text-blue-300 px-6 py-3 rounded-lg shadow-md">
            🚀 Soft Launch: We’re opening the doors to a small group of early affiliates for the first 30 days.
            Secure your spot and start earning before the public rollout.
          </h6>
        </div>


        {/* How It Works */}
        <div className="mb-10">

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all text-center">
              <div className="bg-blue-900/30 p-4 rounded-lg w-fit mx-auto mb-4">
                <FaLink className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Invite users to Tezcai using your referral link.</h3>

            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all text-center">
              <div className="bg-blue-900/30 p-4 rounded-lg w-fit mx-auto mb-4">
                <MdAutoGraph className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Let users trade with Tezcai</h3>

            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all text-center">
              <div className="bg-blue-900/30 p-4 rounded-lg w-fit mx-auto mb-4">

                <GiTakeMyMoney className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">You earn commissions from user's profits</h3>

            </div>
          </div>
        </div>


        {/* Commission Structure */}
        <div >
          {/* <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <FiAward className="text-pyellow" />
            We Have 3 Tiers To Offer
          </h2> */}
          <div className="flex items-center justify-center mt-5 mb-10">
            <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
              <FiAward className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">We Have 3 Tiers To Offer</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bronze Tier */}
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg">
                  <FiAward className=" w-6 h-6 text-brown" />
                </div>
                <h3 className="text-2xl font-bold text-brown">Bronze Tier</h3>
              </div>
              <div className="text-3xl font-bold  mb-6">1% commission on your user's profits</div>
              <p className="text-gray-300 mb-6 text-lg">If you refer a user who invests or trades up to $100k, you will earn a 1% commission on that user's profits</p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">lifetime commission </span>
                </li>
                <li className="flex items-center gap-3">
                  <FiBarChart2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Transparent dashboard access</span>
                </li>

              </ul>
            </div>

            {/* Silver Tier */}
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className=" p-3 rounded-lg">
                  <FiAward className="w-6 h-6 text-lightgrey" />
                </div>
                <h3 className="text-2xl font-bold text-lightgrey">Silver Tier</h3>
              </div>
              <div className="text-3xl font-bold  mb-6">1.5% commission of User's Profits</div>
              <p className="text-gray-300 mb-6 text-lg">If you refer a user who invests or trades between $100k and $1M, you will earn a 1.5% commission on that user's profits</p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />

                  <span className="text-gray-300">lifetime commission </span>
                </li>
                <li className="flex items-center gap-3">
                  <FiTrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Monthly reports </span>
                </li>

                <li className="flex items-center gap-3">
                  <FiBarChart2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Transparent dashboard access</span>
                </li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="flex jus items-center gap-3 mb-4">
                <div className=" p-3 rounded-lg">
                  <FiAward className="w-6 h-6 text-pyellow" />
                </div>
                <h3 className="text-2xl font-bold text-pyellow">Gold Tier</h3>
              </div>
              <div className="text-3xl font-bold mb-6">2% commission of User's Profits</div>
              <p className="text-gray-300 mb-6 text-lg">If you refer a user who invests or trades over $1M, you will earn a 2% commission on that user's profits</p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">lifetime commission </span>
                </li>
                {/* <li className="flex items-center gap-3">
                  <FiUser className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Dedicated manager </span>
                </li> */}
                <li className="flex items-center gap-3">
                  <FiGift className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Bonuses  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FiTrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Monthly reports </span>
                </li>

                <li className="flex items-center gap-3">
                  <FiBarChart2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Transparent dashboard access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton
              className='flex items-center justify-center'
              href='/register'>
              Become an Affiliate
            </GradientButton>
            <a
              href="#pricing"
              className="px-8 py-4 font-semibold text-white border-2 border-gray-700 hover:border-blue-500 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Learn More <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AffiliateSection;