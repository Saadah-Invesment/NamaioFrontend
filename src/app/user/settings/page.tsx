"use client";

import { getExchangeKeys, patchActivateBot, patchusePlatform, postbinanceKeys, postExchangeKeys, testConnections, testConnectionsokx } from "@/api/setapikeys";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import copy from 'copy-to-clipboard';
import {
  FaKey,
  FaLock,
  FaSave,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEyeSlash,
  FaPlug,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaWallet,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaClock
} from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";
import BinanceApiInstructions from "./BinanceApiInstructions";

import OkxApiInstructions from "./OkxInstructions";
const publicIP = process.env.NEXT_PUBLIC_P_IP
interface ConnectionStatus {
  isConnected: boolean;
  accountInfo?: {
    spot_trading_enabled: boolean;
    ip_restrict: boolean;
    server_ip_added: boolean | null;
    binance_raw: {
      ipRestrict: boolean;
      createTime: number;
      enableReading: boolean;
      enableWithdrawals: boolean;
      enableInternalTransfer: boolean;
      enableFutures: boolean;
      permitsUniversalTransfer: boolean;
      enableVanillaOptions: boolean;
      enableFixApiTrade: boolean;
      enableFixReadOnly: boolean;
      enableSpotAndMarginTrading: boolean;
      enablePortfolioMarginTrading: boolean;
      enableMargin: boolean;
    };
  };
  error?: string;
}


interface ConnectionStatusokx {
  isConnected: boolean;
  accountInfo?: {
    demo_mode: boolean,
    credentials_valid: boolean,
    trade_permission_inferred: boolean,
    balances_sample: any
  };
  error?: string;
}

export default function UserSettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [active, setActive] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [connectionStatusokx, setConnectionStatusokx] = useState<ConnectionStatusokx | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModaluse, setShowModaluse] = useState(false);
  const [showModalactivate, setShowModalactivate] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  //////changes 
  const [currentPlatform, setCurrentPlatform] = useState("")
  const [bId, setBid] = useState("")
  const [okxId, setOkxID] = useState("")
  const [useloading, setUseLoading] = useState(false)
  const [acivateloading, setActivateLoading] = useState(false)

  const [hidekeysbinance, setHideKeysBinance] = useState(false)
  const [hidekeysokx, setHideKeysokx] = useState(false)
  const [passphrase, setPassphrase] = useState("");
  const [apiKeyokx, setApiKeyokx] = useState("");
  const [secretKeyokx, setSecretKeyokx] = useState("");
  const [activeokx, setActiveokx] = useState(false);
  const [showSecretpass, setShowSecretpass] = useState(false);
  const [platform, setPlatform] = useState("Binance");
  const [isEditingbinance, setIsEditingbinance] = useState(false);
  const [isEditingokx, setIsEditingokx] = useState(false);
  const [allkesy, setAllKeys] = useState([])

  const clearfieldsbi = () => {
    setApiKey("");
    setSecretKey("");
    setHideKeysBinance(false)
  }

  const clearfieldsokx = () => {
    setApiKeyokx("");
    setSecretKeyokx("");
    setPassphrase("");
    setHideKeysokx(false)
  }

  const handleeditbi = () => {
    setIsEditingbinance(!isEditingbinance)
    if (isEditingbinance) {
      setKeys(allkesy)
    } else {
      clearfieldsbi()
    }
  }

  const handleeditokx = () => {
    setIsEditingokx(!isEditingokx)
    if (isEditingokx) {
      setKeys(allkesy)
    } else {
      clearfieldsokx()
    }
  }

  // useEffect(() => {
  //   clearfields()
  // }, [platform])
  /////changes

  useEffect(() => {
    setLoading(true);


    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await getExchangeKeys();
      const data = res.data;
      setAllKeys(data);
      setKeys(data)

      // If keys exist, automatically test connection
      if (data.api_key && data.api_secret) {
        testConnection(data.api_key, data.api_secret);
      }
    } catch (err) {
      console.log("No keys found or unauthorized");
    } finally {
      setLoading(false);
    }
  };


  const setKeys = (data: any) => {

    const binancekeys = data?.active_by_exchange?.binance
    const okxkeys = data?.active_by_exchange?.okx
    const activekey = data?.active_key_for_selected
    if (!isEditingbinance && !isEditingokx && activekey && (activekey.label === "Binance" || activekey.label === "OKX")) {
      setPlatform(activekey.label)
    }
    setCurrentPlatform(data?.selected_exchange);

    if (binancekeys?.id) {
      setBid(binancekeys?.id)
      setApiKey(binancekeys?.api_key_preview)
      setActive(binancekeys?.active)
      setHideKeysBinance(true)
    } else {
      setHideKeysBinance(false)
      setApiKey("")
      setActive(false)
    }

    if (okxkeys?.id) {
      setOkxID(okxkeys?.id)
      setApiKeyokx(okxkeys?.api_key_preview)
      setActiveokx(okxkeys?.active)
      setHideKeysokx(true)
    } else {
      setHideKeysokx(false)
      setApiKeyokx("")
      setActiveokx(false)

    }

  }

  const testConnection = async (testApiKey?: string, testSecretKey?: string) => {
    const keyToTest = testApiKey || apiKey;
    const secretToTest = testSecretKey || secretKey;

    if (!keyToTest || !secretToTest) {
      console.error("Please enter both API Key and Secret Key before testing");
      return;
    }

    setTestingConnection(true);
    setConnectionStatus(null);

    try {
      const payload = {
        api_key: keyToTest,
        api_secret: secretToTest,
      };
      const response = await testConnections(payload);
      const data = response.data;

      if (response.status === 200) {
        // Transform the response to match our interface
        setConnectionStatus({
          isConnected: true,
          accountInfo: data
        });
        console.log("🎉 Connection successful!");
      } else {
        setConnectionStatus({
          isConnected: false,
          error: data.error || data.message || "Connection failed",
        });
        console.error(`Connection failed: ${data.error || "Unknown error"}`);
      }
    } catch (error: any) {
      setConnectionStatus({
        isConnected: false,
        error: (error.response?.data?.detail + `\n ${error.response?.data?.binance_response?.msg}`) || error.message || "Connection failed",
      });
      console.log("error", error);
    } finally {
      setTestingConnection(false);
    }
  };




  const testConnectionokx = async (testApiKey?: string, testSecretKey?: string, testPassphrase?: string) => {
    const keyToTest = testApiKey || apiKeyokx;
    const secretToTest = testSecretKey || secretKeyokx;
    const passphraseToTest = testPassphrase || passphrase;
    if (!keyToTest || !secretToTest || !passphraseToTest) {
      console.error("Please enter API Key, Secret Key and Passphrase before testing");
      return;
    }

    setTestingConnection(true);
    setConnectionStatusokx(null);

    try {
      const payload = {
        api_key: keyToTest,
        api_secret: secretToTest,
        passphrase: passphraseToTest,
        demo: false
      };
      const response = await testConnectionsokx(payload);
      const data = response.data;

      if (response.status === 200) {
        // Transform the response to match our interface
        setConnectionStatusokx({
          isConnected: true,
          accountInfo: data
        });
        console.log("🎉 Connection successful!");
      } else {
        setConnectionStatusokx({
          isConnected: false,
          error: data.error || data.message || "Connection failed",
        });
        console.error(`Connection failed: ${data.error || "Unknown error"}`);
      }
    } catch (error: any) {
      setConnectionStatusokx({
        isConnected: false,
        error: (error.response?.data?.detail + `\n ${error.response?.data?.okx_response?.msg}`) || error.message || "Connection failed",
      });
      console.log("error", error);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveClick = () => {
    // if (platform === "Binance") {
    //   if (!apiKey || !secretKey) {
    //     console.error("API Key and Secret Key are required");
    //     return;
    //   }
    // }
    // if (platform === "OKX") {
    //   if (!apiKeyokx || !secretKeyokx || !passphrase) {
    //     console.error("API Key and Secret Key are required");
    //     return;
    //   }
    // }

    setShowModal(true);
  };


  const handleUseClick = () => {
    setShowModaluse(true);
  };

  const handleactivateClick = () => {
    setShowModalactivate(true);
  };

  const confirmSave = async () => {
    setLoading(true);
    try {
      const payloadbinance = {
        exchange_name: platform.toLocaleLowerCase(),
        api_key: apiKey,
        api_secret: secretKey,
        active,
        label: `${platform}`
      };

      const payloadokx = {
        exchange_name: platform.toLocaleLowerCase(),
        api_key: apiKeyokx,
        api_secret: secretKeyokx,
        passphrase: passphrase,
        active,
        label: `${platform}`
      };
      const payload = platform === "Binance" ? payloadbinance : payloadokx

      const res = await postExchangeKeys(payload);
      if (res.status === 201 || res.status === 200) {
        fetchKeys()
      }

      setSaved(true);
      toast.success("keys saved successfully")
      setTimeout(() => setSaved(false), 2000);
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      console.error("Failed to save keys");
    } finally {
      setLoading(false);
    }
  };



  const confirmactivate = async () => {
    const activatebi = active ? false : true
    const activateokx = activeokx ? false : true
    setActivateLoading(true);
    try {
      const payloadbinance = {
        active: activatebi,
      };

      const payloadokx = {
        active: activateokx,
      };
      const payload = platform === "Binance" ? payloadbinance : payloadokx
      const id = platform === "Binance" ? bId : okxId
      const res = await patchActivateBot(id, payload);
      if (res.status === 201 || res.status === 200) {
        // await confirmuse()
        fetchKeys()
        if (platform === "Binance") {
          setActive(payloadbinance.active);
          setSaved(true);
          // toast.success("keys saved successfully")
          toast.success(`Bot ${payloadbinance.active ? "Activate" : "Deactivate"} successfully`)
          setTimeout(() => setSaved(false), 2000);
          setShowModalactivate(false);
        } else {
          setActiveokx(payloadokx.active);
          setSaved(true);
          // toast.success("keys saved successfully")
          toast.success(`Bot ${payloadokx.active ? "Activate" : "Deactivate"} successfully`)
          setTimeout(() => setSaved(false), 2000);
          setShowModalactivate(false);
        }

      }


    } catch (err: any) {
      console.error(err);
      console.error("Failed to save keys");
    } finally {
      setActivateLoading(false);
    }
  };


  const confirmuse = async () => {
    setUseLoading(true);
    try {
      const payload = {
        selected_exchange: platform.toLocaleLowerCase(),
      };

      const res = await patchusePlatform(payload);
      if (res.status === 201 || res.status === 200) {
        fetchKeys()
      }

      setSaved(true);
      toast.success("Platform saved successfully")
      setTimeout(() => setSaved(false), 2000);
      setShowModaluse(false);
    } catch (err: any) {
      console.error(err);
      console.error("Failed to save keys");
    } finally {
      setUseLoading(false);
    }
  };

  const toggleActive = () => {

    handleactivateClick()
  }

  const toggleActiveokx = () => setActiveokx((prev) => !prev);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderConnectionStatus = () => {
    if (!connectionStatus) return null;

    return (
      <div className="bg-gray-800/50 border border-white/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          {connectionStatus.isConnected ? (
            <FaCheckCircle className="text-green-400 text-xl" />
          ) : (
            <FaExclamationTriangle className="text-red-400 text-xl" />
          )}
          <h3 className="text-lg font-semibold">
            {connectionStatus.isConnected ? "Connection Successful" : "❌ Connection Failed"}
          </h3>
        </div>

        {connectionStatus.isConnected && connectionStatus.accountInfo ? (
          <div className="space-y-6">
            {/* Main Status Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <FaChartLine className="text-blue-400 text-xl mx-auto mb-2" />
                <div className="text-sm text-white/70">Spot Trading</div>
                <div className={`font-semibold ${connectionStatus.accountInfo.spot_trading_enabled ? 'text-green-400' : 'text-red-400'}`}>
                  {connectionStatus.accountInfo.spot_trading_enabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <FaGlobe className="text-yellow-400 text-xl mx-auto mb-2" />
                <div className="text-sm text-white/70">IP Restriction</div>
                <div className={`font-semibold ${connectionStatus.accountInfo.ip_restrict ? 'text-yellow-400' : 'text-green-400'}`}>
                  {connectionStatus.accountInfo.ip_restrict ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <FaClock className="text-purple-400 text-xl mx-auto mb-2" />
                <div className="text-sm text-white/70">API Created</div>
                <div className="font-semibold text-white text-sm">
                  {formatDate(connectionStatus.accountInfo.binance_raw.createTime)}
                </div>
              </div>
            </div>

            {/* Detailed Permissions */}
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-md font-semibold mb-3 text-white/90 flex items-center gap-2">
                <FaShieldAlt className="text-primary" />
                API Permissions
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Reading:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableReading ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableReading ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Spot & Margin Trading:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableSpotAndMarginTrading ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableSpotAndMarginTrading ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Withdrawals:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableWithdrawals ? 'text-yellow-400' : 'text-green-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableWithdrawals ? '⚠ Enabled' : '✓ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Futures:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableFutures ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableFutures ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Internal Transfer:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableInternalTransfer ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableInternalTransfer ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Margin Trading:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableMargin ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableMargin ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Universal Transfer:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.permitsUniversalTransfer ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.permitsUniversalTransfer ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Vanilla Options:</span>
                  <span className={connectionStatus.accountInfo.binance_raw.enableVanillaOptions ? 'text-green-400' : 'text-red-400'}>
                    {connectionStatus.accountInfo.binance_raw.enableVanillaOptions ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Notice - Only show if withdrawals are enabled */}
            {connectionStatus.accountInfo.binance_raw.enableWithdrawals && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="text-yellow-200 font-medium">⚠️ Security Warning</div>
                    <div className="text-yellow-300 mt-1">
                      Your API key has withdrawal permissions enabled. For maximum security,
                      consider creating a new API key with only spot trading permissions.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Perfect Security Notice - Show when withdrawals are disabled */}
            {!connectionStatus.accountInfo.binance_raw.enableWithdrawals && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="text-green-200 font-medium">🔒 Excellent Security Setup</div>
                    <div className="text-green-300 mt-1">
                      Perfect! Your API key has withdrawals disabled, which provides maximum security for automated trading.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IP Restriction Notice */}
            {connectionStatus.accountInfo.ip_restrict && connectionStatus.accountInfo.server_ip_added === null && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaGlobe className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="text-blue-200 font-medium">🔒 IP Restriction Active</div>
                    <div className="text-blue-300 mt-1">
                      Your API key has IP restrictions enabled. Make sure to add our server IP
                      to your Binance API whitelist for seamless trading.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          connectionStatus.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                <strong>Error:</strong> {connectionStatus.error}
              </p>
              <p className="text-red-300 text-xs mt-2">
                Please check your API credentials and ensure they have the necessary permissions.
              </p>
            </div>
          )
        )}
      </div>
    );
  };








  const formatBalance = (balance: any) => {
    const num = parseFloat(balance);
    if (num === 0) return '0.00';
    if (num < 0.001) return num.toExponential(3);
    return num.toFixed(6);
  };

  const renderConnectionStatusokx = () => {
    if (!connectionStatusokx) return null;

    return (
      <div className="bg-gray-800/50 border border-white/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          {connectionStatusokx.isConnected ? (
            <FaCheckCircle className="text-green-400 text-xl" />
          ) : (
            <FaExclamationTriangle className="text-red-400 text-xl" />
          )}
          <h3 className="text-lg font-semibold">
            {connectionStatusokx.isConnected ? "Connection Successful" : "❌ Connection Failed"}
          </h3>
        </div>

        {connectionStatusokx.isConnected && connectionStatusokx.accountInfo ? (
          <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>

            {/* Account Status */}
            <div className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Account Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <div className="flex items-center">
                  <span className="text-sm text-gray-300 mr-2">Demo Mode:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${connectionStatusokx?.accountInfo?.demo_mode
                    ? 'bg-yellow-900 text-yellow-200 border border-yellow-700'
                    : 'bg-green-900 text-green-200 border border-green-700'
                    }`}>
                    {connectionStatusokx?.accountInfo.demo_mode ? 'Yes' : 'No'}
                  </span>
                </div> */}

                <div className="flex items-center">
                  <span className="text-sm text-gray-300 mr-2">Credentials:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${connectionStatusokx?.accountInfo.credentials_valid
                    ? 'bg-green-900 text-green-200 border border-green-700'
                    : 'bg-red-900 text-red-200 border border-red-700'
                    }`}>
                    {connectionStatusokx?.accountInfo.credentials_valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-300 mr-2">Trading:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${connectionStatusokx?.accountInfo.trade_permission_inferred
                    ? 'bg-green-900 text-green-200 border border-green-700'
                    : 'bg-red-900 text-red-200 border border-red-700'
                    }`}>
                    {connectionStatusokx?.accountInfo.trade_permission_inferred ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Balances */}
            {/* <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Balances</h3>
              <div className="space-y-3">
                {connectionStatusokx?.accountInfo.balances_sample.map((balance: any, index: any) => (
                  <div key={index} className="p-4 border border-gray-600 rounded-lg hover:bg-gray-750 transition-colors bg-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-bold text-lg text-white mr-2">{balance.ccy}</span>
                        <span className="text-sm text-gray-400">
                          {balance.ccy === 'USDT' ? 'Tether USD' : 'Loopring'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {formatBalance(balance.avail)}
                        </div>
                        {parseFloat(balance.frozen) > 0 && (
                          <div className="text-sm text-orange-300">
                            Frozen: {formatBalance(balance.frozen)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}


            {/* <div className="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-700">
              <div className="flex justify-between items-center">
                <span className="text-blue-200 font-medium">Estimated Total (USDT):</span>
                <span className="text-xl font-bold text-blue-100">
                  ~{parseFloat(connectionStatusokx.accountInfo.balances_sample[0].avail).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-blue-300 mt-1">
                * Approximation based on USDT balance only
              </p>
            </div> */}
          </div>
        ) : (
          connectionStatusokx.error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                <strong>Error:</strong> {connectionStatusokx.error}
              </p>
              <p className="text-red-300 text-xs mt-2">
                Please check your API credentials and ensure they have the necessary permissions.
              </p>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-10 space-y-4 min-h-screen">
      {/* Header */}
      <div className="flex gap-3">
        <h1 className="text-3xl font-bold">
          API key Settings
        </h1>
        {currentPlatform ? (
          <div className="inline-flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-700/50">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300">Active Platform:</span>
            <span className="text-sm font-bold text-green-400">{currentPlatform.toUpperCase()}</span>
          </div>
        ) : <div className="inline-flex items-center space-x-2 bg-gary-900/20 px-4 py-2 rounded-full border border-red-700/50">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          {!loading && <span className="text-sm text-gray-300">No Active Platfrom</span>}
        </div>}
      </div>
      <div className=" flex items-center gap-6">
        <h2 className="text-base font-bold  text-white/80">Choose Crypto Platform</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="Binance"
            checked={platform === "Binance"}
            onChange={() => setPlatform("Binance")}
            className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-white/90">Binance</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="OKX"
            checked={platform === "OKX"}
            onChange={() => setPlatform("OKX")}
            className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-white/90">OKX</span>
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-blue-400 text-2xl mr-3" />
          <span className="text-white/70">Loading your settings...</span>
        </div>
      ) : (
        <>

          {platform === "Binance" && <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-xl p-3 space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex gap-4">
                    <label htmlFor="apiKey" className="block font-medium text-white/90 mr-2">
                      API Key
                    </label>

                    <button
                      onClick={() =>
                        document.getElementById("help")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="Get help with API keys"
                    >
                      <span>Help</span>
                    </button>
                  </div>

                  {/* Edit / Cancel Button */}
                  <button
                    onClick={() => {
                      handleeditbi()
                    }}
                    className="ml-2 p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    {isEditingbinance ? (
                      <FiX className="w-5 h-5 text-red-400" aria-label="Cancel edit" />
                    ) : (
                      <FiEdit2 className="w-5 h-5 text-gray-400" aria-label="Edit" />
                    )}
                  </button>
                </div>
                <div className="flex items-center bg-gray-800/50 px-4 py-3 rounded-xl border border-white/20 focus-within:border-blue-400/50 transition-colors">
                  <FaKey className="text-white/50 mr-3" />
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder-white/50"
                    placeholder={`Enter your ${platform} API Key`}
                  />
                </div>
              </div>

              {!hidekeysbinance && <div>
                <label className="block mb-2 font-medium text-white/90">Secret Key</label>
                <div className="flex items-center bg-gray-800/50 px-4 py-3 rounded-xl border border-white/20 focus-within:border-blue-400/50 transition-colors">
                  <FaLock className="text-white/50 mr-3" />
                  <input
                    type={showSecret ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder-white/50"
                    placeholder={`Enter your ${platform} Secret Key`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((prev) => !prev)}
                    className="ml-2 text-white/50 hover:text-white transition-colors"
                    title={showSecret ? "Hide secret" : "Show secret"}
                  >
                    {showSecret ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>


              </div>}



              {hidekeysbinance ?
                <div className="gap-6">
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-white/90">Trading Status:</span>
                      <button
                        onClick={toggleActive}
                        className="text-2xl transition-colors"
                        title={`${active ? 'Disable' : 'Enable'} trading`}
                      >
                        {active ? (
                          <FaToggleOn className="text-green-400 hover:text-green-300" />
                        ) : (
                          <FaToggleOff className="text-gray-400 hover:text-gray-300" />
                        )}
                      </button>
                      <span className={`text-sm font-medium ${active ? 'text-green-400' : 'text-gray-400'}`}>
                        {active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button

                    onClick={handleUseClick}
                    disabled={useloading || !bId}
                    className="mt-3 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-800 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    {/* <FaSave /> */}
                    {useloading ? "Saving...." : "Use Binance"}
                  </button>
                </div>
                :
                <div className=" flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => testConnection()}
                    disabled={testingConnection || !apiKey || !secretKey}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-400/30 text-blue-400 rounded-xl hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {testingConnection ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaPlug />
                    )}
                    {testingConnection ? "Testing Connection..." : "Test Connection"}
                  </button>

                  <button
                    onClick={handleSaveClick}
                    disabled={loading || !apiKey || !secretKey}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-800 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save Keys"}
                  </button>
                </div>}




              {saved && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                  <FaCheckCircle />
                  Keys saved successfully!
                </div>
              )}
            </div>
          </div>}

          {platform === "OKX" && <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-xl p-3 space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex gap-4">
                    <label htmlFor="apiKey" className="block font-medium text-white/90 mr-2">
                      API Key
                    </label>

                    <button
                      onClick={() =>
                        document.getElementById("helpokx")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      aria-label="Get help with API keys"
                    >
                      <span>Help</span>
                    </button>
                  </div>

                  {/* Edit / Cancel Button */}
                  <button
                    onClick={() => {
                      handleeditokx()
                    }}
                    className="ml-2 p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    {isEditingokx ? (
                      <FiX className="w-5 h-5 text-red-400" aria-label="Cancel edit" />
                    ) : (
                      <FiEdit2 className="w-5 h-5 text-gray-400" aria-label="Edit" />
                    )}
                  </button>
                </div>
                <div className="flex items-center bg-gray-800/50 px-4 py-3 rounded-xl border border-white/20 focus-within:border-blue-400/50 transition-colors">
                  <FaKey className="text-white/50 mr-3" />
                  <input
                    type="text"
                    value={apiKeyokx}
                    onChange={(e) => setApiKeyokx(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder-white/50"
                    placeholder={`Enter your ${platform} API Key`}
                  />
                </div>
              </div>

              {!hidekeysokx && <div>
                <label className="block mb-2 font-medium text-white/90">Secret Key</label>
                <div className="flex items-center bg-gray-800/50 px-4 py-3 rounded-xl border border-white/20 focus-within:border-blue-400/50 transition-colors">
                  <FaLock className="text-white/50 mr-3" />
                  <input
                    type={showSecret ? "text" : "password"}
                    value={secretKeyokx}
                    onChange={(e) => setSecretKeyokx(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder-white/50"
                    placeholder={`Enter your ${platform} Secret Key`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((prev) => !prev)}
                    className="ml-2 text-white/50 hover:text-white transition-colors"
                    title={showSecret ? "Hide secret" : "Show secret"}
                  >
                    {showSecret ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>}

              {!hidekeysokx && <div>
                <label className="block mb-2 font-medium text-white/90">OKX Passphrase</label>
                <div className="flex items-center bg-gray-800/50 px-4 py-3 rounded-xl border border-white/20 focus-within:border-blue-400/50 transition-colors">
                  <FaLock className="text-white/50 mr-3" />
                  <input
                    type={showSecretpass ? "text" : "password"}
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="bg-transparent w-full outline-none text-white placeholder-white/50"
                    placeholder={`Enter your ${platform} Passphrase`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretpass((prev) => !prev)}
                    className="ml-2 text-white/50 hover:text-white transition-colors"
                    title={showSecretpass ? "Hide secret" : "Show secret"}
                  >
                    {showSecretpass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>}
              {hidekeysokx ?
                <div className="gap-6">
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-white/90">Trading Status:</span>
                      <button
                        onClick={toggleActive}
                        className="text-2xl transition-colors"
                        title={`${activeokx ? 'Disable' : 'Enable'} trading`}
                      >
                        {activeokx ? (
                          <FaToggleOn className="text-green-400 hover:text-green-300" />
                        ) : (
                          <FaToggleOff className="text-gray-400 hover:text-gray-300" />
                        )}
                      </button>
                      <span className={`text-sm font-medium ${activeokx ? 'text-green-400' : 'text-gray-400'}`}>
                        {activeokx ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button

                    onClick={handleUseClick}
                    disabled={useloading || !okxId}
                    className="mt-3 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-800 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    {/* <FaSave /> */}
                    {useloading ? "Saving...." : "Use OKX"}
                  </button>
                </div>
                :
                <div className=" flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => testConnectionokx()}
                    disabled={testingConnection || !apiKeyokx || !secretKeyokx || !passphrase}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-400/30 text-blue-400 rounded-xl hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {testingConnection ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaPlug />
                    )}
                    {testingConnection ? "Testing Connection..." : "Test Connection"}
                  </button>

                  <button
                    onClick={handleSaveClick}
                    disabled={loading || !apiKeyokx || !secretKeyokx || !passphrase}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-800 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save Keys"}
                  </button>
                </div>}


              {saved && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                  <FaCheckCircle />
                  Keys saved successfully!
                </div>
              )}
            </div>
          </div>}
          {platform === "Binance" && <div>
            {renderConnectionStatus()}
            <BinanceApiInstructions publicIP={publicIP || ""} />
          </div>}
          {platform === "OKX" && <div>
            {renderConnectionStatusokx()}
            <OkxApiInstructions publicIP={publicIP || ""} />
          </div>}


        </>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400" />
              Confirm API Key Activation
            </h2>
            <div className="space-y-3">
              <p className="text-white/80">
                Save your {platform} API keys .
              </p>
              {/* <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-blue-200 text-xs mt-1 space-y-1">
                  <li>• Smart bot analyze market conditions</li>
                  <li>• Automated trades may be executed</li>
                  <li>• You'll receive real-time changes in Dasboard</li>
                </ul>
              </div> */}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                {loading ? "Saving..." : "Yes, Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalactivate && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400" />
              {platform === "Binance" && <div>{!active ? "Activate" : "Deactivate"} Bot</div>}
              {platform === "OKX" && <div>{!activeokx ? "Activate" : "Deactivate"} Bot</div>}
            </h2>
            <div className="space-y-3">
              {platform === "Binance" && <p className="text-white/80">
                {!active ? "Activate" : "Deactivate"} the Bot,your trading bot will be {!active ? "start" : "stop"} executing trades based on smart signals.
              </p>}
              {platform === "OKX" && <p className="text-white/80">
                {!activeokx ? "Activate" : "Deactivate"} the Bot,your trading bot will be {!activeokx ? "start" : "stop"} executing trades based on smart signals.
              </p>}
              {platform === "Binance" && !active && <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-blue-200 text-xs mt-1 space-y-1">
                  <li>• Smart bot analyze market conditions</li>
                  <li>• Automated trades may be executed</li>
                  <li>• You'll receive real-time changes in Dasboard</li>
                </ul>
              </div>}

              {platform === "OKX" && !activeokx && <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-blue-200 text-xs mt-1 space-y-1">
                  <li>• Smart bot analyze market conditions</li>
                  <li>• Automated trades may be executed</li>
                  <li>• You'll receive real-time changes in Dasboard</li>
                </ul>
              </div>}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModalactivate(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmactivate}
                disabled={acivateloading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {acivateloading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                {acivateloading ? "Saving..." : "Yes, Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModaluse && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-400" />
              Use your {platform} platform
            </h2>
            <div className="space-y-3">
              <p className="text-white/80">
                Use your {platform} platform ,your trading bot will be activated and may start executing trades based on smart signals.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-blue-200 text-xs mt-1 space-y-1">
                  <li>• Smart bot analyze market conditions</li>
                  <li>• Automated trades may be executed</li>
                  <li>• You'll receive real-time changes in Dasboard</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModaluse(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmuse}
                disabled={useloading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {useloading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                {useloading ? "Saving..." : "Yes, Save"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}