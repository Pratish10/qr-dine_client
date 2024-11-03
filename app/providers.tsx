'use client';
import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
	return (
		<RecoilRoot>
			<QueryProvider>
				<ThemeProvider attribute='class' defaultTheme='light'>
					{children}
				</ThemeProvider>
			</QueryProvider>
		</RecoilRoot>
	);
};
