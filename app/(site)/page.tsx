import { Menus } from '@/components/Menus';
import React from 'react';

const page = (): JSX.Element => {
	return (
		<div className='flex flex-col space-y-4'>
			<Menus />
		</div>
	);
};

export default page;
