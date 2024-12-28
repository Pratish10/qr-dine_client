/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useInitializeIds } from '@/hooks/useInitializeIds';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getDomain } from '@/lib/utils';

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
	const { isMissingParams, finalResId, finalTabId } = useInitializeIds();
	const [isTable, setIsTable] = useState(false);
	const [loading, setLoading] = useState(true);

	useGetCategories(finalResId ?? '');

	useEffect(() => {
		const fetchWithTabId = async (): Promise<void> => {
			if (finalTabId) {
				const url = getDomain();
				setLoading(true);
				try {
					const response = await fetch(`${url}/api/client/table/${finalTabId}`, {
						method: 'GET',
					});
					if (!response.ok) {
						throw new Error(`Error fetching data: ${response.statusText}`);
					}
					const data = await response.json();
					if (data?.status) {
						if (data?.data.tableStatus === 'Occupied') {
							toast.error('Table Occupied');
							setIsTable(false);
						} else {
							setIsTable(true);
						}
					}
				} catch (error) {
					toast.error('Failed to fetch table data');
				} finally {
					setLoading(false);
				}
			}
		};

		void fetchWithTabId();
	}, [finalTabId]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Loader2 className='h-8 w-8 animate-spin' />
			</div>
		);
	}

	return <div className='flex flex-col space-y-4'>{isMissingParams || !isTable ? <ScanQRPrompt /> : <Menus />}</div>;
};

export default page;
