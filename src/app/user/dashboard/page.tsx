'use client';

import React, { useEffect, useState } from "react";
import { FiRefreshCw, FiInfo, FiSettings, FiAlertTriangle } from "react-icons/fi";
import { FaToggleOff, FaToggleOn, FaKey, FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getBalance, getDryRun, getTrades, postDryRun } from "@/api/dashboard";
import { getbinanceKeys, getExchangeKeys, patchActivateBot, patchusePlatform, postbinanceKeys, postExchangeKeys } from "@/api/setapikeys";
import SummaryCards from "./SummaryCard";
import TradeTable from "./TradeTable";
import { BiGlobe } from "react-icons/bi";
import HotCoins from "./HotCoins";

export default function DashboardPage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState({});
  const [activeID, setActiveID] = useState(0);
  const [active, setActive] = useState(true);

  const [apikeyError, setApiKeyError] = useState(false);
  const [noApiKeyConfigured, setNoApiKeyConfigured] = useState(false);
  const [loadingApiKey, setLoadingApiKey] = useState(false);

  const [balance, setBalance] = useState({
    current_balance: 0.0,
    opening_balance: 0.0,
    netpnl_usd: 0.0,
    day_net_pnl_pct: 0.0,
    week_net_pnl_pct: 0.0,
    month_net_pnl_pct: 0.0,
    overall_net_pnl_pct: 0.0,

  });

  const [loadingBalance, setloadingBalance] = useState(false);
  const [trades, setTrades] = useState([]);
  const [loadingtrades, setloadingTrades] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch data functions
  const fetchbalance = async () => {
    setloadingBalance(true);
    try {
      const res = await getBalance();
      if (res.status !== 200) throw new Error("error");
      setBalance(res.data);
      // setNoApiKeyConfigured(false); // Reset if successful
    } catch (err: any) {
      // Check if it's the specific "No Binance API key configured" error
      if (err.response?.status === 404 &&
        err.response?.data?.detail === "No Binance API key configured.") {
        setNoApiKeyConfigured(true);
        setApiKeyError(true);
        // Don't show toast for this specific error as we'll show a better UI
      } else {
        // toast.error("Failed to fetch balance");
      }
    } finally {
      setloadingBalance(false);
      setRefreshing(false);
    }
  };
  const [dateRange, setDateRange] = useState<{ from?: string, to?: string }>(() => {
    // Initialize with "this month" dates
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      from: formatDate(monthStart),
      to: formatDate(today)
    };
  });

  const handleDateFilter = async (from?: string, to?: string) => {
    await fetchtrades(from, to);
    setDateRange({ from, to });
  };

  const fetchtrades = async (from?: string, to?: string) => {
    setloadingTrades(true);
    try {
      const res = await getTrades(from, to);
      if (res.status !== 200) throw new Error("error");
      setTrades(res.data);
    } catch (err: any) {
      // Check if it's the specific "No Binance API key configured" error
      if (err.response?.status === 404 &&
        err.response?.data?.detail === "No Binance API key configured.") {
        // Don't show toast for this specific error as we'll show a better UI
        return;
      }
      toast.error("Failed to fetch trades");
    } finally {
      setloadingTrades(false);
      setRefreshing(false);
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    fetchtrades(dateRange.from, dateRange.to);
  }, []); // Empty dependency array means this runs once on mount




  const [testmode, setTestMode] = useState(false)
  const [demo_balance, setDemoBalance] = useState(0.0)
  const [loadingTest, setloadingTest] = useState(false)
  const [showModal1, setShowModal1] = useState(false);



  const confirmSave1 = async () => {
    setloadingTest(true);
    try {

      const res = await postDryRun(!testmode)
      if (res.status === 200) {
        setTestMode(prev => !prev);
        setRefreshing(true);
        fetchbalance();
        // fetchtrades();
        toast.success(`Status Changed`);
        setShowModal1(false);
      }
    } catch (err) {
      toast.error("Failed to change status");
    } finally {
      setloadingTest(false);
    }
  };
  const fetchtestMode = async () => {
    setloadingTest(true);

    try {
      const res = await getDryRun();
      const data = res.data;
      setTestMode(data.dry_run)
      setDemoBalance(data.demo_balance)
    } catch (err: any) {
      console.log("eror", err)

    } finally {

      setloadingTest(false)
    }
  };

  const fetchKeys = async () => {
    setLoadingApiKey(true);
    setApiKeyError(false);
    try {
      const res = await getExchangeKeys();
      const data = res.data;
      setApiKey(data.selected_exchange);
      setSecretKey(data.active_key_for_selected);

      if (data.active_key_for_selected) {
        setActive(data?.active_key_for_selected?.active);
        setActiveID(data?.active_key_for_selected?.id)
        setNoApiKeyConfigured(false);
      } else {
        setNoApiKeyConfigured(true);
      }


    } catch (err: any) {

      if (err.response?.status === 404 || err.response?.status === 401) {
        setNoApiKeyConfigured(true);
      }
      setApiKeyError(true);
    } finally {
      setLoadingApiKey(false);
      setRefreshing(false);
    }
  };

  const [demomodeLoading, setdemomodeLoading] = useState(false)

  const confirmDemoMode = async () => {
    setdemomodeLoading(true);
    try {
      const payload = {
        exchange_name: "binance",
        api_key: "demo....apiKey_demo",
        api_secret: "demo....secretKey_demo",
        "active": true,
        label: "Binance"
      };
      const res = await postDryRun(!testmode)
      if (res.status === 200) {
        const res = await postExchangeKeys(payload)
        const ress = await patchusePlatform({
          selected_exchange: "binance",
        });
        if (res.status === 201 || res.status === 200) {

          toast.success(`Demo Mode Activated`);
          window.location.reload();
        }


        setShowModal1(false);
      }
    } catch (err) {
      toast.error("Failed to change status");
    } finally {
      setdemomodeLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchtestMode()
    fetchbalance();
    // fetchtrades();
    fetchKeys();
  }, []);

  // API key handlers
  const handleSaveClick = () => {
    if (!apiKey || !secretKey) {
      toast.error("API Key and Secret Key are required");
      return;
    }
    setShowModal(true);
  };

  const confirmSave = async () => {
    setLoadingApiKey(true);
    try {
      const payload = {
        active: !active,
      };
      const res = await patchActivateBot(activeID, payload);
      if (res.status === 200) {
        setActive(prev => !prev);
        toast.success(`Bot ${!active ? "activated" : "deactivated"} successfully`);
        setShowModal(false);
      }
    } catch (err) {
      toast.error("Failed to save keys");
    } finally {
      setLoadingApiKey(false);
    }
  };

  const toggleActive = () => handleSaveClick();
  const toggleActive1 = () => setShowModal1(true);
  const toggleActive2 = () => setShowModal1(true);

  const navigateToSettings = () => {
    router.push('/user/settings');
  };

  // Show API key setup required screen
  if (noApiKeyConfigured) {
    return (
      <div className="w-full p-4 md:p-6 bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}


          {/* API Key Required Card */}
          <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 rounded-xl p-8 text-center space-y-6">
            {/* <div className="flex justify-center">
              <div className="p-4 bg-orange-500/20 rounded-full">
                <FaKey className="text-orange-400 text-3xl" />
              </div>
            </div> */}
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-bold text-white">
                📊 Try Demo Mode
              </h2>
              <button
                onClick={toggleActive2}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold text-base"
              >
                Use Demo Mode
              </button>

              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Experience trading with Tezcai risk-free.
              </p>
              <p className="text-gray-400 text-base max-w-md mx-auto">
                Learn how the platform works, test strategies, and build confidence before using real funds.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-200">
                ( OR )
              </h2>
              <h2 className="text-2xl font-bold text-white">
                🔑 Crypto Exchange API Setup Required
              </h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                To start trading with Tezcai, you need to connect your Crypto account first.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 text-left">
                <div className="text-lg">
                  <div className="text-green-500 font-medium mb-1">API Key Setup Made Simple</div>
                  <div className="text-gray-300">
                    Great news — our platform is designed to keep things safe and simple.
                    We only support buying and selling, so there’s no risk of withdrawals or transfers.
                    When creating your API keys, just enable <span className="font-semibold text-green-500">Spot Trading</span> and leave the rest disabled.
                  </div>
                </div>
              </div>
            </div>



            <div className="space-y-4">
              <button
                onClick={navigateToSettings}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold text-lg"
              >
                <FiSettings />
                Setup  API Keys
                <FaArrowRight />
              </button>

              <div className="text-sm text-gray-400">
                Don't have API keys? We'll guide you through the setup process.
              </div>
            </div>

            {/* Quick Setup Steps */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-2xl mx-auto mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Quick Setup Steps:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <div className="text-gray-300">Visit Crypto Account API key Management</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <div className="text-gray-300">Create API Key with Spot Trading</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <div className="text-gray-300">Enter Keys in Settings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal1 && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a1a] rounded-lg border border-[#ffffff28] max-w-md w-full">
              <div className="bg-card rounded-xl p-6 max-w-md w-full space-y-4 border border-border">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FiInfo className="text-yellow-500" />
                  Confirm  Try  Demo Mode
                </h2>
                <p className="text-gray-300 ">
                  Experience trading with Tezcai risk-free. <br />
                  We’ve set up demo keys for you. Later, you can add your own real keys. <br />
                  Are you sure you want to continue?
                </p>


                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowModal1(false)}
                    className="px-4 py-2 rounded-lg bg-muted hover:bg-accent transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDemoMode}
                    disabled={demomodeLoading}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition flex items-center gap-2"
                  >
                    {loadingApiKey && (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#0F172A] space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            {apiKey && (
              <div className="inline-flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Active {" "}<span className="hidden sm:inline">Platform</span>{" "}</span>
                <span className="text-sm font-bold text-green-400">{apiKey.toUpperCase()}</span>
              </div>
            )}
          </div>
          <p className="text-gray-400">Overview of your account & trading performance</p>
        </div>

        <div className="flex items-center gap-3">

          {!loadingTest && (
            <div className="flex items-center bg-card px-3 py-2 rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Demo Mode:</span>
              {loadingTest ? (
                <div className="ml-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <button
                  onClick={toggleActive1}
                  className="ml-2 text-xl"
                  title="Toggle Demo"
                >
                  {testmode ? (
                    <FaToggleOn className="text-green-400" />
                  ) : (
                    <FaToggleOff className="text-gray-400" />
                  )}
                </button>
              )}
            </div>
          )}
          {!apikeyError && apiKey && (
            <div className="flex items-center bg-card px-3 py-2 rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Bot Status:</span>
              {loadingApiKey ? (
                <div className="ml-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <button
                  onClick={toggleActive}
                  className="ml-2 text-xl"
                  title="Toggle Active"
                >
                  {active ? (
                    <FaToggleOn className="text-green-400" />
                  ) : (
                    <FaToggleOff className="text-gray-400" />
                  )}
                </button>
              )}
            </div>
          )}

          {/* Show settings button if there are API key issues */}
          {apikeyError && (
            <button
              onClick={navigateToSettings}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 transition border border-orange-400/30"
              title="Configure API Keys"
            >
              <FiSettings />
              <span className="text-sm">Setup API</span>
            </button>
          )}

          <button
            onClick={() => { setRefreshing(true); fetchbalance(); fetchtrades(dateRange.from, dateRange.to); }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card hover:bg-accent text-foreground transition border border-border"
            disabled={refreshing}
          >
            <FiRefreshCw className={`${refreshing ? "animate-spin" : ""}`} />
            <span className="text-sm">{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* API Key Error Alert */}
      {apikeyError && !noApiKeyConfigured && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-yellow-200 font-medium">API Key Configuration Issue</div>
              <div className="text-yellow-300 text-sm mt-1">
                There might be an issue with your API key configuration. Some features may not work properly.
              </div>
              <button
                onClick={navigateToSettings}
                className="inline-flex items-center gap-1 mt-2 text-sm text-yellow-400 hover:text-yellow-300 underline"
              >
                <FiSettings className="text-xs" />
                Check Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCards balance={balance} loading={loadingBalance} trades={trades} testmode={testmode} demo_balance={demo_balance} />
      <HotCoins />
      {/* Trades Table */}
      <TradeTable trades={trades} loading={loadingtrades} testmode={testmode} onDateFilter={handleDateFilter} />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] rounded-lg border border-[#ffffff28] max-w-md w-full">
            <div className="bg-card rounded-xl p-6 max-w-md w-full space-y-4 border border-border">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiInfo className="text-yellow-500" />
                Confirm Bot {active ? "Deactivation" : "Activation"}
              </h2>
              <p className="text-muted-foreground">
                The trading bot will {active ? "stop executing" : "start executing"} trades immediately.
                Are you sure you want to continue?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-muted hover:bg-accent transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSave}
                  disabled={loadingApiKey}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition flex items-center gap-2"
                >
                  {loadingApiKey && (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal1 && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] rounded-lg border border-[#ffffff28] max-w-md w-full">
            <div className="bg-card rounded-xl p-6 max-w-md w-full space-y-4 border border-border">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiInfo className="text-yellow-500" />
                Confirm  Trun {testmode ? "Off" : "On"} Demo Mode
              </h2>
              <p className="text-muted-foreground">
                Turn {testmode ? "off" : "on"} Demo Mode to change the values in Dashboard.
                Are you sure you want to continue?
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal1(false)}
                  className="px-4 py-2 rounded-lg bg-muted hover:bg-accent transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSave1}
                  disabled={loadingTest}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition flex items-center gap-2"
                >
                  {loadingApiKey && (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}