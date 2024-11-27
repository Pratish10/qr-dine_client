'use client';
import React from 'react';
import { cart, type CartType } from '@/recoil/cart/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CartItems } from '@/components/CartItems';
import APP_PATHS from '@/config/path.config';
import Link from 'next/link';

const Cart = (): React.JSX.Element => {
	const setCartValue = useSetRecoilState(cart);
	const cartItems = useRecoilValue(cart);

	const handleRemoveItem = (item: CartType): void => {
		setCartValue((prev) => prev.filter((cartValue) => cartValue.id !== item.id));
	};

	const handleUpdateQuantity = (item: CartType, quantity: number): void => {
		if (quantity === 0) {
			handleRemoveItem(item);
			return;
		}

		setCartValue((prev) =>
			prev.map((cartValue) =>
				cartValue.id === item.id
					? {
							...cartValue,
							quantity,
							amount: ((Number(cartValue.amount) / cartValue.quantity) * quantity).toFixed(2),
						}
					: cartValue
			)
		);
	};

	const totalPrice = cartItems.reduce((acc, item) => {
		return (acc += Number(item.amount));
	}, 0);

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
							<Button variant={'green'}>Shop Now</Button>
						</Link>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-2xl font-semibold mb-6'>Food Cart</h1>
			<div className='grid lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2'>
					<div className='bg-card rounded-lg shadow-sm'>
						{cartItems.map((item) => (
							<div key={item.id}>
								<CartItems cartItem={item} onRemove={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
							</div>
						))}
					</div>
				</div>
				<div className='lg:col-span-1'>
					<div className='space-y-4'>
						<Card>
							<CardContent className='p-6'>
								<h3 className='font-medium text-base mb-4'>Order Summary</h3>

								<div className='space-y-3'>
									<div className='flex justify-between'>
										<span>Price ({cartItems.length} Items)</span>
										<span>₹ {totalPrice}</span>
									</div>

									<div className='h-px bg-border my-2' />

									<div className='flex justify-between font-medium'>
										<span>Total Amount</span>
										<span>₹{totalPrice}</span>
									</div>
								</div>

								<Button className='w-full mt-6' variant='green'>
									<ShieldCheck size={35} />
									Proceed to Checkout
								</Button>
							</CardContent>
						</Card>

						<div className='flex items-start gap-3 text-sm text-muted-foreground'>
							<ShieldCheck className='h-5 w-5 flex-shrink-0 mt-0.5' />
							<p>
								Safe and Secure Payments. Easy returns. <br />
								100% Authentic products.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
