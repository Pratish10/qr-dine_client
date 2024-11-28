'use client';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { categories } from '@/recoil/categories/atom';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RATING_STAR, SORT_OPTIONS, TABS } from '@/config/filter.config';
import { Carrot, CheckCircle2, Drumstick, XCircle } from 'lucide-react';

interface FilterPropTypes {
	selectedCategory: string[];
	setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
	sortBy: string;
	setSortBy: React.Dispatch<React.SetStateAction<string>>;
	type: 'Vegeterian' | 'nonVegeterian' | 'Available' | 'notAvailable' | null;
	setType: React.Dispatch<React.SetStateAction<'Vegeterian' | 'nonVegeterian' | 'Available' | 'notAvailable' | null>>;
	rating: number[];
	setRating: React.Dispatch<React.SetStateAction<number[]>>;
}

export const Filters = ({
	setSelectedCategory,
	selectedCategory,
	sortBy,
	setSortBy,
	type,
	setType,
	rating,
	setRating,
}: FilterPropTypes): React.JSX.Element => {
	const categoryList = useRecoilValue(categories);
	const [activeTab, setActiveTab] = useState(TABS[0].value);

	const contentVariants = {
		inactive: { opacity: 0, y: 10 },
		active: { opacity: 1, y: 0 },
	};

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

	return (
		<div className='w-full max-w-md mx-auto p-4'>
			<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
				<TabsList className='grid w-full grid-cols-4 p-1 bg-muted rounded-full'>
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className={cn(
								'relative rounded-full transition-all',
								'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
								activeTab === tab.value && 'dark:bg-white dark:text-black text-white bg-black'
							)}
						>
							<motion.div
								initial='inactive'
								className={cn('relative z-10 text-black dark:text-white', activeTab === tab.value && 'text-white dark:text-black')}
							>
								{tab.label}
							</motion.div>
							{activeTab === tab.value && (
								<motion.div
									className='absolute inset-0 bg-primary rounded-full'
									layoutId='activeTab'
									transition={{ type: 'spring', stiffness: 500, damping: 30 }}
								/>
							)}
						</TabsTrigger>
					))}
				</TabsList>

				{TABS.map((tab) => (
					<TabsContent key={tab.value} value={tab.value} className='mt-4'>
						<motion.div
							variants={contentVariants}
							initial='inactive'
							animate={activeTab === tab.value ? 'active' : 'inactive'}
							transition={{ duration: 0.3 }}
						>
							{tab.value === 'sort' && (
								<RadioGroup value={sortBy} onValueChange={setSortBy} className='space-y-2'>
									{SORT_OPTIONS.map((option) => (
										<div key={option.value} className='flex items-center space-x-2'>
											<RadioGroupItem value={option.value} id={option.value} className='text-black dark:text-white' />
											<Label htmlFor={option.value} className='text-black dark:text-white'>
												{option.label}
											</Label>
										</div>
									))}
								</RadioGroup>
							)}
							{tab.value === 'category' && (
								<div className='space-y-3'>
									{categoryList.map((category) => (
										<div key={category.id} className='flex items-center space-x-2'>
											<Checkbox
												id={category.category}
												checked={selectedCategory.includes(category.category)}
												onCheckedChange={() => {
													handleSelect(category.category);
												}}
												className='text-black dark:text-white'
											/>
											<Label className='text-black dark:text-white' htmlFor={category.category}>
												{category.category}
											</Label>
										</div>
									))}
								</div>
							)}
							{tab.value === 'rating' && (
								<div className='space-y-4'>
									<Label htmlFor='rating-slider' className='text-black dark:text-white'>
										Minimum Rating
									</Label>
									<Slider
										id='rating-slider'
										min={1}
										max={5}
										step={1}
										value={rating}
										onValueChange={setRating}
										className='w-full text-black'
									/>
									<div className='flex justify-between text-xs'>
										{RATING_STAR.map((value) => (
											<span key={value} className='text-black dark:text-white'>
												{value}
											</span>
										))}
									</div>
								</div>
							)}
							{tab.value === 'type' && (
								<div className='space-y-4'>
									<div className='flex items-center space-x-2'>
										<Checkbox
											className='text-black dark:text-white'
											checked={type === 'Vegeterian'}
											onCheckedChange={() => {
												setType((prev) => (prev === 'Vegeterian' ? null : 'Vegeterian'));
											}}
										/>
										<Label className='flex items-center text-black dark:text-white'>
											<Carrot className='mr-2 text-green-400' size={15} />
											Veg
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<Checkbox
											className='text-black dark:text-white'
											checked={type === 'nonVegeterian'}
											onCheckedChange={() => {
												setType((prev) => (prev === 'nonVegeterian' ? null : 'nonVegeterian'));
											}}
										/>
										<Label className='flex items-center text-black dark:text-white'>
											<Drumstick className='mr-2 text-red-400' size={15} />
											Non Veg
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<Checkbox
											className='text-black dark:text-white'
											checked={type === 'Available'}
											onCheckedChange={() => {
												setType((prev) => (prev === 'Available' ? null : 'Available'));
											}}
										/>
										<Label className='flex items-center text-black dark:text-white'>
											<CheckCircle2 className='mr-2 text-green-400' size={15} />
											Available
										</Label>
									</div>
									<div className='flex items-center space-x-2'>
										<Checkbox
											className='text-black dark:text-white'
											checked={type === 'notAvailable'}
											onCheckedChange={() => {
												setType((prev) => (prev === 'notAvailable' ? null : 'notAvailable'));
											}}
										/>
										<Label className='flex items-center text-black dark:text-white'>
											<XCircle className='mr-2 text-red-400' size={15} />
											Not Available
										</Label>
									</div>
								</div>
							)}
						</motion.div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};
