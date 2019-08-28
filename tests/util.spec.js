import util from '../src/js/util';

describe('util', () => {
	test('isString returns true when passed a string', () => {
		expect(util.isString('')).toBe(true);
	});

	test('isString returns false when passed a number', () => {
		expect(util.isString(10)).toBe(false);
	});
});
