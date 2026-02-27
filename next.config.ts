import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/try-it",
        destination: "/convert",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
