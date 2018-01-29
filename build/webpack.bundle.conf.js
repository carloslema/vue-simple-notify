const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const base = require('./webpack.base.conf')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.bundle.env

base.entry = {
  'VueSimpleNotify': './src/bundle.js'
}

const webpackConfig = merge(base, {
  output: {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: 'vue-simple-notify.min.js',
    library: 'VueSimpleNotify',
    libraryTarget: 'umd'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.bundle.productionSourceMap,
      extract: true
    })
  },
  devtool: config.bundle.productionSourceMap ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new ExtractTextPlugin({
      filename: 'vue-simple-notify.min.css'
    }),
    new OptimizeCSSPlugin()
  ]
})

module.exports = webpackConfig
