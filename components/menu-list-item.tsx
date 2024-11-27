import React from 'react';
import { type Menu } from '@/types/data.types';
import { StarRating } from './star-rating';
import { Button } from './ui/button';
import { useSetRecoilState } from 'recoil';
import { cart } from '@/recoil/cart/atom';

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

	const rating = menu.ratings != null && menu.ratings.length > 0 ? menu.ratings[0].value : 0;

	return (
		<div className='flex items-center justify-between py-4 border-b last:border-b-0'>
			<div className='flex items-center space-x-4'>
				<img src={menu.image[0]} alt={menu.name} className='w-16 h-16 object-cover rounded-md' />
				<div>
					<h3 className='font-semibold'>{menu.name}</h3>
					<p className='text-sm text-gray-500'>{menu.category}</p>
					<div className='flex items-center mt-1'>
						<StarRating rating={rating} />
						<span className='ml-2 text-sm text-gray-600'>₹{menu.amount}</span>
					</div>
				</div>
			</div>
			<Button
				variant='green'
				size='sm'
				onClick={() => {
					addMenuToCart(menu);
				}}
				className='whitespace-nowrap'
			>
				Add to Cart
			</Button>
		</div>
	);
};
