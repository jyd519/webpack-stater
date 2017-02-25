'use strict';

const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const base = require('./webpack.base.js')

module.exports = function(env) {
    return webpackMerge(base(),  {
        devtool: 'cheap-module-source-map',
        devServer: {
          contentBase: path.join(__dirname, "build"),
          compress: true,
          port: 9000
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            })
        ]
    });
};
