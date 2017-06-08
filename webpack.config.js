const webpack = require('webpack');
var path = require('path');
var node_env = (process.env.NODE_ENV || 'development').trim();
var target = (process.env.NODE_DIST || 'development').trim();
var is_dev = node_env == 'development';

var SRC_DIR = path.resolve(__dirname, 'lib');
var APP_DIR = path.resolve(__dirname, './src');

module.exports = {
    resolve: {
        modules: ["./src/js/", "./node_modules/"]
    },
    entry: APP_DIR + "/js/index.js",
    devtool: 'source-map',
    target: 'node',
    output: {
        path: SRC_DIR,
        filename: target == 'development' ? 'bundle.js' : 'index.js',
        library: 'FileCrypt',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
           { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
    },
    plugins: is_dev ? [] : [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(node_env),
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: true,
            compress: {
                warnings: false,
            }
        }),
    ]
}