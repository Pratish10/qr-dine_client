import { type RequestStatus } from '@/types/api.types';
import { type Menu } from '@/types/data.types';
import { atom } from 'recoil';

// const defaultMenu: Menu = {
// 	id: '',
// 	menuId: '',
// 	name: '',
// 	description: '',
// 	type: 'Vegeterian',
// 	image: [],
// 	category: '',
// 	amount: '',
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	isFeatured: false,
// 	availability: 'Available',
// 	restaurantId: '',
// 	ratings: [],
// 	averageRating: null,
// };
export const menuList = atom<Menu[] | null>({
	key: 'menuList',
	default: null,
});
export const filteredMenu = atom<Menu[] | null>({
	key: 'filteredMenu',
	default: null,
});

export const menuStatus = atom<RequestStatus>({
	key: 'menuStatus',
	default: 'idle',
});

export const menuDetailStatus = atom<RequestStatus>({
	key: 'menuDetailStatus',
	default: 'idle',
});

export const menu = atom<Menu | null>({
	key: 'menu',
	default: null,
});
export const filters = atom<any>({
	key: 'filters',
	default: {},
});
