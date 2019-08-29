import BuildSwatcher from '../src/js/index';

describe('Build Swatcher', () => {
	/** INSTANCE  **/
	describe('Instance', () => {
		test('throws error if container is null', () => {
			expect(() => {
				return new BuildSwatcher({
					container: null,
					thirdparty_api: 'https://apime.com/',
				});
			}).toThrowError(
				new Error('You must initialize BuildSwatcher with a container.'),
			);
		});

		test('throws error if container property is not passed', () => {
			expect(() => {
				return new BuildSwatcher({
					thirdparty_api: 'https://apime.com/',
					selector_id: '',
				});
			}).toThrowError(
				new Error(
					'Build Swatcher was initialized incorrectly. Pass an HTML Element or element id<string>.',
				),
			);
		});

		test('throws error if container string id cannot be found in the DOM', () => {
			expect(() => {
				return new BuildSwatcher({
					container: 'swatcher-container-id',
					thirdparty_api: 'https://apime.com/',
					selector_id: '',
				});
			}).toThrowError(
				new Error(
					`Build Swatcher can't find the id "swatcher-container-id". Make sure the DOM has been loaded prior to initialization.`,
				),
			);
		});

		test('throws error if a required property is empty', () => {
			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			expect(() => {
				return new BuildSwatcher({
					container: 'swatcher-container-id',
					thirdparty_api: 'https://apime.com/',
					selector_id: '',
				});
			}).toThrowError(
				new Error(`Build Swatcher was initialized without a required option.`),
			);
		});

		test('creates instance when intialized properly.', () => {
			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);

			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(swatcherInstance).toBeInstanceOf(BuildSwatcher);
		});
	});

	/** _verifyOptions  **/
	describe('_verifyOptions', () => {
		test('returns true when all required options are not empty in options object', () => {
			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});
			expect(
				swatcherInstance._verifyOptions(['thirdparty_api', 'selector_id'], {
					container: 'swatcher-container-id',
					thirdparty_api: 'https://apime.com/',
					selector_id: 'selector-custom-id',
				}),
			).toBe(true);
		});

		test('throws error if any required options were empty', () => {
			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});
			expect(
				swatcherInstance._verifyOptions(['thirdparty_api', 'selector_id'], {
					container: 'swatcher-container-id',
					thirdparty_api: '',
					selector_id: 'selector-custom-id',
				}),
			).toBe(false);
		});
	});

	/** _setupSwatcher **/
	describe('_setupSwatcher', () => {
		test('sets up options and init varaibles correctly', () => {
			jest.spyOn(BuildSwatcher.prototype, '_setCurrentUrl');

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(BuildSwatcher.prototype._setCurrentUrl).toHaveBeenCalled();

			expect(swatcherInstance._options).toHaveProperty(
				'container',
				containerElement,
			);
			expect(swatcherInstance._options).toHaveProperty(
				'selector_id',
				'selector-custom-id',
			);
			expect(swatcherInstance._options).toHaveProperty(
				'thirdparty_api',
				'https://apime.com/',
			);

			expect(swatcherInstance.current_url).toBe('http://localhost/');
		});
	});

	/** _setCurrentUrl **/
	describe('_setCurrentUrl', () => {
		test('should set the current_url property on the instance with the current window location href', () => {
			// Set state of the url
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=asdf';
			global.window.location = { href };

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			swatcherInstance._setCurrentUrl();

			expect(swatcherInstance.current_url).toBe(
				'https://example.com/pathto/resource?q=asdf',
			);
		});
	});

	/** _getCurrentUrl **/
	describe('_getCurrentUrl', () => {
		test('should get the current_url propety off the instance', () => {
			// Set state of the url
			delete global.window.location;
			const href = 'https://example.com/pathto/resource?q=asdf';
			global.window.location = { href };

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(swatcherInstance._getCurrentUrl()).toBe(
				'https://example.com/pathto/resource?q=asdf',
			);
		});
	});
});
