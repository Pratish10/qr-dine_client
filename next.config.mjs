/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'files.edgestore.dev',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'quickchart.io',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
