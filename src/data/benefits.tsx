import {
  FiBarChart2,
  FiCpu,
  FiTrendingUp,
  FiClock,
  FiZap,
  FiShield,
  FiLock,
  FiActivity,
  FiDatabase,
} from "react-icons/fi";

import { IBenefit } from "@/types";

export const benefits: IBenefit[] = [
  {
    title: "Smart Auto Trading",
    description:
      "Let Tezcai take control — our smart software system buys and sells automatically, optimizing every trade with precision.",
    bullets: [
      {
        title: "AI-Powered Execution",
        description:
          "Advanced algorithms analyze market data and execute trades instantly.",
        icon: <FiCpu size={26} />,
      },
      {
        title: "Volatility Scanning",
        description:
          "Identifies high volatility assets to capture the best trading opportunities.",
        icon: <FiTrendingUp size={26} />,
      },
      {
        title: "Fully Automated",
        description:
          "Set it once — Tezcai handles the rest with zero manual effort.",
        icon: <FiZap size={26} />,
      },
    ],
    imageSrc: "/images/mockup-1.webp",
  },
  {
    title: "Real-Time Insights & Dashboard",
    description:
      "Stay on top of your trades with a live dashboard showing performance, analytics, and full trade history.",
    bullets: [
      {
        title: "Live Metrics",
        description:
          "View real-time updates on profit, losses, and trade status.",
        icon: <FiBarChart2 size={26} />,
      },
      {
        title: "Trade History",
        description:
          "Access detailed logs of every trade made by the system.",
        icon: <FiClock size={26} />,
      },
      {
        title: "Strategy Controls",
        description:
          "Adjust risk levels, trade frequency, and preferences anytime.",
        icon: <FiActivity size={26} />,
      },
    ],
    imageSrc: "/images/mockup-2.webp",
  },
  {
    title: "Bank-Grade Security",
    description:
      "We take your security seriously. Tezcai is built with encryption, secure APIs, and real-time fraud protection.",
    bullets: [
      {
        title: "End-to-End Encryption",
        description:
          "Protects your data with military-grade encryption at all times.",
        icon: <FiLock size={26} />,
      },
      {
        title: "Secure API Linking",
        description:
          "Safely connect your trading accounts without storing sensitive data.",
        icon: <FiDatabase size={26} />,
      },
      {
        title: "Real-Time Threat Detection",
        description:
          "Constant monitoring for suspicious activity and unauthorized access.",
        icon: <FiShield size={26} />,
      },
    ],
    imageSrc: "/images/mockup-1.webp", // ✅ Unchanged as requested
  },
];
