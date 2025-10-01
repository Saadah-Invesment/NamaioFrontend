"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TradeUpdate {
  type: string;
  symbol: string;
  status: string;
  qty?: number;
  price?: number;
}

export default function TradeUpdateSocket() {
  const [trades, setTrades] = useState<TradeUpdate[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Browser-only: create audio after mount
    const sound = new Audio("/sounds/tradenotifi.wav");
    setAudio(sound);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tezcai_token");
    if (!token) return;

    const ws = new WebSocket(`wss://api.namaio.com/ws/trades/?token=${token}`);

    ws.onopen = () => console.log("✅ WebSocket connected");

    ws.onmessage = (event) => {
      try {
        const data: TradeUpdate = JSON.parse(event.data);
        console.log("data", data);
        if (data.type === "trade_updated") {
          setTrades((prev) => [data, ...prev]);

          toast.success(`Trade updated: ${data.symbol} (${data.status})`);

          // Always read latest value from localStorage
          const audioEnabled = localStorage.getItem("sound_enabled") === "true";
          if (audio && audioEnabled) {
            audio.currentTime = 0;
            audio.play().catch((err) => console.error("Audio play failed:", err));
          }
        }

        if (data.type === "trade_opened") {
          setTrades((prev) => [data, ...prev]);
          console.log("data", data);
          toast.success(`New Trade: ${data.symbol} (${data.status})`);

          // Always read latest value from localStorage
          const audioEnabled = localStorage.getItem("sound_enabled") === "true";
          if (audio && audioEnabled) {
            audio.currentTime = 0;
            audio.play().catch((err) => console.error("Audio play failed:", err));
          }
        }
      } catch (err) {
        console.error("❌ Error parsing WS message:", err);
      }
    };

    ws.onerror = (err) => console.error("⚠️ WebSocket error:", err);
    ws.onclose = () => console.log("🔌 WebSocket closed");

    return () => ws.close();
  }, [audio]);

  return null;
}
