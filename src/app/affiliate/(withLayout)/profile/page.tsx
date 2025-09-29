"use client";

import { getProfile } from "@/api/profile";
import { get } from "http";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiKey,
  FiShield,
  FiActivity,
  FiAlertCircle,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiEdit3,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiSettings,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiCalendar,
  FiDollarSign,
  FiLink
} from "react-icons/fi";
import copy from 'copy-to-clipboard';
import { BiLock } from "react-icons/bi";
type BinanceKey = {
  api_key: string;
  active: boolean;
};

type AffiliateProfile = {
  code: string;
  is_active: boolean;
  created_at: string;
  payout_info: any;
};

type Referral = {
  referred_username: string;
  joined_at: string;
};

type UserProfile = {
  id: number;
  username: string;
  email: string;
  role: string;
  affiliate_profile: AffiliateProfile | null;
  binance_key: BinanceKey | null;
  referrals: Referral[];
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '' });

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

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

  const copyToClipboard = (data: any) => {
    if (!data) {
      toast.error('No referral link to copy');
      return;
    }

    const success = copy(`${data}`, {
      debug: process.env.NODE_ENV === 'development',
      message: 'Press #{key} to copy',
      format: 'text/plain',
    });

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Referral code copied to clipboard!');
    } else {
      toast.error('Failed to copy. Please try again or use manual copy.', {
        icon: '⚠️',
      });
      // Fallback: Show the text in an alert for manual copy
      alert(`Please copy this manually:\n\n${data}`);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      setEditForm({ username: user.username, email: user.email });
    }
  };

  const handleSaveEdit = () => {
    if (user) {
      setUser({ ...user, ...editForm });
      setIsEditing(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      premium: { color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: FiStar },
      admin: { color: 'bg-gradient-to-r from-indigo-500 to-blue-500', icon: FiShield },
      affiliate: { color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: FiUsers },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/30">
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

  const isAffiliate = true;

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
            Welcome back, {user.username}!
          </h1>
          <p className="text-slate-300">
            {isAffiliate ? "Manage your affiliate program and referrals" : "Manage your profile and trading preferences"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                >
                  <FiEdit3 className="text-white w-4 h-4" />
                </button> */}
              </div>
            </div>

            <div className="p-6 space-y-6">
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
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg">{user.username}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
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
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white font-medium text-lg">{user.email}</p>
                  )}
                </div>
              </div>

              {/* Member Since */}
              {user.affiliate_profile && <div className="flex items-start gap-4">
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
                    className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Conditional Second Panel - Affiliate Details or Binance API */}
          {isAffiliate && user.affiliate_profile ? (
            /* Affiliate Details Panel */
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
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <FiLink className="text-green-400 text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm mb-2">Affiliate Code</p>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between gap-3">
                        <code className="text-green-400 font-mono text-lg font-bold flex-1">
                          {user.affiliate_profile.code}
                        </code>
                        <button
                          onClick={() => copyToClipboard(user.affiliate_profile!.code)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          title="Copy affiliate code"
                        >
                          {copiedCode ?
                            <FiCheckCircle className="text-green-400 w-4 h-4" /> :
                            <FiCopy className="text-white w-4 h-4" />
                          }
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
                      : 'bg-red-500/10 border border-red-500/30'
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
                            <p className="text-red-400 font-semibold">Inactive</p>
                            <p className="text-red-300 text-sm">Your affiliate program is inactive</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 mt-4 border-t border-white/10">

                  <Link href={"/user/change-password"}>
                    <button className="flex-1 bg-gray-800/50 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                      <BiLock className="w-4 h-4" />
                      Change Password
                    </button>
                  </Link>
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
          ) : !isAffiliate && user.binance_key ? (
            /* Binance API Section (only for non-affiliates) */
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FiKey className="text-blue-400" />
                  Binance API Configuration
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <FiKey className="text-blue-400 text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm mb-2">API Key</p>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center justify-between gap-3">
                          <code className="text-cyan-400 font-mono text-sm break-all flex-1">
                            {showApiKey ? user.binance_key.api_key : maskApiKey(user.binance_key.api_key)}
                          </code>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                              title={showApiKey ? "Hide API key" : "Show API key"}
                            >
                              {showApiKey ?
                                <FiEyeOff className="text-white w-4 h-4" /> :
                                <FiEye className="text-white w-4 h-4" />
                              }
                            </button>
                            <button
                              onClick={() => copyToClipboard(user.binance_key!.api_key)}
                              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                              title="Copy API key"
                            >
                              {copied ?
                                <FiCheckCircle className="text-green-400 w-4 h-4" /> :
                                <FiCopy className="text-white w-4 h-4" />
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <FiActivity className="text-green-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-300 text-sm mb-2">Connection Status</p>
                      <div className={`flex items-center gap-3 p-3 rounded-lg ${user.binance_key.active
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-red-500/10 border border-red-500/30'
                        }`}>
                        {user.binance_key.active ? (
                          <>
                            <FiCheckCircle className="text-green-400 text-xl" />
                            <div>
                              <p className="text-green-400 font-semibold">Connected & Active</p>
                              <p className="text-green-300 text-sm">API key is working properly</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <FiXCircle className="text-red-400 text-xl" />
                            <div>
                              <p className="text-red-400 font-semibold">Inactive</p>
                              <p className="text-red-300 text-sm">API key needs to be activated</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Link href={"/user/settings"} className="flex-1">
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors border border-white/20 flex items-center justify-center gap-2">
                        <FiSettings className="w-4 h-4" />
                        Configure
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : !isAffiliate && !user.binance_key ? (
            /* No Binance API for non-affiliates */
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FiKey className="text-blue-400" />
                  API Configuration
                </h2>
              </div>

              <div className="p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiKey className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">No API Key Configured</h3>
                  <p className="text-slate-300 mb-6">Connect your  API to start automated trading</p>
                  <Link href={"/user/settings"}>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Add  API Key
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Referrals Section (only for affiliates) */}
        {isAffiliate && user.referrals.length > 0 && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <FiUsers className="text-green-400" />
                Your Referrals ({user.referrals.length})
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {user.referrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                        {referral.referred_username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{referral.referred_username}</p>
                        <p className="text-slate-400 text-sm">Joined on {formatDate(referral.joined_at)}</p>
                      </div>
                    </div>
                    <div className="text-green-400">
                      <FiCheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;