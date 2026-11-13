const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}`,
      },
    ];
  },
};

export default nextConfig;
