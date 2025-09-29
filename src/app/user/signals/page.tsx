'use client';

import React, { useEffect, useState, useMemo } from "react";

import { FiRefreshCw } from "react-icons/fi";
import { getBalance, getTradeSignals, getTrades } from "@/api/dashboard";
import { getbinanceKeys, postbinanceKeys } from "@/api/setapikeys";
import toast from "react-hot-toast";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { FiInfo, FiSearch, FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import TradeReasonPanel from "./TradeReasonPanel";
import SignalDashboard from "./SignalDashboard";
import BinanceChart from "../dashboard/BinanceChart";
import HotCoins from "../dashboard/HotCoins";
import CryptocurrencyMarket from "../dashboard/CryptocurrencyMarket";
import TechnicalAnalysis from "../dashboard/TechnicalAnalysis";

type Signal = {
    id: number;
    symbol: string;
    score: number;
    decision: string;
    reason?: any;
    tp_percent?: number;
    sl_percent?: number;
    time_window?: string;
    created_at: string;
    used?: boolean;
    details?: any;
};

function formatDate(iso: string) {
    try {
        const d = new Date(iso);
        return d.toLocaleString(); // local format
    } catch {
        return iso;
    }
}


function scoreColor(score: number) {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
}

export default function DashboardPage() {
    const [data, setData] = useState<Signal[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"symbol" | "score" | "created_at" | "used">("created_at");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);





    useEffect(() => setPage(1), [search, sortBy, sortDir, pageSize]);


    const fetchSignals = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getTradeSignals()

            if (res.status !== 200) {

                throw new Error("error");
            }

            const json = res.data;
            // expect an array
            setData(Array.isArray(json) ? json : []);
            if (Array.isArray(res.data) && res.data.length > 0) {
                setSelectedSignal(res.data[0]); // default
            }
        } catch (err: any) {
            console.error("Fetch signals error:", err);
            setError(err?.message || "Failed to load signals");
            setData(null);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    useEffect(() => {

        fetchSignals();

    }, []);



    // Derived filtered + sorted data
    const processed = useMemo(() => {
        if (!data) return [];

        // 1) filter
        const q = search.trim().toLowerCase();
        let filtered = q
            ? data.filter((s) => {
                const symbol = (s.symbol || "").toLowerCase();
                const reason = (s.reason || "").toLowerCase();
                return symbol.includes(q) || reason.includes(q);
            })
            : [...data];

        // 2) sort
        filtered.sort((a, b) => {
            let av: any = a[sortBy];
            let bv: any = b[sortBy];

            // normalize
            if (sortBy === "symbol") {
                av = (av || "").toString().toLowerCase();
                bv = (bv || "").toString().toLowerCase();
            } else if (sortBy === "created_at") {
                av = new Date(av || 0).getTime();
                bv = new Date(bv || 0).getTime();
            } else if (sortBy === "used") {
                av = a.used ? 1 : 0;
                bv = b.used ? 1 : 0;
            } else if (sortBy === "score") {
                av = Number(av || 0);
                bv = Number(bv || 0);
            }

            if (av < bv) return sortDir === "asc" ? -1 : 1;
            if (av > bv) return sortDir === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [data, search, sortBy, sortDir]);

    const total = processed.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pageData = processed.slice((page - 1) * pageSize, page * pageSize);

    // helper to toggle sort when header clicked
    const handleSort = (field: typeof sortBy) => {
        if (sortBy === field) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(field);
            setSortDir("desc");
        }
    };
    const renderReasonsTooltip = (reason: string | any) => {
        if (!reason) return <span>-</span>;

        let parsed: any;

        try {
            if (typeof reason === "string") {
                // normalize Python-style to valid JSON
                const cleaned = reason
                    .replace(/'/g, '"')                       // single → double quotes
                    .replace(/\bTrue\b/g, "true")             // Python True → true
                    .replace(/\bFalse\b/g, "false")           // Python False → false
                    .replace(/\bNone\b/g, "null")             // Python None → null
                    .replace(/np\.True_/g, "true")            // np.True_ → true
                    .replace(/np\.False_/g, "false")          // np.False_ → false
                    .replace(/np\.float64\(([^)]+)\)/g, "$1"); // np.float64(...) → number

                parsed = JSON.parse(cleaned);
            } else {
                parsed = reason; // already object
            }
        } catch (err) {
            console.error("❌ JSON parse failed:", err, reason);
            return <span>-</span>;
        }

        // get reasons array
        let reasonsArray = parsed.reasons || parsed?.core?.reasons || parsed;

        if (!Array.isArray(reasonsArray)) {
            console.warn("⚠️ No reasons array found:", parsed);
            return <span>-</span>;
        }

        return (
            <ul className="space-y-1">
                {reasonsArray.map((r: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className={r.value ? "text-green-400" : "text-red-400"}>
                            {r.value ? "✔" : "✘"}
                        </span>
                        <span>{r.reason || "-"}</span>
                    </li>
                ))}
            </ul>
        );
    };




    return (
        <div className="p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-foreground">Trade Signals</h2>
                    <p className="text-sm text-gray-400 mt-1">Overview latest trading signals</p>
                </div>
                <button
                    onClick={() => { setRefreshing(true); fetchSignals(); }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-foreground transition"
                    aria-label="Refresh signals"
                >
                    <FiRefreshCw />
                    <span className="text-sm">{refreshing ? "Refreshing..." : "Refresh"}</span>
                </button>

            </div>


            <div className="bg-[#0e0e25] p-4 rounded-xl shadow-md">

                {pageData.length > 0 && <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                        Latest Signals is <span className="ml-2 text-lg text-brown font-bold">{selectedSignal?.symbol || "—"}</span>
                    </h3>

                    <p className="ml-2 text-lg text-green-400 font-bold">{data ? `${data.length} signals` : "—"}</p>
                </div>}

                {/* Controls: Search, Sort, Page Size */}
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-2 w-full md:w-1/2">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by symbol or reason..."
                                className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)]"
                                aria-label="Search signals"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">Show</label>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="bg-white/5 px-1 py-1 rounded-lg"
                                aria-label="Page size"
                            >
                                {[5, 10, 20, 50].map((n) => (
                                    <option className="bg-background" key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-400 hidden sm:inline">Sort by</div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleSort("created_at")}
                                className={`px-3 py-2 rounded-lg text-sm ${sortBy === "created_at" ? "bg-white/10 text-white" : "bg-transparent text-gray-300 hover:bg-white/5"}`}
                            >
                                Date {sortBy === "created_at" ? (sortDir === "asc" ? "↑" : "↓") : null}
                            </button>

                            <button
                                onClick={() => handleSort("symbol")}
                                className={`px-3 py-2 rounded-lg text-sm ${sortBy === "symbol" ? "bg-white/10 text-white" : "bg-transparent text-gray-300 hover:bg-white/5"}`}
                            >
                                Symbol {sortBy === "symbol" ? (sortDir === "asc" ? "↑" : "↓") : null}
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded" />
                                <div className="flex-1">
                                    <div className="h-3 bg-white/5 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                </div>
                                <div className="w-24 h-8 bg-white/5 rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {error && !loading && (
                    <div className="py-6 text-center">
                        <p className="text-sm text-red-400 mb-3">Error: {error}</p>
                        <button onClick={fetchSignals} className="px-4 py-2 rounded bg-red-600 text-white">
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && processed.length === 0 && (
                    <div className="py-8 text-center text-gray-400">No signals found.</div>
                )}


                {!loading && !error && pageData.length > 0 && (
                    <div className="hidden md:block">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-sm text-gray-400 border-b border-gray-700">
                                    <th className="py-3 px-2 cursor-pointer" onClick={() => handleSort("symbol")}>
                                        Symbol {sortBy === "symbol" ? (sortDir === "asc" ? "▲" : "▼") : null}
                                    </th>
                                    <th className="py-3 px-2 cursor-pointer" onClick={() => handleSort("score")}>
                                        Confidante  {sortBy === "score" ? (sortDir === "asc" ? "▲" : "▼") : null}
                                    </th>
                                    {/* <th className="py-3 px-2">Decision</th> */}
                                    {/* <th className="py-3 px-2">TP / SL</th> */}
                                    <th className="py-3 px-2">Time Window</th>
                                    <th className="py-3 px-2 cursor-pointer" onClick={() => handleSort("created_at")}>
                                        Created {sortBy === "created_at" ? (sortDir === "asc" ? "▲" : "▼") : null}
                                    </th>
                                    {/* <th className="py-3 px-2 text-right cursor-pointer" onClick={() => handleSort("used")}>
                                        Used {sortBy === "used" ? (sortDir === "asc" ? "▲" : "▼") : null}
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map((s) => (
                                    <tr
                                        key={s.id}
                                        className={`border-b border-gray-700 hover:bg-white/2 transition cursor-pointer ${selectedSignal?.id === s.id ? "bg-white/5" : ""}`}
                                        onClick={() => {
                                            setSelectedSignal(s);
                                            document.getElementById("signaldashboard")?.scrollIntoView({ behavior: "smooth" })
                                        }}
                                    >
                                        <td className="py-3 px-2 align-top">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{s.symbol}</span>
                                                {s.reason && (
                                                    <div className="relative group">
                                                        <FiInfo className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                                                            {renderReasonsTooltip(s.reason)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="py-3 px-2 align-top">
                                            <div className="flex items-center gap-3">
                                                <div className={`px-2 py-1 rounded text-sm font-semibold `}>{s.score}</div>
                                            </div>
                                        </td>

                                        {/* <td className="py-3 px-2 align-top">
                                            <span className={`px-2 py-1 rounded text-sm font-semibold ${s.decision.toLowerCase() === "yes" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                                                {s.decision}
                                            </span>
                                        </td> */}

                                        {/* <td className="py-3 px-2 align-top">
                                            <div className="text-sm">{s.tp_percent ? `${s.tp_percent}%` : "—"}</div>
                                            <div className="text-xs text-gray-400">SL: {s.sl_percent ? `${s.sl_percent}%` : "—"}</div>
                                        </td> */}

                                        <td className="py-3 px-2 align-top text-sm text-gray-300">{s.time_window || "—"}</td>

                                        <td className="py-3 px-2 align-top text-sm text-gray-300">{formatDate(s.created_at)}</td>

                                        {/* <td className="py-3 px-2 align-top text-right">
                                            {s.used ? <span className="text-sm px-2 py-1 bg-white/5 rounded text-green-300">Yes</span> : <span className="text-sm px-2 py-1 bg-white/5 rounded text-gray-400">No</span>}
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination controls */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                                Showing <span className="text-white">{(page - 1) * pageSize + 1}</span>–<span className="text-white">{Math.min(page * pageSize, total)}</span> of <span className="text-white">{total}</span>
                            </div>

                            <div className="flex items-center gap-2 mr-10 ">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1}
                                    className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50"
                                    aria-label="Previous page"
                                >
                                    <FiChevronLeft />
                                </button>
                                <div className="px-3 py-1 rounded bg-white/5">
                                    Page {page} / {totalPages}
                                </div>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50"
                                    aria-label="Next page"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile card list (paginated too) */}
                {!loading && !error && pageData.length > 0 && (
                    <div className="md:hidden space-y-3">
                        {pageData.map((s) => (
                            <div
                                key={s.id}
                                className={`p-3 rounded-lg cursor-pointer ${selectedSignal?.id === s.id ? "bg-white/5" : "bg-[#081027]"}`}
                                onClick={() => setSelectedSignal(s)}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-lg font-semibold">{s.symbol}</div>
                                            <div className={`text-sm px-2 py-0.5 rounded  text-white`}>{s.score}</div>
                                        </div>
                                        {/* <div className="text-xs text-gray-400 mt-1">{s.reason}</div> */}
                                        {/* <div className="flex items-center gap-3 mt-2 text-sm">
                                            <div className="text-gray-300">TP: {s.tp_percent ? `${s.tp_percent}%` : "—"}</div>
                                            <div className="text-gray-300">SL: {s.sl_percent ? `${s.sl_percent}%` : "—"}</div>
                                        </div> */}
                                        <div className="text-xs text-gray-400 mt-2">Window: {s.time_window || "—"}</div>
                                    </div>

                                    <div className="text-right">
                                        {/* <div className={`mb-2 text-sm ${s.decision.toLowerCase() === "yes" ? "text-green-400" : "text-red-400"}`}>{s.decision}</div> */}
                                        <div className="text-xs text-gray-400">{formatDate(s.created_at)}</div>
                                        {/* <div className="mt-2">
                                            {s.used ? <span className="text-xs px-2 py-1 bg-white/5 rounded text-green-300">Used</span> : <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">New</span>}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* mobile pagination */}
                        <div className="flex items-center justify-between mt-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="px-3 py-2 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50"
                            >
                                <FiChevronLeft />
                            </button>
                            <div className="text-sm text-gray-400">
                                Page {page} / {totalPages}
                            </div>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="mr-14 px-3  py-2 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <HotCoins />

            {selectedSignal && <SignalDashboard
                data={selectedSignal?.details}
                symbol={selectedSignal?.symbol || "—"}
                reasons={selectedSignal?.reason}
                signalscore={selectedSignal?.score || 0}
                timewindow={selectedSignal.time_window || ""}
            // reasons={selectedSignal?.reason} symbol={selectedSignal?.symbol || "—"}
            />
            }


            {/* <CryptocurrencyMarket /> */}
        </div>
    );
}
