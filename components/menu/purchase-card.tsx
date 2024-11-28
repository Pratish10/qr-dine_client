import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface PurchaseCardProps {
	price: string;
	availability: string;
	// onAddToCart: () => void;
}

export function PurchaseCard({ price, availability }: PurchaseCardProps): JSX.Element {
	return (
		<Card className='p-6 space-y-6 sticky top-6'>
			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Price</p>
				<div className='flex items-baseline gap-1'>
					<span className='text-3xl font-bold'>₹{price}</span>
				</div>
			</div>

			{availability === 'Available' && (
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Button
							className='w-full'
							size='lg'
							variant='green'
							// onClick={() => {
							// 	onAddToCart();
							// }}
						>
							<ShoppingCart className='w-4 h-4 mr-2' />
							Add to Cart
						</Button>
					</div>
				</div>
			)}

			{availability !== 'Available' && <div className='text-destructive font-medium text-center'>Currently Unavailable</div>}
		</Card>
	);
}
