import isNil from 'lodash.isnil';

module.exports = {
	appendSwatchToContainer: (container, swatchElement) => {
		container.appendChild(swatchElement);
	},
	buildSwatch: (swatch, w, handler) => {
		// Create swatch wrapper
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
	handleSwatchClick: e => {
		console.log(e.target.dataset.id);
		console.log(e.target.dataset.color);
		console.log('Handle event');
	},
};
