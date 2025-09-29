"use client";

import { useEffect } from "react";

interface BinanceChartProps {
  chartSymbol: string; // e.g., "BTCUSDT"
  height?: string;      // default "500px"
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const BinanceChart: React.FC<BinanceChartProps> = ({ chartSymbol, height = "500px" }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const containerId = "tradingview-widget-container";

    // Remove old widget if exists
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
    }

    // Load TradingView script if not loaded
    if (!(window as any).TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => createWidget();
      document.body.appendChild(script);
    } else {
      createWidget();
    }

    function createWidget() {
      if (!(window as any).TradingView || !document.getElementById(containerId)) return;

      new window.TradingView.widget({
        container_id: containerId,
        autosize: true,
        symbol: `BINANCE:${chartSymbol}`,
        interval: "5",
        timezone: "Asia/Dubai",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1f2937",
        backgroundColor: "rgba(17, 24, 39, 1)",
        // "studies": [
        //   "STD;PSAR"
        // ],

        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: true,
      });

    }
  }, [chartSymbol]);

  return <div
    id="tradingview-widget-container"
    style={{ width: "100%", height }}
    className="rounded-2xl"
  />;
};

export default BinanceChart;
