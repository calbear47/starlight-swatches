import util from './util';
import '../scss/app.scss'; // Ensures that our scss is built and bundled on compilation.

function BuildSwatcher(options) {
	const required_options = ['thirdparty_api', 'selector_id'];

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
		}
	}

	if (util.isString(options.container)) {
		const foundElement = document.getElementById(options.container);
		if (util.isElement(foundElement)) {
			const isValid = this._verifyOptions(required_options, options);
			if (isValid) {
				// setup swatcher
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

/** Helper Methods **/

BuildSwatcher.prototype._setupSwatcher = function(options) {
	this._options = Object.assign({}, this._options, options);
};

BuildSwatcher.prototype._verifyOptions = function(required, options) {
	for (let i = 0; i < required.length; i++) {
		if (
			Object.prototype.hasOwnProperty.call(options, required[i]) &&
			!util.isEmpty(options[required[i]])
		) {
			continue;
		} else {
			throw new Error(
				`Build Swatcher was initialized without a required option: ${required[i]}`,
			);
		}
	}
	return true;
};

module.exports = BuildSwatcher;
