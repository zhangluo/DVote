/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // 匹配的前端路径
            destination: 'https://external-api.example.com/:path*', // 代理的目标路径
          },
        ];
      }
};


export default nextConfig;
