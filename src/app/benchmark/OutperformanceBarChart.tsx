"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ComparisonResult {
    day: string; // date string like "2025-09-16"
    outperformance_points: number;
}

interface Props {
    filteredData: ComparisonResult[];
}

export default function OutperformanceBarChart({ filteredData }: Props) {
    // Sort data by date ascending
    const sortedData = [...filteredData].sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    const chartData = {
        labels: sortedData.map((item) => item.day),
        datasets: [
            {
                label: "Outperformance (Points)",
                data: sortedData.map((item) => item.outperformance_points),
                backgroundColor: sortedData.map((item) =>
                    item.outperformance_points >= 0 ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)"
                ),
                borderColor: sortedData.map((item) =>
                    item.outperformance_points >= 0 ? "rgb(34,197,94)" : "rgb(239,68,68)"
                ),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: "#fff" } },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#aaa" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
                ticks: {
                    color: "#aaa",
                    callback: (value: any) => `${value}%`,
                },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
        },
    };

    return (
        <div className="bg-[#0e0e25] p-4 rounded-lg mx-auto mt-6 max-w-6xl">
            <h3 className="text-lg font-semibold text-white mb-3">
               Daily Tezcai Outperformance VS Bennchmark
            </h3>
            <p className="text-base text-gray-400 mb-4">
               This chart shows how much Tezcai outperformed (or underperformed) the benchmark each day.
            </p>
            <div className="h-[450px] w-full">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
