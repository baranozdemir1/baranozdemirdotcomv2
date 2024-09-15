/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
