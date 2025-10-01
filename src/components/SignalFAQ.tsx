"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import {
    FiActivity,
    FiTrendingUp,
    FiBarChart2,
    FiZap,
    FiClock,
    FiSend
} from "react-icons/fi";

const SignalFAQ = () => {
    const faqs = [
        {
            question: "What are Smart Filtered Trade Signals?",
            answer: "Namaio scans over 500+ crypto pairs, applying multiple filters to detect the strongest trading setups in real time.",
            icon: FiZap,
        },
        {
            question: "How does Momentum Identification work?",
            answer: "We detect coins with sharp, explosive moves happening in real time, so you can enter trades before the big price action unfolds.",
            icon: FiActivity,
        },
        {
            question: "What is Trend Confirmation?",
            answer: "Our software identifies both short- and medium-term trends, giving you extra confidence when riding momentum trades.",
            icon: FiTrendingUp,
        },
        {
            question: "How does Volume Analysis help?",
            answer: "We track unusual spikes in trading volume that often signal potential breakouts or trend reversals.",
            icon: FiBarChart2,
        },
        {
            question: "Do signals include entry points?",
            answer: (
                <>
                    Yes. Every signal comes with: Recommended entry time
                </>
            ),
            icon: FiClock,
        },
        {
            question: "How are signals delivered?",
            answer: "Signals are delivered instantly to your dashboard, email, or Telegram — whichever method you prefer.",
            icon: FiSend,
        },
    ];

    return (
        <section id="signal" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
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
                            <FiZap className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">Signal FAQ</h2>
                        </div>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Clear answers on how Namaio signals guide your trading decisions.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Disclosure key={index} as="div" className="bg-gray-800/50 rounded-xl border border-gray-700">
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex justify-between items-center w-full px-6 py-5 text-left hover:bg-gray-700/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${open ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                                <faq.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-lg font-semibold text-white">{faq.question}</span>
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
};

export default SignalFAQ;
