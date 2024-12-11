import { useRecoilValue } from 'recoil';
import { menu, menuDetailStatus } from '@/recoil/menus/atom';
import { Loader2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import APP_PATHS from '@/config/path.config';

export const CustomBreadCrumb = (): JSX.Element => {
	const menDetailStatus = useRecoilValue(menuDetailStatus);
	const menuDetail = useRecoilValue(menu);

	return (
		<Breadcrumb className='dark:text-slate-100'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={APP_PATHS.HOME}>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href={`/${menuDetail?.id}`}>
						{menDetailStatus === 'loading' && <Loader2 className='h-4 w-4 animate-spin' />}
						{menDetailStatus === 'success' && menuDetail?.name}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};
