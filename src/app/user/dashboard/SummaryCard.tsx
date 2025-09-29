"use client";
import React from "react";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { BiWallet } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface BalanceData {
    current_balance: number | null;
    opening_balance: number | null;
    netpnl_usd: number | null;
    day_net_pnl_pct: number | null;
    week_net_pnl_pct: number | null;
    month_net_pnl_pct: number | null;
    overall_net_pnl_pct: number | null;
}

interface TradeData {
    id: number;
    closed_at: string;
    created_at:string;
    net_pnl: number;
    net_pnl_pct: number;
    dry_run: boolean;
    // ... other trade fields
}

interface SummaryCardsProps {
    demo_balance: number | null;
    testmode: boolean,
    balance?: BalanceData | null;
    trades?: TradeData[] | null;
    error?: boolean;
    loading: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
    demo_balance,
    testmode,
    balance,
    trades,
    error,
    loading,
}) => {
    if (error) {
        return (
            <div className="text-red-500 text-center p-6 bg-[#1c1c35] rounded-xl border border-red-500/20">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <FiAlertCircle className="w-5 h-5" />
                    <span className="font-medium">Error</span>
                </div>
                <p className="text-sm text-red-400">
                    Failed to load summary data.
                </p>
            </div>
        );
    }
    // Process trade data for the chart
    const processTradeData = (trades: TradeData[] | null) => {
        if (!trades) return null;

        // Filter trades based on test mode - ADDED
        const filteredByTestMode = trades.filter(trade =>
            testmode ? trade.dry_run === true : trade.dry_run === false
        );

        // Filter today's trades
        const today = new Date().toISOString().split("T")[0];
        const todayTrades = filteredByTestMode.filter((trade) =>
            trade.created_at?.startsWith(today)
        );

        if (todayTrades.length === 0) return null;

        // Sort by closing time
        todayTrades.sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        // Calculate cumulative PnL
        let cumulativePnl = 0;
        const data = todayTrades.map((trade) => {
            cumulativePnl += trade.net_pnl_pct;
            return {
                time: new Date(trade.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                net_pnl_pct: trade.net_pnl_pct,
            };
        });

        return {
            labels: data.map((d) => d.time),
            values: data.map((d) => d.net_pnl_pct),
        };
    };

    const chartData = processTradeData(trades || null);

    // Chart configuration
    const chartConfig = {
        labels: chartData?.labels || [],
        datasets: [
            {
                label: "Today's PnL",
                data: chartData?.values || [],
                borderColor: balance?.netpnl_usd && balance.netpnl_usd >= 0 ? "#0ecb81" : "#f6465d",
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(
                        0,
                        balance?.netpnl_usd && balance.netpnl_usd >= 0
                            ? "rgba(14, 203, 129, 0.2)"
                            : "rgba(246, 70, 93, 0.2)"
                    );
                    gradient.addColorStop(
                        1,
                        balance?.netpnl_usd && balance.netpnl_usd >= 0
                            ? "rgba(14, 203, 129, 0)"
                            : "rgba(246, 70, 93, 0)"
                    );
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                intersect: false,
                mode: "index" as const,
                backgroundColor: '#1a1a2e',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#333',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 10,
                    },
                },
            },
            y: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
            mode: "index" as const,
        },
    };
    // Helper function to render PnL percentage
    const renderPnLPercentage = (value: number | null, label: string) => (
        <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs text-gray-400 truncate">{label}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
                <p
                    className={`text-sm sm:text-base lg:text-lg font-semibold truncate ${value && value >= 0
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                >
                    {value !== null
                        ? `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
                        : "0.00%"}
                </p>
            </div>
        </div>
    );

    // Loading state
    if (loading || !balance) {
        return (
            <div className="bg-[#0e0e25] rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 w-full max-w-full overflow-hidden">
                <div className="animate-pulse">
                    {/* Mobile & Tablet loading - stacked */}
                    <div className="block xl:hidden space-y-4 sm:space-y-6">
                        <div className="space-y-2 sm:space-y-3">
                            <div className="h-3 sm:h-4 w-24 sm:w-32 bg-gray-700 rounded"></div>
                            <div className="h-6 sm:h-8 w-32 sm:w-40 bg-gray-600 rounded"></div>
                            <div className="h-2 sm:h-3 w-20 sm:w-24 bg-gray-700 rounded"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="space-y-1 sm:space-y-2">
                                <div className="h-2 sm:h-3 w-8 sm:w-12 bg-gray-700 rounded mx-auto"></div>
                                <div className="h-4 sm:h-5 w-12 sm:w-16 bg-gray-600 rounded mx-auto"></div>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <div className="h-2 sm:h-3 w-8 sm:w-12 bg-gray-700 rounded mx-auto"></div>
                                <div className="h-4 sm:h-5 w-12 sm:w-16 bg-gray-600 rounded mx-auto"></div>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <div className="h-2 sm:h-3 w-8 sm:w-12 bg-gray-700 rounded mx-auto"></div>
                                <div className="h-4 sm:h-5 w-12 sm:w-16 bg-gray-600 rounded mx-auto"></div>
                            </div>
                        </div>
                        <div className="h-40 sm:h-48 lg:h-52 bg-gray-800 rounded-lg"></div>
                    </div>

                    {/* Desktop loading - side by side */}
                    <div className="hidden xl:flex justify-between items-start gap-6 lg:gap-8">
                        <div className="flex-1 space-y-4 lg:space-y-6">
                            <div className="space-y-2 lg:space-y-3">
                                <div className="h-4 w-32 bg-gray-700 rounded"></div>
                                <div className="h-6 lg:h-8 w-40 bg-gray-600 rounded"></div>
                                <div className="h-3 w-24 bg-gray-700 rounded"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 lg:gap-6">
                                <div className="space-y-2">
                                    <div className="h-3 w-12 bg-gray-700 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-600 rounded"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-12 bg-gray-700 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-600 rounded"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-12 bg-gray-700 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-600 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 h-40 lg:h-44 bg-gray-800 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0e0e25] rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-800/50 w-full max-w-full overflow-hidden">
            {/* Mobile & Tablet Layout - Stacked */}
            <div className="block xl:hidden space-y-4 sm:space-y-6">
                {/* Balance Section */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                        {/* {testmode && <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm text-white">Demo Balance</span>
                            <p className="text-xl sm:text-2xl lg:text-2xl font-bold text-white break-all">
                                ${demo_balance}
                            </p>

                        </div>} */}
                        <div className="flex items-center gap-2">
                            <BiWallet className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{testmode ? "Demo Balance" : "Estimated Balance"}</p>

                        </div>

                        <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white break-all">
                                {balance.current_balance?.toFixed(8) ?? "0.00000000"}
                            </p>
                            <span className="text-xs sm:text-sm text-gray-400">USDT</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400">
                            ≈ ${balance.current_balance?.toFixed(2) ?? "0.00"}
                        </p>
                    </div>

                    {/* PnL Grid for Mobile & Tablet */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3 border-t border-gray-800/50">
                        {renderPnLPercentage(balance.day_net_pnl_pct, "Today")}
                        {renderPnLPercentage(balance.week_net_pnl_pct, "Week")}
                        {renderPnLPercentage(balance.month_net_pnl_pct, "Month")}
                    </div>
                </div>

                {/* Chart Section */}
                <div className="space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">Today's Performance</p>
                    <div className="h-40 sm:h-48 lg:h-52 bg-gray-900/50 rounded-lg w-full overflow-hidden">
                        {chartData ? (
                            <div className="h-full w-full">
                                <Line data={chartConfig} options={options} />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                                <div className="text-center space-y-1 sm:space-y-2">
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-lg sm:text-xl">
                                        📈
                                    </div>
                                    <p>No trades today</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Side by Side */}
            <div className="hidden xl:flex justify-between items-start gap-6 lg:gap-8">
                {/* Left side - Balance info */}
                <div className="flex-1 space-y-4 lg:space-y-6 min-w-0">
                    <div className="space-y-2 lg:space-y-3">
                        {/* {testmode && <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm text-white">Demo Balance</span>
                            <p className="text-xl sm:text-2xl lg:text-2xl font-bold text-white break-all">
                                ${demo_balance}
                            </p>

                        </div>} */}
                        <div className="flex items-center gap-2">
                            <BiWallet className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{testmode ? "Demo Balance" : "Estimated Balance"}</p>
                        </div>

                        <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-2xl lg:text-3xl font-bold text-white break-all">
                                {balance.current_balance?.toFixed(8) ?? "0.00000000"}
                            </p>
                            <span className="text-sm text-gray-400">USDT</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            ≈ ${balance.current_balance?.toFixed(2) ?? "0.00"}
                        </p>
                    </div>

                    {/* PnL Grid for Desktop */}
                    <div className="grid grid-cols-3 gap-4 lg:gap-6 py-3 lg:py-4 border-t border-gray-800/50">
                        {renderPnLPercentage(balance.day_net_pnl_pct, "Today")}
                        {renderPnLPercentage(balance.week_net_pnl_pct, "Week")}
                        {renderPnLPercentage(balance.month_net_pnl_pct, "Month")}
                    </div>
                </div>

                {/* Right side - Chart */}
                <div className="flex-1 space-y-2 lg:space-y-3 min-w-0">
                    <p className="text-sm text-gray-400 font-medium">Today's Performance</p>
                    <div className="h-40 lg:h-44 bg-gray-900/50 rounded-lg overflow-hidden">
                        {chartData ? (
                            <div className="h-full w-full">
                                <Line data={chartConfig} options={options} />
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                <div className="text-center space-y-2">
                                    <div className="w-12 h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-xl">
                                        📈
                                    </div>
                                    <p>No trades today</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;