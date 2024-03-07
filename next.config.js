/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;

