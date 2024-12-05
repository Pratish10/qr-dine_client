import { CartDrawer } from '@/components/cart-drawer';
import { useEffect, useState } from 'react';

export const DrawerProvider = (): JSX.Element | null => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return <CartDrawer />;
};
