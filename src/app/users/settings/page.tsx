'use client';

import { useEffect, useState } from "react";
import { FiUser, FiLogOut, FiHelpCircle, FiEdit, FiShield, FiCreditCard, FiMessageCircle, FiMail, FiCheck, FiChevronRight } from "react-icons/fi";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  subscription: string;
}

interface Auth {
  user: User;
}

export default function SettingsPage() {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("mock_auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ user: parsed.user });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mock_auth");
    setAuth(null);
    alert("Logged out successfully!");
  };

  const handleUpdatePlan = () => {
    alert("Plan updated successfully! (mock)");
  };

  const handleSupport = () => {
    alert("Redirecting to support... (mock)");
  };

  const handleReport = () => {
    alert("Report submitted! (mock)");
  };

  const handleFeedback = () => {
    alert("Feedback sent! (mock)");
  };

  if (!auth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-600 text-lg">No user logged in</p>
        </div>
      </div>
    );
  }

  const { user } = auth;

  const AccountItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center group-hover:from-[#32bfb7]/10 group-hover:to-[#32bfb7]/5 transition-all">
          <Icon className="text-[#0e2a4c] group-hover:text-[#32bfb7] transition-colors" size={18} />
        </div>
        <span className="font-medium text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, onClick, variant = "default" }: any) => {
    const baseClasses = "group relative flex items-center justify-between w-full p-4 rounded-xl transition-all overflow-hidden";
    const variantClasses = {
      default: "bg-white border-2 border-gray-200 hover:border-[#32bfb7] hover:shadow-md",
      danger: "bg-white border-2 border-red-200 hover:border-red-400 hover:shadow-md",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            variant === "danger" 
              ? "bg-red-50 text-red-600 group-hover:bg-red-100" 
              : "bg-gray-50 text-[#0e2a4c] group-hover:bg-[#32bfb7]/10 group-hover:text-[#32bfb7]"
          }`}>
            <Icon size={20} />
          </div>
          <span className={`font-medium ${variant === "danger" ? "text-red-600" : "text-gray-700 group-hover:text-[#0e2a4c]"}`}>
            {label}
          </span>
        </div>
        <FiChevronRight 
          className={`transition-all ${
            variant === "danger" 
              ? "text-red-400 group-hover:text-red-600 group-hover:translate-x-1" 
              : "text-gray-400 group-hover:text-[#32bfb7] group-hover:translate-x-1"
          }`} 
          size={20} 
        />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0e2a4c] to-[#1a3d5f] rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#32bfb7] opacity-10 rounded-full -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-300 text-sm">Manage your account preferences and settings</p>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0e2a4c]">Account Information</h2>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
              <FiCheck size={16} />
              Verified
            </div>
          </div>
          <div className="space-y-1">
            <AccountItem icon={FiUser} label="Full Name" value={`${user.first_name} ${user.last_name}`} />
            <AccountItem icon={FiUser} label="Username" value={user.username} />
            <AccountItem icon={FiMail} label="Email" value={user.email} />
            <AccountItem icon={FiCreditCard} label="Subscription Plan" value={user.subscription} />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handleUpdatePlan}
              className="w-full bg-gradient-to-r from-[#32bfb7] to-[#28a59d] hover:from-[#28a59d] hover:to-[#32bfb7] text-white px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <FiEdit size={18} />
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#0e2a4c] mb-1">Support & Help</h2>
            <p className="text-sm text-gray-500">Get assistance and share your feedback</p>
          </div>
          <div className="space-y-3">
            <ActionButton icon={FiHelpCircle} label="Contact Support" onClick={handleSupport} />
            <ActionButton icon={FiShield} label="Report an Issue" onClick={handleReport} />
            <ActionButton icon={FiMessageCircle} label="Send Feedback" onClick={handleFeedback} />
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#0e2a4c] mb-1">Security</h2>
            <p className="text-sm text-gray-500">Manage your account security settings</p>
          </div>
          <div className="space-y-3">
            <ActionButton icon={FiLogOut} label="Logout from Account" onClick={handleLogout} variant="danger" />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need more help? Visit our{" "}
            <a href="#" className="text-[#32bfb7] hover:text-[#28a59d] font-medium transition-colors">
              Help Center
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}