import React from 'react';
import { type Menu } from '@/types/data.types';
import { StarRating } from './star-rating';
import { Button } from './ui/button';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useDrawerController } from '@/hooks/use-drawer-controller';

interface MenuListItemProps {
	menu: Menu;
}

export const MenuListItem: React.FC<MenuListItemProps> = ({ menu }) => {
	const { onOpen } = useDrawerController();

	const rating = menu.averageRating ?? 0;
	const truncatedDescription = menu.description.length > 25 ? `${menu.description.slice(0, 25)}...` : menu.description;

	return (
		<div className='flex flex-col items-center justify-between py-4 border-b last:border-b-0 w-full'>
			<div className='flex'>
				<div className='sm:max-w-xs mr-4'>
					{menu.availability === 'Available' ? (
						<Badge className='text-xs text-green-600 bg-green-100 rounded-full p-1'>
							<CheckCircle2 className='w-3 h-3 mr-1' />
							Available
						</Badge>
					) : (
						<Badge className='text-xs text-red-600 bg-red-100 rounded-full p-1'>
							<XCircle className='w-3 h-3 mr-1' />
							Not Available
						</Badge>
					)}
					<h3 className='font-semibold text-xl text-gray-800 dark:text-slate-300 mt-2'>{menu.name}</h3>
					<p className='text-sm text-gray-600 mt-1 dark:text-slate-400 truncate'>{truncatedDescription}</p>
					<p className='text-xs text-gray-400 dark:text-slate-400 mt-1'>{menu.category}</p>
					<p className={`text-xs mt-1 ${menu.type === 'Vegeterian' ? 'text-green-500' : 'text-red-500'}`}>
						{menu.type === 'Vegeterian' ? 'Vegeterian' : 'Non-Vegeterian'}
					</p>
					<div className='flex items-center mt-1'>
						<StarRating rating={rating} />
						<span className='ml-2 text-sm text-gray-600 dark:text-slate-300'>₹{menu.amount}</span>
					</div>
				</div>

				<Image src={menu.image[0]} alt={menu.name} width={100} height={100} className='object-cover rounded-md' />
			</div>
			<Button
				variant='green'
				size='sm'
				onClick={() => {
					onOpen(menu);
				}}
				className='whitespace-nowrap text-xs mt-4 w-full'
				disabled={menu.availability !== 'Available'}
			>
				{menu.availability === 'Available' ? 'Add' : 'Not Available'}
			</Button>
		</div>
	);
};
