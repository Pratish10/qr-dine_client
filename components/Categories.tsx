'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { Skeleton } from '@/components/ui/skeleton';

export const Categories = (): React.JSX.Element => {
	const categoryList = useRecoilValue(categories);
	const catStatus = useRecoilValue(categoryStatus);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Categories</CardTitle>
			</CardHeader>
			<CardContent>
				{catStatus === 'loading' && (
					<div className='flex space-x-10 items-center justify-center'>
						<Skeleton className='h-8 w-36' />
						<Skeleton className='h-8 w-36' />
						<Skeleton className='h-8 w-36' />
						<Skeleton className='h-8 w-36' />
						<Skeleton className='h-8 w-36' />
						<Skeleton className='h-8 w-36' />
					</div>
				)}

				{categoryList.length > 0 ? (
					<ul className='flex space-x-10 items-center justify-center'>
						{categoryList.map((category) => (
							<li key={category.id}>{category.category}</li>
						))}
					</ul>
				) : (
					<p>No categories available</p>
				)}
			</CardContent>
		</Card>
	);
};
