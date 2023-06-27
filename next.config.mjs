import PUBLIC_RUNTIME_CONFIG from './src/config/RuntimeConfig.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: PUBLIC_RUNTIME_CONFIG,
  reactStrictMode: true,
}

export default nextConfig;
