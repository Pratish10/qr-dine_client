/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { type ServerActionReturnType } from '@/types/api.types';
import { ErrorHandler } from '@/lib/error';
import { type InfiniteData, useInfiniteQuery, type UseInfiniteQueryResult, useQuery, type UseQueryResult } from '@tanstack/react-query';
import { menu, menuDetailStatus, menuList, menuStatus } from '@/recoil/menus/atom';
import { getDomain } from '@/lib/utils';
import { type Menu } from '@/types/data.types';

export const useGetMenus = (
	restaurantId: string,
	filters: {
		type?: string;
		availability?: string;
		category?: string;
		rating?: number;
		amountSort?: string;
	}
): UseInfiniteQueryResult<
	InfiniteData<
		{
			data: ServerActionReturnType<Menu[]>;
			nextPage: any;
		},
		unknown
	>,
	Error
> => {
	const setStatus = useSetRecoilState(menuStatus);
	const setMenuList = useSetRecoilState(menuList) ?? [];

	const url = getDomain();

	const query = useInfiniteQuery({
		enabled: !!restaurantId,
		queryKey: ['menus', { restaurantId, ...filters }],
		queryFn: async ({ pageParam = 1 }) => {
			setStatus('loading');

			try {
				const params = new URLSearchParams({
					id: restaurantId,
					page: pageParam.toString(),
					limit: '8',
					...(filters.type ? { type: filters.type } : {}),
					...(filters.availability ? { availability: filters.availability } : {}),
					...(filters.category ? { category: filters.category } : {}),
					...(filters.rating ? { rating: filters.rating.toString() } : {}),
					...(filters.amountSort ? { amountSort: filters.amountSort.toString() } : {}),
				});

				const response = await axios.get(`${url}/api/client/menus?${params.toString()}`);
				const menuData: Menu[] = response.data?.data;

				if (Array.isArray(menuData)) {
					setMenuList((prev) => [...(prev ?? []), ...menuData]);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return {
					data: response.data as ServerActionReturnType<Menu[]>,
					nextPage: menuData.length === 8 ? pageParam + 1 : undefined,
				};
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
		getNextPageParam: (lastPage, allPages) => {
			let nextPage;
			if (lastPage.data.status) {
				const menuData: Menu[] | undefined = lastPage.data?.data;

				if (Array.isArray(menuData)) {
					nextPage = menuData.length > 0 ? allPages.length + 1 : undefined;
				}
			}
			return nextPage;
		},

		initialPageParam: 1,
	});

	return query;
};

export const useGetMenu = (menuId: string): UseQueryResult<ServerActionReturnType<Menu>, Error> => {
	const setStatus = useSetRecoilState(menuDetailStatus);
	const setMenu = useSetRecoilState(menu);

	const url = getDomain();

	const query = useQuery({
		enabled: !!menuId,
		queryKey: ['menu', { menuId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`${url}/api/menu/${menuId}`);
				const menuData: Menu = response.data?.data;

				setMenu(menuData);

				setStatus('success');
				return response.data as ServerActionReturnType<Menu>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
	});

	return query;
};
