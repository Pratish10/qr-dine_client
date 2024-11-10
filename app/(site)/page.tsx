// import { Categories } from '@/components/Categories';
import { Menus } from '@/components/Menus';
import React from 'react';

const page = (): JSX.Element => {
	return (
		<div className='flex flex-col space-y-4'>
			{/* <Categories /> */}
			<Menus />
		</div>
	);
};

export default page;
