import swatch from '../src/js/swatch';
import util from '../src/js/util';

describe('swatch', () => {
	/** appendSwatchToContainer **/
	describe('appendSwatchToContainer', () => {
		test('appends element to container', () => {
			const testContainer = document.createElement('div');
			testContainer.id = 'test-container';
			document.body.appendChild(testContainer);

			const testSwatchEl = document.createElement('div');
			testSwatchEl.id = 'testswatch';

			swatch.appendSwatchToContainer(testContainer, testSwatchEl);

			expect(document.getElementById('testswatch')).not.toBeNull();
			expect(testContainer.querySelector('#testswatch')).not.toBeNull();
		});
	});

	describe('buildSwatch', () => {
		let testSwatch = {
			name: 'Gold',
			id: '25',
			thumbnail: 'https://mediacdn.startlight.com/thumb_image.jpg',
			fullsize: 'https://mediacdn.startlight.com/thumb_image.jpg',
		};

		let resultElement = swatch.buildSwatch(testSwatch, 30, () => {});

		expect(resultElement.dataset.id).toBe('25');
		expect(resultElement.dataset.color).toBe('Gold');
		expect(resultElement.classList.contains('starlight-swatch-variant'));
	});

	describe('getSwatchIdFromName', () => {
		test('returns undefined when name cannot be found in list', () => {
			const testArr = [
				{
					name: 'Green',
					id: '123',
				},
				{
					name: 'Blue',
					id: '987',
				},
			];
			expect(swatch.getSwatchIdFromName('gold', testArr)).toBeUndefined();
		});

		test('returns id when name can be found in list', () => {
			const testArr = [
				{
					name: 'Green',
					id: '123',
				},
				{
					name: 'Blue',
					id: '987',
				},
			];
			expect(swatch.getSwatchIdFromName('Green', testArr)).toBe('123');
		});
	});

	describe('getSwatchNameFromId', () => {
		test('returns undefined when id cannot be found in list', () => {
			const testArr = [
				{
					name: 'Green',
					id: '123',
				},
				{
					name: 'Blue',
					id: '987',
				},
			];
			expect(swatch.getSwatchNameFromId('123567', testArr)).toBeUndefined();
		});

		test('returns id when name can be found in list', () => {
			const testArr = [
				{
					name: 'Green',
					id: '123',
				},
				{
					name: 'Blue',
					id: '987',
				},
			];
			expect(swatch.getSwatchNameFromId('123', testArr)).toBe('Green');
		});
	});

	describe('getSwatchFromId', () => {
		test('returns undefined when id cannot be found in list', () => {
			const testArr = [
				{
					name: 'Gold',
					id: '25',
					thumbnail: 'https://mediacdn.startlight.com/thumb_image.jpg',
					fullsize: 'https://mediacdn.startlight.com/thumb_image.jpg',
				},
				{
					name: 'Green',
					id: '35',
					thumbnail: 'https://mediacdn.startlight.com/thumb_image.jpg',
					fullsize: 'https://mediacdn.startlight.com/thumb_image.jpg',
				},
			];

			expect(
				swatch.getSwatchFromId(
					'45',
					testArr.map(item => swatch.buildSwatch(item, 30, () => {})),
				),
			).toBeUndefined();
		});

		test('returns swatch element when id can be found in element list', () => {
			const testArr = [
				{
					name: 'Gold',
					id: '25',
					thumbnail: 'https://mediacdn.startlight.com/thumb_image.jpg',
					fullsize: 'https://mediacdn.startlight.com/thumb_image.jpg',
				},
				{
					name: 'Green',
					id: '35',
					thumbnail: 'https://mediacdn.startlight.com/thumb_image.jpg',
					fullsize: 'https://mediacdn.startlight.com/thumb_image.jpg',
				},
			];

			expect(
				util.isElement(
					swatch.getSwatchFromId(
						'35',
						testArr.map(item => swatch.buildSwatch(item, 30, () => {})),
					),
				),
			).toBeTruthy();
			expect(
				swatch.getSwatchFromId(
					'35',
					testArr.map(item => swatch.buildSwatch(item, 30, () => {})),
				),
			).toHaveProperty('dataset.id', '35');
		});
	});
});
