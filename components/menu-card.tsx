import { type Menu } from '@/types/data.types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';
import { StarRating } from './star-rating';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useDrawerController } from '@/hooks/use-drawer-controller';

interface MenuCardProps {
	menu: Menu;
}

export const MenuCard = ({ menu }: MenuCardProps): JSX.Element => {
	const { onOpen } = useDrawerController();

	const truncatedDescription = menu.description.length > 25 ? `${menu.description.slice(0, 25)}...` : menu.description;

	const rating = menu.averageRating ?? 0;
	const isAvailable = menu.availability === 'Available';

	return (
		<motion.div
			className='rounded-lg shadow-lg hover:shadow-2xl bg-white dark:bg-slate-950 flex flex-col items-start gap-4 w-full sm:w-80 md:w-72 lg:w-80 p-3'
			whileHover={{ y: -5 }}
			transition={{ duration: 0.2 }}
		>
			<div className='relative w-full'>
				<Image src={menu.image[0]} alt={menu.name} height={200} width={300} className='w-full h-56 object-cover rounded-md' />
				<Badge
					className={`absolute top-2 right-2 text-xs rounded-full  p-1 ${
						isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
					}`}
				>
					{isAvailable ? <CheckCircle2 className='w-3 h-3 mr-1' /> : <XCircle className='w-3 h-3 mr-1' />}
					{menu.availability === 'Available' ? 'Available' : 'Not Available'}
				</Badge>
			</div>

			<div className='w-full'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<h2 className='font-semibold text-slate-800 dark:text-slate-300'>{menu.name}</h2>
					</div>
					<p className='text-gray-800 dark:text-slate-300'>₹{menu.amount}</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-sm text-gray-600 dark:text-slate-400 truncate'>{truncatedDescription}</p>
					<p className='text-sm text-slate-400 dark:text-slate-400'>{menu.category}</p>
				</div>
				<div className='mt-2'>
					<StarRating rating={rating} />
					<p className={`text-xs mt-1 ${menu.type === 'Vegeterian' ? 'text-green-500' : 'text-red-500'}`}>
						{menu.type === 'Vegeterian' ? 'Vegeterian' : 'Non-Vegeterian'}
					</p>
				</div>
			</div>

			<Button
				variant='green'
				onClick={() => {
					onOpen(menu);
				}}
				size='sm'
				className='w-full bg-green-500 text-white hover:bg-green-600 rounded-md'
				disabled={!isAvailable}
			>
				{isAvailable ? 'Add' : 'Not Available'}
			</Button>
		</motion.div>
	);
};
