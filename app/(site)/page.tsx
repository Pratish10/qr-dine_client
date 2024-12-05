import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const Menus = dynamic(async () => await import('@/components/Menus').then((mod) => mod.Menus), {
	ssr: false,
	loading: () => (
		<div className='flex items-center justify-center h-screen'>
			<Loader2 className='h-8 w-8 animate-spin' />
		</div>
	),
});

const page = (): JSX.Element => {
	return (
		<div className='flex flex-col space-y-4'>
			<Menus />
		</div>
	);
};

export default page;
