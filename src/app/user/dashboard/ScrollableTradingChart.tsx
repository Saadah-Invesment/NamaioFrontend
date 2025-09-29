'use client';

import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface TradeData {
  created_at: string;
  net_pnl_pct: number;
  dry_run?: boolean;
}

interface TodaysPerformanceChartProps {
  trades: TradeData[] | null;
  testmode?: boolean;
}

const TodaysPerformanceChart: React.FC<TodaysPerformanceChartProps> = ({
  trades,
  testmode = false,
}) => {
  const [limit, setLimit] = useState(10); // initial limit = 10

  const chartData = useMemo(() => {
    if (!trades) return null;

    // Filter trades based on test mode
    const filteredByTestMode = trades.filter(trade =>
      testmode ? trade.dry_run === true : trade.dry_run === false
    );

    if (filteredByTestMode.length === 0) return null;

    // Sort by created_at
    filteredByTestMode.sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Apply current limit
    const limitedData = filteredByTestMode.slice(-limit);

    return {
      labels: limitedData.map(trade => {
        const dateObj = new Date(trade.created_at);
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${month}/${day} ${time}`;
      }),
      values: limitedData.map(trade => trade.net_pnl_pct),
      totalCount: filteredByTestMode.length,
    };
  }, [trades, testmode, limit]);

  const lineChartConfig = useMemo(() => {
    if (!chartData) return null;

    return {
      labels: chartData.labels,
      datasets: [
        {
          label: "PnL %",
          data: chartData.values,
          borderColor: '#0ecb81',
          segment: {
            borderColor: (ctx: { p0: { parsed: { y: number } } }) =>
              ctx.p0.parsed.y >= 0 ? '#0ecb81' : '#f6465d',
          },
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(14, 203, 129, 0.2)');
            gradient.addColorStop(1, 'rgba(14, 203, 129, 0)');
            return gradient;
          },
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    };
  }, [chartData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index' as const,
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
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { size: 10 },
        },
      },
      y: { display: false },
    },
    interaction: { intersect: false, mode: 'index' as const },
  }), []);

  return (
    <div className="flex-1 space-y-2 lg:space-y-3 w-full">
      <p className="text-lg text-gray-50 font-medium">Overall Performance</p>
      <div className="h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-900/50 rounded-lg overflow-hidden">
        {chartData && lineChartConfig ? (
          <div className="h-full w-full">
            <Line data={lineChartConfig} options={options} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-xl">
                📈
              </div>
              <p>No trades available</p>
            </div>
          </div>
        )}
      </div>

      {/* Load More / Load All */}
      {chartData && chartData.totalCount > 10 && (
        <div className="flex justify-center space-x-2 flex-wrap">
          {limit < chartData.totalCount && (
            <button
              onClick={() => setLimit(prev => Math.min(prev + 10, chartData.totalCount))}
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
              onClick={() => setLimit(10)}
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

export default TodaysPerformanceChart;
