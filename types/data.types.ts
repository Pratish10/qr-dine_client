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
	averageRating: number | null;
}
export interface MenuSearch {
	id: string;
	menuId: string;
	name: string;
	type: 'Vegeterian' | 'nonVegeterian';
	image: string[];
	category: string;
	amount: string;
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

export interface Customer {
	name: string;
	email: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
