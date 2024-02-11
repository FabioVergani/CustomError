import CustomError from './CustomError.mjs';

describe('CustomError', () => {
	test('should create an instance with default values', () => {
		const e = new CustomError();
		expect(e.message).toBe('');
		expect(e.details).toBe(null);
		expect(e.name).toBe('CustomError');
		expect(e).toBeInstanceOf(CustomError);
	});
	test('should create an instance with message as string', () => {
		const e1 = new CustomError(1);
		expect(e1.message).toBe('1');
		expect(e1.details).toBe(null);
		const e2 = new CustomError(false);
		expect(e2.message).toBe('false');
		expect(e2.details).toBe(null);
		const e3 = new CustomError({ x: 1, y: 2 });
		expect(e3.message).toBe('[object Object]');
		expect(e3.details).toBe(null);
	});
	test('should create an instance with message and details', () => {
		const msg = 'An error occurred';
		const code = 500;
		const reason = 'Internal Server Error';
		const e = new CustomError(msg, { code, reason });
		expect(e.message).toBe(msg);
		expect(e.details.code).toBe(code);
		expect(e.details.reason).toBe(reason);
	});
	test('should create a subclass of CustomError with correct properties', () => {
		class AppError extends CustomError {}
		const msg = 'Lorem ipsum';
		const e = new AppError(msg);
		expect(typeof e).toBe('object');
		expect(e).toBeInstanceOf(CustomError);
		expect(e).toBeInstanceOf(AppError);
		expect(e.name).toBe('SubCustomError');
		expect(e.message).toBe(msg);
		expect(e.details).toBe(null);
	});
	test('should switch subcases based on error type', () => {
		const performOperation = value => {
			switch (value) {
				case 'ok':
					return 'success';
				case 'ko':
					throw new CustomError('Invalid', { value });
			}
		};
		let result = '';
		try {
			result = performOperation('ok');
		} catch (exception) {
			console.error(exception);
			// No error should be thrown
		}
		expect(result).toBe('success');
		try {
			result = performOperation('ko');
		} catch (exception) {
			result = 'fail';
			expect(exception).toBeInstanceOf(CustomError);
			expect(exception.message).toBe('Invalid');
			expect(exception.details.value).toBe('ko');
		}
		expect(result).toBe('fail');
	});
});
