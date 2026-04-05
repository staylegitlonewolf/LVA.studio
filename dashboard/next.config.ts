import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = envBasePath
  ? envBasePath
  : isGithubActions && repo
    ? `/${repo}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
