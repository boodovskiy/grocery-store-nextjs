/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "http",
              hostname: "localhost",
            },
            {
              protocol: "http",
              hostname: "127.0.0.1",
            },
            {
              protocol: "https",
              hostname: "picsum.photos",
            },
            {
              protocol: "https",
              hostname: "grocery-admin-wispy-sun-6673.fly.dev"
            },
        ],
    }
};

export default nextConfig;
