'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import APP_PATHS from '@/config/path.config';
import Link from 'next/link';
import { cart } from '@/recoil/cart/atom';
import CheckoutWizard from '@/components/checkout-wizard';

const Cart = (): React.JSX.Element => {
	const cartItems = useRecoilValue(cart);

	if (cartItems.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 10 }}
				className='flex items-center justify-center bg-green-50 p-4 shadow-lg min-h-[70vh]'
			>
				<Card className='bg-white p-8 text-center w-full max-w-md'>
					<CardContent>
						<ShoppingCart className='w-16 h-16 mx-auto mb-4 text-green-500' />
						<h2 className='text-2xl font-bold text-green-800 mb-2'>Your Cart is Empty</h2>
						<p className='text-green-700 mb-3'>Looks like you haven&apos;t added anything yet!</p>
						<Link href={APP_PATHS.HOME}>
							<Button variant='green'>Shop Now</Button>
						</Link>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return <CheckoutWizard />;
};

export default Cart;
