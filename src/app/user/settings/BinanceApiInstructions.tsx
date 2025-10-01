"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiCopy } from "react-icons/fi";
import copy from "copy-to-clipboard";
// Step interface
interface Step {
  title: string;
  content: React.ReactNode;
}

const handleCopy = (publicIP: any) => {
  const success = copy(`${publicIP || ""}`, {
    debug: process.env.NODE_ENV === "development",
    message: "Press #{key} to copy",
    format: "text/plain",
  });
  if (success) {
    toast.success("IP address copied!");
  }
};

interface BinanceSetupWizardProps {
  publicIP: string;
}

export default function BinanceApiInstructions({ publicIP }: BinanceSetupWizardProps) {


  const steps: Step[] = [
    {
      title: "Part 1: Create Binance Account",
      content: (
        <div className="space-y-4 text-lg">
          <p><b>Step 1:</b> Go to <a href="https://www.binance.com" target="_blank" className="text-blue-400 underline">binance.com</a>.</p>
          <p><b>Step 2:</b> Click <span className=" font-semibold">Register</span> at the top right.</p>
          <p><b>Step 3:</b> Sign up using <span className="font-semibold">Email</span> or <span className="font-semibold">Phone</span>.</p>
          <p><b>Step 4:</b> Create a <span className="text-green-400 font-semibold">Strong Password</span> (use letters, numbers, symbols).</p>
          <p><b>Step 5:</b> Verify your account by clicking the <span className="text-blue-400 font-semibold">Email verification link</span> Binance sends you.</p>
        </div>
      ),
    },
    {
      title: "Part 2: Verify Your Identity (KYC)",
      content: (
        <div className="space-y-4 text-lg">
          <p><b>Step 1:</b> Log in and go to <span className="">Profile → Identification</span>.</p>
          <p><b>Step 2:</b> Select your country and choose <b>Personal Verification</b>.</p>
          <p><b>Step 3:</b> Upload one valid document:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Passport</li>
            <li>Driver’s License</li>
            <li>National ID Card</li>
          </ul>
          <p><b>Step 4:</b> Take a selfie or face verification via webcam.</p>
          <p><b>Step 5:</b> Wait for approval (usually <span className="text-green-400">15 mins – 24 hrs</span>).</p>
        </div>
      ),
    },
    {
      title: "Part 3: Enable Security (2FA)",
      content: (
        <div className="space-y-4 text-lg">
          <p><b>Highly Recommended:</b> Enable <b>Google Authenticator (2FA)</b>.</p>
          <p><b>Step 1:</b> Download <b>Google Authenticator</b> app on iOS/Android.</p>
          <p><b>Step 2:</b> In Binance, go to <span className="">Profile → Security</span>.</p>
          <p><b>Step 3:</b> Scan the <span className="">QR Code</span> shown on Binance using the Authenticator app.</p>
          <p><b>Step 4:</b> Enter the <span className="">6-digit code</span> + <span className="text-blue-400">Email code</span> to confirm.</p>
        </div>
      ),
    },
    {
      title: "Part 4: Create API Keys",
      content: (
        <div className="space-y-4 text-lg">
          <p><b>Step 1:</b> Go to <span className="">Profile → Account → API Management</span>.</p>
          <p><b>Step 2:</b> Click <span className="">Create API</span>, choose <b>System Generated</b> and  (Label API Key to proceed)  label it as <span className="text-blue-400">Namaio</span> and click next</p>
          <p><b>Step 3:</b> Click <span className="">Edit restrictions</span></p>
          <ul className="list-disc ml-6 space-y-2">
            <li><b>Under IP access restrictions </b>
              <p> → Select  Restrict access to trusted IPs only (Recommended)</p>
              <p> →  Copy this Namaio IP  and  Paste it{" "} <span><button
                onClick={() => { handleCopy(publicIP) }}
                className="bg-gray-700/50 px-2 py-1 rounded hover:bg-gray-600 transition"
              >
                ********* <FiCopy className="inline ml-1" />
              </button></span></p>

              <p> →  Click Confirm</p>
            </li>
          </ul>

          <p><b>Step 4:</b> Enable Spot & Margin Trading  only: </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <b>Under API restrictions </b>
              <p> Enable Spot & Margin Trading ✅</p>
              <p> Click Save and Verify</p>
            </li>
          </ul>
          <p className="text-white font-bold">❌ Never enable Withdrawals!</p>
        </div>
      ),
    },
    {
      title: "Part 5: Connect Binance to Namaio",
      content: (
        <div className="space-y-4 text-lg">
          <p><b>Step 1:</b> Copy your <span className="font-semibold">Binance API Key</span> and <span className="font-semibold">Secret Key</span>.</p>
          <p><b>Step 2:</b> Paste them into the <span className="text-blue-400">Namaio Platform → Settings</span>.</p>
          <p><b>Step 3:</b> Click <span className="text-green-400 font-semibold">Test Connection</span>. If successful, click <b>Save Keys</b>.</p>
          <p><b>Step 4:</b> <b>Trading Status: </b> → Click <span className="text-yellow-400">Enable</span></p>
          <p><b>Step 5:</b>  Click <span className="text-blue-400">Use Binance</span>.</p>

        </div>
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );

  const markCompleted = () => {
    const updated = [...completedSteps];
    updated[currentStep] = true;
    setCompletedSteps(updated);
  };

  return (
    <div id="help" className=" mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg space-y-6">
      {/* Progress Header */}
      <h2 className="text-xl font-semibold text-white/90">
        Help
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4 sm:gap-0">
  {/* Back Button */}
  <button
    disabled={currentStep === 0}
    onClick={() => setCurrentStep((s) => s - 1)}
    className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
  >
    ⬅ Back
  </button>

  {/* Title */}
  <h2 className="text-lg sm:text-xl font-semibold text-white/90 text-center w-full sm:w-auto">
    How to Get Your Binance API Keys
  </h2>

  {/* Right Action Button */}
  {!completedSteps[currentStep] ? (
    <button
      onClick={markCompleted}
      className="px-5 py-2 bg-blue-600 font-semibold rounded-lg hover:bg-blue-400 w-full sm:w-auto"
    >
      Mark as Completed
    </button>
  ) : currentStep < steps.length - 1 ? (
    <button
      onClick={() => setCurrentStep((s) => s + 1)}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 w-full sm:w-auto"
    >
      Next
    </button>
  ) : (
    <button className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 w-full sm:w-auto">
      🎉 Finish
    </button>
  )}
</div>


      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
        {completedSteps[currentStep] && (
          <FiCheckCircle className="text-green-400 text-3xl" />
        )}
      </div>

      {/* Step Content */}
      <div className="text-gray-200">{steps[currentStep].content}</div>

      {/* Controls */}

      {/* Step Indicators */}
      <div className="flex gap-3 justify-center mt-6">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full transition ${idx === currentStep
              ? "bg-blue-500"
              : completedSteps[idx]
                ? "bg-green-400"
                : "bg-gray-600"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
