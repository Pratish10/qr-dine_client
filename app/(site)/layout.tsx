'use client';
import { Navbar } from '@/components/navbar';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import { DrawerProvider } from '../DrawerProivder';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { menu, menuDetailStatus } from '@/recoil/menus/atom';
import { Loader2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import APP_PATHS from '@/config/path.config';

const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element => {
	const pathName = usePathname();
	const menDetailStatus = useRecoilValue(menuDetailStatus);
	const menuDetail = useRecoilValue(menu);

	const isPathWithId = /^\/[a-zA-Z0-9]+$/.test(pathName);

	useGetCategories('cm2dlk2jj0000c3qr6z3fwihs');

	return (
		<div className='container'>
			<Navbar />
			<DrawerProvider />
			<div className='pt-14'>
				{isPathWithId && (
					<Breadcrumb>
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
