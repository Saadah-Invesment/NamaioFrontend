'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FiMail, FiLock, FiArrowRight, FiCheck, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import TezcaiLogo from '@/components/Logo/TezcaiLogo';
import { passwordresetapi, passwordresetconfirmapi } from '@/api/auth';

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [emailValid, setEmailValid] = useState<boolean | null>(null);

    // Password validation states
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        number: false,
        symbol: false,
    });
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    // Check for token in URL params on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const uidParam = searchParams.get('uid');
            const tokenParam = searchParams.get('token');

            if (uidParam && tokenParam) {
                setUid(uidParam);
                setToken(tokenParam);
                setIsTokenValid(true);
            }
        }
    }, [params]);

    // Email validation
    useEffect(() => {
        if (email.length === 0) {
            setEmailValid(null);
            return;
        }
        setEmailValid(emailRegex.test(email));
    }, [email]);

    // Password validation
    useEffect(() => {
        setPasswordValidations({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /\d/.test(newPassword),
            symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
        });
    }, [newPassword]);

    // Password match validation
    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordsMatch(null);
            return;
        }
        setPasswordsMatch(newPassword === confirmPassword);
    }, [confirmPassword, newPassword]);

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailValid) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            await passwordresetapi(email);
            toast.success("Password reset link sent to your email!");
        } catch (err: any) {
            console.error(err);
            if (err.response) {
                if (err.response.data?.detail === "No account found with this email.") {
                    toast.error("No account found with this email address");
                } else {
                    toast.error(err.response.data?.detail || "Failed to send reset email");
                }
            } else if (err.request) {
                toast.error("Network error - please try again");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();

        const allValid = Object.values(passwordValidations).every(Boolean);

        if (!allValid) {
            toast.error("Password does not meet all requirements");
            return;
        }

        if (!passwordsMatch) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await passwordresetconfirmapi(uid, token, newPassword);
            toast.success("Password reset successfully!");
            router.push('/login');
        } catch (err: any) {
            console.error(err);
            if (err.response) {
                if (err.response.data?.detail) {
                    toast.error(err.response.data.detail);
                } else if (err.response.data?.non_field_errors) {
                    toast.error(err.response.data.non_field_errors.join(', '));
                } else {
                    toast.error(err.response.data?.message || "Failed to reset password");
                }
            } else if (err.request) {
                toast.error("Network error - please try again");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-12 text-white overflow-hidden">
            <div className="w-full max-w-md mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50"
                >
                    {/* Logo and Header */}
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <TezcaiLogo />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">
                            {isTokenValid ? "Reset Your Password" : "Forgot Password"}
                        </h2>
                        <p className="text-gray-300">
                            {isTokenValid
                                ? "Enter your new password below"
                                : "Enter your email to receive a reset link"}
                        </p>
                    </div>

                    {isTokenValid ? (
                        // Password Reset Form
                        <form className="space-y-6" onSubmit={handlePasswordReset}>
                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">New Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>

                                {/* Password validation hints */}
                                {newPassword.length > 0 && (
                                    <div className="mt-3 bg-gray-700/30 rounded-lg p-4 space-y-2 text-xs">
                                        <div className={`flex items-center gap-2 ${passwordValidations.length ? 'text-green-400' : 'text-red-400'}`}>
                                            {passwordValidations.length ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} 8+ characters
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordValidations.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                                            {passwordValidations.uppercase ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordValidations.number ? 'text-green-400' : 'text-red-400'}`}>
                                            {passwordValidations.number ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Number
                                        </div>
                                        <div className={`flex items-center gap-2 ${passwordValidations.symbol ? 'text-green-400' : 'text-red-400'}`}>
                                            {passwordValidations.symbol ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Special symbol
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition`}
                                    />
                                </div>
                                {confirmPassword.length > 0 && !passwordsMatch && (
                                    <p className="mt-2 text-sm text-red-400">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            {/* Reset Button */}
                            <button
                                type="submit"
                                disabled={loading || !Object.values(passwordValidations).every(Boolean) || !passwordsMatch}
                                className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${loading || !Object.values(passwordValidations).every(Boolean) || !passwordsMatch
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-400 to-green-800 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Resetting...
                                    </>
                                ) : (
                                    <>
                                        Reset Password
                                        <FiArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        // Email Request Form
                        <form className="space-y-6" onSubmit={handleResetRequest}>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${emailValid === null ? 'border-gray-600 focus:ring-blue-500' :
                                            emailValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                                            }`}
                                    />
                                    {emailValid && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <FiCheck className="w-5 h-5 text-green-400" />
                                        </div>
                                    )}
                                </div>
                                {email.length > 0 && !emailValid && (
                                    <p className="mt-2 text-sm text-red-400">
                                        Please enter a valid email address
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !emailValid}
                                className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${loading || !emailValid
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-400 to-green-800 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <FiArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex items-center justify-center gap-1"
                        >
                            <FiArrowRight className="transform rotate-180" />
                            Back to login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
