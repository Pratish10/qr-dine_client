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

export interface FormattedOrderData {
	customer: {
		id: string;
		name: string;
		email: string;
	};
	cartItems: Array<{
		id: string;
		name: string;
		menuId: string;
		quantity: number;
		calculatedAmount: string;
	}>;
	restaurantId: string | undefined;
	tableId: string | undefined;
}

export interface MutationResponse {
	url?: string;
}

export interface Order {
	id: string;
	restaurantId: string;
	isPaid: boolean;
	orderNumber: string;
	orderDate: Date;
	updatedAt: Date;
	tableId?: string | null;
	customerId?: string | null;
	customer?: Customer | null;
	orderItems: OrderItem[];
}

export interface OrderItem {
	id: string;
	orderId: string;
	menuId: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	order: Order;
}
