const { Error } = globalThis;

/**
 * CustomError class with optional details.
 * @extends Error
 */
export default class CustomError extends Error {
	constructor(message, details) {
		super(message);
		this.details = details || null;
	}
	get name() {
		return this.constructor.name;
	}
}
