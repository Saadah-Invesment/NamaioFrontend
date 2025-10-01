'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FiLock, FiArrowRight, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { changePassword } from '@/api/profile';
import NamaioLogo from '@/components/Logo/NamaioLogo';

const ChangePasswordPage: React.FC = () => {
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        number: false,
        symbol: false,
    });

    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    // Password validation
    useEffect(() => {
        setPasswordValidations({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /\d/.test(newPassword),
            symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
        });
    }, [newPassword]);

    // Confirm password validation
    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordsMatch(null);
            return;
        }
        setPasswordsMatch(newPassword === confirmPassword);
    }, [confirmPassword, newPassword]);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oldPassword) {
            toast.error("Please enter your old password");
            return;
        }

        const allValid = Object.values(passwordValidations).every(Boolean);
        if (!allValid) {
            toast.error("New password does not meet all requirements");
            return;
        }

        if (!passwordsMatch) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                old_password: oldPassword,
                new_password: newPassword
            };
            const response = await changePassword(payload);
            if (response.status === 200) {
                toast.success("Password changed successfully!");
                router.push('/user/profile');
            } else {
                throw new Error('Failed to change password');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.detail) {
                toast.error(err.response.data.detail);
            } else {
                toast.error("Failed to change password");
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
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <NamaioLogo />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Change Password</h2>
                        <p className="text-gray-300">Enter your old password and set a new password</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleChangePassword}>
                        {/* Old Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Old Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    placeholder="Enter old password"
                                    className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

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
                                    className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
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
                                    className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
                                />
                            </div>
                            {confirmPassword.length > 0 && !passwordsMatch && (
                                <p className="mt-2 text-sm text-red-400">Passwords do not match</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !Object.values(passwordValidations).every(Boolean) || !passwordsMatch || !oldPassword}
                            className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${loading || !Object.values(passwordValidations).every(Boolean) || !passwordsMatch || !oldPassword
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-400 to-green-800 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Changing...
                                </>
                            ) : (
                                <>
                                    Change Password
                                    <FiArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ChangePasswordPage;
