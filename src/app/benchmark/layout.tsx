// app/(dashboard)/layout.tsx or app/layout.tsx (depending on your structure)
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namaio 30 Index | Benchmark Crypto Index Performance",
  description:
    "Track the Namaio 30 Index — a benchmark of the top 30 cryptocurrencies. Compare performance, analyze trends, and gain key market insights.",
  alternates: {
    canonical: "/benchmark",
  },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <Header />
    <h1 className="text-gray-900 text-xs" > Namaio | Automated Crypto Trading</h1>
    {children}
    <Footer />
  </>;
}
