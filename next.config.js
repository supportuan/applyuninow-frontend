// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
images: {
    unoptimized: true, // disables built-in image optimization
  },
  //output: 'export', // Enable static export
  //trailingSlash: true, // Optional: Enables trailing slash for all routes
  //skipTrailingSlashRedirect: true, // Optional: Skips redirect to trailing slash for all routes
 // distDir: 'dist', // Optional: 
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
  async redirects() {
    return [];
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        message: /Failed to parse source map/,
      },
    ];
    return config;
  },
};

module.exports = nextConfig;

