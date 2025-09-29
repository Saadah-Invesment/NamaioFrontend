"use client";

import { useState, useEffect } from "react";

export default function SoundToggleButton() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sound_enabled");
    setAudioEnabled(saved === "true");

    const sound = new Audio("/sounds/tradenotifi.wav");
    setAudio(sound);
  }, []);

  const handleToggle = async () => {
    if (!audioEnabled) {
      try {
        // await audio?.play();
        // audio?.pause();
        if (audio) audio.currentTime = 0;

        setAudioEnabled(true);
        localStorage.setItem("sound_enabled", "true"); // ✅ save in storage
        console.log("🔊 Sound enabled");
      } catch (err) {
        console.error("⚠️ Failed to enable sound:", err);
      }
    } else {
      setAudioEnabled(false);
      localStorage.setItem("sound_enabled", "false"); // ✅ save in storage
      console.log("🔇 Sound disabled");
    }
  };

  return (
    <div className="">
       <p className="text-sm">Trade Notification </p>
      <button
      onClick={handleToggle}
      className={`px-4 py-1 rounded-lg font-medium transition ${
        audioEnabled
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-700 text-white hover:bg-gray-600"
      }`}
    >
      {audioEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
    </button>
    </div>
  );
}
