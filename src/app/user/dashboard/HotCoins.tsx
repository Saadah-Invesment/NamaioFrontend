'use client'
import React, { useEffect, useState } from "react";
import { CgLock } from "react-icons/cg";
import { FiTrendingDown, FiTrendingUp, FiZap } from "react-icons/fi";
import { SiBitcoin, SiEthereum, SiSolana, SiCardano, SiRipple, SiPolkadot, SiChainlink } from "react-icons/si";
import { RiBnbFill } from "react-icons/ri";
import axios from "axios";
import { BiRefresh } from "react-icons/bi";
import { getHotCoins } from "@/api/dashboard";
import BinanceChart from "./BinanceChart";
interface Coin {
    name: string;
    symbol: string;
    price: number;
    change_pct: number;
}

const TIME_FRAMES = ["1h", "2h", "5h", "12h", "24h"];

// Coin configuration with icon, color, and background
const coinConfig: {
    [key: string]: { icon: JSX.Element; color: string; bgColor: string };
} = {
    BTC: {
        icon: <SiBitcoin className="w-5 h-5 text-orange-400" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-orange-500/20 to-yellow-500/20",
    },
    ETH: {
        icon: <SiEthereum className="w-5 h-5 text-blue-400" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-blue-500/20 to-indigo-500/20",
    },
    SOL: {
        icon: <SiSolana className="w-5 h-5 text-purple-400" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    },
    BNB: {
        icon: <RiBnbFill className="w-5 h-5 text-yellow-400" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
    },
    ADA: {
        icon: <SiCardano className="w-5 h-5 text-blue-300" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-blue-400/20 to-cyan-400/20",
    },
    XRP: {
        icon: <SiRipple className="w-5 h-5 text-gray-300" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-gray-400/20 to-slate-400/20",
    },
    DOT: {
        icon: <SiPolkadot className="w-5 h-5 text-pink-400" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-pink-500/20 to-rose-500/20",
    },
    LINK: {
        icon: <SiChainlink className="w-5 h-5 text-blue-500" />,
        color: "text-white",
        bgColor: "bg-gradient-to-r from-blue-600/20 to-cyan-500/20",
    },
};

export default function HotCoins() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeFrame, setTimeFrame] = useState("24h");
    const [error, setError] = useState<string | null>(null);
    const [chartSymbol, setChartSymbol] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openChartModal = (symbol: string) => {
        setChartSymbol(symbol);
        setIsModalOpen(true);
    };

    const closeChartModal = () => {
        setChartSymbol(null);
        setIsModalOpen(false);
    };
    useEffect(() => {

        fetchCoins();
    }, [timeFrame]);

    const fetchCoins = async () => {

        setLoading(true);

        setError(null);
        try {
            const res = await getHotCoins(timeFrame)
            setCoins(res.data.slice(0, 4));
        } catch (err) {
            console.error("Error fetching hotcoins:", err);
            setError("Failed to fetch coin data");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl">
                <div className="animate-pulse">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-6 bg-slate-700 rounded w-32"></div>
                        <div className="h-8 bg-slate-700 rounded w-20"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-slate-800 rounded-xl p-6 h-32"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl">
                <div className="text-center text-gray-400">
                    {/* <p>{error}</p> */}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-700/50">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <FiZap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Top Coins</h2>
                        <p className="text-slate-400 text-sm">Real-time cryptocurrency prices</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <BiRefresh className="w-6 h-6 text-slate-400 cursor-pointer" onClick={fetchCoins} />
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                    >
                        {TIME_FRAMES.map((tf) => (
                            <option key={tf} value={tf}>{tf}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Coins Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coins.map((coin, index) => {
                    const isPositive = coin.change_pct >= 0;
                    const config = coinConfig[coin.name] || {
                        icon: <span className="text-white">?</span>,
                        color: "text-white",
                        bgColor: "bg-gray-700/20",
                    };

                    return (
                        <div
                            key={coin.symbol}
                            className={`relative overflow-hidden  rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group`}
                        >
                            <div className="relative z-10" onClick={() => openChartModal(coin.symbol)}>
                                {/* Coin Icon and Symbol */}
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full flex items-center justify-center" style={{ background: "" }}>
                                            {config.icon}
                                        </div>
                                        <span className="font-bold text-white text-sm">{coin.name}</span>
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${isPositive
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                        }`}>
                                        {isPositive ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                                        {isPositive ? "+" : ""}{coin.change_pct.toFixed(2)}%
                                    </div>


                                </div>
                                {/* <div className="w-full flex items-center justify-between">
                                    <div className="mb-1">
                                        <div className="text-white  text-lg">
                                            ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                    <div>
                                        <span className=" text-white text-sm">{coin.symbol}</span>
                                    </div>


                                </div> */}

                                {/* Price */}


                                {/* Change Percentage */}

                            </div>
                        </div>
                    );
                })}
            </div>
            {isModalOpen && chartSymbol && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={closeChartModal} // close when clicking outside
                >
                    <div
                        className="relative bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-6xl h-[80%] overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-1 right-10 z-50 text-white text-2xl font-semibold hover:text-red-500 transition-colors"
                            onClick={closeChartModal}
                        >
                            ✖
                        </button>

                        {/* Chart Container */}
                        <div className="w-full h-full">
                            <BinanceChart chartSymbol={chartSymbol} height="100%" />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
