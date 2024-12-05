'use client';
import { useEffect } from 'react';

export const useInputFocus = (handler: (event: KeyboardEvent) => void): void => {
	useEffect(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			const handleKeyDown = (event: KeyboardEvent): void => {
				handler(event);
			};

			document.addEventListener('keydown', handleKeyDown);

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [handler]);
};
