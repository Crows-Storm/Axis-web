import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const stub = path.join(root, "src/stubs/empty.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@rainbow-me/rainbowkit", "wagmi", "viem"],
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@x402/evm": stub,
      "@x402/evm/upto/client": stub,
      "@x402/evm/exact/client": stub,
      "@x402/core/client": stub,
      "@x402/svm/exact/client": stub,
    };
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/baseAccount\.js$/, stub));
    return config;
  },
};

export default nextConfig;
