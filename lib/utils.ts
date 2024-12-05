import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getDomain(): string | undefined {
	if (process.env.NODE_ENV === 'production') {
		return process.env.NEXT_PUBLIC_ADMIN_URL;
	} else {
		return process.env.NEXT_PUBLIC_ADMIN_URL;
		// return 'http://localhost:3000';
	}
}
