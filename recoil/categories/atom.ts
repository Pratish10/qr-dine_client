import { type RequestStatus } from '@/types/api.types';
import { type CategoriesType } from '@/types/data.types';
import { atom } from 'recoil';

export const defaultCategory: CategoriesType = {
	category: '',
	createdAt: new Date(),
	id: '',
	restaurantId: '',
	updatedAt: new Date(),
};

export const categories = atom<CategoriesType[]>({
	key: 'categories',
	default: [defaultCategory],
});

export const categoryStatus = atom<RequestStatus>({
	key: 'categoryStatus',
	default: 'idle',
});
