'use client';
import { type MenuSearch } from '@/types/data.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carrot, Drumstick } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const MenuSearchCard = ({ menu }: { menu: MenuSearch }): JSX.Element => {
	const avatarFallBack = (menu?.name ?? 'Unknown')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.join('');

	const menuFormatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'INR',
	}).format(parseFloat(menu.amount));

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className='group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
		>
			<Link href={`/${menu.id}`} className='block'>
				<div className='flex items-center space-x-4 p-4'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={menu.image[0]} alt={menu.name} />
						<AvatarFallback>{avatarFallBack}</AvatarFallback>
					</Avatar>
					<div className='flex-1 min-w-0'>
						<motion.h3
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
							className='flex items-center text-sm font-semibold dark:text-gray-100 text-gray-900 truncate'
						>
							{menu.name}
							<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='flex items-center'>
								{menu.type === 'Vegeterian' ? (
									<Carrot className='size-4 text-green-500 ml-1' />
								) : (
									<Drumstick className='size-4 text-red-500 ml-1' />
								)}
							</motion.span>
						</motion.h3>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className='text-xs text-gray-500 truncate'
						>
							{menu.category}
						</motion.p>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4 }}
						className='text-right'
					>
						<span className='ttext-sm font-bold text-green-600'>{menuFormatted}</span>
					</motion.div>
				</div>
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.5 }}
					className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500'
				/>
			</Link>
		</motion.div>
	);
};
