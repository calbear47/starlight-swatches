import isNil from 'lodash.isnil';
import last from 'lodash.last';
import trim from 'lodash.trim';
import isPlainObject from 'lodash.isplainobject';

let utilApi = {
	convertUrlToAjax: url => {
		return url.replace('.html', '.ajax');
	},
	convertUrlToHtml: url => {
		return url.replace('.ajax', '.html');
	},
	convertObjectToArray: obj => {
		if (!isNil(obj)) {
			return Object.keys(obj).reduce((acc, curr) => [...acc, obj[curr]], []);
		}
		return [];
	},
	cleanProductName: name => {
		if (typeof name === 'string') {
			if (name.indexOf(':') !== -1) {
				return trim(last(name.split(':')));
			} else {
				return trim(last(name.split(' ')));
			}
		}
		return '';
	},
	getCurrentUrl: () => {
		return window.location.href;
	},
	getUrlQueryId: () => {
		return utilApi.getParameterByName('id');
	},
	getParameterByName: (name, url) => {
		if (!url) url = window.location.href;
		name = name.replace(/[[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	},
	isElement: o => {
		return typeof HTMLElement === 'object'
			? o instanceof HTMLElement //DOM2
			: o &&
					typeof o === 'object' &&
					o !== null &&
					o.nodeType === 1 &&
					typeof o.nodeName === 'string';
	},
	isEmpty: item => {
		if (isNil(item)) {
			return true;
		}

		if (item === '') {
			return true;
		}

		if (Array.isArray(item) && item.length === 0) {
			return true;
		}

		if (isPlainObject(item) && Object.keys(item).length === 0) {
			return true;
		}

		return false;
	},
	isString: str => {
		return typeof str === 'string';
	},
	mergeArraysBasedOnId: (a1, a2) => {
		var hash = new Map();
		a1.concat(a2).forEach(function(obj) {
			hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj));
		});
		return Array.from(hash.values());
	},
	replaceQueryString: (url, id) => {
		if (typeof url === 'string') {
			return `${url.split('?')[0]}?id=${id}`;
		} else {
			console.warn(
				"You're trying to build a product URL to nowhere. The current_url is not set.",
			);
			return '';
		}
	},
};

export default utilApi;
