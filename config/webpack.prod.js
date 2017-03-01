'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base = require('./webpack.base.js')
const helpers = require('./helpers');

module.exports = function(env) {
  return webpackMerge(base(), {
    output: {
      path: helpers.root('dist'),
      filename: '[name]-[chunkhash].js'
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "[name]-[contenthash].css"
      }),
      new webpack.HashedModuleIdsPlugin(),
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

