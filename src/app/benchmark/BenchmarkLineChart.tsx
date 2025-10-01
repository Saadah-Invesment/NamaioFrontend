"use client";

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
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ComparisonResult {
    day: string; // should be a valid date string like "2025-09-22"
    bot_return: number;
    benchmark_return: number;
}

interface Props {
    filteredData: ComparisonResult[];
}

export default function BenchmarkLineChart({ filteredData }: Props) {
    // Sort data by date ascending
    const sortedData = [...filteredData].sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    const chartData = {
        labels: sortedData.map((item) => item.day),
        datasets: [
            {
                label: "Total Namaio Return",
                data: sortedData.map((item) => item.bot_return),
                borderColor: "#7efefd",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
                tension: 0.3,
            },
            {
                label: "Total Market Return",
                data: sortedData.map((item) => item.benchmark_return),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "white" },
            },
        },
        scales: {
            x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
        },
    };

    return (
        <div className="bg-[#0e0e25] p-4 rounded-lg max-w-6xl mx-auto mt-6 ">
            <h3 className="text-lg font-semibold text-white ">Cumulative Performance Comparison</h3>
            <p className="text-base text-gray-400 mb-4">
               This chart shows how Namaio’s returns have steadily separated from the market.
            </p>
            <div className="h-[450px] w-full">
                <Line
                    data={chartData}
                    options={{
                        ...options,
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top",
                                labels: {
                                    color: "#fff",
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: "#aaa" },
                                grid: { color: "rgba(255,255,255,0.1)" },
                            },
                            y: {
                                ticks: { color: "#aaa" },
                                grid: { color: "rgba(255,255,255,0.1)" },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
