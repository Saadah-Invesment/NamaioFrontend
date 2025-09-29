import { useState } from 'react';


interface ReferralProProps {
  refcode: string;
}
export default function ReferralPro({refcode}:ReferralProProps) {
  const [copied, setCopied] = useState(false);
  
  const referralCode = "1140961763";
  const referralLink = "https://accounts.binance.com/register?ref=1140961763";
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2">Referral Pro</h1>
        <p className="text-gray-300 text-center mb-6">
          Invite Friends, Earn Crypto Together
        </p>
        
        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-300 mb-4">
            Earn commission when your friend joins Binance and trades.{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Learn More
            </a>
          </p>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Invite via</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Referral Code</span>
            <div className="flex items-center">
              <span className="bg-gray-700 py-1 px-3 rounded mr-2">{referralCode}</span>
              <button 
                onClick={() => copyToClipboard(referralCode)}
                className="text-blue-400 hover:text-blue-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Referral Link</span>
            <div className="flex items-center">
              <span className="bg-gray-700 py-1 px-3 rounded mr-2 truncate max-w-xs">
                {referralLink}
              </span>
              <button 
                onClick={() => copyToClipboard(referralLink)}
                className="text-blue-400 hover:text-blue-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Share to</h2>
        
        <div className="grid grid-cols-4 gap-3 mb-6">
          {['WhatsApp', 'Facebook', 'Telegram', 'X', 'Reddit', 'QR code', 'More'].map((platform) => (
            <button
              key={platform}
              className="bg-gray-700 hover:bg-gray-600 py-2 rounded-md text-sm transition-colors"
            >
              {platform}
            </button>
          ))}
        </div>
        
        {copied && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}