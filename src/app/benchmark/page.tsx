"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaSearch, FaTimes } from "react-icons/fa";
import UpcomingFeatures from "./UpcomingFeatures";
import BenchmarkLineChart from "./BenchmarkLineChart";
import BitwiseReturnsTable from "./BitwiseReturnsTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TezcaiConstituentsTable from "./TezcaiConstituentsTable";
import { Info } from "lucide-react";
import BenchmarkComparison from "./BenchmarkComparison";
import OutperformanceBarChart from "./OutperformanceBarChart";
interface ComparisonResult {
    day: string;
    bot_return: number;
    benchmark_return: number;
    outperformance_points: number;
    outperformance_percent: string;

}

export default function BenchmarkPage() {
    const [data, setData] = useState<ComparisonResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [fromDate, setFromDate] = useState(firstDayOfMonth.toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(yesterday.toISOString().split("T")[0]);

    // Quick filter selection
    const [activeFilter, setActiveFilter] = useState<string>("thisMonth");

    // Table controls
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [showInfo, setShowInfo] = useState(true);
    // Sorting
    const [sortConfig, setSortConfig] = useState<{
        key: keyof ComparisonResult;
        direction: "asc" | "desc";
    } | null>(null);

    useEffect(() => {
        fetchData();
    }, [fromDate, toDate]);

    const totals = data.reduce(
        (acc, row) => {
            acc.bot += row.bot_return;
            acc.market += row.benchmark_return;
            acc.outperformance_points += row.outperformance_points;
            return acc;
        },
        { bot: 0, market: 0, outperformance_points: 0 }
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://api.tezcai.com/api/comparison/?start=${fromDate}&end=${toDate}`
            );
            let results = res.data.results || [];
            results = results.sort((a: ComparisonResult, b: ComparisonResult) =>
                b.day.localeCompare(a.day)
            );
            setData(results);
            setError(false);
        } catch (err) {
            console.error("Benchmark fetch error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Sorting
    const handleSort = (key: keyof ComparisonResult) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data];
    if (sortConfig) {
        sortedData.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
            }
            return 0;
        });
    }

    // Search + Pagination
    const filteredData = sortedData.filter(item =>
        item.day.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);
    const totalPages = Math.ceil(filteredData.length / perPage);

    const renderSortIcon = (key: keyof ComparisonResult) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <FaArrowUp className="inline ml-1 text-gray-400" size={12} />
        ) : (
            <FaArrowDown className="inline ml-1 text-gray-400" size={12} />
        );
    };

    // Quick filters
    const applyFilter = (filter: string) => {
        setActiveFilter(filter);
        const now = new Date();
        let start: Date;
        let end: Date = yesterday;

        switch (filter) {
            case "yesterday":
                start = new Date(yesterday);
                end = new Date(yesterday);
                break;
            case "thisWeek":
                const dayOfWeek = now.getDay(); // 0 = Sunday
                start = new Date(now);
                start.setDate(now.getDate() - dayOfWeek + 1); // Monday
                break;
            case "lastWeek":
                const lastWeekEnd = new Date();
                lastWeekEnd.setDate(now.getDate() - now.getDay()); // Sunday
                const lastWeekStart = new Date();
                lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
                start = lastWeekStart;
                end = lastWeekEnd;
                break;
            case "thisMonth":
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case "lastMonth":
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case "thisYear":
                start = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                start = firstDayOfMonth;
        }

        setFromDate(start.toISOString().split("T")[0]);
        setToDate(end.toISOString().split("T")[0]);
    };

    const clearFilter = () => {
        setActiveFilter("thisMonth");
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        setFromDate(start.toISOString().split("T")[0]);
        setToDate(yesterday.toISOString().split("T")[0]);
    };

    const safeToFixed = (value: number | null, decimals = 2): string => {
        if (value === null || isNaN(value) || !isFinite(value)) {
            return "0.00";
        }
        return value.toFixed(decimals);
    };

    return (


        <section className="min-h-screen  pb-5">
            <div className="max-w-7xl mx-auto  rounded-2xl p-6 mt-5">
                <h2 className="text-2xl font-bold text-white ">
                    Tezcai 30 Index
                </h2>
                <p className="text-lg font-medium text-gray-400 mb-6">
                    While the market struggles, Tezcai delivers steady gains
                </p>
                {/* 🔹 Totals Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                    <div className="bg-[#0e0e25] p-4 rounded-lg text-center">
                        <h4 className="text-gray-400 text-sm">Total Tezcai Return</h4>
                        <p className={`text-xl font-bold ${totals.bot >= 0 ? "text-secondary" : "text-red-400"}`}>
                            {totals.bot.toFixed(2)}%
                        </p>
                    </div>
                    <div className="bg-[#0e0e25] p-4 rounded-lg text-center">
                        <h4 className="text-gray-400 text-sm">Total Market Return</h4>
                        <p className={`text-xl font-bold ${totals.market >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {totals.market.toFixed(2)}%
                        </p>
                    </div>
                    <div className="bg-[#0e0e25] p-4 rounded-lg text-center">
                        <h4 className="text-gray-400 text-sm">Total Outperformance</h4>
                        <p className={`text-xl font-bold ${totals.outperformance_points >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {totals.outperformance_points.toFixed(2)}
                        </p>
                    </div>
                </div>

                {(totals.bot !== null || totals.market !== null) && (
                    <h5 className="my-5 text-center text-gray-300 text-base">
                        Tezcai made{" "}
                        <span className="text-secondary font-semibold">
                            {safeToFixed(totals.bot)}%
                        </span>
                        , while the market (Tezcai 30 Index) made{" "}
                        <span className="text-blue-400 font-semibold">
                            {safeToFixed(totals.market)}%
                        </span>
                        {totals.outperformance_points !== null && (
                            <>
                                {" → we "}
                                <span
                                    className={`font-semibold `}
                                >
                                    {totals.outperformance_points >= 0
                                        ? "outperformed"
                                        : "underperformed"}
                                </span>{" "}
                                by{" "}
                                <span
                                    className={`font-semibold ${totals.outperformance_points >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {safeToFixed(Math.abs(totals.outperformance_points))}%
                                </span>
                                .{" "}

                            </>
                        )}
                    </h5>
                )}

                {/* 🔹 Custom Date Picker with Filter */}
                <div className="bg-[#0e0e25] p-4 rounded-t-lg">
                    <h2 className="text-lg font-bold text-white ">
                        Daily Performance vs Market
                    </h2>
                    <p className="text-base text-gray-400 mb-4">
                        Track Tezcai’s daily returns against the TEZCAI 30 Index.
                        Each row shows the Tezcai return, the market’s return, and the outperformance in percentage points, making it easy to see where Tezcai gained an edge or limited losses.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">

                        {/* Row 1: From + To */}
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className="flex-1 min-w-0">
                                <label className="block text-gray-400 text-sm mb-1">From Date</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    max={toDate}
                                    onChange={(e) => {
                                        setFromDate(e.target.value);
                                        setActiveFilter("thisMonth");
                                    }}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <label className="block text-gray-400 text-sm mb-1">To Date</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    min={fromDate}
                                    max={yesterday.toISOString().split("T")[0]}
                                    onChange={(e) => {
                                        setToDate(e.target.value);
                                        setActiveFilter("thisMonth");
                                    }}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Row 2: Quick Filter + Search */}
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className="flex-1 min-w-0">
                                <label className="block text-gray-400 text-sm mb-1">Quick Filter</label>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={activeFilter}
                                        onChange={(e) => applyFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="thisMonth">This Month</option>
                                        <option value="yesterday">Yesterday</option>
                                        <option value="thisWeek">This Week</option>
                                        <option value="lastWeek">Last Week</option>
                                        <option value="lastMonth">Last Month</option>
                                        <option value="thisYear">This Year</option>
                                    </select>
                                    {activeFilter !== "thisMonth" && (
                                        <button
                                            onClick={clearFilter}
                                            className="text-blue-400 hover:text-blue-300 text-sm underline whitespace-nowrap"
                                        >
                                            Clear Filter
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0 sm:max-w-xs">
                                <label className="block text-gray-400 text-sm mb-1">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="text-gray-400" size={14} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by date..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {/* 🔹 Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <svg
                            className="animate-spin h-6 w-6 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        <span className="ml-3 text-gray-400">Loading benchmark data...</span>
                    </div>
                ) : error ? (
                    <p className="text-red-400"></p>
                ) : filteredData.length === 0 ? (
                    <p className="text-gray-400 text-center py-6">
                        No benchmark data found.
                    </p>
                ) : (
                    <div className="overflow-x-auto bg-[#0e0e25]">
                        <table className="w-full border-collapse text-center"> {/* text-center applied */}
                            <thead>
                                <tr className="bg-gray-800 text-gray-300 text-sm">
                                    <th
                                        className="p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => handleSort("day")}
                                    >
                                        Date {renderSortIcon("day")}
                                    </th>
                                    <th
                                        className="p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => handleSort("bot_return")}
                                    >
                                        Tezcai Return {renderSortIcon("bot_return")}
                                    </th>
                                    <th
                                        className="p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => handleSort("benchmark_return")}
                                    >
                                        Market Return {renderSortIcon("benchmark_return")}
                                    </th>
                                    <th
                                        className="p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => handleSort("outperformance_points")}
                                    >
                                        Outperformance Points {renderSortIcon("outperformance_points")}
                                    </th>
                                    <th
                                        className="p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                                        onClick={() => handleSort("outperformance_points")}
                                    >
                                        Outperformance {renderSortIcon("outperformance_points")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-gray-700 hover:bg-gray-700/30 text-sm transition-colors"
                                    >
                                        <td className="p-4 text-white font-medium">{row.day}</td>
                                        <td
                                            className={`p-4 font-semibold ${row.bot_return >= 0 ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {row.bot_return.toFixed(2)}%
                                        </td>
                                        <td
                                            className={`p-4 font-semibold ${row.benchmark_return >= 0 ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {row.benchmark_return.toFixed(2)}%
                                        </td>
                                        <td
                                            className={`p-4 font-semibold ${row.outperformance_points >= 0 ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                {row.outperformance_points.toFixed(2)}
                                                {row.outperformance_points >= 0 ? (
                                                    <FaArrowUp className="text-sm" />
                                                ) : (
                                                    <FaArrowDown className="text-sm" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold">
                                            <div className="flex justify-center items-center gap-2">
                                                {row.outperformance_percent}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}

                {/* 🔹 Pagination + Page Size - Improved Styling */}
                {filteredData.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4  bg-[#0e0e25]  p-4 rounded-b-lg ">
                        {/* Pagination controls */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 transition-colors"
                            >
                                Previous
                            </button>
                            <span className="text-gray-300 px-3">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 transition-colors"
                            >
                                Next
                            </button>
                        </div>

                        {/* Page size selector */}
                        <div className="flex items-center gap-3 text-gray-300 mr-10">
                            <span className="text-sm">Rows per page:</span>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPage(1);
                                    setPerPage(Number(e.target.value));
                                }}
                                className="bg-gray-700 text-white px-3 py-1 rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                {[10, 20, 30, 50, 75, 100].map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
            {filteredData.length > 0 && (
                <BenchmarkLineChart filteredData={filteredData} />
            )}

            {filteredData.length > 0 && (
                <OutperformanceBarChart filteredData={filteredData} />
            )}



            <TezcaiConstituentsTable />

            <BenchmarkComparison />
            <div className="flex items-center justify-center gap-2 text-lg text-gray-400 mt-5">
                <Info size={14} className="text-gray-500" />
                <span>
                    Benchmark data from external platforms isn’t publicly accessible for
                    comparison, as most require subscriptions or restricted access.
                </span>
            </div>
            {/* <BitwiseReturnsTable /> */}

            {/* 🔹 Info Section at Bottom */}
            <UpcomingFeatures />
            {showInfo && (
                <div className="mt-5 p-6 max-w-6xl mx-auto  rounded-xl border border-gray-700 text-gray-300 leading-relaxed relative">
                    {/* Close button */}
                    <button
                        onClick={() => setShowInfo(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                    >
                        <FaTimes size={16} />
                    </button>

                    <h3 className="text-lg font-semibold text-white mb-3">
                        ⓘ   Why Tezcai Performance May Differ from the Market
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <span className="font-medium text-white">Not 24/7 trading –</span> The bot trades only when strict conditions are met (trend, volume, risk filters). If the market pumps suddenly but signals don’t confirm, the bot may skip trades. This protects from chasing bad moves.
                        </li>
                        <li>
                            <span className="font-medium text-white">Risk management first –</span> Even if the market is green, the bot may take a small loss because it cut trades early to avoid bigger drawdowns.
                        </li>
                        <li>
                            <span className="font-medium text-white">Focused protection in down markets –</span> If the bot shows less profit than the market on some days, it’s often because risk limits reduced exposure. On red market days, this same rule helps protect your capital (smaller losses compared to the index).
                        </li>
                        <li>
                            <span className="font-medium text-white">Consistency over chasing –</span> The system aims for consistent growth with controlled risk, not maximum daily returns. That means sometimes it underperforms in strong rallies but outperforms in choppy or bearish conditions.
                        </li>
                        <li>
                            <span className="font-medium text-white">Capital preservation –</span> Avoiding overtrading is intentional. Missing one green candle is better than being caught in a fake breakout. Long-term safety beats short-term noise.
                        </li>
                        <li>
                            <span className="font-medium text-white">Benchmark comparison –</span> The TEZCAI 30 benchmark reflects market movement. If the bot is slightly behind but still positive, remember: it traded only on qualified signals while also protecting from potential reversals.
                        </li>
                    </ul>
                </div>
            )}

        </section>


    );
}