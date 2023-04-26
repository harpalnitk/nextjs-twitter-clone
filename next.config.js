/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
        port: '',
        pathname: '*/**',
      },
      {
        protocol: 'https',
        hostname: 'a57.foxnews.com',
        port: '',
        pathname: '*/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vox-cdn.com',
        port: '',
        pathname: '*/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '*/**',
      },
      
    ],
  },
}

module.exports = nextConfig
