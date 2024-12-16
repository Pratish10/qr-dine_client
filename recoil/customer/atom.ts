import { type Customer } from '@/types/data.types';
import { atom } from 'recoil';

export const customer = atom<Customer | null>({
	key: 'customer',
	default: null,
});
