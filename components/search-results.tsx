'use client';
import { type MenuSearch } from '@/types/data.types';
import { Skeleton } from './ui/skeleton';
import clsx from 'clsx';
import { MenuSearchInfo } from './MenuSearchInfo';
import { MenuSearchCard } from './MenuSearchCard';

interface SearchedResultsProps {
	loading: boolean;
	isVisible: boolean;
	searchedMenus: MenuSearch[] | null;
	searchTerm: string;
	restaurantId: string | null;
	onCardClick: (id: string) => void;
}

export const SearchResults = ({
	loading,
	searchedMenus,
	isVisible,
	searchTerm,
	onCardClick,
	restaurantId,
}: SearchedResultsProps): JSX.Element | null => {
	if (!isVisible) return null;

	const renderSearchResults = (): JSX.Element | undefined => {
		if (restaurantId == null) {
			return <MenuSearchInfo text='Scan the QR Code again' />;
		}
		if (searchTerm.length < 3) {
			return <MenuSearchInfo text='Please enter at least 3 characters to search' />;
		}
		if (loading) {
			return (
				<div className='flex flex-col gap-4'>
					{[...Array(5)].map((_, index) => (
						<div className='flex items-center gap-1' key={index}>
							<Skeleton className='h-16 w-full rounded' />
						</div>
					))}
				</div>
			);
		}
		if (searchedMenus == null || searchedMenus.length === 0) {
			return <MenuSearchInfo text='No Data Found' />;
		}
		return (
			<div className='flex flex-col gap-2'>
				{searchedMenus.map((menu) => (
					<div
						key={menu.id}
						onClick={() => {
							onCardClick(menu.id);
						}}
					>
						<MenuSearchCard menu={menu} />
					</div>
				))}
			</div>
		);
	};

	return (
		<div
			className={clsx(
				'absolute top-12 z-30 w-full max-h-[43vh] overflow-y-scroll rounded-lg bg-white p-1 dark:bg-black',
				'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900'
			)}
		>
			{renderSearchResults()}
		</div>
	);
};
