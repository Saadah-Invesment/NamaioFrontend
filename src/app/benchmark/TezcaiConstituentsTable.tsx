"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Constituent {
  symbol: string;
  name: string;
  price_usd: number;
  mcap_usd: number;
  price_change_24h_pct: number;
  weight_percent: number;
}

// Utility function to format Market Cap like $2.25T, $505.36B
function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return `$${value.toLocaleString()}`;
}

export default function TezcaiConstituentsTable() {
  const [data, setData] = useState<Constituent[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.tezcai.com/api/benchmarks/constituents/"
        );
        const json = res.data;
        setData(json.constituents || []);
        setLastUpdate(
          new Date(json.effective_date).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
        );
      } catch (err) {
        console.error("Error fetching Tezcai 30 data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#0e0e25]   rounded-lg shadow-md max-w-6xl mx-auto mt-6 p-6 overflow-x-auto">
      <h3 className="text-xl font-semibold text-white mb-1">
        Tezcai 30 Index Constituents
      </h3>
      {lastUpdate && (
        <p className="text-sm text-gray-400 mb-4">Last Update: {lastUpdate}</p>
      )}

      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Coin Name</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">Price 24h %</th>
            <th className="px-3 py-2 text-right">Market Cap</th>
            <th className="px-3 py-2 text-right">Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin, i) => (
            <tr
              key={i}
              className="border-b border-gray-800 hover:bg-[#1a1a3a] transition"
            >
              <td className="px-3 py-2 text-gray-300">{i + 1}</td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{coin.name}</span>
                  <span className="text-gray-400 text-xs">{coin.symbol}</span>
                </div>
              </td>
              <td className="px-3 py-2 text-right text-gray-200">
                ${coin.price_usd.toLocaleString()}
              </td>
              <td
                className={`px-3 py-2 text-right font-medium ${coin.price_change_24h_pct >= 0
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {coin.price_change_24h_pct.toFixed(2)}%
              </td>
              <td
                className="px-3 py-2 text-right text-gray-200"
                title={`$${coin.mcap_usd.toLocaleString()}`} // full value on hover
              >
                {formatMarketCap(coin.mcap_usd)}
              </td>
              <td className="px-3 py-2 text-right text-gray-200">
                {coin.weight_percent.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
