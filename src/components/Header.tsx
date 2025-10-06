"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

import GradientButton from './UI/GradientLinkButton';
import FaqDropdown from './UI/FaqDropdown';
import GoogleTranslateClient from './GoogleTranslateClient';
import NamaioLogo from './Logo/NamaioLogo';

// Types
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SecondaryLinkButton: React.FC<ButtonProps> = ({
  href,
  children,
  className = "",
  onClick
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`inline-flex items-center px-6 py-3 font-medium text-primary hover:border-secondary border border-gray-600 rounded-lg transition-colors ${className}`}
  >
    {children}
  </Link>
);

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className = "" }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-primary hover:text-secondary transition-colors font-medium ${className}`}
  >
    {children}
  </Link>
);



const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const navItems = [
    { href: "/", label: "Welcome" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    // { href: "/affiliate", label: "Affiliate" },
    { href: "/company", label: "Company" },
    // { href: "/benchmark", label: "Benchmark" },
    // { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-white/70 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='w-full flex justify-end'>
          <button
            onClick={onClose}
            className="p-2 ml-4 text-gray-300 hover:text-white rounded-lg transition-colors flex-shrink-0"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <NavLink
                href={item.href}
                onClick={onClose}
                className="block py-3 px-4 rounded-lg hover:bg-gray-800 text-lg"
              >
                {item.label}
              </NavLink>
            </div>
          ))}

          {/* FAQ Submenu for Mobile */}
          {/* <div className="pt-4">
            <span className="block text-gray-400 px-4 py-2">FAQ</span>
            <div className="pl-6 space-y-2">
              <NavLink href="/faq/generalfaq" onClick={onClose} className="block py-2 text-lg">General FAQ</NavLink>
              <NavLink href="/faq/affiliatefaq" onClick={onClose} className="block py-2 text-lg">Affiliate FAQ</NavLink>
              <NavLink href="/faq/profit-sharing" onClick={onClose} className="block py-2 text-lg">Profit Sharing FAQ</NavLink>
              <NavLink href="/faq/signals" onClick={onClose} className="block py-2 text-lg">Signal FAQ</NavLink>
            </div>
          </div> */}
        </nav>

        {/* Mobile Actions */}
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <SecondaryLinkButton
            href="/login"
            onClick={onClose}
            className="w-full justify-center text-center"
          >
            Log In
          </SecondaryLinkButton>
          <GradientButton
            href="/register"
            onClick={onClose}
            className="w-full justify-center text-center"
          >
            Get Started
          </GradientButton>
          {/* <GoogleTranslateClient /> */}
        </div>
      </div>
    </>
  );
};

export default function HeaderSection(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-background text-primary shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-3">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex-shrink-0 z-10 ">
              <NamaioLogo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6  ">
              <NavLink href="/">Welcome</NavLink>
              <NavLink href="/how-it-works">How It Works</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              {/* <NavLink href="/affiliate">Affiliate</NavLink> */}
              <NavLink href="/company">Company</NavLink>
              <NavLink href="/faq">FAQ</NavLink>
              {/* <NavLink href="/benchmark">Benchmark</NavLink> */}
              {/* <FaqDropdown /> */}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <SecondaryLinkButton href="/login">
                Log In
              </SecondaryLinkButton>
              <GradientButton href="/register">
                Get Started
              </GradientButton>
            </div>
            {/* <GoogleTranslateClient /> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-primary hover:text-secondary rounded-lg transition-colors z-10"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
