import BuildSwatcher from '../src/js/index';
import http from '../src/js/http';

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
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		test('returns true when all required options are not empty in options object', () => {
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		test('sets up options and init varaibles correctly', () => {
			jest.spyOn(BuildSwatcher.prototype, '_setCurrentUrl');
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		test('should set the current_url property on the instance with the current window location href', () => {
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		test('should get the current_url propety off the instance', () => {
			jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => jest.fn());

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

	describe('compileData', () => {
		beforeEach(() => {
			jest.restoreAllMocks();
		});
		test('gets called with properly when a new instance is created', () => {
			const compileSpy = jest
				.spyOn(BuildSwatcher.prototype, 'compileData')
				.mockImplementation(() => {});

			delete global.window.location;
			const href =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			global.window.location = { href };

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(compileSpy).toHaveBeenCalled();
			compileSpy.mockClear();
		});

		test('calls the getProductData correct and sets the state on BuildSwatch correctly on completion', () => {
			delete global.window.location;
			const href =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			global.window.location = { href };
			const getProductDataSpy = jest
				.spyOn(http, 'getProductData')
				.mockResolvedValueOnce({
					id: 'fake-id',
					variants: [{ name: 'Color', id: 'product-id' }],
				});

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(getProductDataSpy).toHaveBeenCalledWith(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax',
			);
			setTimeout(() => {
				expect(swatcherInstance.product_id).toBe('fake-id');
				expect(swatcherInstance.swatches_data).toEqual([
					{ name: 'Color', id: 'product-id' },
				]);
			});
		});

		test('calls the correct methods on the http module to get data', () => {
			delete global.window.location;
			const href =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			global.window.location = { href };
			const getProductDataSpy = jest
				.spyOn(http, 'getProductData')
				.mockResolvedValueOnce({
					id: 'fake-id',
					variants: [{ name: 'Color', id: 'product-id' }],
				});

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			expect(getProductDataSpy).toHaveBeenCalledWith(
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.ajax',
			);
			process.nextTick(() => {
				expect(swatcherInstance.product_id).toBe('fake-id');
				expect(swatcherInstance.swatches_data).toEqual([
					{ name: 'Color', id: 'product-id' },
				]);
			});
		});

		test('calls the correct methods on the http module to get media', () => {
			delete global.window.location;
			const href =
				'http://starlight-knitting-society-627463.shoplightspeed.com/cormo-worsted-elemental-affects.html';
			global.window.location = { href };

			const getProductDataSpy = jest
				.spyOn(http, 'getProductData')
				.mockResolvedValueOnce({
					id: '12345',
					variants: [{ name: 'Color', id: 'product-id' }],
				});

			const getProductMediaSpy = jest
				.spyOn(http, 'getProductMedia')
				.mockResolvedValueOnce({
					variants: [
						{
							product_id: '9876',
							thumbnail_url: 'http://mediaserver.com/image/image.jpg',
							fullsize_url: 'http://mediaserver.com/image/image.jpg',
						},
					],
				});

			const containerElement = document.createElement('div');
			containerElement.id = 'swatcher-container-id';
			document.body.appendChild(containerElement);
			const swatcherInstance = new BuildSwatcher({
				container: 'swatcher-container-id',
				thirdparty_api: 'https://apime.com/',
				selector_id: 'selector-custom-id',
			});

			process.nextTick(() => {
				expect(getProductDataSpy).toHaveBeenCalled();
				expect(getProductMediaSpy).toHaveBeenCalledWith(
					'https://apime.com/',
					'12345',
				);

				expect(swatcherInstance.swatches_media).toEqual([
					{
						product_id: '9876',
						thumbnail_url: 'http://mediaserver.com/image/image.jpg',
						fullsize_url: 'http://mediaserver.com/image/image.jpg',
					},
				]);
			});
		});
	});
});
