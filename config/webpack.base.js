'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV;

module.exports = function(env) {
  return {
    entry: {
      app: './app/app.ts',
      vendor: './app/vendor.ts'
    },
    output: {
      path: helpers.root('build'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: require.resolve("jquery"),
        loader: "expose-loader?$!expose-loader?jQuery"
      }, {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }, {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }, {
        test: /\.css$/,
        include: helpers.root('app'),
        loader: 'raw-loader'
      }]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: helpers.root('index.html')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'] // Specify the common bundle's name.
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
      }),
      // output stats
      new ManifestPlugin()
    ]
  };
};

