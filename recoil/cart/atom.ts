import { atom } from 'recoil';
import { type Menu } from '@/types/data.types';

export interface CartType extends Menu {
	quantity: number;
}

export const cart = atom<CartType[]>({
	key: 'foodCart',
	default: [
		{
			id: 'cm2izzpgi0008gmo7djipoupe',
			menuId: 'M-5026',
			name: 'Fish Tacos',
			description: 'Grilled fish wrapped in soft tacos with salsa',
			type: 'nonVegeterian',
			image: ['https://files.edgestore.dev/w4r75mj80t32oql8/publicFiles/_public/02144587-52ef-4821-8ad5-e0b4513dab8e.jpg'],
			category: 'Main Course',
			amount: '349',
			createdAt: new Date(),
			updatedAt: new Date(),
			isFeatured: false,
			availability: 'Available',
			restaurantId: 'cm2dlk2jj0000c3qr6z3fwihs',
			ratings: [],
			quantity: 1,
		},
		{
			id: 'cm2j006ie0009gmo7e7mv99gr',
			menuId: 'M-3643',
			name: 'Gulab Jamun',
			description: 'Soft fried dough balls in sweet syrup',
			type: 'Vegeterian',
			image: ['https://files.edgestore.dev/w4r75mj80t32oql8/publicFiles/_public/dc07ead3-fa0b-4b48-a121-6b5c02536919.jpg'],
			category: 'Desserts',
			amount: '99',
			createdAt: new Date(),
			updatedAt: new Date(),
			isFeatured: false,
			availability: 'Available',
			restaurantId: 'cm2dlk2jj0000c3qr6z3fwihs',
			ratings: [
				{
					id: 'abe26a54-7f6e-433b-92a6-1050529dd727',
					value: 2,
					menuId: 'cm2j006ie0009gmo7e7mv99gr',
					createdAt: new Date(),
				},
			],
			quantity: 1,
		},
		{
			id: 'cm2j00yoh000agmo7da86gvek',
			menuId: 'M-6011',
			name: 'Paneer Butter Masala',
			description: 'Rich, creamy curry with paneer cubes',
			type: 'Vegeterian',
			image: ['https://files.edgestore.dev/w4r75mj80t32oql8/publicFiles/_public/17f91df6-c008-4915-9132-f5e1f8b58d1e.jpg'],
			category: 'Specials',
			amount: '399',
			createdAt: new Date(),
			updatedAt: new Date(),
			isFeatured: false,
			availability: 'Available',
			restaurantId: 'cm2dlk2jj0000c3qr6z3fwihs',
			ratings: [
				{
					id: '39b91f90-df6c-408a-b9a5-9786179f951e',
					value: 4,
					menuId: 'cm2j00yoh000agmo7da86gvek',
					createdAt: new Date(),
				},
			],
			quantity: 1,
		},
	],
});

export const notification = atom({
	key: 'cartNotification',
	default: false,
});
