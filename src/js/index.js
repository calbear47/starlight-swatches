import util from './util';
import http from './http';
import omit from 'lodash.omit';
import '../scss/app.scss'; // Ensures that our scss is built and bundled on compilation.

function BuildSwatcher(options) {
	const required_options = ['thirdparty_api', 'selector_id'];

	this.current_url = '';
	this.product_id = '';
	this.swatches_data = [];
	this.swatches_media = [];
	this.complete_swatches = [];

	this._options = {
		container: null,
		thirdparty_api: '',
		selector_id: '',
		image_id: '',
		swatch_width: 30,
	};

	if (options.container === null) {
		throw new Error('You must initialize BuildSwatcher with a container.');
	}

	if (util.isElement(options.container)) {
		// go find container and check validity
		const isValid = this._verifyOptions(required_options, options);
		if (isValid) {
			// setup swatcher
			this._options.container = options.container;
			this._setupSwatcher(options);
			this.compileData();
		} else {
			throw new Error(
				`Build Swatcher was initialized without a required option.`,
			);
		}
	}

	if (util.isString(options.container)) {
		const foundElement = document.getElementById(options.container);
		if (util.isElement(foundElement)) {
			const isValid = this._verifyOptions(required_options, options);
			if (isValid) {
				// setup swatcher
				this._options.container = foundElement;
				this._setupSwatcher(options);
				this.compileData();
			} else {
				throw new Error(
					`Build Swatcher was initialized without a required option.`,
				);
			}
		} else {
			throw new Error(
				`Build Swatcher can't find the id "${options.container}". Make sure the DOM has been loaded prior to initialization.`,
			);
		}
	}

	if (!util.isString(options.container) && !util.isElement(options.container)) {
		throw new Error(
			'Build Swatcher was initialized incorrectly. Pass an HTML Element or element id<string>.',
		);
	}
}

BuildSwatcher.prototype.compileData = function() {
	http
		.getProductData(this.current_url)
		.then(res => {
			this.product_id = res.id;
			this.swatches_data = res.variants;
			return http.getProductMedia(
				this._options.thirdparty_api,
				this.product_id,
			);
		})
		.then(res => {
			this.swatches_media = res.variants;
			this.buildSwatches();
		})
		.catch(err => {
			throw new Error(
				`Failed to get data from eCommerce platform or Image api: ${err}`,
			);
		});
};

BuildSwatcher.prototype.buildSwatches = function() {};

/** Helper Methods **/

BuildSwatcher.prototype._setupSwatcher = function(options) {
	this._options = Object.assign({}, this._options, omit(options, 'container'));
	this._setCurrentUrl();
};

BuildSwatcher.prototype._getCurrentUrl = function() {
	return this.current_url;
};

BuildSwatcher.prototype._setCurrentUrl = function() {
	this.current_url = util.convertUrlToAjax(util.getCurrentUrl());
};

BuildSwatcher.prototype._verifyOptions = function(required, options) {
	for (let i = 0; i < required.length; i++) {
		if (
			Object.prototype.hasOwnProperty.call(options, required[i]) &&
			!util.isEmpty(options[required[i]])
		) {
			continue;
		} else {
			return false;
		}
	}
	return true;
};

module.exports = BuildSwatcher;
