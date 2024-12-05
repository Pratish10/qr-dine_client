/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { useEffect, type RefObject } from 'react';

export const useScrollToTop = (ref: RefObject<HTMLElement>, handler: (event: Event) => void): void => {
	useEffect(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const scrollContainer = ref.current;

			if (!scrollContainer) return;

			const handleScroll = (event: Event): void => {
				handler(event);
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, [ref, handler]);
};
