/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';
import { type RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void): void => {
	useEffect(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const handleClickOutside = (event: MouseEvent): void => {
				if (ref.current && !ref.current.contains(event.target as Node)) {
					handler(event);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [ref, handler]);
};
