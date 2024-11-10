'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { menuList, menuStatus } from '@/recoil/menus/atom';
import { useRecoilValue } from 'recoil';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuCard } from '@/components/menu-card';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Carrot, Drumstick } from 'lucide-react';
import clsx from 'clsx';
import { Filters } from './filters';

export const Menus = (): React.JSX.Element => {
	const menus = useRecoilValue(menuList);
	const menStatus = useRecoilValue(menuStatus);
	const [filter, setFilter] = useState<'Vegeterian' | 'nonVegeterian' | null>(null);

	const filteredMenus = filter !== null ? menus.filter((menu) => menu.type === filter) : menus;

	return (
		<Card noBorder>
			<CardHeader className='flex flex-row items-center justify-between p-4'>
				<CardTitle className='text-lg font-semibold'>Menus</CardTitle>

				<div className='flex items-center space-x-4'>
					<Filters />
					<Badge
						variant='outline'
						onClick={() => {
							setFilter((prev) => (prev === 'Vegeterian' ? null : 'Vegeterian'));
						}}
						className={clsx(filter === 'Vegeterian' && 'bg-green-100 dark:text-black', 'cursor-pointer')}
					>
						<Carrot color='green' size={17} className='mr-2' />
						Veg
					</Badge>
					<Badge
						variant='outline'
						onClick={() => {
							setFilter((prev) => (prev === 'nonVegeterian' ? null : 'nonVegeterian'));
						}}
						className={clsx(filter === 'nonVegeterian' && 'bg-red-100 dark:text-black', 'cursor-pointer')}
					>
						<Drumstick color='red' size={17} className='mr-2' />
						Non Veg
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				{menStatus === 'loading' && (
					<div className='flex flex-wrap justify-center items-start gap-10 p-4'>
						{[...Array(6)].map((_, index) => (
							<div key={index}>
								<Skeleton className='rounded-lg flex flex-col items-start gap-4 w-full sm:w-80 md:w-72 lg:w-80 p-3 h-72' />
							</div>
						))}
					</div>
				)}

				{menStatus === 'success' && filteredMenus.length > 0 && (
					<motion.div
						className='flex flex-wrap justify-center items-start gap-16'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{filteredMenus.map((item) => (
							<motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
								<MenuCard menu={item} />
							</motion.div>
						))}
					</motion.div>
				)}

				{menStatus === 'success' && filteredMenus.length === 0 && <p className='text-center text-gray-500 mt-4'>No Menus available</p>}
			</CardContent>
		</Card>
	);
};
