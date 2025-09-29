import React, { useEffect, useRef, memo } from "react";

const CryptocurrencyMarket: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container.current) return;

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USDT",
        "colorTheme": "dark",
        "isTransparent": true,
        "locale": "en",
        "width": "100%",
        "height": 550
      }`;

        container.current.appendChild(script);

        return () => {
            if (container.current) {
                container.current.innerHTML = ""; // cleanup to prevent duplicates
            }
        };
    }, []);

    return (
        <div className="bg-[#0a0f1e] shadow-md rounded-lg p-4">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Cryptocurrency Market
            </h2>

            {/* TradingView Widget */}
            <div
                className="tradingview-widget-container"
                ref={container}
            >
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                    <a
                        href="https://www.tradingview.com/crypto-coins-screener/"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                    ></a>
                </div>
            </div>
        </div>
    );
};

export default memo(CryptocurrencyMarket);
