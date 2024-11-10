'use client';
import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categories } from '@/recoil/categories/atom';
import { CheckIcon } from 'lucide-react';
import { cn, getDomain } from '@/lib/utils';
import { menuList, menuStatus } from '@/recoil/menus/atom';
import { type Menu } from '@/types/data.types';
import { type ServerActionReturnType } from '@/types/api.types';
import { toast } from 'sonner';

export const Filters = (): React.JSX.Element => {
	const categoryList = useRecoilValue(categories);
	const [menStatus, setMenStatus] = useRecoilState(menuStatus);
	const setMenus = useSetRecoilState(menuList);

	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const url = getDomain();

	const handleSelect = (catValue: string): void => {
		setSelectedCategory((prevSelected) => {
			let updatedSelection: string[];

			if (prevSelected.includes(catValue)) {
				updatedSelection = prevSelected.filter((item) => item !== catValue);
			} else {
				updatedSelection = [...prevSelected, catValue];
			}
			return updatedSelection;
		});
	};

	const applyFilter = async (): Promise<void> => {
		setMenStatus('loading');
		const categoriesParam = selectedCategory.join(',');
		setIsPopoverOpen(false);

		try {
			const response = await fetch(`${url}/api/client/getMenusByCategories?id=${'cm2dlk2jj0000c3qr6z3fwihs'}&categories=${categoriesParam}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to apply filter');
			}

			const data: ServerActionReturnType<Menu[]> = await response.json();

			if (data.status) {
				setMenus(data.data ?? []);
			} else {
				throw new Error(data.message);
			}
			setMenStatus('success');
		} catch (error: unknown) {
			toast.error((error as Error).message);
			setMenStatus('error');
		}
	};

	return (
		<div>
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild disabled={menStatus === 'loading'}>
					<Button
						variant='outline'
						size='sm'
						className='h-8 border'
						onClick={() => {
							setIsPopoverOpen(!isPopoverOpen);
						}}
					>
						{selectedCategory.length > 0 && (
							<>
								<Badge variant='secondary' className='rounded-sm px-1 font-normal lg:hidden'>
									{selectedCategory.length}
								</Badge>
								<div className='hidden space-x-1 lg:flex'>
									{selectedCategory.length > 2 ? (
										<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
											{selectedCategory.length} selected
										</Badge>
									) : (
										categoryList
											.filter((cat) => selectedCategory.includes(cat.value))
											.map((cat) => (
												<Badge variant='secondary' key={cat.value} className='rounded-sm px-1 font-normal'>
													{cat.label}
												</Badge>
											))
									)}
								</div>
							</>
						)}
						Category
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0' align='start'>
					<Command>
						<CommandInput placeholder={'Category'} />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{selectedCategory.length > 0 && (
								<>
									<CommandSeparator />
									<CommandGroup>
										<CommandItem
											onSelect={() => {
												setSelectedCategory([]);
											}}
											className='justify-center text-center'
										>
											Clear filters
										</CommandItem>
									</CommandGroup>
								</>
							)}
							<CommandGroup>
								{categoryList.map((cat) => {
									const isSelected = selectedCategory.includes(cat.value);
									return (
										<CommandItem
											key={cat.id}
											onSelect={() => {
												handleSelect(cat.value);
											}}
										>
											<div
												className={cn(
													'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
													isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
												)}
											>
												<CheckIcon className={cn('h-4 w-4')} />
											</div>
											<span>{cat.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										void applyFilter();
									}}
									className='justify-center text-center cursor-pointer'
								>
									Apply
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
