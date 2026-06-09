/** @type {import('next').NextConfig} */
const repo = 'julian-alvarez-v2';
const basePath = process.env.NODE_ENV === 'production' ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
