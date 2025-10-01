"use client"
import React from "react";
import { FaShieldAlt, FaLock } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { MdOutlineWallet } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: CiRead,
      title: "Read-only API access, bot can trade but never withdraw",
    },
    {
      icon: MdOutlineWallet,
      title: "Funds remain 100% in your own exchange wallet",
    },
    {
      icon: HiDocumentReport,
      title: "Daily trade logs and profit reports inside your dashboard",
    },
    {
      icon: FaLock,
      title: "Detailed audit logs & real-time account activity tracking",
    },
  ];

  return (
    <section id="security" className="bg-white text-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-5">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full border border-blue-300 shadow-sm">
              <FaShieldAlt className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-primary">Security</h2>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-primary">
            Security You Can Trust
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your assets and data are protected with institutional-grade security measures.
            <br />
            <span className="text-gray-700">
              Already secured millions in live trading via read-only API.
            </span>
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200 hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">
                    {feature.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
