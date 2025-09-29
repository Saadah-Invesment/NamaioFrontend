"use client";

import { useEffect, useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";


type DecodedToken = {
  token_type: string;
  exp: number;
  iat: number;
  free_trial_active: boolean;
  free_trial_used: boolean;
  jti: string;
  user_id: string;
  role: string;
  subscription: string;
  subscription_start: string | null;
  subscription_expire: string | null;
  days_to_expire: number;
  is_pro: boolean;
  is_signal: boolean;
};

export default function SubscriptionReminder() {
  const [visible, setVisible] = useState(true);
  const [userData, setUserData] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("tezcai_token");

    if (savedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(savedToken);
        if (decoded) {
          setUserData(decoded);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  if (
    !visible ||
    !userData ||
    userData.days_to_expire === undefined ||
    userData.days_to_expire > 3
  ) {
    return null; // hide banner
  }

  return (
    <div className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-3 px-4 flex items-center justify-between shadow-lg relative">
      <div className="flex items-center gap-3">
        <FiAlertTriangle className="text-2xl" />
        <div>
          <p className="font-semibold">Your subscription is about to expire!</p>
          <p className="text-sm opacity-90">
            {userData.days_to_expire} day
            {userData.days_to_expire > 1 ? "s" : ""} remaining. Renew now to avoid interruptions.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/user/billing/`}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Renew Now
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="text-white hover:text-gray-200 p-1 rounded-full"
          aria-label="Close"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
