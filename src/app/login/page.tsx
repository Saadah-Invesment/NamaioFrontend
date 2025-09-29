'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FcFlashOn } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight, FiShield, FiZap, FiTrendingUp, FiCheck } from 'react-icons/fi';
import Footer from '@/components/Footer';
import { loginapi } from '@/api/auth';
import TezcaiLogo from '@/components/Logo/TezcaiLogo';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form validation states
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  // Username validation
  useEffect(() => {
    if (username.length === 0) {
      setUsernameValid(null);
      return;
    }
    setUsernameValid(username.length >= 3);
  }, [username]);

  // Password validation
  useEffect(() => {
    if (password.length === 0) {
      setPasswordValid(null);
      return;
    }
    setPasswordValid(password.length >= 4)
  }, [password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters");
    //   return;
    // }

    try {
      setLoading(true);
      const response = await loginapi(username, password);
      if (response.status !== 200) {
        throw new Error(response.data.message || "Something went wrong");
      }

      const { access, refresh, role, subscription } = response.data;

      // Store in localStorage (optional for client use)
      localStorage.setItem("tezcai_token", access);
      localStorage.setItem("tezcai_r_token", refresh);
      localStorage.setItem("tezcai_role", role);
      localStorage.setItem("tezcai_sub", subscription);



      toast.success("Welcome back!");

      // Redirect based on role
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "affiliate") {
        router.replace("/affiliate/dashboard");
      } else if (role === "user") {
        if (!subscription) {
          router.replace("/user/billing");
        } else
          if (subscription === "signal") {
            router.replace("/user/signals");
          } else {
            router.replace("/user/dashboard");
          }

      }

    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = usernameValid && passwordValid;

  const trustFeatures = [
    // { icon: FiShield, text: "Bank-Grade Security" },
    { icon: FiZap, text: "Instant Access" },
    { icon: FiTrendingUp, text: "24/7 Trading" }
  ];

  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center px-4 py-12  text-white overflow-hidden">

        {/* Background Effects */}
        {/* <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div> */}

        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left side - Welcome content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <div>
                {/* <div className="mb-6 ">
                  <TezcaiLogo />
                </div> */}
                <h1 className="text-4xl xl:text-5xl font-bold mb-6">
                  <span className=" ">
                    Welcome Back to
                  </span>
                  <br />
                  <span className="bg-secondary bg-clip-text text-transparent">
                    Tezcai
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  No overtrading. No emotions. Just disciplined, data-driven performance ~1 to 2 % profit per day.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="space-y-4">
                {trustFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{feature.text}</h3>
                      <p className="text-gray-400 text-sm">Always protected and reliable</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">24/7</div>
                    <div className="text-sm text-gray-400">Trading</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">1000+</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Right side - Login form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
              {/* Logo and Header */}
              <div className="text-center mb-8">


                <h2 className="text-3xl font-bold  mb-2">
                  Sign In
                </h2>
                <p className="text-gray-300">Access your trading dashboard</p>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Username/Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username / email"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${usernameValid === null ? 'border-gray-600 focus:ring-blue-500' :
                        usernameValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    {usernameValid && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <FiCheck className="w-5 h-5 text-green-400" />
                      </div>
                    )}
                  </div>
                  {username.length > 0 && !usernameValid && (
                    <p className="mt-2 text-sm text-red-400">
                      Username must be at least 3 characters
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${passwordValid === null ? 'border-gray-600 focus:ring-blue-500' :
                        passwordValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {password.length > 0 && !passwordValid && (
                    <p className="mt-2 text-sm text-red-400">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>


                <div className="flex items-center justify-end">
                  {/* <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:ring-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label> */}
                  <Link
                    href="/reset-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${loading || !isFormValid
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-400 to-green-800 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                    }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>

                      Sign In
                      <FcFlashOn size={20} className="text-white" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow h-px bg-gray-700" />
                  <span className="px-4 text-gray-400 text-sm">or</span>
                  <div className="flex-grow h-px bg-gray-700" />
                </div>

                {/* Sign up link */}
                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <Link
                      href="/register"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>

              {/* Security note */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <FiShield className="w-3 h-3 text-green-400" />
                  <span>Your connection is secure and encrypted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </section>


    </>
  );
};

export default LoginPage;