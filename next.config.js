/** @type {import('next').NextConfig} */
const nextConfig = {
	// poweredByHeader: false,
	reactStrictMode: true,
	experimental: {
		scrollRestoration: true,
		serverActions: true,
	},
};

module.exports = nextConfig;
