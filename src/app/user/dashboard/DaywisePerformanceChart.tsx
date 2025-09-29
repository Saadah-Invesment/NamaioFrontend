'use client';

import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TradeData {
    created_at: string;
    net_pnl_pct: number;
    dry_run?: boolean;
}

interface DaywisePerformanceChartProps {
    trades: TradeData[] | null;
    testmode?: boolean;
}

const DaywisePerformanceChart: React.FC<DaywisePerformanceChartProps> = ({
    trades,
    testmode = false,
}) => {
    const [limit, setLimit] = useState(7); // Show last 7 days initially

    const chartData = useMemo(() => {
        if (!trades) return null;

        // Filter by testmode
        const filtered = trades.filter(trade =>
            testmode ? trade.dry_run === true : trade.dry_run === false
        );

        if (filtered.length === 0) return null;

        // Group by day
        const dayMap: Record<string, number[]> = {};
        filtered.forEach(trade => {
            const dateObj = new Date(trade.created_at);

            // Use month abbreviation + day (e.g. "Aug 05")
            const dayKey = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
            });

            if (!dayMap[dayKey]) dayMap[dayKey] = [];
            dayMap[dayKey].push(trade.net_pnl_pct);
        });


        // Convert to SUM % per day (instead of average)
        const daywiseData = Object.entries(dayMap)
            .map(([day, values]) => ({
                day,
                sum: values.reduce((a, b) => a + b, 0),
            }))
            .sort(
                (a, b) =>
                    new Date(a.day).getTime() - new Date(b.day).getTime()
            );

        // Apply limit (last N days)
        const limited = daywiseData.slice(-limit);

        return {
            labels: limited.map(d => d.day),
            values: limited.map(d => d.sum),
            totalCount: daywiseData.length,
        };
    }, [trades, testmode, limit]);

    const barChartConfig = useMemo(() => {
        if (!chartData) return null;

        const barCount = chartData.labels.length;

        // Dynamically calculate bar thickness
        const barThickness = barCount > 20 ? 8 : barCount > 10 ? 16 : 24;

        return {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Total PnL % (per day)',
                    data: chartData.values,
                    backgroundColor: chartData.values.map(v =>
                        v >= 0 ? 'rgba(14, 203, 129, 0.7)' : 'rgba(246, 70, 93, 0.7)'
                    ),
                    borderColor: chartData.values.map(v =>
                        v >= 0 ? '#0ecb81' : '#f6465d'
                    ),
                    borderWidth: 1,
                    barThickness, // <-- Dynamic bar size
                    maxBarThickness: 30, // Prevents bars from getting too thick
                    borderRadius: 4, // Rounded bars look cleaner
                },
            ],
        };
    }, [chartData]);


    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context: any) => `${context.raw.toFixed(2)}%`,
                    },
                    backgroundColor: '#1a1a2e',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#333',
                    borderWidth: 1,
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#6b7280',
                        font: { size: 11 },
                    },
                },
                y: {
                    ticks: {
                        callback: (val: any) => `${val}%`,
                        color: '#9ca3af',
                    },
                    grid: { color: '#2d2d3a' },
                },
            },
        }),
        []
    );

    return (
        <div className="flex-1 space-y-2 w-full">
            <p className="text-lg text-gray-50 font-medium">Daywise Performance</p>
            <div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-900/50 rounded-lg overflow-hidden">
                {chartData && barChartConfig ? (
                    <Bar data={barChartConfig} options={options} />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-xl">
                                📊
                            </div>
                            <p>No trades available</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls: Load More / Load All */}
            {chartData && chartData.totalCount > 7 && (
                <div className="flex justify-center space-x-2 flex-wrap">
                    {limit < chartData.totalCount && (
                        <button
                            onClick={() =>
                                setLimit(prev => Math.min(prev + 7, chartData.totalCount))
                            }
                            className="px-4 py-1 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                            Load More
                        </button>
                    )}
                    {limit < chartData.totalCount && (
                        <button
                            onClick={() => setLimit(chartData.totalCount)}
                            className="px-4 py-1 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
                        >
                            Load All
                        </button>
                    )}
                    {limit >= chartData.totalCount && (
                        <button
                            onClick={() => setLimit(7)}
                            className="px-4 py-1 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DaywisePerformanceChart;
