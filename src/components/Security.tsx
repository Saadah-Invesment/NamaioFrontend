"use client"
import React from 'react';
import { FaShieldAlt, FaLock } from 'react-icons/fa';
import { CiRead } from "react-icons/ci";
import { MdOutlineWallet } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: CiRead,
      title: "Read-only API access bot can trade but never withdraw",
    },
    {
      icon: MdOutlineWallet,
      title: "Funds remain 100% in your exchange wallet",
    },
    {
      icon: HiDocumentReport,
      title: "Daily trade logs and profit reports in user dashboard",
    },
    {
      icon: FaLock,
      title: "Detailed audit logs & tracking of all account activity",
    }
  ];

  return (
    <div id="security" className="bg-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 w-full">

        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-5">
            <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
              <FaShieldAlt className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Security</h2>
            </div>
          </div>

          <h2 className="text-2xl md:text-2xl font-bold mb-5 text-white">
            Security You Can Trust
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your assets and data are protected with institutional-grade security measures. <br />
            <span className="text-xl text-gray-300 max-w-3xl mx-auto">
              Already secured millions in live trading via read-only API.
            </span>
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-5">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
