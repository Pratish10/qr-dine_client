'use client';
import { Navbar } from '@/components/navbar';
import { useGetCategories } from '@/hooks/categories/use-get-category';
import React from 'react';

const HomeLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.JSX.Element => {
	useGetCategories('cm2dlk2jj0000c3qr6z3fwihs');

	return (
		<div className='container'>
			<Navbar />
			<div className='pt-14'>{children}</div>
		</div>
	);
};

export default HomeLayout;
