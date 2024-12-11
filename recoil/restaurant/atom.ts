import { atom } from 'recoil';

export const restaurantId = atom<string | null>({
	key: 'restaurantId',
	default: null,
});
