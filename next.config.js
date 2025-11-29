/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/preorder',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
