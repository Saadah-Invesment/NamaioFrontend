'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FiHome,
  FiTrendingUp,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronsLeft,
  FiChevronsRight,
  FiActivity,
} from 'react-icons/fi';
import { IoSettingsSharp, IoDocumentText } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import clsx from 'clsx';

import { logoutapi } from '@/api/auth';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';

import PrivateRoute from '@/components/MyComponents/PrivateRoute';
import { getaffiliateStatus } from '@/api/profile';
import SubscriptionReminder from '@/components/UI/SubscriptionReminder';
import { FaRegChartBar } from "react-icons/fa";
// --- Dummy API for affiliate status (replace with real API call) ---


const navLinks = [
  { name: 'Dashboard', href: '/user/dashboard', icon: FiHome },
  { name: 'Trade Signals', href: '/user/signals', icon: FiActivity },
  { name: 'Benchmark', href: '/user/benchmark', icon: FaRegChartBar },
  { name: 'Profile', href: '/user/profile', icon: CgProfile },
  { name: 'Reports', href: '/user/reports', icon: IoDocumentText },
  { name: 'Settings', href: '/user/settings', icon: IoSettingsSharp },
];

type Props = { children: React.ReactNode; };

type DecodedToken = { subscription?: string;[key: string]: any };

export default function DashboardLayout({ children }: Props) {
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const pathname = usePathname();
  const isBillingRoute = pathname.startsWith("/user/billing");
  const router = useRouter();

  const [plan, setPlan] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const [affiliateStatus, setAffiliateStatus] = useState<any>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const [affloading, setaffloading] = useState(true)
  // --- Fetch affiliate status ---
  useEffect(() => {
    (async () => {
      setaffloading(true)
      try {
        const status = await getaffiliateStatus();
        if (status.status === 200) {
          setAffiliateStatus(status.data);
        }
      } catch (err) {
        console.error("Error fetching affiliate status:", err);
      } finally {
        setaffloading(false)
      }
    })();
  }, []);


  useEffect(() => {
    const savedToken = localStorage.getItem("tezcai_token");
    if (savedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(savedToken);
        console.log("decoded?.subscription", decoded?.subscription)
        if (decoded?.subscription) {
          setPlan(decoded.subscription.toLowerCase());
        } else {
          router.replace('/user/billing');
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
    setSidebarLoading(false);
  }, [plan]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile drawer when clicking outside
  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isMobile, sidebarOpen]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logoutapi();
      if (response.status === 205) {
        // session reset logic
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
      setShowLogoutConfirm(false);
    }
    localStorage.clear();
    router.replace('/login');
  };

  if (isBillingRoute) {
    return (
      <PrivateRoute allowedRoles={['user']}>
        <div className="h-full">{children}</div>
      </PrivateRoute>
    );
  }

  // --- Tab switcher ---
  const currentRole = pathname.startsWith("/affiliate") ? "affiliate" : "user";

  const handleTabClick = (role: string) => {
    if (role === "user") {
      router.push("/user/dashboard");
    } else if (role === "affiliate") {
      if (affiliateStatus?.is_active) {
        router.push("/affiliate/dashboard");
      } else {
        router.push("/user/profile"); // 🔹 inactive → go to profile
      }
    }
    if (isMobile) setSidebarOpen(false);
  };


  return (
    <div className="h-screen flex bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/500 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] p-6 rounded-lg border border-[#ffffff28] max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-md bg-[#1c1c30] hover:bg-[#2c2c40] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={clsx(
          'h-full flex flex-col bg-[#0a0a1a] border-r border-[#ffffff28]',
          isMobile
            ? `fixed top-0 left-0 z-50 transition-transform w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 hidden md:flex`
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#ffffff28] flex-shrink-0">
          <Link href="/" className='cursor-pointer'>
            <div className="flex items-center">
              <Image
                src="/images/tezcai-logo-bg.png"
                alt="Logo"
                width={100}
                height={100}
                className={`${isCollapsed ? "hidden" : ""}`}
                loading='lazy'
              />
              <Image
                src="/images/tezcai-bull-logo.png"
                alt="Logo"
                width={40}
                height={40}
                className={`${isCollapsed ? "flex" : "hidden"}`}
                loading='lazy'
              />
            </div>
          </Link>
          {!isMobile ? (
            <button onClick={toggleCollapse} className="text-white p-1 hover:bg-[#1c1c30] rounded">
              {isCollapsed ? <FiChevronsRight className="w-5 h-5" /> : <FiChevronsLeft className="w-5 h-5" />}
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white p-1 hover:bg-[#1c1c30] rounded"
              aria-label="Close sidebar"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 🔹 Role Tabs */}
        <div className="p-2 border-b border-[#ffffff28] flex gap-2">
          <button
            onClick={() => handleTabClick("user")}
            className={clsx(
              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition",
              currentRole === "user"
                ? "bg-blue-600 text-white"
                : "bg-[#1c1c30] text-gray-300 hover:bg-[#2c2c40]", isCollapsed ? "pr-2" : ""
            )}
          >
            {isCollapsed ? "U" : "User"}
          </button>
          <div className=" relative group">
            <button
              onClick={() => handleTabClick("affiliate")}
              className={clsx(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 relative",
                !affiliateStatus?.is_active
                  ? "bg-gray-900 text-gray-600"
                  : currentRole === "affiliate"
                    ? "bg-blue-600 text-white"
                    : "bg-[#1c1c30] text-gray-300 hover:bg-[#2c2c40]", isCollapsed ? "pr-2" : ""
              )}
            >
              {isCollapsed ? "A" : "Affiliate"}

              {/* 🔴 Red dot if inactive */}
              {/* {!affloading && !affiliateStatus?.is_active && (
                <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
              )} */}
            </button>

            {/* Tooltip on hover */}
            {!affloading && !affiliateStatus?.is_active && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-600 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap shadow-lg z-10 max-w-xs text-left">
                <div>Inactive</div>
                <div className="text-gray-400 mt-1 text-[11px] leading-tight">
                  <p>As soon as someone signs up using your referral code,</p>
                  <p>your affiliate account will be automatically activated.</p>
                </div>
              </div>
            )}

          </div>


        </div>

        {/* Navigation */}
        {sidebarLoading ? (
          <div className="flex justify-center h-full text-gray-400">Loading...</div>
        ) : (
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navLinks.map(({ name, href, icon: Icon }) => {
                if (plan?.toLowerCase() === "signal") {
                  if (name !== "Trade Signals" && name !== "Profile" && name !== "Benchmark") return null;
                }
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    onClick={() => { if (isMobile) setSidebarOpen(false); }}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      isActive ? 'bg-blue-500/40 text-white' : 'text-white hover:bg-[#1c1c30]',
                      isCollapsed && 'justify-center'
                    )}
                    title={isCollapsed ? name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{name}</span>}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-[#ffffff28] flex-shrink-0">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#1c1c30] transition w-full',
              isCollapsed && 'justify-center'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <FiLogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-[#0a0a1a] text-white flex items-center justify-between p-4 z-30 shadow border-b border-[#ffffff28]">
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-[#1c1c30] rounded"
            aria-label="Open menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Image
            src="/images/tezcai-logo.png"
            alt="Logo"
            width={100}
            height={100}
            loading='lazy'
          />
          <div className="w-8" />
        </div>
      )}

      {/* Main Content */}
      <main className={clsx('flex-1 bg-gray-900 overflow-y-auto', isMobile ? 'pt-20' : '')}>
        <PrivateRoute allowedRoles={['user']}>
          {/* <SubscriptionReminder /> */}
          <div className="h-full">{children}</div>
        </PrivateRoute>
      </main>
    </div>
  );
}
