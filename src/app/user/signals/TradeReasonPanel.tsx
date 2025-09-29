'use client';

import React from "react";

type TradeReasonPanelProps = {
  reason: string | object;
};

const parsePythonJSON = (str: string) => {
  if (!str) return null;

  try {
    const cleaned = str
      .replace(/'/g, '"')
      .replace(/\bNone\b/g, "null")
      .replace(/\bTrue\b/g, "true")
      .replace(/\bFalse\b/g, "false")
      .replace(/np\.True_/g, "true")
      .replace(/np\.False_/g, "false")
      .replace(/np\.float64\(([^)]+)\)/g, "$1");

    return JSON.parse(cleaned);
  } catch {
    return [{ reason: str, value: true }];
  }
};

const TradeReasonPanel: React.FC<TradeReasonPanelProps> = ({ reason }) => {
  let parsed: any[] =
    typeof reason === "string"
      ? parsePythonJSON(reason)
      : Array.isArray(reason)
        ? reason
        : [];

  // 🚨 Filter out reasons containing ATR or RSI
  parsed = parsed.filter(
    (r) =>
      r.reason &&
      !r.reason.toUpperCase().includes("ATR") &&
      !r.reason.toUpperCase().includes("RSI")
  );

  if (!parsed || parsed.length === 0) {
    return (
      <div className="p-4 bg-gray-900 text-white rounded text-center">
        No reasons available
      </div>
    );
  }

  return (
    <div className="w-full p-2 bg-gray-900 text-white rounded-lg space-y-4">
      <h2 className="text-lg font-semibold text-secondary border-b border-gray-700 pb-2 mb-2">
        Reasoning Behind Signal
      </h2>
      <ul className="space-y-2">
        {parsed.map((r: any, i: number) => (
          <li
            key={i}
            className="flex flex-col md:flex-row md:justify-between bg-gray-800 p-2 rounded hover:bg-gray-700 transition"
          >
            <div className="text-sm flex items-center gap-2">
              <span
                className={
                  r.value ? "text-green-400 font-bold" : "text-red-400 font-bold"
                }
              >
                {r.value ? "✔" : "✘"}
              </span>
              <span>{r.reason}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeReasonPanel;
