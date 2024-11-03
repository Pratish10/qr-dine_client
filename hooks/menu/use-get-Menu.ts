/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ErrorHandler } from '@/lib/error';
import { getDomain } from '@/lib/utils';
import { menuList, menuStatus } from '@/recoil/menus/atom';
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
				const response = await axios.get(`${url}/api/menu?id=${restaurantId}`);
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
