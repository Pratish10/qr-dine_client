import { getDomain } from '@/lib/utils';
import { type ServerActionReturnType } from '@/types/api.types';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface AddCustomerValues {
	email: string;
	ratings: Array<{ menuId: string; rating: number }>;
	name: string;
}

interface CustomerResponse {
	customer: { id: string; name: string; email: string };
	createdRatings: Array<{ menuId: string; value: number }>;
}

export const useAddCustomer = (): UseMutationResult<ServerActionReturnType<CustomerResponse>, Error, AddCustomerValues, unknown> => {
	const domain = getDomain();

	const mutation = useMutation<ServerActionReturnType<CustomerResponse>, Error, AddCustomerValues>({
		mutationFn: async (values: AddCustomerValues) => {
			const response = await axios.post(`${domain}/api/client/customers`, values, {
				withCredentials: true,
			});

			return response.data;
		},
	});

	return mutation;
};
