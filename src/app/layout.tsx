import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Source_Sans_3, Manrope } from "next/font/google";


import { siteDetails } from '@/data/siteDetails';

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import ChatWidget from "@/components/UI/ChatWidget";
import TradeUpdateSocket from "@/components/MyComponents/TrsadeUpdateSocket";
import TradingDisclaimerModal from "@/components/UI/TradingDisclaimerModal";
import Script from "next/script";
import SchemaInjector from "@/components/MyComponents/SchemaInjector";
const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  metadataBase: new URL("https://tezcai.com"),
  alternates: {
    canonical: "/", // homepage canonical
  },
  // ✅ Add robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // ✅ Add keywords
  keywords: [
    "automated crypto trading",
    "crypto trading bot",
    "algorithmic trading",
    "bitcoin trading automation",
    "ethereum trading bot",
    "Tezcai crypto platform",
  ],
  // ✅ Add publisher info
  authors: [{ name: "Tezcai" }],
  creator: "Tezcai",
  publisher: "Tezcai",
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: "website",
    siteName: siteDetails.siteName,
    images: [
      {
        url: "/images/tezcai-logo.png",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/tezcai-logo.png"],
    creator: "@tezcai_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >


      <meta name="google-site-verification" content="0hW2XN5yv_cS-DTcPJyGhI4-SVHFQHjP7PnsYIUge9Q" />
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        {/* <Header /> */}

        <AuthProvider>
          <main>{children}</main>
          <ChatWidget />
          <TradeUpdateSocket />
          {/* <TradingDisclaimerModal /> */}
          <Toaster position="top-right" />
        </AuthProvider>
        <SchemaInjector />

        {/* ✅ JSON-LD: Website with Search */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://tezcai.com/",
              name: "Tezcai",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tezcai.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
