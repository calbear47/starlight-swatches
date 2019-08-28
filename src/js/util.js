import isNil from 'lodash.isnil';
import isPlainObject from 'lodash.isplainobject';

module.exports = {
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
};
