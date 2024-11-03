import { type RequestStatus } from '@/types/api.types';
import { type Menu } from '@/types/data.types';
import { atom } from 'recoil';

const defaultMenu: Menu = {
	id: '',
	menuId: '',
	name: '',
	description: '',
	type: 'Vegeterian',
	image: [],
	category: '',
	amount: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	isFeatured: false,
	availability: 'Available',
	restaurantId: '',
};
export const menuList = atom<Menu[]>({
	key: 'menuList',
	default: [defaultMenu],
});

export const menuStatus = atom<RequestStatus>({
	key: 'menuStatus',
	default: 'idle',
});
