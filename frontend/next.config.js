/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*' // 转发到实际的 API 服务器
      },
      {
        source: '/auth',
        destination: 'http://127.0.0.1:8000/auth' // 登录接口
      }
    ]
  }
};

module.exports = nextConfig;