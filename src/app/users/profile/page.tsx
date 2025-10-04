'use client';

import { useEffect, useState } from "react";
import { FiEdit2, FiLock, FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar, FiCreditCard, FiLogOut, FiCheck, FiX } from "react-icons/fi";
import { MdSubscriptions } from "react-icons/md";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  subscription: string;
  phone?: string;
  address?: string;
  joined?: string;
  planExpiry?: string;
}

interface Auth {
  user: User;
  access: string;
  refresh: string;
}

export default function ProfilePage() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("mock_auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth(parsed);
      setUserData(parsed.user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mock_auth");
    setAuth(null);
    alert("Logged out successfully!");
  };

  const toggleEdit = () => setEditMode(!editMode);

  const handleChange = (field: keyof User, value: string) => {
    if (!userData) return;
    setUserData({ ...userData, [field]: value });
  };

  const saveProfile = () => {
    if (!auth || !userData) return;
    localStorage.setItem("mock_auth", JSON.stringify({ ...auth, user: userData }));
    setAuth({ ...auth, user: userData });
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  if (!auth || !userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-600 text-lg">No user logged in</p>
        </div>
      </div>
    );
  }

  const InfoField = ({ icon: Icon, label, value, field, editable = false }: any) => (
    <div className="group">
      <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
        <Icon size={16} className="text-[#32bfb7]" />
        {label}
      </label>
      {editMode && editable ? (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-[#32bfb7] focus:bg-white transition-all"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <p className="text-gray-800 font-medium px-4 py-2.5 bg-gray-50 rounded-lg border border-transparent">
          {value || "Not provided"}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-[#0e2a4c] rounded-2xl p-8 mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#32bfb7] opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#32bfb7] to-[#28a59d] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {userData.first_name.charAt(0)}{userData.last_name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className="text-[#32bfb7] font-medium">@{userData.username}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={saveProfile}
                    className="flex items-center gap-2 bg-[#32bfb7] hover:bg-[#28a59d] text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    <FiCheck size={18} /> Save
                  </button>
                  <button
                    onClick={toggleEdit}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all border border-white/20"
                  >
                    <FiX size={18} /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleEdit}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-all border border-white/20"
                >
                  <FiEdit2 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0e2a4c] mb-6 pb-3 border-b border-gray-200">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField 
                icon={FiUser} 
                label="First Name" 
                value={userData.first_name}
                field="first_name"
                editable={true}
              />
              <InfoField 
                icon={FiUser} 
                label="Last Name" 
                value={userData.last_name}
                field="last_name"
                editable={true}
              />
              <InfoField 
                icon={FiMail} 
                label="Email Address" 
                value={userData.email}
                field="email"
              />
              <InfoField 
                icon={FiPhone} 
                label="Phone Number" 
                value={userData.phone}
                field="phone"
                editable={true}
              />
              <div className="md:col-span-2">
                <InfoField 
                  icon={FiMapPin} 
                  label="Address" 
                  value={userData.address}
                  field="address"
                  editable={true}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Account Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#0e2a4c] mb-6 pb-3 border-b border-gray-200">
                Account Details
              </h2>
              <div className="space-y-6">
                <InfoField 
                  icon={FiBriefcase} 
                  label="Role" 
                  value={userData.role}
                />
                <InfoField 
                  icon={MdSubscriptions} 
                  label="Subscription Plan" 
                  value={userData.subscription}
                />
                <InfoField 
                  icon={FiCalendar} 
                  label="Member Since" 
                  value={userData.joined || "2025-01-01"}
                />
                <InfoField 
                  icon={FiCreditCard} 
                  label="Plan Expires" 
                  value={userData.planExpiry || "2025-12-31"}
                />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#0e2a4c] mb-6 pb-3 border-b border-gray-200">
            Security & Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e2a4c]/0 to-[#32bfb7]/0 group-hover:from-[#0e2a4c]/5 group-hover:to-[#32bfb7]/5 transition-all"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiLock className="text-[#0e2a4c]" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Access Token</p>
                    <p className="text-xs text-gray-500 mt-0.5">Click to view</p>
                  </div>
                </div>
                <div className="text-[#32bfb7] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e2a4c]/0 to-[#32bfb7]/0 group-hover:from-[#0e2a4c]/5 group-hover:to-[#32bfb7]/5 transition-all"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiLock className="text-[#0e2a4c]" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Refresh Token</p>
                    <p className="text-xs text-gray-500 mt-0.5">Click to view</p>
                  </div>
                </div>
                <div className="text-[#32bfb7] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}