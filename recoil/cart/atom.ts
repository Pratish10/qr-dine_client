import { atom } from 'recoil';
import { type Menu } from '@/types/data.types';

export interface CartType extends Menu {
	quantity: number;
	calculatedAmount: string;
}

export const cart = atom<CartType[]>({
	key: 'foodCart',
	default: [],
});

export const notification = atom({
	key: 'cartNotification',
	default: false,
});
