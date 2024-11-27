export interface Rating {
	id: string;
	menuId: string;
	value: number;
	createdAt: Date;
}

export interface Menu {
	id: string;
	menuId: string;
	name: string;
	description: string;
	type: 'Vegeterian' | 'nonVegeterian';
	image: string[];
	category: string;
	amount: string;
	createdAt: Date;
	updatedAt: Date;
	isFeatured: boolean;
	availability: 'Available' | 'notAvailable';
	restaurantId: string;
	ratings?: Rating[];
}

export interface CategoriesType {
	category: string;
	label: string;
	value: string;
	createdAt: Date;
	id: string;
	restaurantId: string;
	updatedAt: Date;
}
