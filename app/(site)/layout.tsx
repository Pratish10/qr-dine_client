/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { Navbar } from '@/components/navbar';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { DrawerProvider } from '../DrawerProvider';
import { ScanQRPrompt } from '@/components/ScanQRPrompt';
import { restaurantId } from '@/recoil/restaurant/atom';
import { tableId } from '@/recoil/table/atom';
import { CustomBreadCrumb } from '@/components/CustomBreadCrumb';
import clsx from 'clsx';

const HomeLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const setRestaurantId = useSetRecoilState(restaurantId);
	const setTableId = useSetRecoilState(tableId);

	const resId = searchParams.get('resId');
	const tabId = searchParams.get('tableId');

	useEffect(() => {
		if (resId) setRestaurantId(resId);
		if (tabId) setTableId(tabId);
	}, [resId, tabId, setRestaurantId, setTableId]);

	const isMissingParams = resId == null || tabId == null;

	useGetCategories(resId ?? '');

	const shouldShowBreadcrumb = /^\/[a-zA-Z0-9]+$/.test(pathName) && pathName !== '/cart';

	return (
		<div className={clsx(!isMissingParams && 'container')}>
			<Navbar />
			<DrawerProvider />
			<main className='pt-14'>
				{isMissingParams ? (
					<ScanQRPrompt />
				) : (
					<>
						{shouldShowBreadcrumb && <CustomBreadCrumb />}
						{children}
					</>
				)}
			</main>
		</div>
	);
};

export default HomeLayout;
