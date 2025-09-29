"use client"
import { FiShield, FiTrendingUp, FiZap, FiLayers } from 'react-icons/fi'
import { FaBahai } from "react-icons/fa";
export default function Differentiators() {
    const features = [
        {
            icon: <FaBahai className="w-6 h-6" />,
            title: "Smart Selective Trading",
            description: "Most bots trade constantly and lose in sideways markets. Smart trades only when the odds are in your favor skipping bad setups entirely.",
            highlight: "skipping bad setups entirely"
        },
        {
            icon: <FiTrendingUp className="w-6 h-6" />,
            title: "Transparent Profit Tracking",
            description: "Every user has a live dashboard showing trade history, success rate, and profit/loss. Users see real-time earnings.",
            highlight: "real-time earnings"
        },
        {
            icon: <FiShield className="w-6 h-6" />,
            title: "Fair Pricing + Profit Share Model",
            description: "Low monthly subscription + 15% of profits (from which affiliate commissions are paid). If we don't make you money, we don't make money.",
            highlight: "15% of profits"
        },
        {
            icon: <FiLayers className="w-6 h-6" />,
            title: "Institutional-Grade Scalability",
            description: "From individual traders to funds and prop firms, Tezcai supports large-scale, multi-account deployments with custom strategies.",
            highlight: "large-scale deployments"
        }
    ]

    return (
        <section className="pt-16 pb-5 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Tezcai Is Different From Other Bots
                    </h2>

                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-gray-900 text-primary p-3 rounded-lg">
                                    {feature.icon}
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300">
                                        {feature.description.split(feature.highlight)[0]}
                                        <span className="text-gray-300">
                                            {feature.highlight}
                                        </span>
                                        {feature.description.split(feature.highlight)[1]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}