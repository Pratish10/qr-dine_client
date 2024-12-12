/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { DrawerProvider } from '../DrawerProvider';
import { CustomBreadCrumb } from '@/components/CustomBreadCrumb';
import clsx from 'clsx';
import { useInitializeIds } from '@/hooks/useInitializeIds';

const HomeLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const pathName = usePathname();
	const { isMissingParams } = useInitializeIds();

	const shouldShowBreadcrumb = /^\/[a-zA-Z0-9]+$/.test(pathName) && pathName !== '/cart';

	return (
		<div className={clsx(isMissingParams && 'container')}>
			<Navbar />
			<DrawerProvider />
			<main className='pt-14'>
				{shouldShowBreadcrumb && <CustomBreadCrumb />}
				{children}
			</main>
		</div>
	);
};

export default HomeLayout;
