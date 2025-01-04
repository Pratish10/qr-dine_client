'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type Order } from '@/types/data.types';

export function OrderReceipt({ order }: { order: Order }): JSX.Element {
	const formatDate = (dateString: Date): string => {
		return new Date(dateString).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const totalAmount = order.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='w-full max-w-md'>
			<Card className='overflow-hidden shadow-lg border-green-500 border-2'>
				<CardHeader className='bg-green-500 text-white p-6'>
					<div className='flex justify-between items-center'>
						<CardTitle className='text-2xl font-bold'>Order Receipt</CardTitle>
					</div>
				</CardHeader>
				<CardContent className='p-6 space-y-4 bg-white dark:bg-gray-800'>
					<div className='flex justify-between'>
						<span className='font-semibold text-green-700 dark:text-green-300'>Order Number:</span>
						<span>{order.orderNumber}</span>
					</div>
					<div className='flex justify-between'>
						<span className='font-semibold text-green-700 dark:text-green-300'>Date:</span>
						<span>{formatDate(order.orderDate)}</span>
					</div>
					{order.tableId != null && (
						<div className='flex justify-between'>
							<span className='font-semibold text-green-700 dark:text-green-300'>Table:</span>
							<span>{order.tableId}</span>
						</div>
					)}
					{order.customer != null && (
						<div className='flex justify-between'>
							<span className='font-semibold text-green-700 dark:text-green-300'>Customer:</span>
							<span>{order.customer.name}</span>
						</div>
					)}
					<Separator className='bg-green-200 dark:bg-green-700' />
					<div className='space-y-2'>
						{order.orderItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='flex justify-between items-center'
							>
								<span>
									{item.quantity}x {item.menuId}
								</span>
								<span>₹{item.totalPrice / 100}</span>
							</motion.div>
						))}
					</div>
					<Separator className='bg-green-200 dark:bg-green-700' />
					<div className='flex justify-between font-bold text-lg text-green-700 dark:text-green-300'>
						<span>Total:</span>
						<span>₹{totalAmount / 100}</span>
					</div>
					<div className='flex justify-between text-sm text-green-600 dark:text-green-400'>
						<span>Payment Status:</span>
						<span>{order.isPaid ? 'Paid' : 'Unpaid'}</span>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
