'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { menuList, menuStatus } from '@/recoil/menus/atom';
import { useRecoilValue } from 'recoil';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuCard } from '@/components/menu-card';
import { motion } from 'framer-motion';
import { Filters } from './filters';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { SORT_OPTIONS } from '@/config/filter.config';
import { type Menu } from '@/types/data.types';
import clsx from 'clsx';

export const Menus = (): React.JSX.Element => {
	const menus = useRecoilValue(menuList);
	const menStatus = useRecoilValue(menuStatus);
	const [type, setType] = useState<'Vegeterian' | 'nonVegeterian' | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [rating, setRating] = useState<number[]>([4]);
	const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);

	const applyFilter = (): void => {
		const filteredData = menus.filter((menu) => {
			const matchesType =
				type === null || (type === 'Vegeterian' && menu.type === 'Vegeterian') || (type === 'nonVegeterian' && menu.type === 'nonVegeterian');

			const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(menu.category);

			return matchesType && matchesCategory;
		});

		setFilteredMenus(filteredData);
		setIsPopoverOpen(false);
	};

	const resetFilter = (): void => {
		setType(null);
		setSortBy(SORT_OPTIONS[0].value);
		setSelectedCategory([]);
		setRating([4]);
	};

	useEffect(() => {
		if (menStatus === 'success') {
			setFilteredMenus(menus);
		}
	}, [menStatus]);

	return (
		<Card noBorder>
			<CardHeader className='flex flex-row items-center justify-between p-4'>
				<CardTitle className='text-lg font-semibold'>Menus</CardTitle>

				<div className='flex items-center space-x-4'>
					<Dialog onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
						<DialogTrigger>
							<span
								className={clsx(
									'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
									'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
									'disabled:pointer-events-none disabled:opacity-50',
									'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
									'border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2'
								)}
							>
								Filters
							</span>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Filters</DialogTitle>
								<hr />
								<DialogDescription>
									<Filters
										selectedCategory={selectedCategory}
										setSelectedCategory={setSelectedCategory}
										setSortBy={setSortBy}
										sortBy={sortBy}
										type={type}
										setType={setType}
										rating={rating}
										setRating={setRating}
									/>
								</DialogDescription>
							</DialogHeader>
							<hr />
							<DialogFooter className='flex justify-between items-center w-full'>
								<Button
									size='sm'
									className='mr-auto'
									variant='destructive'
									onClick={() => {
										setIsPopoverOpen(false);
									}}
								>
									Cancel
								</Button>
								<div className='flex gap-2'>
									<Button size='sm' variant='outline' onClick={resetFilter}>
										Reset Filter
									</Button>
									<Button size='sm' variant='green' onClick={applyFilter}>
										Apply
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
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
