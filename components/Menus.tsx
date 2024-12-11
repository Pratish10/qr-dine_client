/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuCard } from '@/components/menu-card';
import { motion, AnimatePresence } from 'framer-motion';
import { Filters } from './filters';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { SORT_OPTIONS } from '@/config/filter.config';
import { type Menu } from '@/types/data.types';
import clsx from 'clsx';
import { filters } from '@/recoil/menus/atom';
import { MenuListItem } from './menu-list-item';
import { useGetMenus } from '@/hooks/menu/use-get-Menu';
import { ArrowUp } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { restaurantId } from '@/recoil/restaurant/atom';

export const Menus = (): JSX.Element => {
	const [filterOpt, setFilterOpt] = useRecoilState(filters);
	const [type, setType] = useState<'Vegeterian' | 'nonVegeterian' | null>(null);
	const [availability, setAvailability] = useState<'Available' | 'notAvailable' | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [rating, setRating] = useState<number[]>([1]);
	const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);
	const resId = useRecoilValue(restaurantId);

	const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMenus(resId ?? 'cm2dlk2jj0000c3qr6z3fwihs', filterOpt as object);

	const onScroll = useCallback(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const scrollTop = window.scrollY;
			const scrollHeight = document.documentElement.scrollHeight;
			const clientHeight = window.innerHeight;

			if (scrollTop + clientHeight >= scrollHeight - 50 && hasNextPage) {
				void fetchNextPage();
			}

			setShowScrollTopButton(scrollTop > 500);
		}
	}, [hasNextPage, fetchNextPage]);

	useScrollToTop({ current: document.documentElement }, onScroll);

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

		if (type) filterOptions.type = type;
		if (availability) filterOptions.availability = availability;
		if (selectedCategory.length > 0) filterOptions.category = selectedCategory.join(',');
		if (sortBy) {
			if (sortBy === SORT_OPTIONS[0].value) {
				filterOptions.amountSort = null;
			} else {
				filterOptions.amountSort = sortBy;
			}
		}
		if (rating[0] > 1) filterOptions.rating = rating[0];

		setFilterOpt(filterOptions);
		setIsPopoverOpen(false);
	};

	const resetFilter = (): void => {
		setType(null);
		setAvailability(null);
		setSortBy(SORT_OPTIONS[0].value);
		setSelectedCategory([]);
		setRating([1]);
	};

	const scrollToTop = useCallback(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	}, []);

	return (
		<Card noBorder>
			<CardHeader className='flex flex-col lg:flex-row items-start lg:items-center justify-between p-4'>
				<CardTitle className='text-lg font-semibold mb-2 lg:mb-0 dark:text-slate-200'>Menus</CardTitle>

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
									'w-full lg:w-auto dark:text-slate-300'
								)}
							>
								Filters
							</span>
						</DialogTrigger>
						<DialogContent className='w-full lg:max-w-md'>
							<DialogHeader>
								<DialogTitle className='dark:text-slate-300'>Filters</DialogTitle>
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
									className='w-full lg:w-auto mb-2 lg:mb-0 dark:text-slate-300'
									variant='destructive'
									onClick={() => {
										setIsPopoverOpen(false);
									}}
								>
									Cancel
								</Button>
								<div className='flex flex-col lg:flex-row gap-2 w-full lg:w-auto'>
									<Button size='sm' variant='outline' onClick={resetFilter} className='w-full lg:w-auto dark:text-slate-300'>
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
									>
										<MenuListItem menu={item} />
									</motion.div>
								))}
							</div>
						</AnimatePresence>

						<div className='h-1' />
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

			<AnimatePresence>
				{showScrollTopButton && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className='fixed bottom-8 right-8 z-50'
					>
						<Button
							size='icon'
							variant='outline'
							onClick={scrollToTop}
							className='rounded-full shadow-md hover:shadow-lg transition-shadow'
						>
							<ArrowUp className='h-4 w-4' />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</Card>
	);
};
