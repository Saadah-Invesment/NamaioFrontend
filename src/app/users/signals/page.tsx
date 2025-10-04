"use client";
import React, { useState } from "react";
import { Search, TrendingUp, TrendingDown, Calendar, ArrowUpDown, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface Signal {
  id: number;
  pair: string;
  type: string;
  entry: number;
  tp: number;
  sl: number;
  date: string;
}

const UpcomingSignalsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof Signal>("date");
  const [sortAsc, setSortAsc] = useState(true);

  const mockSignals: Signal[] = [
    { id: 1, pair: "EUR/USD", type: "Buy", entry: 1.1234, tp: 1.1250, sl: 1.1210, date: "2025-10-09 09:00" },
    { id: 2, pair: "GBP/USD", type: "Sell", entry: 1.3120, tp: 1.3080, sl: 1.3150, date: "2025-10-09 10:00" },
    { id: 3, pair: "USD/JPY", type: "Buy", entry: 150.12, tp: 151.00, sl: 149.50, date: "2025-10-09 11:00" },
    { id: 4, pair: "AUD/USD", type: "Buy", entry: 0.6740, tp: 0.6780, sl: 0.6710, date: "2025-10-09 12:00" },
    { id: 5, pair: "NZD/USD", type: "Sell", entry: 0.6260, tp: 0.6230, sl: 0.6280, date: "2025-10-09 13:00" },
    { id: 6, pair: "EUR/JPY", type: "Buy", entry: 165.50, tp: 166.00, sl: 164.80, date: "2025-10-09 14:00" },
    { id: 7, pair: "GBP/JPY", type: "Sell", entry: 191.25, tp: 190.50, sl: 192.00, date: "2025-10-09 15:00" },
    { id: 8, pair: "USD/CHF", type: "Buy", entry: 0.9230, tp: 0.9260, sl: 0.9200, date: "2025-10-09 16:00" },
    { id: 9, pair: "EUR/GBP", type: "Sell", entry: 0.8550, tp: 0.8520, sl: 0.8570, date: "2025-10-10 09:00" },
    { id: 10, pair: "AUD/JPY", type: "Buy", entry: 101.25, tp: 102.00, sl: 100.80, date: "2025-10-10 10:00" },
    { id: 11, pair: "USD/CAD", type: "Sell", entry: 1.3690, tp: 1.3650, sl: 1.3720, date: "2025-10-10 11:00" },
    { id: 12, pair: "EUR/AUD", type: "Buy", entry: 1.6120, tp: 1.6180, sl: 1.6080, date: "2025-10-10 12:00" },
    { id: 13, pair: "GBP/AUD", type: "Sell", entry: 1.8520, tp: 1.8450, sl: 1.8580, date: "2025-10-10 13:00" },
    { id: 14, pair: "NZD/JPY", type: "Buy", entry: 92.50, tp: 93.20, sl: 92.00, date: "2025-10-10 14:00" },
    { id: 15, pair: "EUR/CHF", type: "Sell", entry: 0.9870, tp: 0.9820, sl: 0.9900, date: "2025-10-10 15:00" },
  ];

  const filteredSignals = mockSignals.filter((signal) =>
    signal.pair.toLowerCase().includes(search.toLowerCase())
  );

  const sortedSignals = [...filteredSignals].sort((a, b) => {
    if (sortColumn === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    } else {
      if (a[sortColumn] < b[sortColumn]) return sortAsc ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortAsc ? 1 : -1;
      return 0;
    }
  });

  const totalPages = Math.ceil(sortedSignals.length / pageSize);
  const currentSignals = sortedSignals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: keyof Signal) => {
    if (sortColumn === column) setSortAsc(!sortAsc);
    else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  const buySignals = mockSignals.filter(s => s.type === "Buy").length;
  const sellSignals = mockSignals.filter(s => s.type === "Sell").length;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-900 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0e2a4c] to-[#1a3d5f] rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#32bfb7] opacity-10 rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Upcoming Signals</h1>
            <p className="text-gray-300 text-sm">Stay ahead with scheduled trading signals</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-[#32bfb7]" size={20} />
                <div>
                  <p className="text-xs text-gray-300">Buy Signals</p>
                  <p className="text-lg font-bold text-white">{buySignals}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2">
                <TrendingDown className="text-purple-400" size={20} />
                <div>
                  <p className="text-xs text-gray-300">Sell Signals</p>
                  <p className="text-lg font-bold text-white">{sellSignals}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by currency pair..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#32bfb7] focus:ring-2 focus:ring-[#32bfb7]/20 transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">Rows per page:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#32bfb7] bg-white cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                {[
                  { key: "pair", label: "Pair", icon: null },
                  { key: "type", label: "Type", icon: null },
                  { key: "entry", label: "Entry", icon: null },
                  { key: "tp", label: "Take Profit", icon: null },
                  { key: "sl", label: "Stop Loss", icon: null },
                  { key: "date", label: "Scheduled Time", icon: Clock },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="py-4 px-6 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors group"
                    onClick={() => handleSort(col.key as keyof Signal)}
                  >
                    <div className="flex items-center gap-2">
                      {col.icon && <col.icon size={16} className="text-[#32bfb7]" />}
                      <span>{col.label}</span>
                      <ArrowUpDown
                        size={14}
                        className={`transition-all ${
                          sortColumn === col.key
                            ? "text-[#32bfb7] opacity-100"
                            : "text-gray-400 opacity-0 group-hover:opacity-50"
                        }`}
                      />
                      {sortColumn === col.key && (
                        <span className="text-[#32bfb7] font-bold">{sortAsc ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentSignals.map((signal, index) => (
                <tr
                  key={signal.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === currentSignals.length - 1 ? "border-none" : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900">{signal.pair}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        signal.type === "Buy"
                          ? "bg-green-50 text-green-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {signal.type === "Buy" ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {signal.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">{signal.entry.toFixed(4)}</td>
                  <td className="py-4 px-6">
                    <span className="text-[#32bfb7] font-semibold">{signal.tp.toFixed(4)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-red-500 font-semibold">{signal.sl.toFixed(4)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-[#0e2a4c]" />
                      <span className="text-sm">{signal.date}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-semibold text-gray-900">{Math.min(currentPage * pageSize, filteredSignals.length)}</span> of{" "}
            <span className="font-semibold text-gray-900">{filteredSignals.length}</span> signals
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-all font-medium disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-[#32bfb7] text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-all font-medium disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSignalsPage;