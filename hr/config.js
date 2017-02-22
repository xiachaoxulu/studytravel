// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // assetsPublicPath: '/hrnew/',
    // assetsPublicPath: '/human_butler/schedule/',
    productionSourceMap: false
  },
  dev: {
    port: 8090,
    proxyTable: {
    }
  }
}
