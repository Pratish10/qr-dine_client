'use client';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useInitializeIds } from '@/hooks/useInitializeIds';

const Menus = dynamic(async () => await import('@/components/Menus').then((mod) => mod.Menus), {
	ssr: false,
	loading: () => (
		<div className='flex items-center justify-center h-screen'>
			<Loader2 className='h-8 w-8 animate-spin' />
		</div>
	),
});
const ScanQRPrompt = dynamic(async () => await import('@/components/ScanQRPrompt').then((mod) => mod.ScanQRPrompt), {
	ssr: false,
	loading: () => (
		<div className='flex items-center justify-center h-screen'>
			<Loader2 className='h-8 w-8 animate-spin' />
		</div>
	),
});

const page = (): JSX.Element => {
	const { isMissingParams, finalResId } = useInitializeIds();

	useGetCategories(finalResId ?? '');

	return <div className='flex flex-col space-y-4'>{isMissingParams ? <ScanQRPrompt /> : <Menus />}</div>;
};

export default page;
