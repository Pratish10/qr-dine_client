/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { getDomain } from '@/lib/utils';
import { menu, menuDetailStatus, menuList, menuStatus } from '@/recoil/menus/atom';
import { type ServerActionReturnType } from '@/types/api.types';
import { type Menu } from '@/types/data.types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export const useGetMenus = (restaurantId: string): UseQueryResult<ServerActionReturnType<Menu[]>, Error> => {
	const setStatus = useSetRecoilState(menuStatus);
	const setMenuList = useSetRecoilState(menuList);

	const url = getDomain();

	const query = useQuery({
		enabled: !!restaurantId,
		queryKey: ['menus', { restaurantId }],
		queryFn: async () => {
			setStatus('loading');
			try {
				const response = await axios.get(`${url}/api/client/menus?id=${restaurantId}`);
				const menuData: Menu[] = response.data?.data;

				if (Array.isArray(menuData)) {
					setMenuList(menuData);
				} else {
					throw new Error('Data format is incorrect');
				}

				setStatus('success');
				return response.data as ServerActionReturnType<Menu[]>;
			} catch (error: any) {
				setStatus('error');
				throw new ErrorHandler(error.message as string, 'BAD_REQUEST');
			}
		},
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
