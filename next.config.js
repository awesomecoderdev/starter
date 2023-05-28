/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"www.google.com",
			"avatar.vercel.sh",
			"faisalman.github.io",
			"avatars.dicebear.com",
			"res.cloudinary.com",
			"pbs.twimg.com",
			"d2vwwcvoksz7ty.cloudfront.net",
			"lh3.googleusercontent.com",
			"awesomecoder.dev",
			"fakestoreapi.com",
		],
	},
	// poweredByHeader: false,
	reactStrictMode: true,
	experimental: {
		scrollRestoration: true,
		serverActions: true,
	},
};

module.exports = nextConfig;
