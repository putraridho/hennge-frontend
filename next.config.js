/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		apiHost: process.env.API_HOST,
	},
};

module.exports = nextConfig;
