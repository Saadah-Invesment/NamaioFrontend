import React, { useEffect, useRef, memo } from "react";

interface TechnicalAnalysisProps {
    symbol: string; // Example: "NASDAQ:AAPL"
    width?: number | string;
    height?: number | string;
}

const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({
    symbol,
    width = 425,
    height = 450,
}) => {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container.current) return;

        // Clear previous widget before appending a new one
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "colorTheme": "dark",
        "displayMode": "single",
        "isTransparent": true,
        "locale": "en",
        "interval": "5m",
        "disableInterval": false,
        "width": "auto",
        "height": "${height}",
        "symbol": "${symbol}",
        "showIntervalTabs": true
      }`;

        container.current.appendChild(script);
    }, [symbol, width, height]);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href={`https://www.tradingview.com/symbols/${symbol.replace(
                        ":",
                        "-"
                    )}/technicals/`}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                >
                    {/* <span className="blue-text">
                        Technical analysis for {symbol} by TradingView
                    </span> */}
                </a>
            </div>
        </div>
    );
};

export default memo(TechnicalAnalysis);
