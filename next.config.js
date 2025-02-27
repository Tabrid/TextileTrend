// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.textiletrend.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};
