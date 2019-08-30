import axios from 'axios';
import util from './util';

const httpAPi = {
	getProductData: url => {
		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then(res => {
					console.log(res);
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
				.catch(err => {
					reject(
						new Error('Failed to get product data from ecommerce store:' + err),
					);
				});
		});
	},
	getProductMedia: (url, id) => {
		return new Promise((resolve, reject) => {
			const requestUrl = url + `/product/${id}`;
			axios
				.get(requestUrl)
				.then(res => {
					resolve({
						variants: res.data.variations.map(item => ({
							id: item.lightspeed_id,
							thumbnail: item.thumbnail_url,
							fullsize: item.fullsize_url,
						})),
					});
				})
				.catch(() => {
					reject(new Error('Failed to get product data from media image api'));
				});
		});
	},
};

export default httpAPi;
