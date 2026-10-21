import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/designs", destination: "/projects", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
      { source: "/ai-cloud", destination: "/assistant", permanent: false },
    ];
  },
};

export default nextConfig;
