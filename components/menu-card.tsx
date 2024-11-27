import { type Menu } from '@/types/data.types';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carrot, Drumstick } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { cart } from '@/recoil/cart/atom';
import { StarRating } from './star-rating';

const MenuTypeTooltip = ({ type }: { type: 'Vegeterian' | 'nonVegeterian' }): React.JSX.Element => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				{type === 'Vegeterian' ? <Carrot color='green' size={15} /> : <Drumstick color='red' size={15} />}
			</TooltipTrigger>
			<TooltipContent>
				<p>{type}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

interface MenuCardProps {
	menu: Menu;
}

export const MenuCard = ({ menu }: MenuCardProps): React.JSX.Element => {
	const setCartValue = useSetRecoilState(cart);

	const truncatedDescription = menu.description.length > 25 ? `${menu.description.slice(0, 25)}...` : menu.description;

	const addMenuToCart = (menu: Menu): void => {
		setCartValue((prevValue) => {
			const currentCart = Array.isArray(prevValue) ? prevValue : [];
			const existingItemIndex = currentCart.findIndex((item) => item.id === menu.id);

			if (existingItemIndex !== -1) {
				const updatedCart = [...currentCart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + 1,
					amount: (Number(menu.amount) * (updatedCart[existingItemIndex].quantity + 1)).toFixed(2),
				};
				return updatedCart;
			}
			return [...currentCart, { ...menu, quantity: 1 }];
		});
	};

	const rating = menu.ratings != null && menu.ratings.length > 0 ? menu.ratings[0].value : 0;

	return (
		<motion.div className='rounded-lg shadow-lg hover:shadow-2xl bg-white dark:bg-gray-900 flex flex-col items-start gap-4 w-full sm:w-80 md:w-72 lg:w-80 p-3'>
			<Image src={menu.image[0]} alt={menu.name} height={200} width={300} className='w-full h-56 object-cover rounded-md' />

			<div className='w-full'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<h2 className='font-semibold text-gray-800 dark:text-gray-200'>{menu.name}</h2>
						<span className='ml-2'>
							<MenuTypeTooltip type={menu.type} />
						</span>
					</div>
					<p className='text-gray-800 dark:text-gray-200'>₹{menu.amount}</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-sm text-gray-500 truncate'>{truncatedDescription}</p>
					<p className='text-sm text-gray-500 dark:text-gray-200'>{menu.category}</p>
				</div>
				<div className='mt-2'>
					<StarRating rating={rating} />
				</div>
			</div>

			<Button
				variant='green'
				onClick={() => {
					addMenuToCart(menu);
				}}
				size='sm'
				className='w-full bg-green-500 text-white hover:bg-green-600 rounded-md'
			>
				Add to Cart
			</Button>
		</motion.div>
	);
};
