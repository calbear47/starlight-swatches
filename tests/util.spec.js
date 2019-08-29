import util from '../src/js/util';

describe('util', () => {
	/** convertUrlToAjax **/
	describe('convertUrlToAjax', () => {
		test('returns a url which replaces .html strings to .ajax strings', () => {
			const testurl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			expect(util.convertUrlToAjax(testurl)).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax',
			);
		});

		test('returns a url which replaces .html strings to .ajax strings even when there is a query parameter', () => {
			const testurl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html?q=asldfjalsdfja&anotherpropertyhere=398789723khsd0239';
			expect(util.convertUrlToAjax(testurl)).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax?q=asldfjalsdfja&anotherpropertyhere=398789723khsd0239',
			);
		});
	});

	/** clearProductName **/
	describe('cleanProductName', () => {
		test('return correctly formatted string name with spaces around name', () => {
			expect(util.cleanProductName('Color : Amytheyst')).toBe('Amytheyst');
		});

		test('return correctly formatted string name without spaces around name', () => {
			expect(util.cleanProductName('Color:Amytheyst')).toBe('Amytheyst');
		});

		test(`return correctly formatted string name without a ':' in the string`, () => {
			expect(util.cleanProductName('Color Amytheyst')).toBe('Amytheyst');
		});

		test(`return empty string when not passed a string`, () => {
			expect(util.cleanProductName([])).toBe('');
		});
	});

	/** convertObjectToArray **/
	describe('convertObjectToArray', () => {
		test('returns empty array if empty object', () => {
			expect(util.convertObjectToArray({})).toEqual([]);
		});
		test('returns empty array if empty object', () => {
			expect(
				util.convertObjectToArray({
					'1234': { prop1: 'alsdfj', prop2: 'lasdjf' },
					'4321': { prop3: true, prop4: [] },
				}),
			).toEqual([
				{ prop1: 'alsdfj', prop2: 'lasdjf' },
				{ prop3: true, prop4: [] },
			]);
		});
	});

	/** getCurrentUrl **/
	describe('getCurrentUrl', () => {
		test('returns the current url location in the window', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=asdf';
			global.window.location = { href };
			expect(util.getCurrentUrl()).toBe(
				'https://example.com/pathto/resource?q=asdf',
			);
		});
	});

	/** isElement **/
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

	/** isEmpty **/
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

	/** isString **/
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
