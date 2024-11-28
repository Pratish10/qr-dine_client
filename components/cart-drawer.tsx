/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from './ui/button';
import { useDrawerController } from '@/hooks/use-drawer-controller';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { CheckCircle2, Minus, Plus, ShoppingCart, Star, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cart } from '@/recoil/cart/atom';
import { useSetRecoilState } from 'recoil';
import { type Menu } from '@/types/data.types';

export const CartDrawer = (): JSX.Element | null => {
	const { isOpen, onClose, data } = useDrawerController();
	const [quantity, setQuantity] = useState(1);
	const [amount, setAmount] = useState(data?.amount ?? '');
	const setCartValue = useSetRecoilState(cart);

	useEffect(() => {
		if (data) {
			setAmount((Number(data.amount) * quantity).toFixed(2));
		}
	}, [quantity, data]);

	const handleIncrement = (): void => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecrement = (): void => {
		setQuantity((prev) => Math.max(1, prev - 1));
	};

	const addMenuToCart = (menu: Menu): void => {
		setCartValue((prevValue) => {
			const currentCart = Array.isArray(prevValue) ? prevValue : [];
			const existingItemIndex = currentCart.findIndex((item) => item.id === menu.id);

			if (existingItemIndex !== -1) {
				const updatedCart = [...currentCart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + quantity,
					calculatedAmount: (Number(menu.amount) * (updatedCart[existingItemIndex].quantity + quantity)).toFixed(2),
				};
				return updatedCart;
			}
			return [...currentCart, { ...menu, quantity, calculatedAmount: String(amount) }];
		});
		onClose();
	};

	if (!data) {
		return null;
	}
	const isAvailable = data.availability === 'Available';
	return (
		<Drawer open={isOpen} onOpenChange={onClose}>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle className='text-2xl font-bold'>{data.name}</DrawerTitle>
					<DrawerDescription>{data.description}</DrawerDescription>
				</DrawerHeader>
				<div className='p-4 pb-0'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={data.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className='flex flex-col md:flex-row gap-6'
						>
							<div className='w-full md:w-1/2'>
								<Image
									src={data.image[0]}
									alt={data.name}
									width={400}
									height={300}
									className='rounded-lg object-cover w-full h-[300px]'
								/>
							</div>
							<div className='w-full md:w-1/2 space-y-4'>
								<div className='flex justify-between items-center'>
									<p className={`text-xs mt-1 ${data.type === 'Vegeterian' ? 'text-green-500' : 'text-red-500'}`}>
										{data.type === 'Vegeterian' ? 'Vegeterian' : 'Non-Vegeterian'}
									</p>
									<span className='text-2xl font-bold'>₹{data.amount}</span>
								</div>
								<div className='flex items-center space-x-2'>
									<Star className='w-5 h-5 text-yellow-400 fill-yellow-400' />
									<span>{data.averageRating ?? 'No ratings yet'}</span>
								</div>
								<div>
									<h3 className='text-sm font-medium text-gray-900'>Category</h3>
									<p className='mt-1 text-sm text-gray-500'>{data.category}</p>
								</div>
								<div>
									<Badge
										className={`text-xs rounded-full ${isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}
									>
										{isAvailable ? <CheckCircle2 className='w-3 h-3 mr-1' /> : <XCircle className='w-3 h-3 mr-1' />}
										{data.availability === 'Available' ? 'Available' : 'Not Available'}
									</Badge>
								</div>
								<div className='flex items-center space-x-4'>
									<Button variant='outline' size='icon' onClick={handleDecrement}>
										<Minus className='h-4 w-4' />
									</Button>
									<span className='text-lg font-medium'>{quantity}</span>
									<Button variant='outline' size='icon' onClick={handleIncrement}>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
				<DrawerFooter>
					<Button
						className='w-full'
						variant='green'
						onClick={() => {
							addMenuToCart(data as Menu);
						}}
					>
						<ShoppingCart className='mr-2 h-4 w-4' /> Add to Cart - ₹{amount}
					</Button>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
