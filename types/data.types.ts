export interface Menu {
	id: string;
	menuId: string;
	name: string;
	description: string;
	type: 'Vegeterian' | 'Non-Vegetarian';
	image: string[];
	category: string;
	amount: string;
	createdAt: Date;
	updatedAt: Date;
	isFeatured: boolean;
	availability: 'Available' | 'notAvailable';
	restaurantId: string;
}

export interface CategoriesType {
	category: string;
	createdAt: Date;
	id: string;
	restaurantId: string;
	updatedAt: Date;
}
