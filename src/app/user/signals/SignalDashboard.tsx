"use client";

import React from "react";
import GaugeChart from "react-gauge-chart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { IoInformation } from "react-icons/io5";
import BinanceChart from "../dashboard/BinanceChart";
import TradeReasonPanel from "./TradeReasonPanel";
import TechnicalAnalysis from "../dashboard/TechnicalAnalysis";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

// Tooltip
const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <span className="w-3 h-3 bg-gray-700 rounded-lg justify-center group relative inline-flex items-center ml-1 cursor-pointer">
    <IoInformation size={14} className="text-[#6b7280]" />
    <span className="absolute bottom-full mb-1 hidden group-hover:block w-56 rounded bg-[#1f2937] text-xs text-gray-300 p-2 shadow-lg z-10">
      {text}
    </span>
  </span>
);

interface SignalData {
  ma_detail: { trend: string };
  atr_detail: { ok: string; value: number };
  rsi_detail: { value: number; status: string };
  trend_detail: {
    signal_type: string;
    near_high: boolean;
    dip3_ok: boolean;
    retrace_from_high: number;
    overshoot: number;
  };
  volume_detail: { ok: boolean; ratio: number; threshold: number };
  momentum_detail: { ok: boolean; value: number; threshold: number };
  score_breakdown: {
    total: number;
    volume: number;
    breakout: number;
    ma_trend: number;
    momentum: number;
    continuation: number;
  };
}

const SignalDashboard: React.FC<{ data: SignalData | null; symbol: string | null; reasons: any, signalscore: any, timewindow: string }> = ({
  data,
  symbol,
  reasons,
  signalscore,
  timewindow
}) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0f1e] text-gray-500 font-mono">
        No signal data available
      </div>
    );
  }

  const score = data.score_breakdown?.total ?? 0;

  const score_pct = signalscore || 0;
  const signalType = data.trend_detail?.signal_type ?? "—";
  const rsi = data.rsi_detail ?? { value: 0, status: "N/A" };
  const atr = data.atr_detail ?? { value: 0, ok: "" };
  const maTrend = data.ma_detail?.trend ?? "N/A";

  const volume = data.volume_detail ?? { ok: false, ratio: 0, threshold: 0 };
  const momentum = data.momentum_detail ?? { ok: false, value: 0, threshold: 0 };

  let signalStrengthText = "Weak";
  if (score_pct > 70) signalStrengthText = "Strong";
  else if (score_pct > 40) signalStrengthText = "Neutral";

  return (
    <div id="signaldashboard" className="p-4 md:p-6 bg-[#0a0f1e] text-[#e5e7eb] font-mono grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* SIGNAL SUMMARY */}
      <div className="col-span-12 md:col-span-3 bg-[#111827] p-5 rounded-2xl shadow-md flex flex-col">
        <div className="mb-3 flex items-center justify-between w-full">
          <h2 className="text-lg uppercase tracking-wide font-bold text-secondary">{symbol} {" "} <span className="text-xs text-white font-normal">({timewindow})</span></h2>
          <InfoTooltip text="Overall signal strength with type, trend, and acceleration." />
        </div>

        <GaugeChart
          id="summary-gauge"
          nrOfLevels={20}
          percent={score_pct / 100}

          colors={["#f87171", "#facc15", "#10b981"]}
          arcWidth={0.3}
          textColor="#e5e7eb"
          style={{ width: "100%", height: "auto" }}
        />
        <style jsx global>{`
  #summary-gauge text {
    display: none;
  }
`}</style>
        <div className="text-center font-bold text-4xl text-secondary">{signalscore}%</div>

        <div className="mt-2 text-center font-bold text-xl text-[#10b981]">{signalStrengthText.toUpperCase()}</div>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-400">Trend Direction</span>
            <span className={maTrend === "bullish" ? "text-[#10b981]" : "text-[#ef4444]"}>{maTrend.toUpperCase()}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Price Acceleration</span>
            <span className={momentum.ok ? "text-[#10b981]" : "text-[#6b7280]"}>{(momentum.value * 100).toFixed(2)}%</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Momentum</span>
            <span className={momentum.ok ? "text-[#10b981]" : "text-[#6b7280]"}>{momentum.ok ? "STRONG" : "WEAK"}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Signal</span>
            <span className={maTrend === "bullish" ? "text-[#10b981]" : "text-[#ef4444]"}>{signalType.toUpperCase()}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-400">Trading Activity</span>
            <span className={volume.ok ? "text-[#10b981]" : "text-[#3a98f0]"}>{volume.ok ? "High" : "Normal"}</span>
          </li>
        </ul>
      </div>

      {/* MAIN CHART */}
      <div className="col-span-12 md:col-span-9 bg-[#111827] rounded-2xl shadow-md h-[300px] md:h-[400px] overflow-hidden">
        <BinanceChart chartSymbol={symbol || ""} height="100%" />
      </div>

      {/* TRADE REASONS */}
      <div className="col-span-12 md:col-span-4 bg-[#111827] p-4 rounded-2xl shadow-md flex flex-col">
        <TradeReasonPanel reason={reasons} />
      </div>

      {/* VOLATILITY */}
      <div className="col-span-12 md:col-span-3 bg-[#111827] p-4 rounded-2xl shadow-md flex flex-col items-center">
        <h2 className="mb-5 mt-5 text-sm font-bold uppercase tracking-wide text-secondary flex items-center">
          Volatility <InfoTooltip text="Measures how much price moves up or down." />
        </h2>
        <GaugeChart
          id="volatility-gauge"
          nrOfLevels={20}
          percent={atr.value}
          colors={["#22d3ee", "#10b981"]}
          arcWidth={0.3}
          textColor="#e5e7eb"
          style={{ width: "100%" }}
        />
        <p className="mt-2 text-xl uppercase text-[#10b981]">{atr.ok}</p>

        <h2 className="mb-5 mt-5 text-sm font-bold uppercase tracking-wide text-secondary flex items-center">
          Strength Index <InfoTooltip text="Relative Strength of buyers vs sellers." />
        </h2>
        <GaugeChart
          id="strength-gauge"
          nrOfLevels={20}
          percent={rsi.value / 100}
          colors={["#f87171", "#facc15", "#10b981"]}
          arcWidth={0.3}
          textColor="#e5e7eb"
          style={{ width: "100%" }}
        />
        <p className="mt-2 text-xl text-[#10b981]">{rsi.status.toUpperCase()}</p>
      </div>
      <div className="col-span-12 md:col-span-5 bg-[#111827] p-4 rounded-2xl shadow-md flex flex-col items-center">
        <div className="flex items-center justify-start w-full">
          <InfoTooltip text="This panel shows TradingView’s technical analysis summary. It aggregates signals from popular indicators (RSI, MACD, Moving Averages, etc.) into Buy, Sell, or Neutral counts, then provides an overall trend signal (Strong Buy → Strong Sell). This is not a decision or prediction, only an automated indicator-based summary." />
        </div>
        <TechnicalAnalysis symbol={`BINANCE:${symbol}`} />
      </div>


    </div>
  );
};

export default SignalDashboard;
