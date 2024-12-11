import { atom } from 'recoil';

export const tableId = atom<string | null>({
	key: 'tableId',
	default: null,
});
