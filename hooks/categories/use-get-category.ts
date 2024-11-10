/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { getDomain } from '@/lib/utils';
import { categories, categoryStatus } from '@/recoil/categories/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type CategoriesType } from '@/types/data.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetCategories = (restaurantId: string): UseQueryResult<ServerActionReturnType<CategoriesType[]>, Error> => {
	const setStatus = useSetRecoilState(categoryStatus);
	const setCategories = useSetRecoilState(categories);

	const url = getDomain();

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['categories', { restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`${url}/api/categories?id=${restaurantId}`);
				const categoryData: CategoriesType[] = response.data?.data;

				if (Array.isArray(categoryData)) {
					setCategories(categoryData.map((item) => ({ ...item, value: item.category, label: item.category })));
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<CategoriesType[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
