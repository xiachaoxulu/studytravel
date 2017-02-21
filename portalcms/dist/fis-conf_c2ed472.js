/**
 * @Created Date       : 2016-11-14T10:41:53+08:00
* @Last Modified time : 2016-11-30T17:30:24+08:00
 */



fis.set('project.ignore', [
    '/node_modules/**',
    '/build/**',
    '/dist/**',
]);



//生成环境 product
fis.media('test')
    .match('{/app/tool/**.js,/app/config/**.js,/app/component/**.js,lib/mustache.min.js,lib/jquery.min.js,lib/md5.js}', {
        isMod: true,
        useSameNameRequire: true
    })
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    .match('/app/**.js', {
        parser: fis.plugin('translate-es6')
    })
    .hook('commonjs', {
        extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: true,
            sourceMap: false, //是否生成依赖map文件
            useInlineMap: false //是否将sourcemap作为内嵌脚本输出
        }),
        packager: fis.plugin('map', {
            'pkg/component.js': [
                'lib/mustache.min.js',
                '/app/component/**.js'
            ],
            'pkg/component.css': [
                '/app/component/**.less'
            ]
        })
    });


// 加 md5
fis.media('product')
    // .match('*.*', {
    //     release: '/dist/$0'
    // })
    .match('{/app/tool/**.js,/app/config/**.js,/app/component/**.js,lib/mustache.min.js,lib/md5.js}', {
        isMod: true,
        useSameNameRequire: true
    })
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css',
        optimizer: fis.plugin('clean-css')
    })
    .match('/app/**.js', {
        parser: fis.plugin('translate-es6'),
        optimizer: fis.plugin('uglify-js')
    })
    .hook('commonjs', {
        extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: true,
            sourceMap: false, //是否生成依赖map文件
            useInlineMap: false //是否将sourcemap作为内嵌脚本输出
        }),
        packager: fis.plugin('map', {
            'pkg/component.js': [
                'lib/mustache.min.js',
                '/app/component/**.js'
            ],
            'pkg/component.css': [
                '/app/component/**.less'
            ]
        })
    })
    .match('*.{js,css,png,jpg,jpge}', {
        useHash: true
    })
    // .match('*', {
    //     deploy: fis.plugin('http-push', {
    //         receiver: 'http://10.152.64.50:8999/receiver',
    //         from: '/',
    //         to: '/home/tomcats/merchant/tomcat/webapps/Merchant' // 注意这个是指的是测试机器的路径，而非本地机器
    //     })
    // })
