/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}
module.exports = nextConfig;