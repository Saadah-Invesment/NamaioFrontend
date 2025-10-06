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

const GeneralFaq = () => {
    const faqs = [
        {
            question: "What is Namaio and how does it work?",
            answer: "Namaio is a smart Forex trading assistant that connects directly to your brokerage account via API keys. It executes trades automatically based on its algorithm while you remain in full control of your funds.",
            icon: FiCpu,
        },
        {
            question: "Do I need prior trading experience to use Namaio?",
            answer: "No prior trading experience is needed. Namaio handles the complex trading logic automatically, allowing both beginners and experienced traders to benefit.",
            icon: FiUsers,
        },
       
        {
            question: "Can I withdraw my funds while Namaio is trading?",
            answer: "Yes. Namaio is non-custodial. Your funds always remain in your own broker account and can be withdrawn anytime.",
            icon: FiShield,
        },
        // {
        //     question: "How much capital do I need to start?",
        //     answer: "We recommend starting with a minimum of US$3,000 for optimal performance. Namaio can manage accounts up to US$2,000,000 safely.",
        //     icon: FiDollarSign,
        // },
        {
            question: "Is there a trial period?",
            answer: "Yes, Namaio offers a 1-month free trial so you can test the platform and see real trading results before subscribing.",
            icon: FiCheckCircle,
        },
        // {
        //     question: "Are the trading results guaranteed?",
        //     answer: "No automated trading system can guarantee profits. Namaio provides intelligent trading based on proven strategies, but market conditions can affect outcomes.",
        //     icon: FiTrendingUp,
        // },
        {
            question: "Can I run Namaio on multiple accounts?",
            answer: "Yes, Namaio supports multiple account connections. Keep in mind that results may vary slightly due to execution times and broker differences.",
            icon: FiUsers,
        },
        {
            question: "How secure is Namaio?",
            answer: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>Read-only API access — Namaio can trade but cannot withdraw funds.</li>
                    <li>Funds always remain in your brokerage account.</li>
                    <li>Trade logs and profit reports available in real time.</li>
                    <li>Institutional-grade security protocols applied.</li>
                </ul>
            ),
            icon: FiShield,
        },
        {
            question: "Can I stop the automation at any time?",
            answer: "Yes, you can pause or stop Namaio anytime without penalties. There are no lock-ins or long-term commitments.",
            icon: FiHelpCircle,
        },
    ];




    const renderFaqSection = (
        id: string,
        title: string,
        icon: React.ElementType,
        items: { question: string; answer: React.ReactNode }[]
    ) => (
        <section id={id} className="py-24 px-4 sm:px-6 lg:px-8 bg-white text-primary">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >

                    <div className="flex items-center justify-center mb-6">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full border border-blue-300 shadow-sm">

                            <h2 className="text-2xl font-bold text-primary">
                                {title}
                            </h2>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {items.map((faq, index) => (
                        <Disclosure
                            key={index}
                            as="div"
                            className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border border-secondary"
                        >
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex justify-between items-center w-full px-6 py-5 text-left hover:bg-gray-700/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${open ? "bg-primary" : "bg-cyan-700"
                                                    }`}
                                            >
                                                <h2 className="text-white">{index + 1}</h2>
                                            </div>
                                            <span className="text-lg font-semibold text-primary">
                                                {faq.question}
                                            </span>
                                        </div>
                                        {open ? (
                                            <BiMinus className="w-6 h-6 text-secondary" />
                                        ) : (
                                            <BiPlus className="w-6 h-6 text-secondary" />
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-6 pb-5">
                                        <div className="pl-14 text-primary">{faq.answer}</div>
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
            {renderFaqSection("generalfaq", "FAQ", FiHelpCircle, faqs)}

        </>
    );
};

export default GeneralFaq;
