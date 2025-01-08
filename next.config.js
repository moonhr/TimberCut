const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
