"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface ReturnData {
    name: string;
    asOfDate: number;
    ["Since Inception"]?: number | string;
    ["1 Month"]?: number;
    ["3 Months"]?: number;
    ["12 Months"]?: number;
    YTD?: number;
    ["Since OTCQX Quotation"]?: number | string;
}

export default function BitwiseReturnsTable() {
    const [data, setData] = useState<ReturnData[]>([]);
    const [asOf, setAsOf] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    "https://bitwiseinvestments.com/_next/data/B4fbiRyz50xv8vg5O4U2g/index.json",
                    {
                        headers: {
                            "accept":
                                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                            "accept-language": "en-US,en;q=0.9,en-IN;q=0.8",
                            "cache-control": "max-age=0",
                            "priority": "u=0, i",
                            "sec-ch-ua": '"Chromium";v="140", "Not=A?Brand";v="24", "Microsoft Edge";v="140"',
                            "sec-ch-ua-mobile": "?1",
                            "sec-ch-ua-platform": '"Android"',
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "cross-site",
                            "sec-fetch-user": "?1",
                            "upgrade-insecure-requests": "1",
                            "user-agent":
                                "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Edg/140.0.0.0",
                        },
                    }
                );

                const returns: ReturnData[] = res.data?.pageProps?.fund?.data?.return || [];
                setData(returns);

                if (returns.length > 0 && returns[0].asOfDate) {
                    const date = new Date(returns[0].asOfDate);
                    setAsOf(
                        date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                    );
                }
            } catch (err) {
                console.error("Error fetching returns:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="bg-[#0e0e25] text-white p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">Returns</h3>
            {asOf && <p className="text-sm text-gray-400 mb-4">As of: {asOf}</p>}

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-3 py-2 text-left">Index</th>
                            <th className="px-3 py-2">1 Month</th>
                            <th className="px-3 py-2">3 Months</th>
                            <th className="px-3 py-2">YTD</th>
                            <th className="px-3 py-2">12 Months</th>
                            <th className="px-3 py-2">Since Inception</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-gray-700 hover:bg-gray-800 transition"
                            >
                                <td className="px-3 py-2 font-medium">{row.name}</td>
                                <td className="px-3 py-2 text-center">
                                    {row["1 Month"] != null ? `${(row["1 Month"] * 100).toFixed(1)}%` : "—"}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {row["3 Months"] != null ? `${(row["3 Months"] * 100).toFixed(1)}%` : "—"}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {row.YTD != null ? `${(row.YTD * 100).toFixed(1)}%` : "—"}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {row["12 Months"] != null ? `${(row["12 Months"] * 100).toFixed(1)}%` : "—"}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {row["Since Inception"] != null && row["Since Inception"] !== "N/A"
                                        ? `${(Number(row["Since Inception"]) * 100).toFixed(1)}%`
                                        : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
