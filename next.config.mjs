/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: false,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true, // ✅ Skip ESLint during `next build`
    },
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
        localeDetection: false,
    },
};

export default nextConfig;
