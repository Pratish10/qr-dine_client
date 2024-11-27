'use client';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { SearchInput } from './search-input';
import useScroll from '@/hooks/useScroll';
import { ThemeSelect } from './theme-select';
import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cart, notification } from '@/recoil/cart/atom';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';
import { motion } from 'framer-motion';

export const Navbar = (): React.JSX.Element => {
	const router = useRouter();
	const size = useScroll();
	const cartItems = useRecoilValue(cart);
	const [showNotification, setShowNotification] = useRecoilState(notification);

	const handleCartClick = (): void => {
		router.push(APP_PATHS.CART);
		if (cartItems.length > 0) {
			setShowNotification(true);
		}
	};

	useEffect(() => {
		if (cartItems.length === 0) {
			setShowNotification(false);
		}
	}, [cartItems]);

	return (
		<nav
			className={clsx(
				'flex items-center h-14 fixed top-0 left-0 w-full z-10',
				size.scrollY > 15 && 'dark:bg-black bg-white border-b-2 dark:border-b-gray-600'
			)}
		>
			<div className='container flex items-center justify-between'>
				<Link href={'/'} className='flex items-center space-x-3'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='h-6 w-6 text-green-600'
					>
						<path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2' />
						<path d='M7 2v20' />
						<path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7' />
					</svg>
					<span className='font-bold'>QR Dine</span>
				</Link>
				<div>
					<SearchInput />
				</div>
				<div className='flex items-center justify-between'>
					<Button className='rounded-full hover:bg-green-100 dark:hover:bg-green-600' size='icon' onClick={handleCartClick}>
						<Link href={APP_PATHS.CART}>
							<ShoppingCart size={20} />
							{!showNotification && cartItems.length > 0 && (
								<motion.span
									className='bg-green-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs absolute top-2 ml-5'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
								>
									{cartItems.length}
								</motion.span>
							)}
						</Link>
					</Button>
					<ThemeSelect />
				</div>
			</div>
		</nav>
	);
};
