/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cloudflare Pages compatibility
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
