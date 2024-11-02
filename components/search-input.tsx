import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

export const SearchInput = (): React.JSX.Element => {
	return (
		<div className={`relative mx-auto flex w-full items-center `}>
			<SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400' />
			<Input
				type='search'
				placeholder='Search Anything'
				className='rounded-lg border-gray-200 bg-white pl-10 pr-12 focus-visible:ring-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-gray-700'
				//   value={state.searchTerm}
				//   onChange={handleInputChange}
				//   onFocus={() =>
				//     setState((prev) => ({ ...prev, isInputFocused: true }))
				//   }
				aria-label='Search'
			/>
			{/* {state.searchTerm.length === 0 &&
          !isMobile &&
          (icon !== '⌘' ? (
            <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:block">
              <span className="text-xs">{icon}</span>K
            </kbd>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <span className="text-lg">{icon}</span>K
            </kbd>
          ))} */}

			{/* <SearchResults
          isVisible={
            (state.isInputFocused || isMobile) && state.searchTerm.length > 0
          }
          isMobile={isMobile}
          searchTerm={state.searchTerm}
          loading={state.loading}
          searchedVideos={state.searchedVideos}
          selectedIndex={state.selectedIndex}
          onCardClick={handleCardClick}
        /> */}
		</div>
	);
};
