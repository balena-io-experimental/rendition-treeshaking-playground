var path = require('path');
var root = path.resolve(__dirname, '.');

var config = {
	mode: 'production',
	entry: path.join(root, 'src/index.ts'),
	output: {
		// Include comments about the contained modules
		pathinfo: true,
		filename: 'index.js',
		path: path.join(root, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	optimization: {
		// Disable to preserve the readable debug comments in the build output
		minimize: true,
		// Preserve each individual dependency in the analyzer & the build output
		concatenateModules: false,

		// Enabled by default on production builds, left in case a development build is used:
		providedExports: true,
		usedExports: true,
		sideEffects: true,
	},
	stats: {
		// Examine all modules
		maxModules: Infinity,
		// Display bailout reasons
		optimizationBailout: true,
		usedExports: true,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
			analyzerMode: 'disabled',
			generateStatsFile: true,
		}),
	]
};

module.exports = config;
