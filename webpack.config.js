const webpack = require('webpack');
var node_env = (process.env.NODE_ENV || 'development').trim();
var is_dev = node_env == 'development';
module.exports = {
    resolve: {
        modules: ["./src/js/", "./node_modules/"]
    },
    output: {
        filename: 'bundle.js'
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