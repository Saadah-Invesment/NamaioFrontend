"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Global organization schema (always present)
const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Namaio",
    url: "https://namaio.com/",
    logo: "https://namaio.com/_next/image?url=%2Fimages%2Ftezcai-logo.png&w=640&q=75",
    email: "info@namaio.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Ali Salem Obaid Bin Wanis Building, Al Dana East 4_2 P.O. Box 41014",
        addressLocality: "Abu Dhabi",
        postalCode: "00000",
        addressCountry: "AE",
    },
    parentOrganization: {
        "@type": "Organization",
        name: "Saadah Investment LLC",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Abu Dhabi",
            postalCode: "00000",
            addressCountry: "AE",
        },
    },
    sameAs: [
        "https://www.linkedin.com/company/tezcaicom",
        "https://www.instagram.com/tezcai_com",
        "https://www.tiktok.com/@namaio.com",
        "https://www.facebook.com/namaio",
        "https://www.youtube.com/@namaio",
        "https://x.com/tezcai_",
    ],
};

// Page-specific schemas
const pageSchemas: Record<string, any> = {
    "/how-it-works": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://namaio.com/how-it-works",
        name: "How It Works",
        description:
            "Learn how to get started with Namaio's automated crypto trading platform in three simple steps: connect your exchange, fund your account, and let Namaio trade automatically.",
        mainEntity: {
            "@type": "HowTo",
            name: "Getting Started with Namaio in 3 Simple Steps",
            step: [
                {
                    "@type": "HowToStep",
                    name: "Connect your Crypto Exchange account",
                    text: "Connect your exchange API securely via read-only API with trading permission enabled and withdrawals disabled. Namaio never takes custody.",
                },
                {
                    "@type": "HowToStep",
                    name: "Fund your Crypto Exchange account",
                    text: "Ensure you have funds in your exchange account. Start with any amount you’re comfortable with. Recommended starting around US $3,000, not exceeding US $2,000,000.",
                },
                {
                    "@type": "HowToStep",
                    name: "Enable automated trading",
                    text: "Activate 24/7 automated trading. Namaio's smart software handles all market analysis and execution while you track performance in real-time.",
                },
            ],
            totalTime: "PT5M",
            tool: "Namaio Automated Trading Platform",
            estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "3000",
            },
            audience: {
                "@type": "Audience",
                audienceType: "Crypto Traders",
            },
        },
    },
    '/pricing': {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://namaio.com/pricing",
        name: "Pricing",
        description: "Namaio Pricing Plans: Simple Subscription + Performance Based Profit Share. Early Adopter Offer: First month FREE.",
        mainEntity: [
            {
                "@type": "Product",
                name: "Signals Plan",
                description: "For traders who prefer manual control, but want Namaio’s smart precision. Smart filtered trade signals, momentum identification, trend confirmation, volume analysis, clear entry & exit points.",
                offers: { "@type": "Offer", price: "9.99", priceCurrency: "USD", url: "https://namaio.com/pricing", availability: "https://schema.org/InStock" },
            },
            // {
            //     "@type": "Product",
            //     name: "Starter Plan",
            //     description: "Best for hands-off auto trading — start small, test results, and scale later. Low risk entry, automated trading, two trades daily, live dashboard, 15% profit share. Early Adopter Offer: First month FREE! Most Popular Plan.",
            //     offers: { "@type": "Offer", price: "19.99", priceCurrency: "USD", url: "https://namaio.com/pricing", availability: "https://schema.org/InStock", eligibleQuantity: { "@type": "QuantitativeValue", value: 1 } },
            // },
            {
                "@type": "Product",
                name: "Pro Plan",
                description: "Best for users who want more trade and more results. Unlimited high-probability trades, priority support, live chat support, weekly insights report, 15% profit share.",
                offers: { "@type": "Offer", price: "29.99", priceCurrency: "USD", url: "https://namaio.com/pricing", availability: "https://schema.org/InStock" },
            },
            {
                "@type": "Product",
                name: "Enterprise Plan",
                description: "For funds, prop firms & high-net-worth investors. Custom white label bot, dedicated account manager, custom strategies, API/webhook integration, priority execution, optional security audits, 15% profit share. Available upon request via demo.",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: "https://namaio.com/pricing", availability: "https://schema.org/InStock" },
            },
        ],
    },
    'affiliate': {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://namaio.com/affiliate",
        name: "Affiliate Program",
        description: "Join Namaio's Affiliate Program and earn lifetime commissions by referring traders. Soft Launch: A small group of early affiliates can secure their spot and start earning before the public rollout.",
        mainEntity: [
            {
                "@type": "Service",
                name: "Namaio Affiliate Program - Bronze Tier",
                description: "Earn 1% commission on user's profits for users who trade up to $100k. Lifetime commissions with transparent dashboard access. Soft Launch early access available.",
                offers: {
                    "@type": "Offer",
                    url: "https://namaio.com/affiliate",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock"
                }
            },
            {
                "@type": "Service",
                name: "Namaio Affiliate Program - Silver Tier",
                description: "Earn 1.5% commission on user's profits for users who trade between $100k and $1M. Lifetime commissions, monthly reports, and dashboard access. Soft Launch early access available.",
                offers: {
                    "@type": "Offer",
                    url: "https://namaio.com/affiliate",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock"
                }
            },
            {
                "@type": "Service",
                name: "Namaio Affiliate Program - Gold Tier",
                description: "Earn 2% commission on user's profits for users who trade over $1M. Lifetime commissions, bonuses, monthly reports, and dashboard access. Soft Launch early access available.",
                offers: {
                    "@type": "Offer",
                    url: "https://namaio.com/affiliate",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock"
                }
            }
        ]
    },
    'benchmark': {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://namaio.com/benchmark",
        "name": "Namaio Benchmark | Namaio 30 Index Performance",
        "description": "Track the Namaio 30 Index benchmark with real-time performance data, daily market comparisons, index constituents, and detailed insights into why performance may differ from the market.",

        "mainEntity": [
            {
                "@type": "Report",
                "name": "Namaio 30 Benchmark Report",
                "description": "Benchmark data showing Namaio 30 Index performance vs the market. Includes daily performance, outperformance comparisons, and cumulative performance.",
                "url": "https://namaio.com/benchmark",
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://namaio.com#organization",
                    "name": "Namaio"
                }
            },
            {
                "@type": "ItemList",
                "name": "Upcoming Features",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Pre Trade Benchmarking"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Daily Market Performance"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Smart Weighting"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Why might Namaio performance differ from the market?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Namaio does not trade 24/7 but only when trend, volume, and risk filters align. This avoids chasing false moves and focuses on consistent growth with controlled risk."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How does Namaio manage risk during trading?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Risk management is prioritized by cutting trades early to avoid large drawdowns, reducing exposure in red markets, and focusing on capital preservation over short-term gains."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the Namaio 30 Benchmark?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The Namaio 30 Benchmark reflects broader market movement. Performance may vary as Namaio trades only on qualified signals, focusing on long-term safety and consistency."
                        }
                    }
                ]
            }
        ]
    },
    'general-faq': {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "url": "https://namaio.com/faq/general-faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does Namaio trade for my account?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Namaio connects securely to your exchange account through API keys. It executes buy and sell orders automatically while you track trades in real time from your dashboard. Your money never leaves your exchange."
                }
            },
            {
                "@type": "Question",
                "name": "What are the minimum and maximum wallet limits for exchanges?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We recommend a minimum balance of US$3,000 for best results. Namaio will not manage wallets exceeding US$2 million. Above this, profits should be withdrawn."
                }
            },
            {
                "@type": "Question",
                "name": "Do all members see the same results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All members get the same signals, but results vary due to investment size, exchange fees, and trade execution speed (±10%)."
                }
            },
            {
                "@type": "Question",
                "name": "If I have accounts on multiple exchanges, do I get the same results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not always. Symbols vary by exchange. When a trade is identified, execution depends on the exchange used, which can create differences in results."
                }
            },
            {
                "@type": "Question",
                "name": "When do I start seeing results?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The same day you connect your exchange account."
                }
            },
            {
                "@type": "Question",
                "name": "Can I stop anytime?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, there are no commitments or lock-ins. You can stop anytime."
                }
            },
            {
                "@type": "Question",
                "name": "Do I control my funds?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, 100% of your funds remain in your own exchange account. Namaio only has trading permission."
                }
            },
            {
                "@type": "Question",
                "name": "How do I connect my crypto exchange?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Connect via read-only API keys with trading permissions only. Ensure your wallet is funded (recommended US $3,000 to start, max $2M). Once connected, Namaio trades automatically 24/7 while you track performance."
                }
            },
            {
                "@type": "Question",
                "name": "Why is Namaio different from other bots?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Namaio trades selectively, not constantly. It offers live transparent profit tracking, fair pricing (subscription + profit share), and institutional scalability."
                }
            },
            {
                "@type": "Question",
                "name": "How secure is Namaio?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Namaio only has read-only API access. Funds stay in your exchange wallet. Users get daily trade logs, profit reports, audit logs, and institutional-grade security."
                }
            },
            {
                "@type": "Question",
                "name": "Which exchange should I use with Namaio?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Recommended exchanges: Binance or OKX for Asia, Africa & Latin America; OKX and Binance for MENA; Revolut X for UK & Europe; Gemini ActiveTrader for USA & Canada."
                }
            },
            {
                "@type": "Question",
                "name": "Why do you recommend specific exchanges?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Exchanges are chosen for low fees, trusted regulation, and seamless integration with Namaio to ensure safety, compliance, and smooth trading."
                }
            }
        ]
    },
    'affiliate-faq': {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the affiliate program work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Invite users to Namaio using your referral link. When those users trade, you earn lifetime commissions (1 to 2%) based on their trading profits. Earnings are tracked in real time inside your affiliate dashboard."
                }
            },
            {
                "@type": "Question",
                "name": "What are the commission tiers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer 3 lifetime tiers: Bronze: 1% of referred user's profits (up to $100k volume), Silver: 1.5% of referred user's profits ($100k to $1M volume), Gold: 2% of referred user's profits (over $1M volume)."
                }
            },
            {
                "@type": "Question",
                "name": "Do affiliates earn lifetime commissions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. As long as your referred users continue trading with Namaio, you keep earning commissions for life."
                }
            },
            {
                "@type": "Question",
                "name": "When and how do I get paid?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Affiliate earnings are updated in real time and reflected in your dashboard. Payouts are processed monthly, with transparent reports available to you at all times."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a limit to how many users I can refer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, there are no limits. You can refer as many users as you want, and all referred users will be tied to your account permanently."
                }
            },
            {
                "@type": "Question",
                "name": "Can I track my referrals and earnings?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you have full access to your affiliate dashboard. It provides real-time tracking of referrals, commissions, tiers, and monthly reports."
                }
            }
        ]
    },



};

export default function SchemaInjector() {
    const pathname = usePathname();
    const normalizedPath = pathname.replace(/\/$/, '');
    const pageSchema = pageSchemas[normalizedPath];

    return (
        <>
            {/* Global Organization Schema */}
            <Script
                id="ld-org"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            {/* Page-specific Schema */}
            {pageSchema && (
                <Script
                    id={`ld-page-${pathname}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
                />
            )}
        </>
    );
}
