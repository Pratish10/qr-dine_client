/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { cart } from '@/recoil/cart/atom';
import { type Menu } from '@/types/data.types';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CartItems } from '@/components/CartItems';

const Cart = (): React.JSX.Element => {
	const [cartValue, setCartValue] = useRecoilState(cart);
	const cartItems = useRecoilValue(cart);

	const remove = (menu: Menu): void => {
		setCartValue((prevCart) => {
			const index = prevCart.findIndex((item) => item.id === menu.id);

			if (index !== -1) {
				const updatedCart = [...prevCart];
				const originalAmount = parseFloat(updatedCart[index].amount) / Number(updatedCart[index].quantity);

				updatedCart[index] = {
					...updatedCart[index],
					quantity: Number(updatedCart[index].quantity) - 1,
					amount: (parseFloat(updatedCart[index].amount) - originalAmount).toFixed(2),
				};

				if (updatedCart[index].quantity === 0) {
					updatedCart.splice(index, 1);
				}

				return updatedCart;
			}

			return prevCart;
		});
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
				className='flex items-center justify-center bg-green-50 p-4 shadow-lg'
			>
				<Card className='bg-white p-8 text-center'>
					<CardContent>
						<ShoppingCart className='w-16 h-16 mx-auto mb-4 text-green-500' />
						<h2 className='text-2xl font-bold text-green-800 mb-2'>Your Cart is Empty</h2>
						<p className='text-green-700 mb-3'>Looks like you haven&apos;t added anything yet!</p>
						<Button variant={'green'}>Shop Now</Button>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<div className='grid grid-cols-3'>
			<Card className='col-span-2 p-4'>
				<CardContent>
					{cartItems.map((item) => {
						return (
							<div key={item.id}>
								<CartItems cartItem={item} />;
							</div>
						);
					})}
				</CardContent>
			</Card>
			<div className='col-span-1 p-4'>
				<Card className='row-span-1'>
					<CardContent>
						<div className='row-span-1 my-5'>
							<p className='text-left uppercase'>price details</p>
						</div>
						<hr />
						<div className='row-span-1 my-5'>
							<div className='flex items-center justify-between'>
								<p>Price ({cartItems.length} Items)</p>
								<p>₹ {totalPrice}</p>
							</div>
						</div>
						<hr />
						<div className='row-span-1 mt-5'>
							<div className='flex items-center justify-between'>
								<p className='font-semibold'>Total Amount</p>
								<p>₹ {totalPrice}</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<div className='row-span-1 text-left my-5 flex gap-5'>
					<ShieldCheck size={35} />
					Safe and Secure Payments. Easy returns.100% Authentic products.
				</div>
			</div>
		</div>
	);
};

export default Cart;
