import util from '../src/js/util';

describe('util', () => {
	describe('isElement', () => {
		test('returns false when passing a string', () => {
			expect(util.isElement('<div></div>')).toBe(false);
		});

		test('returns false when passing an object', () => {
			expect(util.isElement({ style: 'fake style property' })).toBe(false);
		});

		test('returns true when passing a real HTML Element', () => {
			const testElement = document.createElement('div');
			expect(util.isElement(testElement)).toBe(true);
		});
	});

	describe('isEmpty', () => {
		test('return true if null', () => {
			expect(util.isEmpty(null)).toBe(true);
		});

		test('return true if undefined', () => {
			expect(util.isEmpty(undefined)).toBe(true);
		});

		test('return true if empty string', () => {
			expect(util.isEmpty('')).toBe(true);
		});

		test('return true if empty array', () => {
			expect(util.isEmpty([])).toBe(true);
		});

		test('return true if empty object', () => {
			expect(util.isEmpty({})).toBe(true);
		});

		test('return false if string with characters', () => {
			expect(util.isEmpty('Not Empty!')).toBe(false);
		});

		test('return false if object with at least 1 property', () => {
			expect(util.isEmpty({ thing: 'thing 2' })).toBe(false);
		});
	});

	describe('isString', () => {
		test('returns false when passed null', () => {
			expect(util.isString(null)).toBe(false);
		});

		test('returns false when passed int', () => {
			expect(util.isString(1)).toBe(false);
		});

		test('returns false when passed object', () => {
			expect(util.isString({})).toBe(false);
		});

		test('returns true when passed string', () => {
			expect(util.isString('Hi!')).toBe(true);
		});
	});
});
