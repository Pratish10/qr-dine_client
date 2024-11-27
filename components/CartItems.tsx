'use client';
import { type CartType } from '@/recoil/cart/atom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { StarRating } from './star-rating';

interface CartItemProps {
	cartItem: CartType;
	onRemove: (item: CartType) => void;
	onUpdateQuantity: (item: CartType, quantity: number) => void;
}

export const CartItems = ({ cartItem, onRemove, onUpdateQuantity }: CartItemProps): JSX.Element | null => {
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}
	const rating = cartItem.ratings != null && cartItem.ratings.length > 0 ? cartItem.ratings[0].value : 0;
	return (
		<div className='flex flex-col sm:flex-row gap-4 py-2 sm:py-4 border-b last:border-0'>
			<div className='w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
				<Image src={cartItem.image[0]} alt={cartItem.name} width={50} height={50} className='w-full h-full object-cover' />
			</div>
			<div className='flex-1 min-w-0 mt-2 sm:mt-0'>
				<h3 className='font-medium text-sm sm:text-base text-left truncate'>{cartItem.name}</h3>
				<p className='text-xs sm:text-sm text-muted-foreground text-left truncate'>{cartItem.description}</p>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2'>
					<div className='flex items-center'>
						<Button
							variant='outline'
							size='icon'
							className='h-6 w-6 sm:h-8 sm:w-8'
							onClick={() => {
								onUpdateQuantity(cartItem, Math.max(0, cartItem.quantity - 1));
							}}
						>
							<Minus className='h-3 w-3 sm:h-4 sm:w-4' />
						</Button>
						<span className='w-6 sm:w-8 text-center text-sm sm:text-base'>{cartItem.quantity}</span>
						<Button
							variant='outline'
							size='icon'
							className='h-6 w-6 sm:h-8 sm:w-8'
							onClick={() => {
								onUpdateQuantity(cartItem, cartItem.quantity + 1);
							}}
						>
							<Plus className='h-3 w-3 sm:h-4 sm:w-4' />
						</Button>
						<div className='ml-4 sm:ml-8'>
							<StarRating rating={rating} />
						</div>
					</div>

					<div className='flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 mt-2 sm:mt-0'>
						<span className='font-medium text-sm sm:text-base'>₹{cartItem.amount}</span>
						<Button
							variant='ghost'
							size='icon'
							className='h-6 w-6 sm:h-8 sm:w-8 text-destructive'
							onClick={() => {
								onRemove(cartItem);
							}}
						>
							<Trash2 className='h-3 w-3 sm:h-4 sm:w-4' color='red' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
