import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDrawerController } from '@/hooks/use-drawer-controller';
import { type Menu } from '@/types/data.types';
import { ShoppingCart } from 'lucide-react';

interface PurchaseCardProps {
	menu: Menu;
}

export function PurchaseCard({ menu }: PurchaseCardProps): JSX.Element {
	const { onOpen } = useDrawerController();
	return (
		<Card className='p-6 space-y-6 sticky top-6'>
			<div className='space-y-2'>
				<p className='text-sm text-muted-foreground'>Price</p>
				<div className='flex items-baseline gap-1'>
					<span className='text-3xl font-bold'>₹{menu.amount}</span>
				</div>
			</div>

			{menu.availability === 'Available' && (
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Button
							className='w-full'
							size='lg'
							variant='green'
							onClick={() => {
								onOpen(menu);
							}}
						>
							<ShoppingCart className='w-4 h-4 mr-2' />
							Add to Cart
						</Button>
					</div>
				</div>
			)}

			{menu.availability !== 'Available' && <div className='text-destructive font-medium text-center'>Currently Unavailable</div>}
		</Card>
	);
}
