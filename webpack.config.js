const webpack = require('webpack');
var path = require('path');
var node_env = (process.env.NODE_ENV || 'development').trim();
var target = (process.env.NODE_ENV || 'development').trim();
var is_dev = node_env == 'development';

var TARGET_DIR = path.resolve(__dirname, target == 'development' ? './test/fixtures/js' : './lib');
var APP_DIR = path.resolve(__dirname, './src');
var TEST_DIR = path.resolve(__dirname, './test/specs');

module.exports = {
  resolve: {
    modules: ["./src/js/", "./node_modules/"]
  },
  entry: target == 'development' ? TEST_DIR + "/tests.web.js" : APP_DIR + "/js/index.js",
  target: 'node',
  output: {
    path: TARGET_DIR,
    filename: 'index.js',
    library: 'FileCrypt',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }]
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