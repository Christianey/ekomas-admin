/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/upload",
        headers: [
          {
            key: "Cache-control",
            value: "no-cache",
          },
          {
            key: "Connection",
            value: "keep-alive",
          },
          {
            key: "Transfer-Encoding",
            value: "chunked",
          },
          {
            key: "Content-Encoding",
            value: "none",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
