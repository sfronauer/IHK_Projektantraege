/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://${process.env.URL}/IHK_Projektantraege/:path*`,
      },
    ];
  },
};


export default nextConfig;
