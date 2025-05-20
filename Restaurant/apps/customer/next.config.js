/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.eatingwell.com',
      },
    ],
  },
};

export default nextConfig;
