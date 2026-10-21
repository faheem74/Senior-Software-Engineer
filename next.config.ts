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
      { source: "/experience", destination: "/about#experience", permanent: false },
      { source: "/skills", destination: "/about#skills", permanent: false },
      { source: "/designs", destination: "/projects", permanent: false },
      { source: "/services", destination: "/about", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
