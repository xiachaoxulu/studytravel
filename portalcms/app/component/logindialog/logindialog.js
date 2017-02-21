/**
* @Created Date       : 2016-11-11T15:54:04+08:00
* @Last Modified time : 2016-11-29T11:11:55+08:00
*/



var tool = require('../../tool/Tool.js')
var mustache = require('../../../lib/mustache.min.js')
var md5 = require('../../../lib/md5.js')



function create(callback) {
  var dialog = require('../dialog/dialog');

  var tpl = __inline('logindialog.tpl');
  mustache.parse(tpl);
  var result = mustache.render(tpl);

  var dd = dialog.create({
    title: '登录',
    content: result,
    height: 350,
    showfooter: false
  });
  var container = dd.dom.querySelector('.logindialog');
  var loginbtn = dd.dom.querySelector('.login');
  var username = dd.dom.querySelector('#username');
  var password = dd.dom.querySelector('#password');
  var errortip = dd.dom.querySelector('.error');


  if (loginbtn) {
    tool.listen(loginbtn, 'click', () => {
      if (username.value.trim() == "" || password.value.trim() == "") {
        errortip.innerHTML = tool.xss('用户名或者密码不能为空');
      } else {
        errortip.innerHTML = tool.xss('');

        var loading=require('../loading/loading').create(dd.dom,{type:'cat'});
        tool.ajax({
          url: 'login',
          method: 'post',
          data: {
            userName: username.value,
            passWord: md5(password.value)
          }
        }, function(data) {
          // loading.close();
          dd.close();
          tool.setCookie('islogin', '1', 0.5);
          callback && callback({
            username: username
          })
        }, function(err) {
          // loading.close();
          errortip.innerHTML = err;
        });
      }
    });
  }
}

module.exports={ create:create }
