"use client";

import React, { useState, useMemo } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaFilter,
  FaDownload,
  FaChartBar,
  FaEye,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaDatabase,
  FaTimes
} from "react-icons/fa";



import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import dynamic from "next/dynamic";
import BinanceChart from "./BinanceChart";
import DaywisePerformanceChart from "./DaywisePerformanceChart";


const ScrollableTradingChart = dynamic(
  () => import("./ScrollableTradingChart"),
  { ssr: false } // disable server-side rendering
);
type Trade = {
  id: number;
  user: number;
  signal: number;
  symbol: string;
  buy_avg: number;
  sell_avg: number | null;
  qty: number;
  pnl: number;
  status: string;
  exit_reason: string;
  created_at: string;
  closed_at: string;
  net_pnl: number | null;
  pnl_pct: number;
  net_pnl_pct: number;
  dry_run: boolean;
};

type Props = {
  trades: Trade[];
  loading?: boolean;
  error?: string;
  testmode: boolean;
  onDateFilter?: (from?: string, to?: string) => void;
};

const TradeTable: React.FC<Props> = ({ trades, loading = false, error, testmode, onDateFilter }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Trade>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pnlFilter, setPnlFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<{
    from: string;
    to: string;
    preset: string;
  }>({
    from: "",
    to: "",
    preset: "thismonth"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTrades, setSelectedTrades] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [visibleColumns, setVisibleColumns] = useState({
    symbol: true,
    buy_avg: true,
    sell_avg: true,
    qty: true,
    pnl: true,
    status: true,
    exit_reason: true,
    created_at: true,
    pnl_pct: true,
    net_pnl_pct: true,
  });
  const [chartSymbol, setChartSymbol] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openChartModal = (symbol: string) => {
    setChartSymbol(symbol);
    setIsModalOpen(true);
  };

  const closeChartModal = () => {
    setChartSymbol(null);
    setIsModalOpen(false);
  };
  // Helper function to format date for input
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to compare dates (YYYY-MM-DD format)
  const compareDates = (dateStr: string, compareStr: string, operator: 'gte' | 'lte'): boolean => {
    if (!dateStr || !compareStr) return true;

    const date = new Date(dateStr);
    const compare = new Date(compareStr);

    if (operator === 'gte') {
      return date >= compare;
    } else {
      return date <= compare;
    }
  };

  // Enhanced date preset handler
  const handleDatePreset = (preset: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let from = "";
    let to = "";

    switch (preset) {
      case "today":
        from = formatDateForInput(today);
        to = formatDateForInput(today);
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        from = formatDateForInput(yesterday);
        to = formatDateForInput(yesterday);
        break;
      case "last7days":
        const week = new Date(today);
        week.setDate(week.getDate() - 7);
        from = formatDateForInput(week);
        to = formatDateForInput(today);
        break;
      case "last30days":
        const month = new Date(today);
        month.setDate(month.getDate() - 30);
        from = formatDateForInput(month);
        to = formatDateForInput(today);
        break;
      case "thismonth":
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        from = formatDateForInput(monthStart);
        to = formatDateForInput(today);
        break;
      case "lastmonth":
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        from = formatDateForInput(lastMonthStart);
        to = formatDateForInput(lastMonthEnd);
        break;
      case "thisyear":
        const yearStart = new Date(now.getFullYear(), 0, 1);
        from = formatDateForInput(yearStart);
        to = formatDateForInput(today);
        break;
      case "custom":
        // Keep existing dates when switching to custom
        break;
      case "all":
      default:
        from = "";
        to = "";
        break;
    }

    setDateFilter({ from, to, preset });
    setCurrentPage(1);
    if (onDateFilter) {
      onDateFilter(from || undefined, to || undefined);
    }
  };

  // Handle custom date changes
  const handleDateChange = (type: 'from' | 'to', value: string) => {
    const newDateFilter = {
      ...dateFilter,
      [type]: value,
      preset: value || dateFilter.from || dateFilter.to ? 'custom' : 'all'
    };

    setDateFilter(newDateFilter);
    setCurrentPage(1);

    // Call parent function with updated dates
    if (onDateFilter) {
      onDateFilter(
        newDateFilter.from || undefined,
        newDateFilter.to || undefined
      );
    }
  };

  // Clear date filters
  const clearDateFilters = () => {
    setDateFilter({ from: "", to: "", preset: "thismonth" });
    setCurrentPage(1);
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    // Call parent function to fetch all data
    if (onDateFilter) {
      onDateFilter(formatDate(monthStart), formatDate(today));
    }
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    // Filter trades based on test mode - FIXED
    const filteredTrades = trades.filter(trade =>
      testmode ? trade.dry_run === true : trade.dry_run === false
    );

    const totalTrades = filteredTrades.length;
    const openTrades = filteredTrades.filter(t => t.status.toLowerCase() === 'open').length;
    const closedTrades = filteredTrades.filter(t => t.status.toLowerCase() === 'closed').length;
    const totalPnl = filteredTrades.reduce((sum, t) => sum + (t.net_pnl_pct || 0), 0);
    const winningTrades = filteredTrades.filter(t => (t.net_pnl_pct || 0) > 0).length;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    return {
      totalTrades,
      openTrades,
      closedTrades,
      totalPnl,
      winRate
    };
  }, [trades, testmode]);

  const filteredData = useMemo(() => {
    return trades.filter((trade) => {
      // Search filter
      const matchesSearch = trade.symbol.toLowerCase().includes(search.toLowerCase()) ||
        trade.exit_reason.toLowerCase().includes(search.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || trade.status.toLowerCase() === statusFilter.toLowerCase();

      // PnL filter
      const pnlValue = trade.net_pnl_pct || 0;
      const matchesPnl = pnlFilter === "all" ||
        (pnlFilter === "profit" && pnlValue > 0) ||
        (pnlFilter === "loss" && pnlValue < 0) ||
        (pnlFilter === "breakeven" && pnlValue === 0);

      // Enhanced date filter
      let matchesDate = true;
      if (dateFilter.from || dateFilter.to) {
        const tradeDate = formatDateForInput(new Date(trade.created_at));

        if (dateFilter.from && !compareDates(tradeDate, dateFilter.from, 'gte')) {
          matchesDate = false;
        }
        if (dateFilter.to && !compareDates(tradeDate, dateFilter.to, 'lte')) {
          matchesDate = false;
        }
      }

      // Test mode filter
      const matchesTestMode = testmode ? trade.dry_run === true : trade.dry_run === false;

      return matchesSearch && matchesStatus && matchesPnl && matchesDate && matchesTestMode;
    });
  }, [search, trades, statusFilter, pnlFilter, dateFilter, testmode]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue || "");
      const bStr = String(bValue || "");

      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Trade) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectTrade = (tradeId: number) => {
    const newSelected = new Set(selectedTrades);
    if (newSelected.has(tradeId)) {
      newSelected.delete(tradeId);
    } else {
      newSelected.add(tradeId);
    }
    setSelectedTrades(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTrades.size === paginatedData.length) {
      setSelectedTrades(new Set());
    } else {
      setSelectedTrades(new Set(paginatedData.map(t => t.id)));
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Symbol,Buy Avg,Sell Avg,Qty,PNL %,Status,Exit Reason,Created At\n"
      + sortedData.map(trade =>
        `${trade.symbol},${trade.buy_avg},${trade.sell_avg || ''},${trade.qty},${trade.net_pnl_pct || 0},${trade.status},${trade.exit_reason},${trade.created_at}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "trades.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Process trade data for the chart
  const processTradeData = (trades: Trade[] | null) => {
    if (!trades) return null;

    // Filter trades based on test mode
    const filteredByTestMode = trades.filter(trade =>
      testmode ? trade.dry_run === true : trade.dry_run === false
    );

    // Filter today's trades
    const today = new Date().toISOString().split("T")[0];
    const todayTrades = filteredByTestMode

    if (todayTrades.length === 0) return null;

    // Sort by closing time
    todayTrades.sort(
      (a, b) => new Date(a.closed_at).getTime() - new Date(b.closed_at).getTime()
    );

    const data = todayTrades.map((trade) => {
      return {
        time: new Date(trade.closed_at).toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }),
        net_pnl_pct: trade.net_pnl_pct,
      };
    });

    return {
      labels: data.map((d) => d.time),
      values: data.map((d) => d.net_pnl_pct),
    };
  };

  const chartData = processTradeData(filteredData || null);

  // Chart configuration with dynamic colors
  const chartConfig = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: "Today's PnL",
        data: chartData?.values || [],
        segment: {
          borderColor: (ctx: any) => {
            const currentValue = ctx.p1.parsed.y;
            return currentValue >= 0 ? "#0ecb81" : "#f6465d";
          },
          backgroundColor: (ctx: any) => {
            const currentValue = ctx.p1.parsed.y;
            return currentValue >= 0
              ? "rgba(14, 203, 129, 0.1)"
              : "rgba(246, 70, 93, 0.1)";
          }
        },
        borderColor: (context: any) => {
          const value = context.parsed?.y;
          return value >= 0 ? "#0ecb81" : "#f6465d";
        },
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return;

          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          const value = context.parsed?.y || 0;

          if (value >= 0) {
            gradient.addColorStop(0, "rgba(14, 203, 129, 0.2)");
            gradient.addColorStop(1, "rgba(14, 203, 129, 0)");
          } else {
            gradient.addColorStop(0, "rgba(246, 70, 93, 0.2)");
            gradient.addColorStop(1, "rgba(246, 70, 93, 0)");
          }

          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointBackgroundColor: (context: any) => {
          const value = context.parsed?.y;
          return value >= 0 ? "#0ecb81" : "#f6465d";
        },
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: "index" as const,
        backgroundColor: '#1a1a2e',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#333',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            const color = value >= 0 ? '🟢' : '🔴';
            return `${color} PnL: ${value.toFixed(2)}%`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(107, 114, 128, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 10,
          },
          callback: (value: any) => `${value}%`
        },
        // Add a reference line at y=0
        afterDataLimits: (scale: any) => {
          scale.max = Math.max(scale.max, 0.1);
          scale.min = Math.min(scale.min, -0.1);
        }
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };


  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-white/10">
      {Object.entries(visibleColumns).filter(([_, visible]) => visible).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-white/10 rounded w-full" />
        </td>
      ))}
    </tr>
  );

  const TradeCard = ({ trade }: { trade: Trade }) => (
    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          {visibleColumns.symbol && (
            <td
              className="px-2 sm:px-4 py-3 font-semibold hover:underline cursor-pointer"
              onClick={() => openChartModal(trade.symbol.toUpperCase())}
            >
              {trade.symbol}
            </td>
          )}
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${trade.status.toLowerCase() === 'open'
          ? 'bg-blue-500/20 text-blue-300'
          : 'bg-gray-500/20 text-gray-300'
          }`}>
          {trade.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Buy Avg</p>
          <p className="text-white font-medium">${trade.buy_avg.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400">Sell Avg</p>
          <p className="text-white font-medium">
            {trade.sell_avg !== null ? `$${trade.sell_avg.toFixed(2)}` : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Quantity</p>
          <p className="text-white font-medium">{trade.qty}</p>
        </div>
        <div>
          <p className="text-gray-400">Net PnL ( PnL )</p>
          <p className={`font-medium ${(trade.net_pnl_pct || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
            {(trade.net_pnl_pct || 0).toFixed(2)} % ( {(trade.pnl_pct || 0).toFixed(2)} % )
          </p>
        </div>

      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{trade.exit_reason}</span>
          <span>{new Date(trade.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })}</span>
        </div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => {
    if (loading) return null;

    const hasFilters = search || statusFilter !== "all" || pnlFilter !== "all" || dateFilter.preset !== "thismonth";

    if (trades.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <FaDatabase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Trades Found</h3>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            You haven't made any trades yet. Start trading with Namaio to see your trade history here.
          </p>
          <button
            className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-lg border border-yellow-500/30 transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh Data
          </button>
        </div>
      );
    }

    if (hasFilters && filteredData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Matching Trades</h3>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            No trades match your current filters. Try adjusting your search criteria or clearing filters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/30 transition-colors"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setPnlFilter("all");
                handleDatePreset("all");
                setCurrentPage(1);
              }}
            >
              Clear All Filters
            </button>
            <button
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              Adjust Filters
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (error) {
    return (
      <div className="p-4 bg-[#0e0e25] text-white rounded-xl shadow-md">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Trades</h3>
          <p className="text-red-400 text-center mb-6 max-w-md">{error}</p>
          <button
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[#0e0e25] text-white rounded-lg sm:rounded-xl shadow-md w-full max-w-full overflow-hidden">
      {/* Header with Stats */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">
            My Trade History using <span className="text-secondary">Namaio</span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{filteredData.length} of {trades.length} trades</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-base sm:text-lg font-bold text-white">{summaryStats.totalTrades}</div>
            <div className="text-xs text-gray-400">Total Trades</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-base sm:text-lg font-bold text-blue-400">{summaryStats.openTrades}</div>
            <div className="text-xs text-gray-400">Open</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-base sm:text-lg font-bold text-gray-400">{summaryStats.closedTrades}</div>
            <div className="text-xs text-gray-400">Closed</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 sm:p-3 text-center col-span-2 sm:col-span-1">
            <div className={`text-base sm:text-lg font-bold ${summaryStats.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {summaryStats.totalPnl.toFixed(2)} %
            </div>
            <div className="text-xs text-gray-400">Total Net PnL Using Namaio</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-4 space-y-3 sm:space-y-4">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by symbol or exit reason..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 sm:pl-10 pr-4 py-2 rounded-lg bg-white/5 text-white w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-white/10 text-sm"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-2 whitespace-nowrap"
            >
              <FaFilter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>

            <button
              onClick={exportData}
              className="px-3 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 flex items-center space-x-2 whitespace-nowrap"
            >
              <FaDownload className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(search || statusFilter !== "all" || pnlFilter !== "all" || dateFilter.preset !== "thismonth") && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
            <span className="text-sm text-gray-400">Active filters:</span>

            {search && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs flex items-center space-x-1">
                <span>Search: "{search}"</span>
                <FaTimes className="w-3 h-3 cursor-pointer hover:text-blue-100" onClick={() => setSearch("")} />
              </span>
            )}

            {statusFilter !== "all" && (
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs flex items-center space-x-1">
                <span>Status: {statusFilter}</span>
                <FaTimes className="w-3 h-3 cursor-pointer hover:text-green-100" onClick={() => setStatusFilter("all")} />
              </span>
            )}

            {pnlFilter !== "all" && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs flex items-center space-x-1">
                <span>PNL: {pnlFilter}</span>
                <FaTimes className="w-3 h-3 cursor-pointer hover:text-purple-100" onClick={() => setPnlFilter("all")} />
              </span>
            )}

            {dateFilter.preset !== "all" && (
              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs flex items-center space-x-1">
                <FaCalendarAlt className="w-3 h-3" />
                <span>
                  {dateFilter.preset === "custom"
                    ? `${dateFilter.from || "Start"} to ${dateFilter.to || "End"}`
                    : dateFilter.preset.replace(/([A-Z])/g, ' $1').toLowerCase()
                  }
                </span>
                <FaTimes className="w-3 h-3 cursor-pointer hover:text-orange-100" onClick={() => clearDateFilters()} />
              </span>
            )}

            <button
              className="text-xs text-red-400 hover:text-red-300 underline ml-2"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setPnlFilter("all");
                clearDateFilters();
                setCurrentPage(1);
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                >
                  <option className="text-black" value="all">All Status</option>
                  <option className="text-black" value="open">Open</option>
                  <option className="text-black" value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">PNL</label>
                <select
                  value={pnlFilter}
                  onChange={(e) => {
                    setPnlFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                >
                  <option className="text-black" value="all">All PNL</option>
                  <option className="text-black" value="profit">Profit</option>
                  <option className="text-black" value="loss">Loss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                <select
                  value={dateFilter.preset}
                  onChange={(e) => handleDatePreset(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                >
                  <option className="text-black" value="all">All Time</option>
                  <option className="text-black" value="today">Today</option>
                  <option className="text-black" value="yesterday">Yesterday</option>
                  <option className="text-black" value="last7days">Last 7 Days</option>
                  <option className="text-black" value="last30days">Last 30 Days</option>
                  <option className="text-black" value="thismonth">This Month</option>
                  <option className="text-black" value="lastmonth">Last Month</option>
                  <option className="text-black" value="thisyear">This Year</option>
                  <option className="text-black" value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Items per page</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                >
                  <option className="text-black" value={5}>5</option>
                  <option className="text-black" value={10}>10</option>
                  <option className="text-black" value={25}>25</option>
                  <option className="text-black" value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Custom Date Range */}
            {dateFilter.preset === "custom" && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className=" text-sm text-gray-400 mb-2 flex items-center space-x-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>From Date</span>
                    </label>
                    <input
                      type="date"
                      value={dateFilter.from}
                      onChange={(e) => handleDateChange('from', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className=" text-sm text-gray-400 mb-2 flex items-center space-x-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>To Date</span>
                    </label>
                    <input
                      type="date"
                      value={dateFilter.to}
                      onChange={(e) => handleDateChange('to', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearDateFilters}
                      className="w-full px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors text-sm flex items-center justify-center space-x-1"
                    >
                      <FaTimes className="w-3 h-3" />
                      <span>Clear Dates</span>
                    </button>
                  </div>
                </div>

                {/* Date validation messages */}
                {dateFilter.from && dateFilter.to && new Date(dateFilter.from) > new Date(dateFilter.to) && (
                  <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-xs">
                    <FaExclamationTriangle className="inline w-3 h-3 mr-1" />
                    From date cannot be later than To date
                  </div>
                )}

                {(dateFilter.from || dateFilter.to) && (
                  <div className="mt-2 text-xs text-gray-400">
                    <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                    {dateFilter.from && dateFilter.to
                      ? `Showing trades from ${new Date(dateFilter.from).toLocaleDateString()} to ${new Date(dateFilter.to).toLocaleDateString()}`
                      : dateFilter.from
                        ? `Showing trades from ${new Date(dateFilter.from).toLocaleDateString()} onwards`
                        : `Showing trades up to ${new Date(dateFilter.to).toLocaleDateString()}`
                    }
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Empty State */}
      <EmptyState />

      {/* Mobile Card View */}
      {!loading && filteredData.length > 0 && (
        <div className="sm:hidden">
          {paginatedData.map((trade) => <TradeCard key={trade.id} trade={trade} />)}
        </div>
      )}

      {/* Loading Cards for Mobile */}
      {loading && (
        <div className="sm:hidden">
          {[...Array(itemsPerPage)].map((_, idx) => (
            <div key={idx} className="bg-white/5 rounded-lg p-4 mb-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      {!loading && filteredData.length > 0 && (
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                {visibleColumns.symbol && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("symbol")}>
                    <div className="flex items-center space-x-1">
                      <span>Symbol</span>
                      {sortField === "symbol" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.buy_avg && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("buy_avg")}>
                    <div className="flex items-center space-x-1">
                      <span>Buy Avg</span>
                      {sortField === "buy_avg" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.sell_avg && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("sell_avg")}>
                    <div className="flex items-center space-x-1">
                      <span>Sell Avg</span>
                      {sortField === "sell_avg" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.qty && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("qty")}>
                    <div className="flex items-center space-x-1">
                      <span>Qty</span>
                      {sortField === "qty" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.pnl_pct && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("pnl_pct")}>
                    <div className="flex items-center space-x-1">
                      <span>Net PnL %</span>
                      {sortField === "pnl_pct" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.net_pnl_pct && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("net_pnl_pct")}>
                    <div className="flex items-center space-x-1">
                      <span>PnL %</span>
                      {sortField === "net_pnl_pct" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("status")}>
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {sortField === "status" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
                {visibleColumns.exit_reason && (
                  <th className="px-2 sm:px-4 py-3 text-left">Exit Reason</th>
                )}
                {visibleColumns.created_at && (
                  <th className="px-2 sm:px-4 py-3 text-left cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("created_at")}>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {sortField === "created_at" && (sortDirection === "asc" ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((trade) => (
                <tr key={trade.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  {visibleColumns.symbol && (
                    <td
                      className="px-2 sm:px-4 py-3 font-semibol hover:underline cursor-pointer"
                      onClick={() => openChartModal(trade.symbol.toUpperCase())}
                    >
                      {trade.symbol}
                    </td>
                  )}

                  {visibleColumns.buy_avg && (
                    <td className="px-2 sm:px-4 py-3 text-gray-300">${trade.buy_avg.toFixed(2)}</td>
                  )}
                  {visibleColumns.sell_avg && (
                    <td className="px-2 sm:px-4 py-3 text-gray-300">
                      {trade.sell_avg !== null ? `${trade.sell_avg.toFixed(2)}` : "—"}
                    </td>
                  )}
                  {visibleColumns.qty && (
                    <td className="px-2 sm:px-4 py-3 text-gray-300">{trade.qty}</td>
                  )}
                  {visibleColumns.net_pnl_pct && (
                    <td className={`px-2 sm:px-4 py-3 font-medium ${(trade.net_pnl_pct || 0) >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                      <div className="flex items-center space-x-1">
                        {(trade.net_pnl_pct || 0) >= 0 ? <FaArrowTrendUp className="w-4 h-4" /> : <FaArrowTrendDown className="w-4 h-4" />}
                        <span>
                          {trade.net_pnl_pct !== null && trade.net_pnl_pct !== undefined
                            ? `${trade.net_pnl_pct.toFixed(2)} %`
                            : "0.00 %"}
                        </span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.pnl_pct && (
                    <td className={`px-2 sm:px-4 py-3 font-medium ${(trade.pnl_pct || 0) >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                      <div className="flex items-center space-x-1">
                        {(trade.pnl_pct || 0) >= 0 ? <FaArrowTrendUp className="w-4 h-4" /> : <FaArrowTrendDown className="w-4 h-4" />}
                        <span>
                          {trade.pnl_pct !== null && trade.pnl_pct !== undefined
                            ? `${trade.pnl_pct.toFixed(2)} %`
                            : "0.00 %"}
                        </span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 sm:px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${trade.status.toLowerCase() === 'open'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-gray-500/20 text-gray-300'
                        }`}>
                        {trade.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.exit_reason && (
                    <td className="px-2 sm:px-4 py-3 text-gray-300 max-w-32 truncate" title={trade.exit_reason}>
                      {trade.exit_reason}
                    </td>
                  )}
                  {visibleColumns.created_at && (
                    <td className="px-2 sm:px-4 py-3 text-sm text-gray-400">
                      {new Date(trade.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loading Table for Desktop */}
      {loading && (
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                {Object.entries(visibleColumns).filter(([_, visible]) => visible).map(([key, _], i) => (
                  <th key={i} className="px-2 sm:px-4 py-3 text-left">
                    <div className="h-4 bg-white/10 rounded w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(itemsPerPage)].map((_, idx) => <SkeletonRow key={idx} />)}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredData.length > 0 && (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            {selectedTrades.size > 0 && (
              <div className="text-sm text-gray-400">
                {selectedTrades.size} selected
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-1 sm:space-x-2 overflow-x-auto">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || loading}
              className="px-2 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1 whitespace-nowrap"
            >
              <FaAngleDoubleLeft className="w-3 h-3" />
              <span className="hidden sm:inline">First</span>
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loading}
              className="px-2 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1 whitespace-nowrap"
            >
              <FaAngleLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 sm:px-3 py-2 rounded-lg text-sm whitespace-nowrap ${pageNum === currentPage
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || loading}
              className="px-2 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Next</span>
              <FaAngleRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="px-2 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Last</span>
              <FaAngleDoubleRight className="w-3 h-3" />
            </button>
          </div>

          <div className="text-sm text-gray-400 text-center sm:text-right">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
        </div>
      )}
      <div className="space-y-2 sm:space-y-3">


        {/* {chartData ? (
            <div className="h-full w-full">
              <Line data={chartConfig} options={options} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-lg sm:text-xl">
                  📈
                </div>
                <p>No trades today</p>
              </div>
            </div>
          )} */}
        <ScrollableTradingChart trades={filteredData} testmode={testmode} />
        <DaywisePerformanceChart trades={filteredData} testmode={testmode} />
        {isModalOpen && chartSymbol && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            onClick={closeChartModal} // close when clicking outside
          >
            <div
              className="relative bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-6xl h-[80%] overflow-hidden"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {/* Close Button */}
              <button
                className="absolute top-1 right-10 z-50 text-white text-2xl font-semibold hover:text-red-500 transition-colors"
                onClick={closeChartModal}
              >
                ✖
              </button>

              {/* Chart Container */}
              <div className="w-full h-full">
                <BinanceChart chartSymbol={chartSymbol} height="100%" />
              </div>
              <div className="w-full h-full">
                <BinanceChart chartSymbol={chartSymbol} height="100%" />
              </div>
            </div>
          </div>
        )}




      </div>

    </div>
  );
};

export default TradeTable;