'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const base = require('./webpack.base.js')

module.exports = function(env) {
    return webpackMerge(base(),  {
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
              beautify: false,
              mangle: {
                screw_ie8: true,
                keep_fnames: true
              },
              compress: {
                screw_ie8: true
              },
              comments: false
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
};
