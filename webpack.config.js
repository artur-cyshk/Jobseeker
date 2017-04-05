const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const distPath = path.resolve(__dirname, 'dist');
const appPath = path.resolve(__dirname, 'src', 'app.js');

rimraf.sync(`${distPath}/*`);

const config = {
	context: path.resolve(__dirname, 'src'),

	entry: {
		app: [
			'webpack-dev-server/client',
			'webpack/hot/dev-server',
			'babel-polyfill',
			appPath
		],
		vendor: [
			'angular',
			'angular-ui-router',
			'font-awesome/css/font-awesome.min.css'
		]
	},

	resolve: {
		root: path.resolve('src'),
		moduleDirectories: [nodeModulesPath],
		extensions: ['', '.js', 'styl', 'html']
	},

	resolveLoader: {
		moduleDirectories: [nodeModulesPath],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	output: {
		path: distPath,
		filename: '[name].bundle.js',
		chunkfilename: '[id].js',
		publicPath: '/'
	},

	devtool: 'eval',

	// Generic styles should be extracted to another file to show basic styles before JS initial load 
	module: {       
		loaders: [
			{
				test: /generic\.style/,
				loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.styl$/,
				exclude: [nodeModulesPath, path.resolve('src','generic','generic.style.styl')],
				loader: 'style!css!stylus?resolve url'
			}, 
/*			{ 
				test: /\.woff2?$/, 
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},*/
			{
				test: /\.(gif|png|svg|ttf|eot|woff2?)$|\?/,
				loader: 'url-loader?limit=10000&name=[name].[ext]'
			}, 
			{
				test: /\.html$/,
				loader: 'underscore-template'
			},
			{
				test: /\.js$/,
				exclude: [nodeModulesPath],
				loader: 'ng-annotate!babel?presets=es2015&plugins=transform-runtime'
			}
		]
	},

	stylus: {
		use: [require('nib')()],
		import: ['~nib/lib/nib/index.styl']
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name].css', {allChunks: true}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			chunks: ['common'],
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			template: 'index.template.html',
			inject: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.bundle.js'
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		host: 'localhost',
		port: 8000,
		contentBase: distPath,
		hot:true,
		stats: {
			colors: true
		}
	}
};


if (PRODUCTION) {
	config.module.loaders = config.module.loaders.map(loader => {
		if (loader.test.test('.styl') && !loader.test.test('generic')) {
			loader.loader = ExtractTextPlugin.extract('style', 'css!stylus?resolve url');
		}
		return loader;
	});

	config.plugins = config.plugins.concat([
		new webpack.optimize.UglifyJsPlugin()
	]);
}

module.exports = config;
