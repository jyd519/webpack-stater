'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base = require('./webpack.base.js')
const helpers = require('./helpers');

module.exports = function(env) {
  return webpackMerge(base(), {
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: helpers.root('build'),
      compress: true,
      hot: true,
      port: 9000,
      proxy: {
        "/client/**": {
          target: "http://localhost:8080/contest/"
        },
        "/websocket/**": {
          target: "http://localhost:8080/contest/",
          ws: true
        }
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: "[name].css"
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  });
};

