import type { Metadata } from 'next';
import '@/app/globals.css';
import { Poppins } from 'next/font/google';
import { Providers } from '@/app/providers';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'QR Dine | Browse Menus & Order Seamlessly',
	description:
		'Discover restaurant menus with ease using QR Dine. View digital menus, explore delicious dishes, and order directly from your table for a seamless dining experience.',
	keywords: [
		'digital restaurant menu',
		'QR code menu',
		'contactless dining',
		'food ordering system',
		'restaurant menu viewer',
		'seamless dining experience',
	],
	authors: [{ name: 'QR Dine Team' }],
	creator: 'QR Dine',
	publisher: 'QR Dine',
	robots: 'index, follow',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/app/logo.svg' type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/app/logo.svg' />
			</head>
			<body className={`${poppins.className} antialiased`}>
				<NextTopLoader
					color='#17a34a'
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					easing='ease'
					speed={200}
					shadow='0 0 10px #17a34a,0 0 5px #17a34a'
				/>
				<Providers>
					{children}
					<Toaster closeButton richColors position='top-right' />
				</Providers>
			</body>
		</html>
	);
}
