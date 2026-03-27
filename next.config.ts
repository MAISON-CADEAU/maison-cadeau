import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "**.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
