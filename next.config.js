/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cloudflare Pages compatibility
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/subsicribed',
                destination: '/subscribed',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
