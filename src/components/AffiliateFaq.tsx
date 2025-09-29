"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import {
    FiDollarSign,
    FiUsers,
    FiTrendingUp,
    FiHelpCircle,
    FiCpu,
    FiShield,
    FiCheckCircle,
} from "react-icons/fi";


const AffiliateFaq = () => {
    
    const affiliateFaq = [
        {
            question: "How does the affiliate program work?",
            answer:
                "Invite users to Tezcai using your referral link. When those users trade, you earn lifetime commissions (1 to 2%) based on their trading profits. Earnings are tracked in real time inside your affiliate dashboard.",
        },
        {
            question: "What are the commission tiers?",
            answer:
                "We offer 3 lifetime tiers:\n  Bronze: 1% of referred user's profits (up to $100k volume)\n, Silver: 1.5% of referred user's profits ($100k to $1M volume)\n, Gold: 2% of referred user's profits (over $1M volume).",
        },
        {
            question: "Do affiliates earn lifetime commissions?",
            answer:
                "Yes. As long as your referred users continue trading with Tezcai, you keep earning commissions for life.",
        },
        {
            question: "When and how do I get paid?",
            answer:
                "Affiliate earnings are updated in real time and reflected in your dashboard. Payouts are processed monthly, with transparent reports available to you at all times.",
        },
        {
            question: "Is there a limit to how many users I can refer?",
            answer:
                "No, there are no limits. You can refer as many users as you want, and all referred users will be tied to your account permanently.",
        },
        {
            question: "Can I track my referrals and earnings?",
            answer:
                "Yes, you have full access to your affiliate dashboard. It provides real-time tracking of referrals, commissions, tiers, and monthly reports.",
        },

    ];

    const renderFaqSection = (
        id: string,
        title: string,
        icon: React.ElementType,
        items: { question: string; answer: React.ReactNode }[]
    ) => (
        <section id={id} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="flex items-center justify-center mb-10">
                        <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
                            {/* {icon && <icon className="w-6 h-6 text-blue-400" />} */}
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {items.map((faq, index) => (
                        <Disclosure
                            key={index}
                            as="div"
                            className="bg-gray-800/50 rounded-xl border border-gray-700"
                        >
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex justify-between items-center w-full px-6 py-5 text-left hover:bg-gray-700/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${open ? "bg-blue-600" : "bg-gray-700"
                                                    }`}
                                            >
                                                <h2 className="text-white">{index + 1}</h2>
                                            </div>
                                            <span className="text-lg font-semibold text-white">
                                                {faq.question}
                                            </span>
                                        </div>
                                        {open ? (
                                            <BiMinus className="w-6 h-6 text-blue-400" />
                                        ) : (
                                            <BiPlus className="w-6 h-6 text-blue-400" />
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-6 pb-5">
                                        <div className="pl-14 text-gray-300">{faq.answer}</div>
                                    </DisclosurePanel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <>
            
            {renderFaqSection("affiliatefaq", "Affiliate FAQ", FiDollarSign, affiliateFaq)}
        </>
    );
};

export default AffiliateFaq;
