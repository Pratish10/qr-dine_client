import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { getDomain } from '@/lib/utils';
import { type MenuSearch } from '@/types/data.types';
import { useDebounce } from '@/hooks/useDebounce';
import clsx from 'clsx';
import { SearchResults } from './search-results';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useInputFocus } from '@/hooks/useInputFocus';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { restaurantId } from '@/recoil/restaurant/atom';
import { tableId } from '@/recoil/table/atom';

export const SearchInput = (): JSX.Element => {
	const [state, setState] = useState({
		open: false,
		searchTerm: '',
		isInputFocused: false,
		loading: false,
		selectedIndex: -1,
		searchedMenus: null as MenuSearch[] | null,
	});

	const ref = useRef<HTMLInputElement | null>(null);
	const searchResultsRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const resId = useRecoilValue(restaurantId);
	const tabId = useRecoilValue(tableId);

	const isMissingParams = resId == null || tabId == null;

	const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

	useClickOutside(searchResultsRef, () => {
		setState((prev) => ({ ...prev, isInputFocused: false }));
	});

	const focusHandler = useCallback((event: KeyboardEvent) => {
		if (event.ctrlKey && event.key.toLowerCase() === '/') {
			event.preventDefault();
			ref.current?.focus();
		}
	}, []);

	useInputFocus(focusHandler);

	const fetchData = useCallback(
		async (query: string) => {
			setState((prev) => ({ ...prev, loading: true }));

			const domain = getDomain();

			try {
				const response = await axios.get(`${domain}/api/client/menus/search?search=${query}&resId=${resId}`);
				const data = response.data?.data;
				setState((prev) => ({ ...prev, searchedMenus: data, loading: false }));
			} catch (error) {
				toast.error('Something went wrong while searching for menus');
				setState((prev) => ({
					...prev,
					searchTerm: '',
					loading: false,
				}));
			}
		},
		[resId, tabId]
	);

	useEffect(() => {
		if (debouncedSearchTerm.trim().length > 2) {
			void fetchData(debouncedSearchTerm);
		} else {
			setState((prev) => ({ ...prev, searchedMenus: null }));
		}
	}, [debouncedSearchTerm, fetchData]);

	const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, searchTerm: event.target.value }));
	}, []);

	const handleCardClick = useCallback(
		(id: string) => {
			router.push(`/${id}`);
			setState((prev) => ({ ...prev, isInputFocused: false, searchTerm: '', searchedMenus: null }));
		},
		[router]
	);

	return (
		<div className='relative mx-auto flex w-full items-center' ref={searchResultsRef}>
			<SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400' />
			<Input
				type='search'
				placeholder='Search Menus, Categories, or Amounts'
				className={clsx(
					'rounded-lg border-gray-200 bg-white pl-10 pr-12',
					'dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-green-700',
					'focus:bg-gray-100 border focus-visible:ring-green-200'
				)}
				value={state.searchTerm}
				onChange={handleInputChange}
				aria-label='Search'
				onFocus={() => {
					setState((prev) => ({ ...prev, isInputFocused: true }));
				}}
				title='Search Menus, Categories, or Amounts'
				ref={ref}
				disabled={isMissingParams}
			/>
			{state.searchTerm.length === 0 && (
				<code
					className={clsx(
						'pointer-events-none absolute right-3 top-2.5 inline-flex h-5 select-none items-center gap-1',
						'rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100',
						'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hidden lg:block'
					)}
				>
					<span className='text-xs'>Ctrl + /</span>
				</code>
			)}
			<SearchResults
				isVisible={state.isInputFocused}
				loading={state.loading}
				searchedMenus={state.searchedMenus}
				searchTerm={state.searchTerm}
				onCardClick={handleCardClick}
				restaurantId={resId}
			/>
		</div>
	);
};
