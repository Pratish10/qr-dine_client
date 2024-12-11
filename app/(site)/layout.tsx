'use client';
import { Navbar } from '@/components/navbar';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { DrawerProvider } from '../DrawerProvider';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { menu, menuDetailStatus } from '@/recoil/menus/atom';
import { Loader2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import APP_PATHS from '@/config/path.config';
import { useEffect } from 'react';
import { restaurantId } from '@/recoil/restaurant/atom';
import { tableId } from '@/recoil/table/atom';

const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element => {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const menDetailStatus = useRecoilValue(menuDetailStatus);
	const menuDetail = useRecoilValue(menu);
	const setRestaurantId = useSetRecoilState(restaurantId);
	const setTableId = useSetRecoilState(tableId);

	const resId = searchParams.get('resId');
	const tabId = searchParams.get('tableId');

	useEffect(() => {
		if (resId !== null) {
			setRestaurantId(resId);
		}
		if (tabId !== null) {
			setTableId(tabId);
		}
	}, [restaurantId, tabId]);

	const isPathWithId = /^\/[a-zA-Z0-9]+$/.test(pathName) && pathName !== '/cart';

	useGetCategories(resId ?? '');

	return (
		<div className='container'>
			<Navbar />
			<DrawerProvider />
			<div className='pt-14'>
				{isPathWithId && (
					<Breadcrumb className='dark:text-slate-100'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href={APP_PATHS.HOME}>Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href={`'/${menuDetail?.id}'`}>
									{menDetailStatus === 'loading' && <Loader2 className='h-4 w-4 animate-spin' />}
									{menDetailStatus === 'success' && menuDetail?.name}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				)}

				{children}
			</div>
		</div>
	);
};

export default HomeLayout;
