'use client';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
