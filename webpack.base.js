'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function(env) {
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      app: './app.js',
      hmr: 'webpack-hot-middleware/client',
      vendor: './vendor.ts'
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js'
    },
    module: {
      rules: [
        { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: 'file-loader'
        },
        {
          test: /.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }, 
        {
          test: /\.css$/,
          include: path.join(__dirname, 'app'),
          loader: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "[name].css"
      }),
      new HtmlWebpackPlugin({
        template: './index.html' 
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'] // Specify the common bundle's name.
      }),
      new HtmlWebpackPlugin({
        filename: "page1.html",
        tempate: "page.html"
      }),
      new webpack.DefinePlugin({
      }),
      new webpack.HotModuleReplacementPlugin(),
      // output stats
      new ManifestPlugin()
    ]
  };
};

