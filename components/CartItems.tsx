'use client';
import { type CartType } from '@/recoil/cart/atom';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

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
	return (
		<div className='flex gap-4 py-4 border-b last:border-0'>
			<div className='w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
				<Image src={cartItem.image[0]} alt={cartItem.name} width={50} height={50} className='w-full h-full object-cover' />
			</div>

			<div className='flex-1 min-w-0'>
				<div className='flex flex-col h-full justify-between'>
					<div>
						<h3 className='font-medium text-base text-left truncate'>{cartItem.name}</h3>
						<p className='text-sm text-muted-foreground text-left'>{cartItem.description}</p>
					</div>

					<div className='flex items-center justify-between mt-2'>
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								className='h-8 w-8'
								onClick={() => {
									onUpdateQuantity(cartItem, Math.max(0, cartItem.quantity - 1));
								}}
							>
								<Minus className='h-4 w-4' />
							</Button>
							<span className='w-8 text-center'>{cartItem.quantity}</span>
							<Button
								variant='outline'
								size='icon'
								className='h-8 w-8'
								onClick={() => {
									onUpdateQuantity(cartItem, cartItem.quantity + 1);
								}}
							>
								<Plus className='h-4 w-4' />
							</Button>
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>₹{cartItem.amount}</span>
							<Button
								variant='ghost'
								size='icon'
								className='h-8 w-8 text-destructive'
								onClick={() => {
									onRemove(cartItem);
								}}
							>
								<Trash2 className='h-4 w-4' color='red' />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
