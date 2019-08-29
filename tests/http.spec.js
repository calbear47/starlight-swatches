import http from '../src/js/http';
import axios from 'axios';

describe('http', () => {
	describe('getProductData', () => {
		test('returns formatted data when passed a correct url', async () => {
			const goodUrl =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax';
			const data = await http.getProductData(goodUrl);

			expect(data).toHaveProperty('id');
			expect(data).toHaveProperty('variants');
			expect(data.variants.length).toBeGreaterThan(0);
		});

		test('returns error when passed an incorrect url or fails', async () => {
			const badUrl =
				'http://fakestarlight-knitting-society-627463.shoplightspeed.com/kahdakshdfk/cormo-worsted-elemental-affects.ajax';
			await expect(http.getProductData(badUrl)).rejects.toThrow(
				'Failed to get product data from ecommerce store',
			);
		});
	});
	describe('getProductMedia', () => {
		test('makes a call to axios with correctly built url', async () => {
			jest
				.spyOn(axios, 'get')
				.mockImplementation(() =>
					Promise.resolve({ data: { variations: [] } }),
				);

			await expect(
				http.getProductMedia('http://localhost:8000', '12345'),
			).resolves.toEqual({ variants: [] });
			expect(axios.get).toHaveBeenCalledWith(
				'http://localhost:8000/product/12345',
			);
		});
	});
});
