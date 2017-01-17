module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  console.log("sss=>" + pkg.name);
  grunt.initConfig({
    pkg: pkg,
    test: {
      options: {
        banner: 'sssssssssss'
      },
      s: {
        t: {
          options: {
            banner: 'tttttttt'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerMultiTask('test', '测试测试', function(arg1, arg2) {
    console.dir(this)
    grunt.log.write('参数:' + arg1 + "," + arg2);
  });
}
