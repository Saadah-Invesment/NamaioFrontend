"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "" }) => (
    <Link
        href={href}
        className={`text-gray-300 hover:text-white transition-colors font-medium ${className}`}
    >
        {children}
    </Link>
);

const FaqDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={dropdownRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative"
        >
            <button
                className="flex items-center text-gray-300 hover:text-white font-medium transition-transform"
                onClick={() => setIsOpen(!isOpen)}
            >
                FAQ
                <FiChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="flex flex-col p-2 space-y-2">
                        <NavLink href="/faq/general-faq" className="px-3 py-2 rounded hover:bg-gray-700">
                            General FAQ
                        </NavLink>
                        <NavLink href="/faq/affiliate-faq" className="px-3 py-2 rounded hover:bg-gray-700">
                            Affiliate FAQ
                        </NavLink>
                        <NavLink href="/faq/profit-sharing-faq" className="px-3 py-2 rounded hover:bg-gray-700">
                            Profit Sharing FAQ
                        </NavLink>
                        <NavLink href="/faq/signal-faq" className="px-3 py-2 rounded hover:bg-gray-700">
                            Signal FAQ
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaqDropdown;
