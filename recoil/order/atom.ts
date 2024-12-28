import { type RequestStatus } from '@/types/api.types';
import { type Order } from '@/types/data.types';
import { atom } from 'recoil';

export const orderDetailStatus = atom<RequestStatus>({
	key: 'orderDetailStatus',
	default: 'idle',
});

export const order = atom<Order | null>({
	key: 'order',
	default: null,
});
