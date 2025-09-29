"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import TezcaiLogo from './Logo/TezcaiLogo';
import GradientButton from './UI/GradientLinkButton';

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
        className={`inline-flex items-center px-6 py-3 font-medium text-white hover:border-blue-500 border border-gray-600 rounded-lg transition-colors ${className}`}
    >
        {children}
    </Link>
);

// Navigation Link Component - Updated for dark theme
const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className = "" }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`text-gray-300 hover:text-white transition-colors font-medium ${className}`}
    >
        {children}
    </Link>
);
const MobileMenu: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    const navItems = [
        // { href: "#features", label: "Features" },
        { href: "/", label: "Home" },

    ];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900 border-l border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
                </nav>

                {/* Mobile Actions */}
                <div className="absolute bottom-6 left-6 right-6 space-y-4">
                    <SecondaryLinkButton
                        href="/login"
                        onClick={onClose}
                        className="w-full justify-center text-center"
                    >
                        Secure Login
                    </SecondaryLinkButton>
                    <GradientButton
                        href="/register"
                        onClick={onClose}
                        className="w-full justify-center text-center"
                    >
                        Get Started⚡
                    </GradientButton>
                </div>
            </div>
        </>
    );
};

export default function HeaderAbout(): JSX.Element {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // Prevent body scroll when mobile menu is open
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-30 bg-gray-900 text-white shadow-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-3">
                        {/* Logo */}
                        <div className="flex justify-center items-center">
                            <TezcaiLogo />
                            <div className='ml-10 mt-3'><NavLink href="/">Home</NavLink></div>
                        </div>
                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <SecondaryLinkButton href="/login">
                                Secure Login
                            </SecondaryLinkButton>
                            <GradientButton href="/register">
                                Get Started⚡
                            </GradientButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg transition-colors z-10"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>

                        {/* Tablet Navigation (md screens) */}
                        <nav className="hidden md:flex lg:hidden items-center space-x-6">
                            <NavLink href="#features" className="text-sm">Features</NavLink>
                            <NavLink href="#security" className="text-sm">Security</NavLink>

                            {/* Tablet Actions Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center text-gray-300 hover:text-white">
                                    <span className="text-sm mr-1">More</span>
                                    <FiChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </button>

                                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="p-2 space-y-2">
                                        <SecondaryLinkButton
                                            href="/login"
                                            className="w-full justify-center text-sm px-4 py-2"
                                        >
                                            Login
                                        </SecondaryLinkButton>
                                        <GradientButton
                                            href="/register"
                                            className="w-full justify-center text-sm px-4 py-2"
                                        >
                                            Get Started ⚡
                                        </GradientButton>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        </>
    );
}