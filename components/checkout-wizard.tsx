/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, ArrowLeft } from 'lucide-react';
import { CartItems } from '@/components/CartItems';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cart, type CartType } from '@/recoil/cart/atom';
import { RATING_STAR } from '@/config/filter.config';

const CheckoutWizard = (): React.JSX.Element => {
	const [step, setStep] = useState(1);
	const setCartValue = useSetRecoilState(cart);
	const cartItems = useRecoilValue(cart);
	const [email, setEmail] = useState('');
	const [name, setName] = useState<string>('');
	const [ratings, setRatings] = useState<Array<{ menuId: string; rating: number }>>([]);
	const [emailError, setEmailError] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');

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
		return acc + Number(item.amount) * item.quantity;
	}, 0);

	const handleNextStep = (): void => {
		setStep(2);
	};

	const handlePreviousStep = (): void => {
		setStep(1);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
		if (e.target.value) {
			setEmailError('');
		}
	};
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
		if (e.target.value) {
			setNameError('');
		}
	};

	const handleRatingChange = (menuId: string, rating: number): void => {
		setRatings((prevRatings) => {
			const existingRatingIndex = prevRatings.findIndex((rating) => rating.menuId === menuId);

			if (existingRatingIndex !== -1) {
				const updatedRatings = [...prevRatings];
				updatedRatings[existingRatingIndex] = { menuId, rating };
				return updatedRatings;
			} else {
				return [...prevRatings, { menuId, rating }];
			}
		});
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		if (!email || email.trim() === '') {
			setEmailError('Email is required');
			return;
		}
		if (!nameError || nameError.trim() === '') {
			setNameError('Name is required');
			return;
		}

		// eslint-disable-next-line no-console
		console.log('Order submitted', { cartItems, email, ratings, name });
	};

	return (
		<div className='container mx-auto px-4 py-6'>
			<h1 className='text-2xl font-semibold mb-6'>{step === 1 ? 'Checkout' : 'User Information and Feedback'}</h1>
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
										<form onSubmit={handleSubmit} className='space-y-4'>
											<div>
												<Label htmlFor='name'>Your Name</Label>
												<Input type='text' id='name' value={name} onChange={handleNameChange} required />
												{emailError && <span className='text-sm text-red-500'>{nameError}</span>}
											</div>
											<div>
												<Label htmlFor='email'>Please Enter your Email</Label>
												<Input type='email' id='email' value={email} onChange={handleEmailChange} required />
												{emailError && <span className='text-sm text-red-500'>{emailError}</span>}
												<span className='text-sm text-neutral-400'>Order receipt will be shared over your email</span>
											</div>
											<div>
												<h3 className='text-lg font-medium mb-2'>Please Rate the food</h3>
												{cartItems.map((item) => (
													<div key={item.id} className='flex items-center justify-between mb-2 text-sm'>
														<span>{item.name}</span>
														<div className='flex items-center'>
															{RATING_STAR.map((star) => (
																<Star
																	key={star}
																	size={24}
																	className={`${
																		star <= (ratings?.find((r) => r.menuId === item.id)?.rating ?? 0)
																			? 'text-yellow-400 fill-yellow-400'
																			: 'text-gray-300'
																	} cursor-pointer transition-colors duration-150 hover:text-yellow-400`}
																	onClick={() => {
																		handleRatingChange(item.id, star);
																	}}
																	role='button'
																	tabIndex={0}
																	aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
																	id={item.id !== '' ? `rating-${item.id}-star-${star}` : undefined}
																/>
															))}
														</div>
													</div>
												))}
											</div>
											<Button type='submit' className='w-full' variant='green'>
												Submit
											</Button>
										</form>
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
								<h3 className='font-medium text-base mb-4'>Order Summary</h3>
								<div className='space-y-3'>
									<div className='flex justify-between'>
										<span>Price ({cartItems.length} Items)</span>
										<span>₹ {totalPrice.toFixed(2)}</span>
									</div>
									<div className='h-px bg-border my-2' />
									<div className='flex justify-between font-medium'>
										<span>Total Amount</span>
										<span>₹{totalPrice.toFixed(2)}</span>
									</div>
								</div>
								{step === 1 ? (
									<Button className='w-full mt-6' variant='outline' onClick={handleNextStep}>
										Continue to User Info
									</Button>
								) : (
									<>
										<Button className='w-full mt-6' variant='green' onClick={handlePreviousStep} disabled>
											Place Order
										</Button>
										<div className='flex justify-center mt-4'>
											<span
												className='flex items-center hover:underline cursor-pointer text-sm text-muted-foreground'
												onClick={() => {
													setStep(1);
												}}
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

export default CheckoutWizard;
