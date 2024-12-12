/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItems } from '@/components/CartItems';
import { cart, type CartType } from '@/recoil/cart/atom';
import { useAddCustomer } from '@/hooks/customers/use-add-customers';
import { CustomerForm } from './CustomerForm';

const CheckoutWizard = (): JSX.Element => {
	const [step, setStep] = useState(1);
	const setCartValue = useSetRecoilState(cart);
	const cartItems = useRecoilValue(cart);
	const { isPending } = useAddCustomer();
	const [isPlaceOrder, setIsPlaceOrder] = useState<boolean>(true);

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
							calculatedAmount: ((Number(cartValue.calculatedAmount) / cartValue.quantity) * quantity).toFixed(2),
						}
					: cartValue
			)
		);
	};

	const totalPrice = cartItems.reduce((acc, item) => {
		return acc + Number(item.amount) * item.quantity;
	}, 0);

	const handleNextStep = (): void => {
		setStep(2);
	};

	const handlePreviousStep = (): void => {
		setStep(1);
	};

	const placeOrder = (e: React.MouseEvent<HTMLButtonElement>): void => {
		// eslint-disable-next-line no-console
		console.log(e);
	};

	return (
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-2xl font-semibold mb-6 dark:text-slate-300'>{step === 1 ? 'Checkout' : 'User Information and Feedback'}</h1>
			<div className='grid lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2'>
					<AnimatePresence mode='wait'>
						{step === 1 && (
							<motion.div
								key='step1'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.3 }}
							>
								<Card className='mb-4'>
									<CardContent>
										{cartItems.map((item) => (
											<CartItems
												key={item.id}
												cartItem={item}
												onRemove={handleRemoveItem}
												onUpdateQuantity={handleUpdateQuantity}
											/>
										))}
									</CardContent>
								</Card>
							</motion.div>
						)}
						{step === 2 && (
							<motion.div
								key='step2'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<Card className='mb-4'>
									<CardContent className='pt-4'>
										<CustomerForm setIsPlaceOrder={setIsPlaceOrder} />
									</CardContent>
								</Card>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className='lg:col-span-1'>
					<div className='space-y-4'>
						<Card>
							<CardContent className='p-6'>
								<h3 className='font-medium text-base mb-4 dark:text-slate-300'>Order Summary</h3>
								<div className='space-y-3'>
									<div className='flex justify-between dark:text-slate-300'>
										<span>Price ({cartItems.length} Items)</span>
										<span>₹ {totalPrice.toFixed(2)}</span>
									</div>
									<div className='h-px bg-border my-2' />
									<div className='flex justify-between font-medium dark:text-slate-300'>
										<span>Total Amount</span>
										<span>₹{totalPrice.toFixed(2)}</span>
									</div>
								</div>
								{step === 1 ? (
									<Button className='w-full mt-6 dark:text-slate-300' variant='outline' onClick={handleNextStep}>
										Continue to User Info
									</Button>
								) : (
									<>
										<Button className='w-full mt-6' variant='green' onClick={placeOrder} disabled={isPlaceOrder}>
											{isPending ? <Loader2 className='h-6 w-6 animate-spin' /> : 'Place Order'}
										</Button>
										<div className='flex justify-center mt-4'>
											<span
												className='flex items-center hover:underline cursor-pointer text-sm text-muted-foreground dark:text-slate-300'
												onClick={handlePreviousStep}
											>
												<ArrowLeft className='mr-2 h-4 w-4' />
												Back to Checkout
											</span>
										</div>
									</>
								)}
							</CardContent>
						</Card>
						<div className='flex items-start gap-3 text-sm text-muted-foreground'>
							<ShieldCheck className='h-5 w-5 flex-shrink-0 mt-0.5' />
							<p className='dark:text-slate-300'>
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

export default CheckoutWizard;
