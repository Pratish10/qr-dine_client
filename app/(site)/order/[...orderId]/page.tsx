'use client';
import NotFound from '@/app/not-found';
import { OrderReceipt } from '@/components/order-receipt';
import { OrderSkeleton } from '@/components/OrderSkeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import APP_PATHS from '@/config/path.config';
import { useGetOrder } from '@/hooks/Orders/use-place-order';
import { order, orderDetailStatus } from '@/recoil/order/atom';
import { useRecoilValue } from 'recoil';

interface OrderProps {
	params: { orderId: string };
}
const page = ({ params }: OrderProps): JSX.Element => {
	useGetOrder(params.orderId ?? '');
	const orderStatus = useRecoilValue(orderDetailStatus);
	const orderData = useRecoilValue(order);

	if (orderStatus === 'loading') {
		return (
			<div className='min-h-[calc(100vh-56px)] bg-green-50 dark:bg-green-950 flex items-center justify-center p-4'>
				<OrderSkeleton />;
			</div>
		);
	}

	if (orderData === null) {
		return <NotFound />;
	}

	return (
		<div className='min-h-[calc(100vh-56px)] bg-green-50 dark:bg-green-950 flex flex-col p-4'>
			<Breadcrumb className='mb-4 container'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href={APP_PATHS.HOME}>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{orderData.orderNumber}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='flex-1 flex items-center justify-center'>
				<OrderReceipt order={orderData} />
			</div>
		</div>
	);
};

export default page;
