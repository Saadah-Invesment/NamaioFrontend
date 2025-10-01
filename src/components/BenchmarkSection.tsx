"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { FiArrowUpRight, FiArrowDownRight, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import GradientButton from "./UI/GradientLinkButton";

interface ComparisonResult {
  day: string;
  bot_return: number | null;
  benchmark_return: number | null;
  outperformance_points: number | null;
}

type LoadingState = "idle" | "loading" | "retrying";
type ErrorType = "network" | "api" | "data" | "timeout" | "unknown";

interface ErrorState {
  type: ErrorType;
  message: string;
  retryable: boolean;
}

export default function BenchmarkSection() {
  const [data, setData] = useState<ComparisonResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<ErrorState | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds
  const REQUEST_TIMEOUT = 10000; // 10 seconds

  const getErrorDetails = (err: any): ErrorState => {
    if (!navigator.onLine) {
      return {
        type: "network",
        message: "No internet connection. Please check your network.",
        retryable: true,
      };
    }

    if (axios.isAxiosError(err)) {
      if (err.code === "ECONNABORTED") {
        return {
          type: "timeout",
          message: "Request timed out. Server may be slow.",
          retryable: true,
        };
      }
      if (err.code === "ERR_NETWORK") {
        return {
          type: "network",
          message: "Unable to connect to server. Please try again.",
          retryable: true,
        };
      }
      if (err.response) {
        const status = err.response.status;
        if (status >= 500) {
          return {
            type: "api",
            message: "Server error. Our team has been notified.",
            retryable: true,
          };
        } else if (status === 404) {
          return {
            type: "api",
            message: "Data not found for the requested period.",
            retryable: false,
          };
        } else if (status === 429) {
          return {
            type: "api",
            message: "Too many requests. Please wait a moment.",
            retryable: true,
          };
        } else if (status >= 400) {
          return {
            type: "api",
            message: "Invalid request. Please refresh the page.",
            retryable: false,
          };
        }
      }
    }

    return {
      type: "unknown",
      message: "Something went wrong. Please try again.",
      retryable: true,
    };
  };

  const fetchData = useCallback(async (isRetry = false) => {
    try {
      if (isRetry) {
        setLoadingState("retrying");
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      } else {
        setLoadingState("loading");
      }
      setError(null);

      // --- Date Range (from 1st of this month until yesterday) ---
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const fromDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
      const fromStr = fromDate.toISOString().split("T")[0];
      const toStr = yesterday.toISOString().split("T")[0];

      const res = await axios.get(
        `https://api.namaio.com/api/comparison/?start=${fromStr}&end=${toStr}`,
        {
          timeout: REQUEST_TIMEOUT,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let results: any[] | null = null;
      if (res.data?.results && Array.isArray(res.data.results)) {
        results = res.data.results;
      } else if (Array.isArray(res.data)) {
        results = res.data;
      }

      if (!results || results.length === 0) {
        setData(null);
        setError({
          type: "data",
          message:
            "No performance data available for this month yet. This is normal for holidays.",
          retryable: false,
        });
        setLoadingState("idle");
        return;
      }

      // --- Aggregate Returns ---
      const sumSafe = (arr: any[], key: string) =>
        arr.reduce((acc, item) => {
          const val = Number(item[key]);
          return isNaN(val) ? acc : acc + val;
        }, 0);

      const totalBot = sumSafe(results, "bot_return");
      const totalBench = sumSafe(results, "benchmark_return");
      const totalOut = sumSafe(results, "outperformance_points");

      const monthStr = new Date(toStr).toLocaleString("en-US", { month: "short" });

      setData({
        day: `${monthStr} Month`,
        bot_return: totalBot,
        benchmark_return: totalBench,
        outperformance_points: totalOut,
      });

      setRetryCount(0);
      setLoadingState("idle");
    } catch (err) {
      const errorDetails = getErrorDetails(err);
      setError(errorDetails);
      setLoadingState("idle");

      if (errorDetails.retryable && retryCount < MAX_RETRIES && !isRetry) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => fetchData(true), RETRY_DELAY * (retryCount + 1));
      }
    }
  }, [retryCount]);

  useEffect(() => {
    fetchData();
  }, []);

  const renderValue = (
    value: number | null,
    positiveColor: string,
    negativeColor: string = "text-red-400",
    fallbackText: string = "No data"
  ) => {
    if (value === null || isNaN(value) || !isFinite(value)) {
      return <span className="text-gray-500">{fallbackText}</span>;
    }
    const isPositive = value >= 0;
    return (
      <span
        className={`flex items-center justify-center gap-2 ${isPositive ? positiveColor : negativeColor
          }`}
      >
        <CountUp end={value} decimals={2} duration={1.8} preserveValue={true} />%
        {isPositive ? (
          <FiArrowUpRight className="w-5 h-5 text-green-400" />
        ) : (
          <FiArrowDownRight className="w-5 h-5 text-red-400" />
        )}
      </span>
    );
  };

  const safeToFixed = (value: number | null, decimals = 2): string => {
    if (value === null || isNaN(value) || !isFinite(value)) {
      return "0.00";
    }
    return value.toFixed(decimals);
  };

  if (loadingState === "loading" || loadingState === "retrying") {
    return (
      <section className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <FiRefreshCw className="w-6 h-6 animate-spin" />
            <span>Loading performance data...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error && error.type !== "data") return null;
  if (!data) return null;

  return (
    <section className="bg-gray-900 py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          📊 Performance Benchmark (Namaio 30 Index) <br />
          <span className="text-gray-400 text-lg">(as of {data.day})</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-400 mb-3">Namaio Performance</p>
            <h3 className="text-4xl font-bold">
              {renderValue(data.bot_return, "text-secondary")}
            </h3>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-400 mb-3">Market Performance</p>
            <h3 className="text-4xl font-bold">
              {renderValue(data.benchmark_return, "text-blue-400")}
            </h3>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-400 mb-3">Outperformance</p>
            <h3 className="text-4xl font-bold">
              {renderValue(data.outperformance_points, "text-green-400")}
            </h3>
          </div>
        </div>

        {(data.bot_return !== null || data.benchmark_return !== null) && (
          <h5 className="mt-8 text-center text-gray-300 text-lg">
            Namaio made{" "}
            <span className="text-secondary font-semibold">
              {safeToFixed(data.bot_return)}%
            </span>
            , while the market (Namaio 30 Index) made{" "}
            <span className="text-blue-400 font-semibold">
              {safeToFixed(data.benchmark_return)}%
            </span>
            {data.outperformance_points !== null && (
              <>
                {" → we "}
                <span
                  className={`font-semibold ${data.outperformance_points >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {data.outperformance_points >= 0
                    ? "outperformed"
                    : "underperformed"}
                </span>{" "}
                by{" "}
                <span
                  className={`font-semibold ${data.outperformance_points >= 0
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {safeToFixed(Math.abs(data.outperformance_points))}%
                </span>
                .{" "}
                {/* <span className="text-blue-600 text-sm underline">
                  <Link href="/benchmark">View more</Link>
                </span> */}
              </>
            )}
          </h5>
        )}

        <div className="w-full flex justify-center pt-4">
          <GradientButton href='/benchmark'> View Full Report</GradientButton>
        </div>
      </div>
    </section>
  );
}
