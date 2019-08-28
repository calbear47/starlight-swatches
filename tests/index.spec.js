import BuildSwatcher from '../src/js/index';

describe('Build Swatcher', () => {
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
				new Error(
					`Build Swatcher was initialized without a required option: selector_id`,
				),
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
			expect(() => {
				swatcherInstance._verifyOptions(['thirdparty_api', 'selector_id'], {
					container: 'swatcher-container-id',
					thirdparty_api: '',
					selector_id: 'selector-custom-id',
				});
			}).toThrowError(
				new Error(
					`Build Swatcher was initialized without a required option: thirdparty_api`,
				),
			);
		});
	});
});
