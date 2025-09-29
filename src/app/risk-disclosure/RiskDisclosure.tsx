'use client'
import React from 'react';

const RiskDisclosure: React.FC = () => {
  return (
    <div className="risk-disclosure-container text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Risk Disclosure Statement</h1>
      {/* <p className="text-sm text-gray-500 mb-6">Last Updated: [Insert Date]</p> */}

      <div className="mb-6">
        <p className="mb-4">
          This Risk Disclosure (“Disclosure”) applies to all users of Tezcai’s automated cryptocurrency trading services (“Services”). By using Tezcai, you acknowledge that you have read, understood, and agreed to the risks described below.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. No Guarantee of Profit</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cryptocurrency trading is highly speculative and involves a significant risk of loss.</li>
            <li>Past performance does not guarantee future results.</li>
            <li>No strategy, algorithm, or technology can eliminate market risks or guarantee profits.</li>
            <li>You may lose some, all, or more than your initial capital.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Market Volatility</h2>
          <p className="mb-2">Digital asset markets can be extremely volatile due to factors including, but not limited to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Rapid changes in supply and demand</li>
            <li>Regulatory announcements</li>
            <li>Technological failures or upgrades</li>
            <li>Market manipulation</li>
            <li>Macroeconomic and geopolitical events</li>
          </ul>
          <p className="mt-2">Prices can change drastically within seconds, which may result in substantial losses.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Technology & Connectivity Risks</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tezcai is a software platform that relies on technology, internet connectivity, and third-party APIs (such as Binance).</li>
            <li>Technical failures, connectivity issues, or latency may prevent trades from executing as intended.</li>
            <li>System errors, coding bugs, or exchange outages may result in missed, delayed, or unintended trades.</li>
            <li>You accept all risks associated with reliance on such technology.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. API & Account Access Risks</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To function, Tezcai requires secure API access to your exchange account.</li>
            <li>You are solely responsible for granting and managing API keys.</li>
            <li>Mismanagement or compromise of your keys may lead to unauthorized access to your funds.</li>
            <li>Tezcai does not take custody of your funds at any time.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Regulatory & Legal Risks</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cryptocurrency trading may be subject to laws and regulations in your jurisdiction.</li>
            <li>Rules can change without notice, affecting your ability to trade or use Tezcai.</li>
            <li>You are solely responsible for ensuring your compliance with all applicable laws, tax obligations, and regulatory requirements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Profit-Sharing & Fees</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>By using Tezcai, you agree to pay any applicable subscription fees and/or profit-sharing amounts as set out in our Terms & Conditions.</li>
            <li>Failure to pay may result in suspension or termination of your account.</li>
            <li>All fees are non-refundable unless explicitly stated otherwise.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Third-Party Exchange Risks</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your trading activities occur on third-party exchanges.</li>
            <li>Tezcai has no control over exchange operations, order execution, withdrawal policies, or security measures.</li>
            <li>Any losses resulting from exchange failures, hacks, or insolvency are outside of Tezcai’s control.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. No Financial Advice</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All information provided by Tezcai is for educational and informational purposes only.</li>
            <li>Tezcai does not provide investment, tax, legal, or financial advice.</li>
            <li>You make all trading decisions independently and at your own risk.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
          <p className="mb-2">To the maximum extent permitted by law, Tezcai, its owners, employees, affiliates, and partners shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Any loss of profits, capital, or data</li>
            <li>Any damages arising from technical failures, market events, or user error</li>
            <li>Any indirect, incidental, or consequential damages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Acknowledgment of Risk</h2>
          <p className="mb-2">By proceeding, you confirm that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You understand the nature of cryptocurrency trading and its risks</li>
            <li>You have the financial ability to bear the loss of your entire investment</li>
            <li>You will not hold Tezcai responsible for any losses incurred</li>
          </ul>
          <p className="mt-4 font-medium">
            If you do not understand or accept these risks, you must not use Tezcai.
            <br />
            Continued use of our Services constitutes your acknowledgment and acceptance of this Risk Disclosure.
          </p>
        </section>
         <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosure;