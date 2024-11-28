'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilState } from 'recoil';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuCard } from '@/components/menu-card';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Filters } from './filters';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { SORT_OPTIONS } from '@/config/filter.config';
import { type Menu } from '@/types/data.types';
import clsx from 'clsx';
import { filters } from '@/recoil/menus/atom';
import { MenuListItem } from './menu-list-item';
import { useRouter } from 'next/navigation';
import { useGetMenus } from '@/hooks/menu/use-get-Menu';

export const Menus = (): React.JSX.Element => {
	const { ref, inView } = useInView();
	const [filterOpt, setFilterOpt] = useRecoilState(filters);
	const [type, setType] = useState<'Vegeterian' | 'nonVegeterian' | 'Available' | 'notAvailable' | null>(null);
	const [availability, setAvailability] = useState<'Available' | 'notAvailable' | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [rating, setRating] = useState<number[]>([4]);
	const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
	const router = useRouter();

	const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useGetMenus('cm2dlk2jj0000c3qr6z3fwihs', filterOpt as object);

	useEffect(() => {
		if (inView && hasNextPage) {
			void fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	useEffect(() => {
		if (status === 'success' || !isFetchingNextPage) {
			const finalData: Menu[] | undefined = data?.pages
				.map((page) => {
					if (page.data.status) {
						return page.data.data;
					}
					return undefined;
				})
				.filter((menu) => menu !== undefined)
				.flat();

			setFilteredMenus(finalData ?? []);
		}
	}, [status, isFetchingNextPage]);

	const applyFilter = (): void => {
		const filterOptions: any = {};

		filterOptions.type = type;

		filterOptions.availability = availability;

		filterOptions.category = selectedCategory.map((category) => category).join(',');

		setFilterOpt(filterOptions);
		void refetch();
		setIsPopoverOpen(false);
	};

	const resetFilter = (): void => {
		setType(null);
		setAvailability(null);
		setSortBy(SORT_OPTIONS[0].value);
		setSelectedCategory([]);
		setRating([4]);
	};

	return (
		<Card noBorder>
			<CardHeader className='flex flex-col lg:flex-row items-start lg:items-center justify-between p-4'>
				<CardTitle className='text-lg font-semibold mb-2 lg:mb-0'>Menus</CardTitle>

				<div className='flex items-center space-x-4 w-full lg:w-auto'>
					<Dialog onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
						<DialogTrigger className='w-full lg:w-auto'>
							<span
								className={clsx(
									'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
									'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
									'disabled:pointer-events-none disabled:opacity-50',
									'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
									'border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2',
									'w-full lg:w-auto'
								)}
							>
								Filters
							</span>
						</DialogTrigger>
						<DialogContent className='w-full lg:max-w-md'>
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
										availability={availability}
										setAvailability={setAvailability}
										rating={rating}
										setRating={setRating}
									/>
								</DialogDescription>
							</DialogHeader>
							<hr />
							<DialogFooter className='flex flex-col lg:flex-row justify-between items-center w-full'>
								<Button
									size='sm'
									className='w-full lg:w-auto mb-2 lg:mb-0'
									variant='destructive'
									onClick={() => {
										setIsPopoverOpen(false);
									}}
								>
									Cancel
								</Button>
								<div className='flex flex-col lg:flex-row gap-2 w-full lg:w-auto'>
									<Button size='sm' variant='outline' onClick={resetFilter} className='w-full lg:w-auto'>
										Reset Filter
									</Button>
									<Button size='sm' variant='green' onClick={applyFilter} className='w-full lg:w-auto'>
										Apply
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>
			<CardContent>
				{status !== 'pending' && filteredMenus.length > 0 && (
					<>
						<AnimatePresence>
							<div className='hidden lg:grid lg:grid-cols-4 gap-6'>
								{filteredMenus.map((item, index) => (
									<motion.div
										key={item.id + index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										whileHover={{ scale: 1.02 }}
										className='cursor-pointer'
										onClick={() => {
											router.push(`/${item.id}`);
										}}
									>
										<MenuCard menu={item} />
									</motion.div>
								))}
							</div>
						</AnimatePresence>

						<AnimatePresence>
							<div className='lg:hidden'>
								{filteredMenus.map((item, index) => (
									<motion.div
										key={item.id + index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										whileHover={{ scale: 1.02 }}
										className='cursor-pointer'
										onClick={() => {
											router.push(`/${item.id}`);
										}}
									>
										<MenuListItem menu={item} />
									</motion.div>
								))}
							</div>
						</AnimatePresence>

						<div ref={ref} className='h-1' />
					</>
				)}

				{(isFetchingNextPage || status === 'pending') && (
					<div className='grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 p-4'>
						{[...Array(8)].map((_, index) => (
							<div key={index} className='hidden lg:block'>
								<Skeleton className='rounded-lg flex flex-col items-start gap-4 w-full h-64 lg:h-72' />
							</div>
						))}
						{[...Array(8)].map((_, index) => (
							<div key={index} className='block lg:hidden'>
								<Skeleton className='w-full h-24 rounded-md mb-4' />
							</div>
						))}
					</div>
				)}

				{status === 'success' && filteredMenus.length === 0 && <p className='text-center text-gray-500 mt-4'>No Menus available</p>}
			</CardContent>
		</Card>
	);
};
