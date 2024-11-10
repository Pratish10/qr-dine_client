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
