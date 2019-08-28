module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.scss$': require.resolve('./tests/mocks/style-mock.js'),
	},
	collectCoverageFrom: ['**/src/js/**/*.js'],
};
