'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FiHome,
  FiActivity,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import clsx from 'clsx';
import PrivateRoute from '@/components/MyComponents/PrivateRoute';
import Image from 'next/image';

const navLinks = [
  { name: 'Dashboard', href: '/users/dashboard', icon: FiHome },
  { name: 'Trade Signals', href: '/users/signals', icon: FiActivity },
  { name: 'Profile', href: '/users/profile', icon: CgProfile },
  { name: 'Settings', href: '/users/settings', icon: IoSettingsSharp },
];

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
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
    router.replace('/login');
  };

  return (
    <div className="relative flex h-screen w-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={clsx(
          'flex flex-col h-full bg-[#0e2a4c] border-r border-[#0e2a4c]/20 shadow-2xl transition-transform duration-300 z-50',
          isMobile
            ? sidebarOpen
              ? 'fixed top-0 left-0 w-72 translate-x-0'
              : 'fixed top-0 left-0 w-72 -translate-x-full'
            : `${isCollapsed ? 'w-20' : 'w-72'} hidden md:flex flex-shrink-0`
        )}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 z-10">
          <Link href="/" className="flex items-center gap-3">
            {!isCollapsed ? (
              <div className="flex items-center gap-3 px-5 bg-white rounded-lg">
                <Image
                  src="/images/namaio-logo.png"
                  alt="Logo"
                  width={180}
                  height={100}

                  loading='lazy'
                />
              </div>
            ) : (
              <div className="w-8 h-8 p-1 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <Image
                  src="/images/namaio-symbol.png"
                  alt="Logo"
                  width={40}
                  height={40}

                  loading='lazy'
                />
              </div>
            )}
          </Link>
          {!isMobile ? (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isCollapsed ? <FiChevronsRight size={14} /> : <FiChevronsLeft size={18} />}
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <FiX size={20} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2 z-10 overflow-y-auto">
          {navLinks.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative group',
                  isActive
                    ? 'bg-[#32bfb7] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white',
                  isCollapsed && 'justify-center'
                )}
                title={isCollapsed ? name : undefined}
              >
                <Icon className={clsx('w-5 h-5', isActive && 'animate-pulse')} />
                {!isCollapsed && <span>{name}</span>}
              </Link>
            );
          })}
        </nav>



        {/* Logout */}
        <div className="p-4 border-t border-white/10 z-10">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all group',
              isCollapsed && 'justify-center'
            )}
          >
            <FiLogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 py-3 z-30 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition-all"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#32bfb7] to-[#28a59d] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-[#0e2a4c] font-bold text-lg">Namaio</span>
          </div>
          <div className="w-10" />
        </div>
      )}

      {/* Main Content */}
      <main
        className={clsx(
          'flex-1 min-h-screen overflow-auto transition-all',
          isMobile ? 'w-full pt-16' : ''
        )}
      >
        <PrivateRoute allowedRoles={['users']}>
          <div className="p-2">{children}</div>
        </PrivateRoute>
      </main>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLogOut className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Confirm Logout</h3>
            <p className="text-gray-600 mb-8 text-center">
              Are you sure you want to end your session?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50 font-medium shadow-md hover:shadow-lg"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
