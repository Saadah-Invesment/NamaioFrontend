"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfitShareingTerms from "@/app/register/ProfitSharingTerms";
import SubscriptionTerms from "@/app/register/SubscriptionTerms";

export default function TradingDisclaimerModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastClosed = localStorage.getItem("disclaimerClosedDate");

    if (lastClosed !== today) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("disclaimerClosedDate", today);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="
          bg-[#111827] 
          p-6 
          rounded-2xl 
          shadow-lg 
          w-[90%] 
          h-[80%] 
          max-w-4xl 
          relative 
          flex 
          flex-col
        "
      >
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-4">
          Trading Disclaimer
        </h2>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 flex-1">
          <p className="text-lg text-gray-300 mb-3">
            Cryptocurrency trading involves significant risk of loss and is not
            suitable for all investors. Tezcai provides automated trading tools
            and does not offer financial advice or guarantee profits. Past
            performance does not indicate future results. You are solely
            responsible for your trading decisions. Use of Tezcai constitutes
            acceptance of our{" "}
            <Link
              href="/termsandconditions"
              className="ml-1 mr-1 text-gray-300 underline hover:text-blue-600"
            >
              Terms & Conditions
            </Link>{" "}
            and
            <Link
              href="/riskdisclosure"
              className="ml-2 text-gray-300 underline hover:text-blue-600"
            >
              Risk Disclosure
            </Link>
            .
          </p>

          {/* <ProfitShareingTerms /> */}
          <SubscriptionTerms />
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
