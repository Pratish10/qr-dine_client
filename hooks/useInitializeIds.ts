/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { restaurantId } from '@/recoil/restaurant/atom';
import { tableId } from '@/recoil/table/atom';

export const useInitializeIds = (): { isMissingParams: boolean; finalResId: string | null; finalTabId: string | null } => {
	const searchParams = useSearchParams();
	const setRestaurantId = useSetRecoilState(restaurantId);
	const setTableId = useSetRecoilState(tableId);

	const resId = searchParams.get('resId');
	const tabId = searchParams.get('tableId');

	const storedResId = Cookies.get('resId') ?? null;
	const storedTabId = Cookies.get('tabId') ?? null;

	useEffect(() => {
		if (resId) {
			setRestaurantId(resId);
			Cookies.set('resId', resId, { expires: 3 / 24 });
		} else if (storedResId) {
			setRestaurantId(storedResId);
		}

		if (tabId) {
			setTableId(tabId);
			Cookies.set('tabId', tabId, { expires: 3 / 24 });
		} else if (storedTabId) {
			setTableId(storedTabId);
		}
	}, [resId, tabId, setRestaurantId, setTableId, storedResId, storedTabId]);

	const finalResId = resId ?? storedResId;
	const finalTabId = tabId ?? storedTabId;

	const isMissingParams = !finalResId || !finalTabId;

	return { isMissingParams, finalResId, finalTabId };
};
