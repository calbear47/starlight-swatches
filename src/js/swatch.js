import isNil from 'lodash.isnil';
import util from './util';

const swatchAPI = {
	activateSwatch: (selector_id, el, cb) => {
		if (!isNil(el)) {
			let color = el.dataset.color;
			let id = el.dataset.id;
			let selector = document.getElementById(selector_id);
			selector.value = color;
			cb(color, id);
		} else {
			console.warn('Trying to activate a product that was not found.');
		}
	},
	appendSwatchToContainer: (container, swatchElement) => {
		container.appendChild(swatchElement);
	},
	buildSwatch: (swatch, w, handler) => {
		let swatchWrapper = document.createElement('div');
		swatchWrapper.classList.add('starlight-swatch-variant');
		swatchWrapper.dataset.id = swatch.id;
		swatchWrapper.dataset.color = swatch.name;
		swatchWrapper.style.width = w !== 0 ? w + 'px' : '30px';
		swatchWrapper.style.height = w !== 0 ? w + 'px' : '30px';
		swatchWrapper.style.background = `url(${swatch.thumbnail})`;
		swatchWrapper.style.backgroundSize = 'cover';
		swatchWrapper.style.backgroundPosition = 'center center';

		swatchWrapper.addEventListener('click', handler);

		return swatchWrapper;
	},
	getSwatchIdFromName: (name, arr) => {
		const found = arr.find(item => item.name === name);
		if (!isNil(found)) {
			return found.id;
		}
	},
	getSwatchNameFromId: (id, arr) => {
		const found = arr.find(item => item.id == id);
		if (!isNil(found)) {
			return found.name;
		}
	},
	getSwatchFromId: (id, arr) => {
		const found = arr.find(item => item.dataset.id == id);
		if (!isNil(found)) {
			return found;
		}
	},
	handleSwatchClick: (url, e) => {
		const id = e.target.dataset.id;
		swatchAPI.navigateToProduct(url, id);
	},
	navigateToProduct: (url, id) => {
		window.location.href = util.replaceQueryString(
			util.convertUrlToHtml(url),
			id,
		);
	},
};

export default swatchAPI;
