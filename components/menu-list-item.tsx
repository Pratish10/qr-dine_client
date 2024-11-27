import React from 'react';
import { type Menu } from '@/types/data.types';
import { StarRating } from './star-rating';
import { Button } from './ui/button';
import { useSetRecoilState } from 'recoil';
import { cart } from '@/recoil/cart/atom';
import Image from 'next/image';

interface MenuListItemProps {
	menu: Menu;
}

export const MenuListItem: React.FC<MenuListItemProps> = ({ menu }) => {
	const setCartValue = useSetRecoilState(cart);

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

	const rating = menu.averageRating ?? 0;
	const truncatedDescription = menu.description.length > 25 ? `${menu.description.slice(0, 25)}...` : menu.description;

	return (
		<div className='flex flex-col items-center justify-between py-4 border-b last:border-b-0 w-full'>
			<div className='flex'>
				<div className='sm:max-w-xs mr-4'>
					<h3 className='font-semibold text-xl text-gray-800 dark:text-gray-100'>{menu.name}</h3>
					<p className='text-sm text-gray-600 mt-1 dark:text-gray-200 truncate'>{truncatedDescription}</p>
					<p className='text-xs text-gray-400 dark:text-gray-400 mt-1'>{menu.category}</p>
					<p className={`text-xs mt-1 ${menu.type === 'Vegeterian' ? 'text-green-500' : 'text-red-500'}`}>
						{menu.type === 'Vegeterian' ? 'Vegeterian' : 'Non-Vegeterian'}
					</p>{' '}
					<div className='flex items-center mt-1'>
						<StarRating rating={rating} />
						<span className='ml-2 text-sm text-gray-600 dark:text-gray-200'>₹{menu.amount}</span>
					</div>
				</div>

				<Image src={menu.image[0]} alt={menu.name} width={100} height={100} className='object-cover rounded-md' />
			</div>
			<Button
				variant='green'
				size='sm'
				onClick={() => {
					addMenuToCart(menu);
				}}
				className='whitespace-nowrap text-xs mt-4 w-full'
			>
				Add to Cart
			</Button>
		</div>
	);
};
