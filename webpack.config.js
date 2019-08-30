const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		library: 'Swatches',
		libraryTarget: 'umd',
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, 'src'), 'assets'],
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'file-loader',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `bundle.css`,
		}),
	],
};
