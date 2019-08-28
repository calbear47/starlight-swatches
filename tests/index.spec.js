import MyProject from '../src/js/index';
import util from '../src/js/util';

describe('MyProject', () => {
	test('fooMethod checks thing', () => {
		jest.spyOn(util, 'isString');
		util.isString.mockImplementation = jest.fn(() => true);

		const project = new MyProject('haha');
		expect(project.fooMethod()).toBe(true);

		expect(util.isString).toHaveBeenCalledTimes(1);
		expect(util.isString).toHaveBeenCalledWith('haha');
	});
});
