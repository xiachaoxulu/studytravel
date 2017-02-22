var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    entry: {
        app: './src/main.js',
        /* 公用模块 */
        common: ['jquery' /*, 'bootstrap'*/ ],
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'modules': path.resolve(__dirname, '../src/modules'),
            'libs': path.resolve(__dirname, '../src/libs'),

            /* 公用库 */
            'jquery': path.resolve(__dirname, '../src/libs/jquery-2.2.3.min.js'),
            // 'bootstrap':path.resolve(__dirname, '../src/libs/bootstrap/css/bootstrap.min.css'),
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: [
                path.join(__dirname, '../node_modules'),
                path.join(__dirname, '../src/components/keen-ui.min.js'),
                path.join(__dirname, '../src/libs/snap.svg-min.js'),
                path.join(__dirname, '../src/libs/snap.svg.js'),
                path.join(__dirname, '../src/libs/html2canvas.js'),

            ]
        }, {
            test: /\.scss$/,
            loader: 'sass'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders(),
        postcss: [
            // 将px转换为rem
            // require('postcss-pxtorem')({
            //     // font-size 默认值
            //     rootValue: 20,
            //     // 需转换的最小数值
            //     minPixelValue: 2,
            //     // 屏蔽转换名单
            //     selectorBlackList:['html'],
            //     // 需转换css 属性列表，留空默认全部转换
            //     propWhiteList:[]
            // }),
            require('autoprefixer')({ browsers: ['last 3 versions'] })
        ],

    },
    plugins: [
        new ProgressBarPlugin()
    ]
}
