// app/blog/layout.tsx (Server Component, no "use client")
import type { Metadata } from "next";
import BlogLayout from "./BlogLayout";


export const metadata: Metadata = {
    title: "Tezcai Blog | Crypto Trading Insights, News & Strategies",
    description:
        "Read the Tezcai Blog for the latest updates on crypto trading, market insights, strategies, and platform news. Stay informed and trade smarter with Tezcai.",
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogPageLayout({ children }: { children: React.ReactNode }) {
    // BlogLayout can be a client component
    return <BlogLayout>{children}</BlogLayout>;
}
