'use client';

import { getMonthlyReports, getSummaryReports, trigerPay } from "@/api/reports";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

type Report = {
    id: number;
    month: string;
    summary: {
        total_trades: number;
        winrate_pct: number;
        total_pnl_pct: number;
        gross_profit: string;
        total_profit: string;
        tezcai_fee: string;
        affiliate_commission: string;
        is_referral: boolean;
        net_profit_after_fee: string;
    };
    payment: {
        status: "pending" | "paid";
        paid_date: string | null;
        invoice_id: string | null;
        payout_id: string | null;
        receipt_url: string | null;
    };
};

type Summary = {
    month: string;
    summary: {
        total_trades: number;
        wins: number;
        fees_paid: string;
        winrate_pct: string;
        total_pnl_pct: string;
        gross_profit: string;
        total_profit: string;
        tezcai_fee: string;
        affiliate_commission: string;
        net_profit_after_tezcai: string;
        net_profit_after_all_payouts: string;
        net_profit_after_fee: string;
    };
    payment: {
        status: "pending" | "paid";
        paid_date: string | null;
        invoice_id: string | null;
        payout_id: string | null;
        receipt_url: string | null;
    };
};

type StatusFilter = "all" | "paid" | "pending";

const ITEMS_PER_PAGE = 5;

export default function ReportsPage() {
    const searchParams = useSearchParams();
    const paymentStatus = searchParams.get("status");

    const [reports, setReports] = useState<Report[]>([]);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [payingId, setPayingId] = useState<string>("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const [showInvoice, setShowInvoice] = useState(false);

    // Handle payment callback status
    useEffect(() => {
        if (!paymentStatus) return;

        if (paymentStatus === "success") {
            toast.success("Payment Success");
            fetchReports?.();

            const timer = setTimeout(() => {
                router.push("/user/reports");
            }, 3000);
            return () => clearTimeout(timer);
        } else if (paymentStatus === "cancel") {
            toast.error("Payment Cancelled");
            const timer = setTimeout(() => {
                router.push("/user/reports");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentStatus, router]);

    // Fetch reports + summary
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = useCallback(() => {
        setLoading(true);
        setError(null);

        Promise.all([getMonthlyReports(), getSummaryReports()])
            .then(([res, summaryRes]) => {
                if (res.status !== 200) throw new Error("Failed to fetch reports");

                setReports(res.data || []);

                if (summaryRes?.status === 200) {
                    setSummary(summaryRes.data || null);
                }
            })
            .catch((err) => {
                const errorMessage = err instanceof Error ? err.message : "Something went wrong";
                setError(errorMessage);
                console.error("Fetch reports error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handlePay = useCallback(async (month: string) => {
        if (!month || payingId) return;
        setPayingId(month);
        setError(null);

        try {
            const res = await trigerPay(month);
            if (res.status === 200 && res.data?.checkout_url) {
                window.location.href = res.data.checkout_url;
            } else {
                throw new Error("Failed to initiate payment");
            }
        } catch (err) {
            let errorMessage = "Please try again later.";
            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.detail ||
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    err.message ||
                    errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        } finally {
            setPayingId("");
        }
    }, [payingId]);

    // Filter and search
    const filteredReports = useMemo(() => {
        if (!reports.length) return [];
        return reports.filter(report => {
            const statusMatch = statusFilter === "all" || report.payment.status === statusFilter;
            const searchLower = search.toLowerCase();
            const searchMatch = !search ||
                (report.month?.toLowerCase().includes(searchLower)) ||
                (report.summary.gross_profit?.toLowerCase().includes(searchLower));
            return statusMatch && searchMatch;
        });
    }, [reports, search, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
    const paginatedReports = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredReports.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage, filteredReports]);

    // Handlers
    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
        setCurrentPage(1);
    }, []);

    const handleStatusChange = useCallback((value: StatusFilter) => {
        setStatusFilter(value);
        setCurrentPage(1);
    }, []);

    const exportData = useCallback(() => {
        if (!filteredReports.length) return;
        const headers = [
            "Month", "Total Trades", "Winrate %", "Total PnL %",
            "Gross Profit", "Net Profit After Fee", "Tezcai Fee", "Affiliate commission",
            "Payment Status", "Paid Date"
        ];
        const csvContent = [
            headers.join(","),
            ...filteredReports.map(report => [
                report.month || "",
                report.summary.total_trades ?? "",
                report.summary.winrate_pct ?? "",
                report.summary.total_pnl_pct ?? "",
                report.summary.total_profit || "",

                report.summary.net_profit_after_fee || "",
                report.summary.tezcai_fee || "",
                report.summary.affiliate_commission || "",
                report.payment.status || "",
                report.payment.paid_date || ""
            ].join(","))
        ].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `reports_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [filteredReports]);

    const formatCurrency = (value: string | number | null | undefined): string => {
        if (!value && value !== 0) return "-"; // handle null, undefined, empty

        const parts = value.toString().split(/[\s,]+/).filter(Boolean);
        if (!parts.length) return "-";

        return parts
            .map((val) => {
                const num = Number(val);
                return isNaN(num) ? val : `$${num.toFixed(2)}`;
            })
            .join(" / ");
    };

    const formatPercentage = (value: number | string | null | undefined): string => {
        if (value == null || value === "") return "-";

        const num = Number(value);
        return isNaN(num) ? String(value) : `${num.toFixed(2)}%`;
    };



    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-100">Reports</h1>

            {summary && summary.month && (
                <div className="p-4 bg-[#0e0e25] text-white rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">Summary for {summary.month}</h2>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Total Trades</p>
                            <p className="text-lg font-bold">{summary.summary?.total_trades ?? "-"}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Wins</p>
                            <p className="text-lg font-bold">{summary.summary?.wins ?? "-"}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Winrate</p>
                            <p className="text-lg font-bold">{formatPercentage(summary.summary?.winrate_pct)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Total PnL %</p>
                            <p className="text-lg font-bold">{formatPercentage(summary.summary?.total_pnl_pct)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Gross Profit</p>
                            <p className="text-lg font-bold">{formatCurrency(summary.summary?.gross_profit)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Total Profit</p>
                            <p className="text-lg font-bold">{formatCurrency(summary.summary?.total_profit)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-green-400">Net Profit After Tezcai</p>
                            <p className="text-lg font-bold">{formatCurrency(summary.summary?.net_profit_after_tezcai)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-secondary">Tezcai Fee</p>
                            <p className="text-lg font-bold">{formatCurrency(summary.summary?.tezcai_fee)}</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded">
                            <p className="text-gray-400">Affiliate Commission</p>
                            <p className="text-lg font-bold">{formatCurrency(summary.summary?.affiliate_commission)}</p>
                        </div>
                    </div>

                    {/* Payment Details */}
                    {summary.payment && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="p-3 bg-gray-800 rounded flex justify-between">
                                    <div>
                                        <p className="text-gray-400">Status</p>
                                        <p
                                            className={`text-lg font-bold capitalize  py-1 rounded w-fit
                                                ${summary.payment?.status === "paid"
                                                    ? " text-green-600"
                                                    : " text-yellow-500"
                                                }`}
                                        >
                                            {summary.payment?.status || "-"}
                                        </p>

                                    </div>
                                    {summary.payment.status === "pending" && Number(summary.summary?.tezcai_fee) > 0 && (
                                        <div>
                                            <button
                                                onClick={() => handlePay(summary.month)}
                                                className=" bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                disabled={payingId === summary.month}
                                            >
                                                {payingId === summary.month
                                                    ? "Processing..."
                                                    : `Pay ${formatCurrency(summary.summary?.tezcai_fee)}`}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-gray-800 rounded">
                                    <p className="text-gray-400">Paid Date</p>
                                    <p className="text-sm ">{summary.payment.paid_date || "-"}</p>
                                </div>
                                <div className="p-3 bg-gray-800 rounded break-words">
                                    <p className="text-gray-400">Invoice</p>
                                    {summary.payment?.receipt_url ? (
                                        <button
                                            onClick={() => window.open(summary.payment.receipt_url || "", "_blank")}
                                            className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white"
                                        >
                                            <BsEye className="w-3 h-3" />
                                            View
                                        </button>
                                    ) : (
                                        <p className="text-sm text-white">No Invoice Available</p>
                                    )}
                                </div>


                            </div>
                        </div>
                    )}
                </div>
            )}


            <div className="p-3 sm:p-4 lg:p-6 bg-[#0e0e25] text-white rounded-lg sm:rounded-xl shadow-md w-full max-w-full overflow-hidden">
                <h2 className="text-xl font-bold mb-4 text-gray-100">Reports History</h2>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <input
                            type="month"
                            className="border rounded px-2 py-1 text-sm bg-gray-800 text-gray-200 border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <select
                            className="border rounded px-2 py-1 text-sm bg-gray-800 text-gray-200 border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => handleStatusChange(e.target.value as StatusFilter)}
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button
                        onClick={exportData}
                        disabled={!filteredReports.length}
                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-400">Loading reports...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchReports}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : !reports.length ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-lg">No reports available</p>
                        <p className="text-gray-500 text-sm mt-2">Reports will appear here once generated</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="text-gray-300 text-left text-sm">
                                    <tr>
                                        <th className="px-4 py-2">Month</th>
                                        <th className="px-4 py-2">Total Trades</th>
                                        <th className="px-4 py-2">Winrate (%)</th>
                                        <th className="px-4 py-2">Total PnL (%)</th>
                                        <th className="px-4 py-2">Gross Profit</th>
                                        <th className="px-4 py-2">Net Profit</th>
                                        <th className="px-4 py-2">Affiliate Commission</th>
                                        <th className="px-4 py-2">Tezcai Fee</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700 text-gray-300 text-sm">
                                    {paginatedReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="px-4 py-2">{report.month || "-"}</td>
                                            <td className="px-4 py-2">{report.summary.total_trades ?? "-"}</td>
                                            <td className="px-4 py-2">{formatPercentage(report.summary.winrate_pct)}</td>
                                            <td className="px-4 py-2">{formatPercentage(report.summary.total_pnl_pct)}</td>
                                            <td className="px-4 py-2">{formatCurrency(report.summary.total_profit)}</td>
                                            <td className="px-4 py-2">{formatCurrency(report.summary.net_profit_after_fee)}</td>
                                            <td className="px-4 py-2">{formatCurrency(report.summary.affiliate_commission)}</td>
                                            <td className="px-4 py-2">{formatCurrency(report.summary.tezcai_fee)}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${report.payment.status === "paid"
                                                    ? "bg-green-900 text-green-200"
                                                    : "bg-yellow-900 text-yellow-200"
                                                    }`}>
                                                    {report.payment.status || "-"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {report.payment.status === "paid" ? (
                                                    <div className="text-xs">
                                                        {report.payment.paid_date && (
                                                            <div className="text-white">{report.payment.paid_date}
                                                                <button
                                                                    onClick={() => window.open(report.payment.receipt_url || "", "_blank")}
                                                                    className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white"
                                                                >
                                                                    <BsEye className="w-4 h-4" />

                                                                </button>
                                                            </div>

                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {Number(report.summary.tezcai_fee) > 0 ? (
                                                            <button
                                                                onClick={() => handlePay(report.month)}
                                                                disabled={payingId === report.month || !report.month}
                                                                className="bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                            >
                                                                {payingId === report.month ? "Processing..." : `Pay ${formatCurrency(report.summary.tezcai_fee)}`}
                                                            </button>
                                                        ) : (
                                                            <span className="px-2 py-1 rounded-full text-xs font-medium uppercase">
                                                                {report.payment.status || "-"}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-6 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-400 mx-4">
                                    Page {currentPage} of {totalPages} ({filteredReports.length} total)
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
