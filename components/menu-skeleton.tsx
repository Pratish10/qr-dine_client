import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const MenuSkeleton = (): JSX.Element => (
	<div className='container mx-auto max-w-5xl px-4 py-8'>
		<div className='flex flex-col lg:flex-row gap-8'>
			<div className='w-full lg:w-1/2'>
				<div className='sticky top-4'>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-2 space-y-4'>
							<div className='border-2 rounded cursor-pointer transition-all'>
								<Skeleton className='aspect-square object-cover rounded' />
							</div>
						</div>
						<div className='col-span-10'>
							<div className='aspect-[4/3] relative rounded-lg overflow-hidden bg-secondary/10'>
								<Skeleton className='object-contain w-full h-full' />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full lg:w-1/2 space-y-8'>
				<div className='space-y-6'>
					<div>
						<Skeleton className='h-8 w-3/4 sm:w-2/3 md:w-1/2' />
						<Skeleton className='h-4 w-1/2 sm:w-1/3 md:w-1/4 mt-2' />
					</div>

					<div className='flex items-center gap-2'>
						<Skeleton className='h-6 w-24 rounded-full' />
					</div>

					<Separator />

					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						{[...Array(3)].map((_, index) => (
							<div key={index} className='space-y-2'>
								<Skeleton className='h-4 w-full rounded-full' />
								<Skeleton className='h-4 w-3/4 rounded-full' />
							</div>
						))}
					</div>
				</div>

				<div className='space-y-6'>
					<Skeleton className='h-10 w-full rounded-lg' />
					<Separator className='my-6' />
					<div className='space-y-4'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-5/6' />
						<Skeleton className='h-4 w-4/5' />
					</div>
				</div>

				<div className='lg:sticky lg:top-4'>
					<Card className='p-6 space-y-6'>
						<div className='space-y-2'>
							<Skeleton className='h-4 w-1/3' />
							<Skeleton className='h-8 w-1/2' />
						</div>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-4 w-2/3 mx-auto' />
					</Card>
				</div>
			</div>
		</div>
	</div>
);
