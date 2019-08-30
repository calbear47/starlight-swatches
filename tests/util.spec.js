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

	/** convertUrlToHtml **/
	describe('convertUrlToHtml', () => {
		test('returns a url which replaces .ajax strings to .html strings', () => {
			const testurl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax';
			expect(util.convertUrlToHtml(testurl)).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html',
			);
		});

		test('does replace anything when the url already contains html', () => {
			const testurl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			expect(util.convertUrlToHtml(testurl)).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html',
			);
		});

		test('returns a url which replaces .ajax strings to .html strings even when there is a query parameter', () => {
			const testurl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax?q=asldfjalsdfja&anotherpropertyhere=398789723khsd0239';
			expect(util.convertUrlToHtml(testurl)).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html?q=asldfjalsdfja&anotherpropertyhere=398789723khsd0239',
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

	describe('getUrlQueryId', () => {
		test('returns null when there is not a id query parameter', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=asdf';
			global.window.location = { href };

			expect(util.getUrlQueryId()).toBeNull();
		});

		test('returns the id of the product in the url when it is present', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=aasfasdf&id=12345678';
			global.window.location = { href };

			expect(util.getUrlQueryId()).toBe('12345678');
		});
	});

	describe('getParameterByName', () => {
		test('return null when query parameter cannot be found', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=asdf';
			global.window.location = { href };

			expect(util.getParameterByName('search')).toBeNull();
		});

		test('return null when the url does not container any query parameters', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource';
			global.window.location = { href };

			expect(util.getParameterByName('search')).toBeNull();
		});

		test('return null when the url does not container any query parameters', () => {
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?id=1234567';
			global.window.location = { href };

			expect(util.getParameterByName('id')).toBe('1234567');
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

	/** mergeArraysBasedOnId **/
	describe('mergeArraysBasedOnId', () => {
		test('can merge two arrays of different lengths based on ids', () => {
			const testArr1 = [
				{
					id: '1',
					thumbnail: 'asdfasdf',
				},
				{
					id: '2',
					thumbnail: 'lkjhlkjh',
				},
			];

			const testArr2 = [
				{
					id: '1',
					name: 'Gold',
				},
				{
					id: '2',
					name: 'Blue',
				},
				{
					id: '3',
					name: 'Green',
				},
			];

			const resultArr = [
				{
					id: '1',
					name: 'Gold',
					thumbnail: 'asdfasdf',
				},
				{
					id: '2',
					name: 'Blue',
					thumbnail: 'lkjhlkjh',
				},
				{
					id: '3',
					name: 'Green',
				},
			];

			expect(util.mergeArraysBasedOnId(testArr1, testArr2)).toEqual(resultArr);
		});
	});

	describe('replaceQueryString', () => {
		test('add the correct query id to url when there is not any query paramters to start with', () => {
			const testUrl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			expect(util.replaceQueryString(testUrl, '12345')).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html?id=12345',
			);
		});

		test('add the correct query id to url when there is not any query paramters to start with', () => {
			const testUrl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html?id=9876&quantity=2';
			expect(util.replaceQueryString(testUrl, '12345')).toBe(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html?id=12345',
			);
		});
	});
});
