import { type Metadata } from 'next';

const TITLE = 'QR Dine | Browse Menus & Order Seamlessly';
const DESCRIPTION =
	'Discover restaurant menus with ease using QR Dine. View digital menus, explore delicious dishes, and order directly from your table for a seamless dining experience.';

const BASE_URL = 'https://qr-dine-client.vercel.app';

export const siteConfig: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: '/favicon.ico',
	},
	applicationName: 'QR Dine',
	creator: 'Pratish',
	twitter: {
		creator: '@Pratish1086241',
		title: TITLE,
		description: DESCRIPTION,
		card: 'summary_large_image',
	},
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		siteName: 'QR Dine',
		url: BASE_URL,
		locale: 'en_US',
		type: 'website',
	},
	category: 'Food',
	alternates: {
		canonical: BASE_URL,
	},
	keywords: [
		'digital restaurant menu',
		'QR code menu',
		'contactless dining',
		'food ordering system',
		'restaurant menu viewer',
		'seamless dining experience',
	],
	metadataBase: new URL(BASE_URL),
};
