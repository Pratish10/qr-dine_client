import { atom } from 'recoil';

export const restaurantId = atom<string>({
	key: 'restaurantId',
	default: '',
});
