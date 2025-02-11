import { Badge } from '@/components/ui/badge';
import { Clock, UtensilsCrossed, Star, Carrot, Drumstick } from 'lucide-react';
import { Separator } from '../ui/separator';

interface MenuInfoProps {
	name: string;
	category: string;
	type: string;
	availability: string;
	averageRating: number;
	menuId: string;
}

export function MenuInfo({ name, category, type, availability, averageRating, menuId }: MenuInfoProps): JSX.Element {
	return (
		<div className='space-y-4'>
			<div>
				<h1 className='text-2xl font-bold dark:text-slate-300'>{name}</h1>
				<p className='text-sm text-muted-foreground dark:text-slate-300'>Item #{menuId}</p>
			</div>

			<div className='flex items-center gap-2'>
				<div className='flex items-center gap-2'>
					<Badge variant='secondary' className='flex items-center gap-1 dark:text-slate-300'>
						<Star className='w-4 h-4 fill-current' />
						<span>{averageRating.toFixed(1)}</span>
					</Badge>
				</div>
			</div>

			<Separator />

			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<p className='text-sm font-medium'>Category</p>
					<Badge variant='outline' className='text-xs dark:text-slate-300'>
						{category}
					</Badge>
				</div>

				<div className='space-y-2 dark:text-slate-300'>
					<p className='text-sm font-medium'>Type</p>
					<Badge variant='outline' className='text-xs flex items-center gap-1 '>
						{type === 'Vegeterian' ? <Carrot size={15} /> : <Drumstick size={15} />}
						{type === 'Vegeterian' ? 'Vegeterian' : 'Non Veg'}
					</Badge>
				</div>

				<div className='space-y-2 dark:text-slate-300'>
					<p className='text-sm font-medium'>Availability</p>
					<Badge variant={availability === 'Available' ? 'default' : 'secondary'} className='text-sm flex items-center gap-1'>
						{availability === 'Available' ? <Clock className='w-3 h-3' /> : <UtensilsCrossed className='w-3 h-3' />}
						{availability === 'Available' ? 'Available' : 'Not Available'}
					</Badge>
				</div>
			</div>
		</div>
	);
}
