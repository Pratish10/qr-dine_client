'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderSkeleton(): JSX.Element {
	return (
		<div className='w-full max-w-md'>
			<Card className='overflow-hidden shadow-lg border-green-500 border-2'>
				<CardHeader className='bg-green-500 p-6'>
					<div className='flex justify-between items-center'>
						<Skeleton className='h-8 w-40 bg-green-400' />
						<Skeleton className='h-8 w-8 rounded-full bg-green-400' />
					</div>
				</CardHeader>
				<CardContent className='p-6 space-y-4 bg-white dark:bg-gray-800'>
					{[...Array(4)].map((_, index) => (
						<div key={index} className='flex justify-between items-center'>
							<Skeleton className='h-4 w-24 bg-green-200 dark:bg-green-700' />
							<Skeleton className='h-4 w-32 bg-green-200 dark:bg-green-700' />
						</div>
					))}
					<Skeleton className='h-px w-full bg-green-200 dark:bg-green-700' />
					<div className='space-y-2'>
						{[...Array(3)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='flex justify-between items-center'
							>
								<Skeleton className='h-4 w-40 bg-green-200 dark:bg-green-700' />
								<Skeleton className='h-4 w-16 bg-green-200 dark:bg-green-700' />
							</motion.div>
						))}
					</div>
					<Skeleton className='h-px w-full bg-green-200 dark:bg-green-700' />
					<div className='flex justify-between items-center'>
						<Skeleton className='h-6 w-20 bg-green-300 dark:bg-green-600' />
						<Skeleton className='h-6 w-24 bg-green-300 dark:bg-green-600' />
					</div>
					<div className='flex justify-between items-center'>
						<Skeleton className='h-4 w-28 bg-green-200 dark:bg-green-700' />
						<Skeleton className='h-4 w-16 bg-green-200 dark:bg-green-700' />
					</div>
				</CardContent>
				<CardFooter className='bg-green-100 dark:bg-green-900 p-6'>
					<Skeleton className='h-10 w-full bg-green-300 dark:bg-green-700' />
				</CardFooter>
			</Card>
		</div>
	);
}
