"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function BenchmarkComparison() {
  const [benchmarks, setBenchmarks] = useState<
    { name: string; return_pct: number | null }[]
  >([]);
  const [asOfDate, setAsOfDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("https://api.tezcai.com/api/benchmark-index/");
        if (res.data) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          const monthStr = yesterday.toLocaleString("en-US", { month: "short" });
          setAsOfDate(`${monthStr} Month`);

          let data = res.data.indices || [];

          // --- Reorder: Tezcai Return & Tezcai 30 Index always first ---
          const priorityOrder = ["Tezcai Return", "Tezcai 30 Index"];
          const priorityItems = priorityOrder
            .map((name) => data.find((item: any) => item.name === name))
            .filter(Boolean); // remove null if not found
          const remainingItems = data.filter(
            (item: any) => !priorityOrder.includes(item.name)
          );

          setBenchmarks([...priorityItems, ...remainingItems]);
        } else {
          setError("No data available");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load benchmark data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#0e0e25] max-w-6xl mx-auto p-6 rounded-lg shadow-md  mt-6">
      <h3 className="text-xl font-semibold text-white mb-1">
        Benchmark Comparison
      </h3>
      <p className="text-sm text-gray-400 mb-4">As of: {asOfDate || "—"}</p>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : benchmarks.length === 0 ? (
        <p className="text-gray-400 text-sm">No benchmark data available</p>
      ) : (
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="text-gray-300 border-b border-gray-700">
              <th className="px-3 py-2 text-left">Index</th>
              <th className="px-3 py-2 text-right">1 Month</th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-[#1a1a3a] transition"
              >
                <td className="px-3 py-2 text-gray-200">{item?.name || "—"}</td>
                <td
                  className={`px-3 py-2 text-right font-medium ${item?.return_pct !== null && item?.return_pct >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {item?.return_pct !== null && item?.return_pct !== undefined
                    ? `${item.return_pct.toFixed(2)}%`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
