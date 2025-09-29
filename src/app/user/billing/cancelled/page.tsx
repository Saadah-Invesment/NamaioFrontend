"use client";

import { FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PaymentCanceled() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-red-500/30 p-8 sm:p-12 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/20 p-4 rounded-full">
            <FiXCircle className="text-red-400 text-5xl" />
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Payment Canceled
        </h1>
        
        <p className="text-gray-300 mb-6">
          Your payment was not completed. No charges have been made to your account.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link
            href="/user/billing"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Try Again
          </Link>
          
          <Link
            href="/user/profile"
            className="text-gray-400 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Back to Profile
          </Link>
        </div>
      </motion.div>
    </div>
  );
}