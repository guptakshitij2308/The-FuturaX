/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nvdyofwpczpyjrqpfkjn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export", // by doing this our site will be exported as static assets that can be deployed anywhere
};

export default nextConfig;
