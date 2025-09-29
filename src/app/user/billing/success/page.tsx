'use client';

import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { refreshtoken } from "@/api/auth";

export default function PaymentSuccess() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const refreshAndRedirect = async () => {
      try {
        await refreshtoken(); // Refresh token first

        // Start countdown
        const interval = setInterval(() => {
          setCountdown(prev => prev - 1);
        }, 1000);

        // Redirect after 3 seconds
        const timeout = setTimeout(() => {
          clearInterval(interval);
          window.location.href = "/user/profile";
        }, 3000);

        // Cleanup
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    };

    refreshAndRedirect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-green-500/30 p-8 sm:p-12 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-4 rounded-full">
            <FiCheckCircle className="text-green-400 text-5xl" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your subscription has been activated and you now have full access to all features.
        </p>

        <p className="text-white font-bold text-xl">
          Redirecting to your profile in <span className="text-green-400">{countdown}</span> second{countdown > 1 ? "s" : ""}...
        </p>
      </motion.div>
    </div>
  );
}
