import axios from 'axios';
import util from './util';

module.exports = {
	getProductData: url => {
		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then(res => {
					const data = {
						id: res.data.id,
						variants: util
							.convertObjectToArray(res.data.variants)
							.map(item => ({
								id: item.id,
								name: util.cleanProductName(item.title),
							})),
					};
					resolve(data);
				})
				.catch(() => {
					reject(new Error('Failed to get product data from ecommerce store'));
				});
		});
	},
	getProductMedia: (url, id) => {
		return new Promise((resolve, reject) => {
			const requestUrl = url + `/product/${id}`;
			axios
				.get(requestUrl)
				.then(res => {
					resolve({ variants: res.data.variations });
				})
				.catch(() => {
					reject(new Error('Failed to get product data from media image api'));
				});
		});
	},
};
