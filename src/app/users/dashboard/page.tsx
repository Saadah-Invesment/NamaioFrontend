"use client";
import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { TrendingUp, DollarSign, Calendar, Activity, ArrowUp, ArrowDown } from "lucide-react";

ChartJS.register(
    LineElement,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [botActive, setBotActive] = useState(true);

    // Fund balance in USD
    const fundBalance = 12500.75;

    // Mock profits in percentages
    const dailyProfit = 1.2; // %
    const weeklyProfit = 4.8; // %
    const monthlyProfit = 6.5; // %

    // Mock chart data
    const profitTrendData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Daily Profit %",
                data: [1, 1.5, 1.3, 1.8, 2.2],
                fill: true,
                backgroundColor: "rgba(50, 191, 183, 0.1)",
                borderColor: "#32bfb7",
                tension: 0.4,
                pointBackgroundColor: "#32bfb7",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const winLossData = {
        labels: ["Win Trades", "Loss Trades"],
        datasets: [
            {
                data: [75, 25],
                backgroundColor: ["#32bfb7", "#0e2a4c"],
                borderWidth: 0,
            },
        ],
    };

    const monthlyProfitData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Monthly Profit %",
                data: [25, 32, 28, 36, 42, 39],
                backgroundColor: "#32bfb7",
                borderRadius: 8,
                barThickness: 40,
            },
        ],
    };

    const mockTrades = [
        { id: 1, pair: "EUR/USD", type: "Buy", profit: "+1.2%", result: "Win", date: "2025-10-01" },
        { id: 2, pair: "GBP/JPY", type: "Sell", profit: "-0.5%", result: "Loss", date: "2025-10-02" },
        { id: 3, pair: "USD/JPY", type: "Buy", profit: "+1.8%", result: "Win", date: "2025-10-03" },
        { id: 4, pair: "AUD/USD", type: "Buy", profit: "+0.9%", result: "Win", date: "2025-10-04" },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#0e2a4c",
                padding: 12,
                borderRadius: 8,
                titleColor: "#32bfb7",
                bodyColor: "#fff",
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#6b7280",
                },
            },
            y: {
                grid: {
                    color: "#f3f4f6",
                    drawBorder: false,
                },
                ticks: {
                    color: "#6b7280",
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    padding: 20,
                    color: "#374151",
                    font: {
                        size: 13,
                    },
                },
            },
            tooltip: {
                backgroundColor: "#0e2a4c",
                padding: 12,
                borderRadius: 8,
            },
        },
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-900 p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0e2a4c] to-[#1a3d5f] rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#32bfb7] opacity-10 rounded-full -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Namaio Dashboard</h1>
                        <p className="text-gray-300 text-sm">Monitor your trading performance in real-time</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                        <div className="text-right">
                            <p className="text-xs text-gray-300 mb-1">Bot Status</p>
                            <span className={`font-semibold ${botActive ? "text-[#32bfb7]" : "text-gray-400"}`}>
                                {botActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <button
                            onClick={() => setBotActive(!botActive)}
                            className={`${botActive ? "bg-[#32bfb7]" : "bg-gray-600"
                                } relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner`}
                        >
                            <span
                                className={`${botActive ? "translate-x-6" : "translate-x-1"
                                    } inline-block h-5 w-5 transform bg-white rounded-full transition-transform shadow-md`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow-md rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#0e2a4c] opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0e2a4c] to-[#1a3d5f] rounded-xl flex items-center justify-center shadow-md">
                            <DollarSign className="text-white" size={24} />
                        </div>
                        <div className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">
                            Live
                        </div>
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium mb-1">Fund Balance</h2>
                    <p className="text-3xl font-bold text-gray-900">${fundBalance.toFixed(2)}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#32bfb7] opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#32bfb7] to-[#28a59d] rounded-xl flex items-center justify-center shadow-md">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <ArrowUp className="text-green-600" size={20} />
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium mb-1">Daily Profit</h2>
                    <p className="text-3xl font-bold text-[#32bfb7]">{dailyProfit}%</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#32bfb7] opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#32bfb7] to-[#28a59d] rounded-xl flex items-center justify-center shadow-md">
                            <Calendar className="text-white" size={24} />
                        </div>
                        <ArrowUp className="text-green-600" size={20} />
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium mb-1">Weekly Profit</h2>
                    <p className="text-3xl font-bold text-[#32bfb7]">{weeklyProfit}%</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#32bfb7] opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#32bfb7] to-[#28a59d] rounded-xl flex items-center justify-center shadow-md">
                            <Activity className="text-white" size={24} />
                        </div>
                        <ArrowUp className="text-green-600" size={20} />
                    </div>
                    <h2 className="text-gray-500 text-sm font-medium mb-1">Monthly Profit</h2>
                    <p className="text-3xl font-bold text-[#32bfb7]">{monthlyProfit}%</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-[#0e2a4c]">Profit Trend</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">Daily %</span>
                    </div>
                    <div className="h-64">
                        <Line data={profitTrendData} options={chartOptions} />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-[#0e2a4c]">Win/Loss Ratio</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">Total</span>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <Pie data={winLossData} options={pieOptions} />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#0e2a4c]">Monthly Performance</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">2025</span>
                </div>
                <div className="h-72">
                    <Bar data={monthlyProfitData} options={chartOptions} />
                </div>
            </div>

            {/* Trade History Table */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#0e2a4c]">Recent Trades</h3>
                    <button className="text-sm text-[#32bfb7] hover:text-[#28a59d] font-medium transition-colors">
                        View All →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-4 px-4 text-sm font-semibold text-gray-600">Pair</th>
                                <th className="py-4 px-4 text-sm font-semibold text-gray-600">Type</th>
                                <th className="py-4 px-4 text-sm font-semibold text-gray-600">Profit</th>
                                <th className="py-4 px-4 text-sm font-semibold text-gray-600">Result</th>
                                <th className="py-4 px-4 text-sm font-semibold text-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTrades.map((trade, index) => (
                                <tr 
                                    key={trade.id} 
                                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                                        index === mockTrades.length - 1 ? "border-none" : ""
                                    }`}
                                >
                                    <td className="py-4 px-4">
                                        <span className="font-semibold text-gray-900">{trade.pair}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                            trade.type === "Buy" 
                                                ? "bg-blue-50 text-[#0e2a4c]" 
                                                : "bg-purple-50 text-purple-700"
                                        }`}>
                                            {trade.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`font-bold ${
                                                trade.profit.startsWith("+")
                                                    ? "text-[#32bfb7]"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {trade.profit}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                                trade.result === "Win"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            {trade.result}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{trade.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;