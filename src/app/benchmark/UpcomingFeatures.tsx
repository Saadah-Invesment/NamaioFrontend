// components/UpcomingFeatures.tsx
"use client";

import GradientButton from "@/components/UI/GradientLinkButton";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CiLocationArrow1 } from "react-icons/ci";
export default function UpcomingFeatures() {
  const features = [
    "Pre Trade Benchmarking",
    "Daily Market Performance",
    "Smart Weighting",
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 md:px-12 lg:px-20 bg-[#111827] rounded-2xl  text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-3"> </h2>
        <h2 className="text-3xl font-bold mb-3">🚀 New Features Coming Soon</h2>
        <p className="text-gray-400 text-lg">
          Stay tuned for powerful new features that will make your experience even better.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col  items-center space-x-3 mb-2">
              <CheckCircle2 className="text-green-400 mb-5" size={24} />
              <h3 className="text-xl font-semibold">{feature}</h3>
            </div>
            {/* <p className="text-gray-400 text-sm">
              This feature is under development and will be available soon.
            </p> */}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

        >
          <GradientButton href="/help-center" >
            {/* <CiLocationArrow1 className="font-extrabold" />  */}
            Special Request

          </GradientButton>
        </motion.button>

      </div>
    </section>
  );
}
