import { type Menu } from '@/types/data.types';
import { create } from 'zustand';

interface DraweerControllerType<T = unknown> {
	data?: T;
	isOpen: boolean;
	onOpen: (data: T) => void;
	onClose: () => void;
}

export const useDrawerController = create<DraweerControllerType<Menu | undefined>>((set) => ({
	data: undefined,
	isOpen: false,
	onOpen(data) {
		set({ isOpen: true, data });
	},
	onClose() {
		set({ isOpen: false, data: undefined });
	},
}));
