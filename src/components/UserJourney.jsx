'use client'
import React, { useState, useEffect } from 'react';
import { FiUser, FiDollarSign, FiKey, FiLink, FiPlay, FiArrowRight, FiChevronLeft, FiChevronRight, FiCheck, FiZap, FiShield, FiClock, FiTrendingUp, FiStar, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import Header from "@/components/Header";
import Footer from './Footer';
export default function UserJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      step: "Step 1",
      title: "Create Your Crypto Trading Account",
      subtitle: "Start your trading journey",
      icon: FiUser,
      instructions: [
        "Visit any Crypto Website and click 'Register' (eg,Binance.com ,okx.com)",
        "Complete email verification process",
        "Enable 2FA for maximum security",
        "Complete KYC identity verification"
      ],
      stats: [
        { value: "2M+", label: "Active Users", icon: FiUser },
        { value: "5min", label: "Quick Setup", icon: FiClock },
        { value: "99.9%", label: "Uptime", icon: FiTrendingUp }
      ],
      tips: "Pro Tip: Enable all security features during setup for better protection"
    },
    {
      step: "Step 2",
      title: "Fund Your Trading Wallet",
      subtitle: "Add capital to start trading",
      icon: FiDollarSign,
      instructions: [
        "Navigate to 'Wallet' → 'Fiat and Spot'",
        "Click 'Deposit' for your currency",
        "Choose your preferred payment method",
        "Wait for funds confirmation"
      ],
      stats: [
        { value: "24/7", label: "Processing", icon: FiClock },
        // { value: "Instant", label: "Card Deposits", icon: FiZap }
      ],
      tips: "Start small with your initial deposit to test the platform"
    },
    {
      step: "Step 3",
      title: "Generate Secure API Key",
      subtitle: "Connect safely to our platform",
      icon: FiKey,
      instructions: [
        "Click on your profile icon → Account  → API Management",
        "Click 'Create API Key'",
        "Name it Tezcai or similar",
        "Under IP access restrictions add our server IP  (optional for Okx) ",
        `Enable "Trade" or "Spot & Margin Trading" (DO NOT enable withdrawals for security)`,
        "Save your credentials securely"
      ],
      stats: [
        { value: "256-bit", label: "Encryption", icon: FiShield },
        { value: "Read-Only", label: "Safe Access", icon: FiKey },
        { value: "No Withdrawal", label: "Permissions", icon: FiShield }
      ],
      tips: "Never share your API keys and store them in a secure location"
    },
    {
      step: "Step 4",
      title: "Connect to Tezcai",
      subtitle: "Link your trading account",
      icon: FiLink,
      instructions: [
        "Login to your Tezcai account",
        "Navigate to 'Settings'",
        "Choose your crypto platfrom",
        "Copy & paste both the API Key and Secret Key or Passphrase",
        "Test connection status",
        `Once connection is successful, click "Save Keys"`
      ],
      stats: [
        { value: "1-Click", label: "Connection", icon: FiLink },
        { value: "Instant", label: "Verification", icon: FiCheckCircle },
        { value: "Secure", label: "Protocol", icon: FiShield }
      ],
      tips: "Test the connection before proceeding to ensure everything works"
    },
    {
      step: "Step 5",
      title: "Start Smart Trading",
      subtitle: "Let Tezcai work for you",
      icon: FiPlay,
      instructions: [
        "Review your connection status",
        "Activate trading to allow our bot to start trading for you",
        "Click Use (Binance or Okx) Button ",
        "Once successful, your trading will begin.",
        "View all trade information directly in your dashboard",
        "Monitor your overall performance"
      ],

      stats: [
        { value: "24/7", label: "Trading", icon: FiClock },
        { value: "Smart Trading", label: "Decisions", icon: FiStar },
        { value: "Real-time", label: "Updates", icon: FiTrendingUp }
      ],
      tips: "Start Your Smart Trading"
    }
  ];

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const markStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set(prev.add(stepIndex)));
  };

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextStep, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <Header />
      <div className=" max-w-6xl mx-auto px-6  py-2 md:py-5 h-screen mb-10 flex flex-col">

        {/* <button
          onClick={() => window.history.back()}
          className="flex items-center text-white hover:text-blue-400 transition-colors">
          <FiArrowLeft className="mr-1" />
          Back
        </button> */}
        <div className="text-center mb-2">
          {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4 mx-auto">
            <FiPlay className="w-6 h-6 text-white" />
          </div> */}

          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Get Started in Minutes
          </h1>

          <p className="text-base text-gray-400 max-w-3xl mx-auto ">
            Join thousands of traders who've automated their success with our smart platform
          </p>

          {/* Auto-play Toggle */}
          {/* <div className="flex items-center justify-center space-x-4 ">
            <span className="text-gray-400">Manual</span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAutoPlay ? 'bg-blue-600' : 'bg-gray-700'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAutoPlay ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
            <span className="text-gray-400">Auto-play</span>
          </div> */}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-400">Progress</span>
            <span className="text-xs font-medium text-gray-400">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content - flex-1 to take remaining space */}
        <div className="relative flex-1">
          {/* Navigation Buttons */}
          <button
            onClick={prevStep}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 bg-gray-800 p-2 rounded-full border border-gray-600 hover:border-blue-500 hover:bg-gray-700 transition-all group"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </button>

          <button
            onClick={nextStep}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 bg-gray-800 p-2 rounded-full border border-gray-600 hover:border-blue-500 hover:bg-gray-700 transition-all group"
          >
            <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
          </button>

          {/* Content Card */}
          <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700 h-full flex flex-col">

            {/* Left Content */}
            <div className=" flex flex-col">
              {/* Step Header */}
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/50 rounded-xl mr-4">
                  <currentStepData.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <span className="text-blue-400 font-medium text-xs uppercase tracking-wide">
                    {currentStepData.step}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6 flex-1">
                <h3 className="text-base font-semibold text-white mb-3">Instructions:</h3>
                <div className="space-y-2">
                  {currentStepData.instructions.map((instruction, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-900/50 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <p className="text-gray-300 text-sm flex-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-3 mb-6">
                <div className="flex items-start space-x-2">
                  <FiStar className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-medium text-xs mb-1">Pro Tip</p>
                    <p className="text-gray-300 text-xs">{currentStepData.tips}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    markStepComplete(currentStep)
                    nextStep()
                  }}
                  className={`flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-all text-sm`}
                >
                  {completedSteps.has(currentStep) ? (
                    <>
                      <FiCheck className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      Continue Setup
                      <FiArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>

                {/* <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg font-medium text-gray-300 hover:text-white transition-all text-sm"
                >
                  Skip for Now
                </button> */}
              </div>
            </div>

            {/* Right Stats */}
            {/* <div className="lg:w-1/3">
                <h3 className="text-base font-semibold text-white mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  {currentStepData.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-5 h-5 text-blue-400" />
                        <div className="text-lg font-bold text-white">
                          {stat.value}
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Step Progress</span>
                    <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentStep
                            ? 'bg-blue-600'
                            : completedSteps.has(idx)
                              ? 'bg-green-500'
                              : 'bg-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div> */}

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-6 mb-10">
          <div className="flex space-x-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentStep
                  ? 'bg-blue-600 scale-125'
                  : completedSteps.has(idx)
                    ? 'bg-green-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
      <br />
      <Footer />
    </div>
  );
}