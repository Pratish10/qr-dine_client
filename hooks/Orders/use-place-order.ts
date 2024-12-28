/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { getDomain } from '@/lib/utils';
import { order, orderDetailStatus } from '@/recoil/order/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type MutationResponse, type FormattedOrderData, type Order } from '@/types/data.types';
import { useMutation, type UseQueryResult, type UseMutationResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const usePlaceOrder = (): UseMutationResult<ServerActionReturnType<MutationResponse>, Error, FormattedOrderData, unknown> => {
	const domain = getDomain();

	const mutation = useMutation<ServerActionReturnType<MutationResponse>, Error, FormattedOrderData>({
		mutationFn: async (values: FormattedOrderData): Promise<ServerActionReturnType<MutationResponse>> => {
			const response = await axios.post(`${domain}/api/checkout`, values);
			return response.data;
		},
	});

	return mutation;
};

export const useGetOrder = (orderId: string): UseQueryResult<ServerActionReturnType<Order>, Error> => {
	const setStatus = useSetRecoilState(orderDetailStatus);
	const setOrder = useSetRecoilState(order);

	const url = getDomain();

	const query = useQuery({
		enabled: !!orderId,
		queryKey: ['order', { orderId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`${url}/api/orders/${orderId}`);
				const menuData: Order = response.data?.data;

				setOrder(menuData);

				setStatus('success');
				return response.data as ServerActionReturnType<Order>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
