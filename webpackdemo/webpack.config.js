var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');


function assetsJsPath(_path) {

  return path.posix.join('/static/js', _path)
}

function assetsImagePath(_path) {

  return path.posix.join('/static/image', _path)
}

function assetsPagePath(_path) {
  return path.posix.join('/page', _path)
}
module.exports = {
  entry: {
    'index': './index.js',
    'product': './product.js'
  },
  output: {
    // publicPath: 'http://localhost:8689/',
    path: 'build',
    filename: assetsJsPath('[name].js'),
    chunkFilename: assetsJsPath('[name].js'),
    // libraryTarget: "umd",
    // library: "啊大大"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: assetsPagePath('index.html'),
      template: 'index.html',
      chunks: ['index']
    }), new HtmlWebpackPlugin({
      filename: assetsPagePath('product.html'),
      template: 'product.html',
      chunks: ['product']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: 3,
    }),
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "css" }, {
        test: /\.png$/,
        loader: 'url',
        query: {
          limit: 50000,
          name: assetsImagePath('[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
