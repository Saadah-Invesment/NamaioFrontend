export default function ProfitShareingTerms() {
    return (
        <div>
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Profit Share Agreement</h3>
                <p className="text-gray-400">Required for Auto-Execution</p>
              </div>
              <h4 className="font-bold text-lg mb-3">How Our Profit Share Works</h4>

              <div className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>15% of net realized profit from Auto-Execution in a billing month.</li>
                  <li>Net realized profit = all winning trades – all losing trades (after exchange fees), excluding deposits/withdrawals/manual trades.</li>
                  <li>Billed monthly on the 1st; payable within 7 days.</li>
                  <li>If monthly net profit ≤ $0 → No profit share due.</li>
                  <li>Affiliate commissions are paid from our 15%, so your referrals never pay extra.</li>
                </ul>

                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                  <h5 className="font-semibold mb-2">Examples:</h5>
                  <div className="flex items-center justify-between">
                    <span>$1,000 net profit</span>
                    <span className="text-green-400">→ $150 profit share</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>$0 or loss</span>
                    <span className="text-green-400">→ $0 profit share</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-semibold">Important Risk Reminder:</h5>
                  <p className="mt-1">
                    Even with a ~75% historical win rate, crypto markets are unpredictable. We cannot guarantee profits, and you may experience losses due to adverse market conditions. Only trade with funds you can afford to lose.
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="font-semibold">Additional Terms:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>All calculations are based on USD equivalent values at the time of trade execution.</li>
                    <li>Profit share invoices are sent via email and must be paid within 7 days.</li>
                    <li>Late payments may result in temporary suspension of Auto-Execution services.</li>
                    <li>You can disable Auto-Execution at any time in your account settings.</li>
                    <li>This agreement remains in effect until you close your account or disable Auto-Execution.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h5 className="font-semibold">Payment Methods:</h5>
                  <p className="mt-1">
                    Profit share payments can be made via cryptocurrency or traditional payment methods. Detailed payment instructions will be provided with each invoice.
                  </p>
                </div>
              </div>
        </div>
    );}