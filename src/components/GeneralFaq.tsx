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
            question: "How does Namaio trade for my account?",
            answer:
                "Namaio connects securely to your exchange account through API keys (you keep full control of your funds). The software automatically executes buy and sell orders based on its strategy, while you can track all trades in real time from your dashboard. Your money never leaves your exchange, Namaio only places trades on your behalf.",
            icon: FiCpu,
        },
        {
            question: "What are the minimum and maximum wallet limits for exchanges?",
            answer: "We recommend maintaining a minimum balance of US$3,000  in your exchange wallet for optimal performance. Namaio will not manage wallets exceeding US$2 million. Once your wallet reaches US$2 million, we strongly advise taking profits out of the wallet.",
        },

        {
            question: "Do all members see the same results?",
            answer:
                "No. All members get the same trading signals, but results are not always identical. The amount you invest, the fees charged by your exchange, and the speed of trade execution can lead to different outcomes (±10%).",
            icon: FiUsers,
        },
        {
            question: "What if I have more than one account in different crypto exchanges (e.g., Binance or OKX)? Do I get the same results from daily trades?",
            answer:
                "Not always. Some symbols are available on one exchange but not on another. When a trade is identified, execution depends on the platform you are using. This can lead to differences in results between exchanges.",
            icon: FiUsers,
        },
        {
            question: "When do I start seeing results?",
            answer: "Same day you connect.",
            icon: FiDollarSign,
        },
        {
            question: "Can I stop anytime?",
            answer: "Yes, you can stop at any time. There are no commitments or lock-ins.",
            icon: FiDollarSign,
        },
        {
            question: "Do I control my funds?",
            answer: "Yes, 100% of your funds always remain in your own exchange account.",
            icon: FiDollarSign,
        },
        {
            question: "How do I connect my crypto exchange?",
            answer: (
                <>
                    Connect your Crypto Exchange account securely via read-only API keys with trading
                    permissions only. Your funds remain safe in your own account.
                    <br />
                    <br />
                    Make sure you have funds in your exchange wallet (we recommend starting with around US
                    $3,000). Please do not add more than US&nbsp;$2,000,000.
                    <br />
                    <br />
                    Once connected, Namaio trades automatically 24/7 while you simply track performance.
                </>
            ),
            icon: FiCpu,
        },
        {
            question: "Why is Namaio different from other bots?",
            answer: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <b>Smart Selective Trading:</b> Unlike bots that trade constantly, Namaio trades only
                        when the odds are in your favor.
                    </li>
                    <li>
                        <b>Transparent Profit Tracking:</b> Every user has a live dashboard showing trade
                        history, success rate, and profit/loss in real time.
                    </li>
                    <li>
                        <b>Fair Pricing + Profit Share:</b> Low monthly subscription + 15% of profits. If we
                        don’t make you money, we don’t earn either.
                    </li>
                    <li>
                        <b>Institutional-Grade Scalability:</b> Supports individuals, funds, and firms with
                        multi-account deployments.
                    </li>
                </ul>
            ),
            icon: FiTrendingUp,
        },
        {
            question: "How secure is Namaio?",
            answer: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>Read-only API access — Namaio can trade but never withdraw funds.</li>
                    <li>Funds always remain in your exchange wallet.</li>
                    <li>Daily trade logs and profit reports in your dashboard.</li>
                    <li>Detailed audit logs and account activity tracking.</li>
                    <li>Institutional-grade security with millions secured in live trading.</li>
                </ul>
            ),
            icon: FiShield,
        },
        {
            question: "Which exchange should I use with Namaio?",
            answer: (
                <>
                    Namaio works worldwide, but the best exchange depends on your region:
                    <br />
                    <br />
                    <b>Asia, Africa & Latin America:</b> Binance (0.2% fees), OKX (0.18%).
                    <br />
                    <b>MENA (Middle East & North Africa):</b> OKX (primary), Binance (secondary).
                    <br />
                    <b>UK & Europe:</b> Revolut X (0.18%).
                    <br />
                    <b>USA & Canada:</b> Gemini ActiveTrader (~0.2% with Pro account).
                </>
            ),
            icon: FiUsers,
        },
        {
            question: "Why do you recommend specific exchanges?",
            answer: (
                <>
                    We carefully select exchanges based on:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                            <b>Lowest possible fees:</b> So more profit stays in your account.
                        </li>
                        <li>
                            <b>Trusted regulation:</b> For safety and compliance where available.
                        </li>
                        <li>
                            <b>Seamless integration:</b> To keep Namaio running smoothly for your trading.
                        </li>
                    </ul>
                    Wherever you are in the world, Namaio connects you to the best exchange for your region.
                </>
            ),
            icon: FiCheckCircle,
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
            {renderFaqSection("generalfaq", "General FAQ", FiHelpCircle, faqs)}

        </>
    );
};

export default GeneralFaq;
