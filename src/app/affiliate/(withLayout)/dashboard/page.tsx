'use client';

import { useEffect, useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { FaUserSecret, FaTwitter, FaWhatsapp, FaTelegram, FaExternalLinkAlt, FaChartLine } from "react-icons/fa";
import { MdAttachMoney, MdTrendingUp, MdTrendingDown, MdPeople } from "react-icons/md";
import { RiCoinsLine, RiCalendarLine } from "react-icons/ri";
import { BsGraphUp, BsClock } from "react-icons/bs";
import { toast } from 'react-hot-toast';
import { getaffiliatesDashboard, getreferedUsersList } from '@/api/affiliate';
import copy from 'copy-to-clipboard';
import { FcPositiveDynamic, FcReadingEbook } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { getCurrentUrlAndPort } from '@/api/auth';
import { FiAward } from 'react-icons/fi';
import { FaDiscord, FaFacebook, FaInstagram, FaReddit, FaTiktok } from 'react-icons/fa6';
import { RxCodesandboxLogo } from 'react-icons/rx';
type ReferredUser = {
    referred_username: string;
    date_joined: string;
    profit_pct: number;
    tier_percent: string | null;
    commission_earned: number;
};

type AffiliateData = {
    referral_code: string;
    referral_link: string;
    total_referrals: number;
    commission_lifetime: number;
    commission_month_to_date: number;
    commission_current_month: number;
    current_tier_percent: string | null;
    current_tier_name: string | null;
};

export default function AffiliatePage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AffiliateData | null>(null);
    const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
    const [copied, setCopied] = useState(false);
    const [volume, setVolume] = useState(0);
    const [refUrl, setRefUrl] = useState("")

    useEffect(() => {
        const baseUrl = getCurrentUrlAndPort()
        async function fetchData() {
            try {
                setLoading(true);

                // Fetch affiliate summary data
                const affiliateResponse = await getaffiliatesDashboard()
                const affiliateData = affiliateResponse.data
                setData(affiliateData);
                setRefUrl(`${baseUrl}/register/?ref=${affiliateData.referral_code}`)
                setVolume(affiliateData.total_referred_volume)
                // Fetch referred users list
                const usersResponse = await getreferedUsersList();
                const usersData = usersResponse.data
                setReferredUsers(usersData);

            } catch (error) {
                console.error('Error fetching affiliate data:', error);
                toast.error('Failed to load affiliate data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (data?.commission_current_month && data.commission_current_month > 0) {
    //         toast.success(`You earned $${data.commission_current_month.toFixed(2)} commission today!`, {
    //             icon: '💰',
    //             duration: 4000,
    //         });
    //     }
    // }, [data?.commission_current_month]);

    const handleCopy = (code: boolean) => {


        if (!data?.referral_link) {
            toast.error('No referral link to copy');
            return;
        }
        if (code) {
            const success = copy(`${data.referral_code}`, {
                debug: process.env.NODE_ENV === 'development',
                message: 'Press #{key} to copy',
                format: 'text/plain',
            });
            if (success) {
               
                toast.success('Referral code copied to clipboard!', {
                    icon: '',
                    style: {
                        background: 'linear-gradient(90deg, #10b981, #059669)',
                        color: '#fff',
                    }
                });
            } else {
                toast.error('Failed to copy. Please try again or use manual copy.', {
                    icon: '⚠️',
                });
                // Fallback: Show the text in an alert for manual copy
                alert(`Please copy this manually:\n\n${data.referral_link}`);
            }
        } else {
            const success = copy(`${refUrl}`, {
                debug: process.env.NODE_ENV === 'development',
                message: 'Press #{key} to copy',
                format: 'text/plain',
            });
            if (success) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                toast.success('Referral link copied to clipboard!', {
                    icon: '',
                    style: {
                        background: 'linear-gradient(90deg, #10b981, #059669)',
                        color: '#fff',
                    }
                });
            } else {
                toast.error('Failed to copy. Please try again or use manual copy.', {
                    icon: '⚠️',
                });
                // Fallback: Show the text in an alert for manual copy
                alert(`Please copy this manually:\n\n${data.referral_link}`);
            }
        }




    };

    const getTierProgress = () => {
        if (!volume) return 0;
        if (volume < 100000) return (volume / 100000) * 100;
        if (volume < 1000000) return ((volume - 100000) / 900000) * 100;
        return 100;
    };

    const getCurrentTier = () => {

        return data?.current_tier_name || "-";
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCommissionGrowth = () => {
        // Mock calculation - in real app, compare with previous period
        const growth = Math.random() * 40 - 10; // Random between -10 and 30
        return growth;
    };

    if (loading) {
        return (
            <div className="min-h-screen  flex justify-center items-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-center gap-3 text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                        <div className="text-xl font-medium">Loading affiliate dashboard...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex justify-center items-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/30">
                    <div className="text-center text-red-400">
                        <MdAttachMoney className="mx-auto text-4xl mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">Failed to Load Data</h3>
                        <p>Please check your connection and try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-1 p-4">
                    {/* Logo/Icon - centered on mobile, first item on desktop */}
                    {/* <div className="order-1 md:order-none inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                        <MdAttachMoney className="text-white text-2xl md:text-3xl" />
                    </div> */}

                    {/* Title - centered on mobile, grows on desktop */}
                    <h1 className="order-3 md:order-none text-2xl md:text-3xl font-bold text-white text-center md:text-left flex-1">
                        Affiliate Dashboard
                    </h1>

                    {/* Tier badge - second on mobile, last on desktop */}
                    <div className="order-2 md:order-none inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/20">
                        <FiAward className="text-brown text-lg md:text-xl" />
                        <span className="font-semibold text-white text-sm md:text-base">
                            Current {getCurrentTier()}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<FcReadingEbook className=" text-2xl" />}
                        title="Total Referrals"
                        value={data.total_referrals.toString()}
                        subtitle="Active users"
                        gradient="from-blue-500 to-cyan-500"
                    />

                    <StatCard
                        icon={<FcCurrencyExchange className=" text-2xl" />}
                        title="Monthly"
                        value={`$${data.commission_current_month.toFixed(2)}`}
                        subtitle="Last 24 hours"
                        gradient="from-green-500 to-emerald-500"
                    // growth={data.commission_current_month > 0 ? getCommissionGrowth() : null}
                    />
                    {/* <StatCard
                        icon={<FcPositiveDynamic className=" text-2xl" />}
                        title="This Month"
                        value={`$${data.commission_month_to_date.toFixed(2)}`}
                        subtitle="Month to date"
                        gradient="from-purple-500 to-pink-500"
                    /> */}
                    <StatCard
                        icon={<RiCoinsLine className="text-yellow-400 text-2xl" />}
                        title="Lifetime Commission"
                        value={`$${data.commission_lifetime.toFixed(2)}`}
                        subtitle="Total Commission"
                        gradient="from-yellow-500 to-orange-500"
                    />
                </div>

                {/* Quick Actions and Referral Link */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Referral Link Section */}
                    <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <IoCopyOutline className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Your Referral Link</h2>
                                <p className="text-slate-300 text-sm">Share this link to earn commissions</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <code className="flex-1 text-white font-mono text-sm break-all">
                                        {refUrl}
                                    </code>
                                    <button
                                        onClick={() => { handleCopy(false) }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                                            }`}
                                    >
                                        {copied ? (
                                            <>
                                                <span className="text-sm">✓</span>
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <IoCopyOutline />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 flex-wrap">

                                {/* WhatsApp */}
                                <SocialShareButton
                                    icon={<FaWhatsapp className="text-xs" />}
                                    label="WhatsApp"
                                    color="bg-green-600"
                                    onClick={() =>
                                        window.open(
                                            `https://wa.me/?text=Join%20me%20on%20this%20awesome%20trading%20platform!%20Use%20my%20referral%20link:%20${encodeURIComponent(
                                                data.referral_link
                                            )}`,
                                            "_blank"
                                        )
                                    }
                                />

                                {/* Telegram */}
                                <SocialShareButton
                                    icon={<FaTelegram className="text-xs" />}
                                    label="Telegram"
                                    color="bg-blue-600"
                                    onClick={() =>
                                        window.open(
                                            `https://t.me/share/url?url=${encodeURIComponent(
                                                data.referral_link
                                            )}&text=Join%20me%20on%20this%20awesome%20trading%20platform!`,
                                            "_blank"
                                        )
                                    }
                                />

                                {/* TikTok (share page URL) */}
                                <SocialShareButton
                                    icon={<FaTiktok className="text-xs" />}
                                    label="TikTok"
                                    color="bg-black"
                                    onClick={() =>
                                        window.open(
                                            `https://www.tiktok.com/`,
                                            "_blank"
                                        )
                                    }
                                />

                                {/* Discord (invite/share link) */}
                                <SocialShareButton
                                    icon={<FaDiscord className="text-xs" />}
                                    label="Discord"
                                    color="bg-indigo-600"
                                    onClick={() =>
                                        window.open(
                                            `https://discord.com/channels/@me?text=${encodeURIComponent(
                                                `Join me on this awesome trading platform! ${data.referral_link}`
                                            )}`,
                                            "_blank"
                                        )
                                    }
                                />

                                {/* Reddit */}
                                <SocialShareButton
                                    icon={<FaReddit className="text-xs" />}
                                    label="Reddit"
                                    color="bg-orange-500"
                                    onClick={() =>
                                        window.open(
                                            `https://www.reddit.com/submit?url=${encodeURIComponent(
                                                data.referral_link
                                            )}&title=Join%20this%20awesome%20trading%20platform!`,
                                            "_blank"
                                        )
                                    }
                                />

                                {/* X / Twitter */}
                                <SocialShareButton
                                    icon={<FaTwitter className="text-xs" />}
                                    label="X"
                                    color="bg-blue-400"
                                    onClick={() =>
                                        window.open(
                                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                `Join me on this awesome trading platform! ${data.referral_link}`
                                            )}`,
                                            "_blank"
                                        )
                                    }
                                />


                                <SocialShareButton
                                    icon={<FaInstagram className="text-xs" />}
                                    label="Instagram"
                                    color="bg-pink-500"
                                    onClick={() => window.open("https://www.instagram.com", "_blank")}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Referral Code Card */}
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                        <div className="text-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500/55 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RxCodesandboxLogo className="text-white text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Referral Code</h3>
                            <div className="flex justify-around items-center bg-slate-800/50 rounded-lg p-4 border border-white/10 mb-4">
                                <code className="text-2xl font-bold text-blue-400 font-mono">
                                    {data.referral_code}
                                </code>
                                <button
                                    onClick={() => { handleCopy(true) }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300  bg-blue-500/20 hover:bg-blue-600 text-white hover:shadow-lg `}
                                >
                                    <IoCopyOutline className='text-blue-400' />
                                </button>
                            </div>
                            <p className="text-sm text-slate-300">
                                Share this code directly with friends
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tier Progress */}
                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <FaChartLine className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Commission Tier Progress</h2>
                                <p className="text-slate-300 text-sm">Increase your trading volume to unlock higher rates</p>
                            </div>
                        </div>
                        {/* <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                            Volume: ${volume.toLocaleString()}
                        </span> */}
                    </div>

                    <div className="space-y-4">
                        <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${getTierProgress()}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-800/30 rounded-lg p-3">
                                <div className="text-slate-400 text-xs mb-1">Tier 1</div>
                                <div className="text-slate-400 text-xs mb-1">Bronze</div>
                                <div className="text-white font-semibold">1%</div>
                                <div className="text-xs text-slate-500">$0 - $100K</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-3">
                                <div className="text-slate-400 text-xs mb-1">Tier 2</div>
                                <div className="text-slate-400 text-xs mb-1">Silver</div>
                                <div className="text-white font-semibold">1.5%</div>
                                <div className="text-xs text-slate-500">$100K - $1M</div>
                            </div>
                            <div className="bg-slate-800/30 rounded-lg p-3">
                                <div className="text-slate-400 text-xs mb-1">Tier 3</div>
                                <div className="text-slate-400 text-xs mb-1">Gold</div>
                                <div className="text-white font-semibold">2%</div>
                                <div className="text-xs text-slate-500">$1M+</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referred Users Table */}
                <div className="w-full bg-slate-900 text-white p-4">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-800/50 text-slate-300 text-sm">
                                <tr>
                                    <th className="py-4 px-6 text-left font-semibold">User</th>
                                    <th className="py-4 px-6 text-left font-semibold">Joined</th>
                                    <th className="py-4 px-6 text-left font-semibold">Profit</th>
                                    <th className="py-4 px-6 text-left font-semibold">Tier</th>
                                    <th className="py-4 px-6 text-left font-semibold">Commission Earned</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {referredUsers.length > 0 ? (
                                    referredUsers.map((user, index) => (
                                        <tr key={index} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                                                        {user.referred_username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-white font-medium">{user.referred_username}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <RiCalendarLine className="text-blue-400" />
                                                    {formatDate(user.date_joined)}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`font-semibold ${user.profit_pct > 0 ? 'text-green-400' : 'text-slate-400'
                                                    }`}>
                                                    {user.profit_pct.toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                                                    {user.tier_percent || '-'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-green-400 font-bold">
                                                    ${user.commission_earned.toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                                    <FaUserSecret className="text-2xl opacity-50" />
                                                </div>
                                                <h3 className="font-semibold text-lg mb-2">No referrals yet</h3>
                                                <p className="text-sm max-w-md">
                                                    Share your referral link to start earning commissions from your friends' trading activity
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {referredUsers.length > 0 ? (
                            referredUsers.map((user, index) => (
                                <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                                    {/* User Header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                                            {user.referred_username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">{user.referred_username}</h3>
                                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                                <RiCalendarLine className="text-blue-400" />
                                                {formatDate(user.date_joined)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <p className="text-slate-400 text-xs font-medium mb-1"> Profit</p>
                                            <p className={`font-bold text-lg ${user.profit_pct > 0 ? 'text-green-400' : 'text-slate-400'
                                                }`}>
                                                {user.profit_pct.toFixed(2)}%
                                            </p>
                                        </div>

                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <p className="text-slate-400 text-xs font-medium mb-1">Tier</p>
                                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                                                {user.tier_percent || '-%'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Commission */}
                                    <div className="mt-4 pt-3 border-t border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Commission Earned</span>
                                            <span className="text-green-400 font-bold text-lg">
                                                ${user.commission_earned.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-slate-800/50 rounded-lg p-8 text-center border border-white/10">
                                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <FaUserSecret className="text-2xl opacity-50 text-slate-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-white">No referrals yet</h3>
                                <p className="text-sm text-slate-400">
                                    Share your referral link to start earning commissions from your friends' trading activity
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced StatCard component
function StatCard({
    icon,
    title,
    value,
    subtitle,
    gradient,
    growth
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string;
    gradient: string;
    growth?: number | null;
}) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-2 hover:border-white/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <p className="text-white text-2xl font-bold ">{value}</p>
                {/* <div className={`rounded-xl bg-opacity-20`}>
                    {icon}
                </div> */}


            </div>
            <div>
                <p className="text-slate-300 text-sm mb-1">{title}</p>

                {/* {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>} */}
            </div>
        </div>
    );
}

// Enhanced SocialShareButton component
function SocialShareButton({
    icon,
    label,
    color,
    onClick
}: {
    icon: React.ReactNode;
    label: string;
    color: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-2 py-2 rounded-lg ${color} hover:opacity-90 transition-all duration-300 text-white font-medium hover:shadow-lg transform hover:scale-105`}
            aria-label={`Share via ${label}`}
        >
            {icon}
            {/* <span className="hidden sm:inline text-xs">{label}</span> */}
        </button>
    );
}