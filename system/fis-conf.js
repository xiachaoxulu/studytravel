fis.set('project.ignore', [
    '.git/**',
    '.svn/**'
]);

//本地模拟数据测试
fis.media('lt')
    .match('*.less', {
        // fis-parser-less 插件进行解析
        parser: fis.plugin('less'),
        // .less 文件后缀构建后被改成 .css 文件
        rExt: '.css'
    })
    .match('/app/config/LocalConfig.js', {
        release: '/app/config/Config.js',
    })
    .match('/app/config/RemoteConfig.js', {
        release: false
    });
//远程数据测试 remotetest
fis.media('rt')
    .match('*.*', {
        release: '/system/$0'
    })
    .match('*.less', {
        // fis-parser-less 插件进行解析
        parser: fis.plugin('less'),
        // .less 文件后缀构建后被改成 .css 文件
        rExt: '.css'
    })
    .match('/app/config/RemoteConfig.js', {
        release: '/system/app/config/Config.js'
    })
    .match('/app/config/LocalConfig.js', {
        release: false
    })
    .match('/test/**', {
        release: false
    })
    .match('/config/**', {
        release: false
    })


//生成环境 product
fis.media('pd')
    .match('*.*', {
        release: '/system/$0'
    })
    .match('*.less', {
        // fis-parser-less 插件进行解析
        parser: fis.plugin('less'),
        // .less 文件后缀构建后被改成 .css 文件
        rExt: '.css'
    })
    .match('/app/config/RemoteConfig.js', {
        release: '/system/app/config/Config.js'
    })
    .match('/app/config/LocalConfig.js', {
        release: false
    })
    .match('/test/**', {
        release: false
    })
    .match('/config/**', {
        release: false
    }).match('/app/**', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://192.168.1.78:8999/receiver',
            from:'/system',
            to: '/home/tomcats/tomcat8081/apache-tomcat-7.0.67/webapps/Facade-APP/' // 注意这个是指的是测试机器的路径，而非本地机器
        })
    })