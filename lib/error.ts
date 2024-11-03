import { ERROR_CODE, ERROR_NAME } from '@/config/error.config';

export interface ErrorResponseType {
	name: string;
	message: string;
	code: number;
	status: false;
	error?: unknown;
}

export class ErrorHandler extends Error {
	status: false;
	error?: unknown;
	code: number;

	constructor(message: string, code: keyof typeof ERROR_CODE, error?: unknown) {
		super(message);
		this.status = false;
		this.error = error;
		this.code = ERROR_CODE[code];
		this.name = ERROR_NAME[code];
	}
}
