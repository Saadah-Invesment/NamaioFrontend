"use client";

import { getaffiliateStatus, getProfile, updatePlanapi } from "@/api/profile";

import Link from "next/link";
import { RxCodesandboxLogo } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiKey,
  FiShield,

  FiAlertCircle,
  FiLoader,

  FiSettings,

  FiStar,
  FiTrendingUp,
  FiCalendar,
  FiUsers,
  FiLink,
  FiCheckCircle,
  FiCopy,
  FiActivity,
  FiXCircle,

} from "react-icons/fi";
import { PiCurrencyEthDuotone } from "react-icons/pi";
import copy from "copy-to-clipboard";
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { BiLock } from "react-icons/bi";
import toast from "react-hot-toast";
import { getCurrentUrlAndPort } from "@/api/auth";
import { IoLogoCodepen } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import ReferralPro from "./ReferralPro";
import SoundToggleButton from "@/components/MyComponents/SoundToggleButton";
type BinanceKey = {
  api_key: string;
  active: boolean;
};

type UserProfile = {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  email: string;
  role: string;
  subscription: string;
  subscription_start: string | null;   // ISO date string
  subscription_expire: string | null;  // ISO date string
  days_to_expire: number | null;
  plan_changed_at: string | null;      // ISO date string
  free_trial_active: boolean;
  affiliate_profile: null | any;
  selected_exchange: string | null;
  referrals: any[];
  referred_by_name: string | null;
};


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


const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [tokenData, setTokenData] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '', first_name: "", last_name: "", date_of_birth: "" });

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        getaffiliateStatus()
        // Simulate network delay
        const profile = await getProfile()

        setUser(profile.data[0]);
        // setEditForm({ username: mockUser.username, email: mockUser.email });
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("tezcai_token");

    if (savedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(savedToken);
        if (decoded) {
          setTokenData(decoded);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);


  const copyToClipboard = async (text: string) => {
    const baseUrl = getCurrentUrlAndPort();
    const copylink = `${baseUrl}/register/?ref=${text}`
    try {
      copy(copylink);
      setCopied(true);
      toast.success('Referral link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const copyCodeToClipboard = async (text: string) => {
    const baseUrl = getCurrentUrlAndPort();
    const copylink = `${text}`
    try {
      copy(copylink);
      setCopied(true);
      toast.success('Referral code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const capitalizeFirst = (str?: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      setEditForm({ username: user.username, email: user.email, first_name: user.first_name || "", last_name: user.last_name || "", date_of_birth: user.date_of_birth || "" });
    }
  };

  const handleSaveEdit = () => {
    if (user) {
      setUser({ ...user, ...editForm });
      setIsEditing(false);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit'
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      premium: { color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: FiStar },
      admin: { color: 'bg-gradient-to-r from-indigo-500 to-blue-500', icon: FiShield },
      user: { color: 'bg-gradient-to-r from-sky-500 to-blue-500', icon: FiUser }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-center gap-3 text-white">
            <FiLoader className="animate-spin text-blue-400 text-3xl" />
            <p className="text-xl font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-red-500/30">
          <div className="flex items-center gap-3 text-red-400">
            <FiAlertCircle className="text-3xl" />
            <p className="text-xl">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };



  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.username}
          </h1>

          {/* <p className="text-slate-300">Manage your profile and trading preferences</p> */}
        </div>


        {/* user.subscription !== "signal" */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8`}>
          {/* Profile Information */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FiUser className="text-blue-400" />
                  Profile Information
                </h2>
                {/* <button
                  onClick={handleEditToggle}
                  className="p-2 bg-gray-800/50 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                >
                  <FiEdit3 className="text-white w-4 h-4" />
                </button> */}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiUser className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Username</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full bg-gray-800/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg break-words">{user.username}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiUser className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">First Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.first_name}
                      onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                      className="w-full bg-gray-800/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg break-all whitespace-normal">{user.first_name || ""}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiUser className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Last Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.last_name}
                      onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                      className="w-full bg-gray-800/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg break-all whitespace-normal">{user.last_name || ""}</p>
                  )}
                </div>
              </div>

              {user.date_of_birth && <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiCalendar className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Date of Birth</p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.date_of_birth}
                      onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
                      className="w-full bg-gray-800/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg break-words">
                      {new Date(user.date_of_birth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>}

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <FiShield className="text-cyan-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-2">Account Role</p>
                  {getRoleBadge(user.role)}
                </div>
              </div>



              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 bg-gray-800/50 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-start gap-4 px-5 mb-5">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FiMail className="text-blue-400 text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm mb-1">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-gray-800/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  />
                ) : (
                  <p className="text-white font-medium text-lg break-words">{user.email}</p>
                )}
              </div>

            </div>
            {user?.referred_by_name && <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <CiLink className="text-cyan-400 text-xl" />
              </div>
              <div className="flex-1 break-words">
                <p className="text-slate-300 text-sm mb-2">Reffered By</p>
                {user.referred_by_name}
              </div>
            </div>}
            <div className="flex justify-center px-5 mb-5">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <PiCurrencyEthDuotone className="text-cyan-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Current Plan</p>
                  {user.subscription && <p className="text-white font-medium text-lg">
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1).toLowerCase()}
                  </p>}

                  {tokenData?.free_trial_active && (
                    <div className="mt-2 inline-flex items-center gap-2 text-green-400 text-sm bg-green-900/30 px-3 py-1 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span>Free Trial Active</span>
                    </div>
                  )}

                  {(user.subscription_start || user.subscription_expire) && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {user.subscription_start && <div className="p-2 bg-gray-800/40 rounded-lg border border-white/10">
                        <span className="block text-slate-300">Start</span>
                        <span className="text-white font-medium">
                          {new Date(user.subscription_start).toLocaleDateString()}
                        </span>
                      </div>}
                      {user.subscription_expire && (
                        <div className="p-2 bg-gray-800/40 rounded-lg border border-white/10">
                          <span className="block text-slate-300">Expire</span>
                          <span className="text-white font-medium">
                            {new Date(user.subscription_expire).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {user.days_to_expire !== null && (
                        <div
                          className={`p-2 rounded-lg border ${user.days_to_expire <= 5
                            ? "bg-red-900/30 border-red-500/30 text-red-400"
                            : "bg-gray-800/40 border-white/10 text-slate-400"
                            } sm:col-span-2`}
                        >
                          <span className="block font-medium">
                            {user.days_to_expire} days remaining
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Link href={`/user/billing/?plan=${user.subscription}`}>
                <button

                  className="px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Update Plan
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiUsers className="text-green-400" />
                Affiliate Program
              </h2>
            </div>

            <div className="p-6 space-y-6">

              {/* Affiliate Code */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <RxCodesandboxLogo className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-sm mb-2">Referral Code</p>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-blue-400 font-mono text-lg font-bold flex-1">
                        {user.affiliate_profile.code}
                      </code>
                      <button
                        onClick={() => copyCodeToClipboard(user.affiliate_profile!.code)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Copy affiliate code"
                      >


                        <FiCopy className="text-white w-4 h-4" />

                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiLink className="text-blue-400 text-xl" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-sm mb-2">Referral link</p>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-blue-400 font-mono text-sm font-bold flex-1">
                        {"https://namaio.com/register/?ref="}{user.affiliate_profile.code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(user.affiliate_profile!.code)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Copy affiliate code"
                      >


                        <FiCopy className="text-white w-4 h-4" />

                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <FiActivity className="text-green-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-2">Status</p>
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${user.affiliate_profile.is_active
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-blue-500/10 border border-gray-500/30'
                    }`}>
                    {user.affiliate_profile.is_active ? (
                      <>
                        <FiCheckCircle className="text-green-400 text-xl" />
                        <div>
                          <p className="text-green-400 font-semibold">Active</p>
                          <p className="text-green-300 text-sm">Your affiliate program is active</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <FiXCircle className="text-red-400 text-xl" />
                        <div>
                          <p className="text-gray-400 font-semibold">Inactive</p>
                          <p className="text-gray-300 text-sm">As soon as someone signs up using your referral code, your affiliate account will be automatically activated.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Member Since */}
              {user.affiliate_profile.is_active && <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FiCalendar className="text-blue-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Affiliate Since</p>
                  <p className="text-white font-medium text-lg">
                    {formatDate(user.affiliate_profile.created_at)}
                  </p>
                </div>
              </div>}

              {/* Total Referrals */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <FiTrendingUp className="text-cyan-400 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm mb-1">Total Referrals</p>
                  <p className="text-white font-bold text-2xl">{user.referrals.length}</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-300 ">
                  Earn commission when new user joins Namaio and trades using your refferel.{" "}
                  <a href="/affiliate" className="text-blue-400 hover:underline">
                    Learn More
                  </a>
                </p>
              </div>
              {/* Action Button */}
              {/* <div className="pt-4 border-t border-white/10">
                            <Link href={"#"}>
                              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                                <FiDollarSign className="w-4 h-4" />
                                Manage Payouts
                              </button>
                            </Link>
                          </div> */}
            </div>
          </div>
          {user.subscription === "signal" && <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiSettings className="text-blue-400" />
                Settings
              </h2>
            </div>

            <div className="p-6">
              <div className="flex gap-3 pb-4 mb-4 border-b border-white/10">
                <Link href={"/user/change-password"}>
                  <button className="flex-1 bg-gray-800/50 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                    <BiLock className="w-4 h-4" />
                    Change Password
                  </button>
                </Link>
              </div>
            </div>


          </div>}
          {/* Binance API Section */}
          {user.subscription !== "signal" && <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiKey className="text-blue-400" />
                API Configuration
              </h2>
            </div>

            <div className="p-6">
              {user.selected_exchange ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">

                    <div className="flex-1 min-w-0">
                      {/* <div className="p-3 bg-blue-500/20 rounded-xl">
                      <FiKey className="text-blue-400 text-xl" />
                    </div> */}
                      <p className="text-slate-300 text-sm mb-2">Active Platform</p>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between gap-3">

                          <code className="text-green-400 font-mono text-xl break-all flex-1">
                            {capitalizeFirst(user.selected_exchange)}
                          </code>

                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="flex gap-3 pt-4 border-t border-white/10">

                    <Link href={"/user/settings"}>
                      <button className="flex-1 bg-gray-800/50 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                        <FiSettings className="w-4 h-4" />
                        Change Platform
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiKey className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">No API Key Configured</h3>
                  <p className="text-slate-300 mb-6">Connect your crypto account API to start automated trading</p>
                  <Link href={"/user/settings"}>   <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Add API Key
                  </button></Link>
                </div>
              )}
              <div className="w-full flex gap-3 pt-4 mt-4 border-t border-white/10">

                <Link href={"/user/change-password"}>
                  <button className="flex-1 bg-gray-800/50 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                    <BiLock className="w-4 h-4" />
                    Change Password
                  </button>
                </Link>
                <SoundToggleButton />
              </div>

            </div>

          </div>}

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;