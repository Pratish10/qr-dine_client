'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecoilValue } from 'recoil';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { Skeleton } from '@/components/ui/skeleton';

export const Categories = (): JSX.Element => {
	const categoryList = useRecoilValue(categories);
	const catStatus = useRecoilValue(categoryStatus);

	return (
		<Card className='dark:bg-gray-900'>
			<CardHeader>
				<CardTitle>Categories</CardTitle>
			</CardHeader>
			<CardContent>
				{catStatus === 'loading' && (
					<div className='flex space-x-4 justify-center flex-wrap'>
						{[...Array(6)].map((_, index) => (
							<Skeleton key={index} className='h-8 w-36 my-2' />
						))}
					</div>
				)}

				{catStatus === 'success' && categoryList.length > 0 && (
					<ul className='flex space-x-12 items-center justify-center'>
						{categoryList.map((category) => (
							<li key={category.id}>{category.category}</li>
						))}
					</ul>
				)}

				{catStatus === 'success' && categoryList.length === 0 && <p>No Categories available</p>}
			</CardContent>
		</Card>
	);
};
