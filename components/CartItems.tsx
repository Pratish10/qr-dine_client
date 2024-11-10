import { type CartType } from '@/recoil/cart/atom';
import React from 'react';

export const CartItems = ({ cartItem }: { cartItem: CartType }): React.JSX.Element => {
	return <div>{JSON.stringify(cartItem)}</div>;
};
