'use client'
import Link from 'next/link';
import { FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { SiInstagram, SiFacebook, SiTiktok, SiLinkedin, SiYoutube } from 'react-icons/si';
import { motion } from 'framer-motion';
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
    const companyLinks = [
        { href: "/company/#about", label: "About Us" },
        { href: "/company/#vision", label: "Vision , Mission & Values" },
        { href: "/company/#blog", label: "Blog" },
        { href: "/company/#news", label: "News" },
        // { href: "/benchmark", label: "Benchmark" },
        // { href: "/testimonial", label: "Testimonials" },
    ];

    const legalLinks = [
        { href: "/terms-and-conditions", label: "Terms and Conditions" },
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/risk-disclosure", label: "Risk Disclosure" },
    ];

    const supportLinks = [
        // { href: "/help-center", label: "Help Center" },
        { href: "/how-it-works", label: "How It Works" },
        // { href: "/tutorial", label: "Tutorial" },
    ];

    const socialLinks = [
        { href: "https://www.instagram.com/tezcai_com/", icon: <SiInstagram />, label: "Instagram" },
        { href: "https://www.facebook.com/namaio", icon: <SiFacebook />, label: "Facebook" },
        { href: "https://www.tiktok.com/@namaio.com", icon: <SiTiktok />, label: "TikTok" },
        { href: "https://www.linkedin.com/company/namaio-com", icon: <SiLinkedin />, label: "LinkedIn" },
        { href: "https://www.youtube.com/@Namaio", icon: <SiYoutube />, label: "YouTube" },
        { href: "https://twitter.com/tezcai_", icon: <RiTwitterXFill />, label: "Twitter" },
    ];

    return (
        <footer id="footer" className="bg-white text-gray-700 border-t border-gray-200">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Company */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-secondary mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center group">
                                        <span>{link.label}</span>
                                        <FiArrowRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 text-cyan-600 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-secondary mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center group">
                                        <span>{link.label}</span>
                                        <FiArrowRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 text-cyan-600 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-secondary mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center group">
                                        <span>{link.label}</span>
                                        <FiArrowRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 text-cyan-600 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-secondary mb-4">Connect</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FiMail className="text-secondary" />
                                <a href="mailto:info@namaio.com" className="hover:text-secondary transition-colors">
                                    info@namaio.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiMapPin className="text-secondary" />
                                <span>
                                    Ali Salem Obaid Bin Wanis Building,<br />
                                    Al Dana East 4_2 P.O. Box 41014,<br />
                                    Abu Dhabi, UAE
                                </span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                            Namaio is owned by Saadah Investment LLC, Abu Dhabi (UAE) based company.
                        </p>
                    </motion.div>
                </div>

                {/* Social Media */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-8 flex justify-center space-x-6"
                >
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-cyan-600 text-2xl transition-colors"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </motion.div> */}

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-4 pt-4 border-t border-gray-200 flex justify-center"
                >
                    <div className="text-sm text-gray-500 text-center">
                        <p>© {new Date().getFullYear()} Namaio. All rights reserved.</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
