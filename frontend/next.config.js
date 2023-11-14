const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async function () {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
      {
        source: '/',
        destination: `/chats`,
      },
    ];
  },
};

module.exports = nextConfig;
