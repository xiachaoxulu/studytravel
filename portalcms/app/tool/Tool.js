/**
* @Created Date       : 2016-10-24T10:11:03+08:00
* @Last Modified time : 2016-12-01T17:12:14+08:00
*/



var api= require('../config/api.js');

var islogin = true;

function getLoginState() {
  if (getCookie('islogin')) {
    islogin = true;
  } else {
    islogin = false;
  }
  return {
    islogin: islogin
  }
}

function setCookie(cname, cvalue, hours) {
  var d = new Date();
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

function clearCookie(name) {
  setCookie(name, "", -1);
}


function listen(target, eventType, callback) {
  if (target && target.addEventListener) {
    target.addEventListener(eventType, callback, false)
    return {
      remove:function() {
        target.removeEventListener(eventType, callback, false)
      }
    }
  } else if (target && target.attachEvent) {
    target.attachEvent('on' + eventType, callback)
    return {
      remove:function() {
        target.detachEvent('on' + eventType, callback)
      }
    }
  }
}

function getRelated(e) {
  var related;
  var type = e.type.toLowerCase();
  if (type == 'mouseover') {
    related = e.relatedTarget || e.fromElement
  } else if (type = 'mouseout') {
    related = e.relatedTarget || e.toElement
  }
  return related;
}

function contains(a, b) {
  return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
}

function mouseenter(target, callback) {
  var ret = listen(target, 'mouseover', function(e){
    var related = getRelated(e);
    if (target != related && !contains(target, related)) {
      callback && callback(e);
    }
    return ret;
  })
}

function mouseleave(target, callback) {
  var ret = listen(target, 'mouseout', function(e){
    var related = getRelated(e);
    if (target != related && !contains(target, related)) {
      callback && callback(e);
    }
    return ret;
  });
}


function ajax(arg, success, fail) {
  if (!arg || !arg.url || !api.api[arg.url]) {
    throw 'http请求,url参数不能为空'
  }
  var defaultopt = {
    data: {},
    method: 'post',
  }
  var options = {};
  options.url = api.basepath + api.api[arg.url];
  options.data = arg.data ||
    defaultopt.data;
  options.method = arg.method ||
    defaultopt.method;


  var params = formatParams(options.data);
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        var result = JSON.parse(xhr.responseText);
        if (result && JSON.parse(result.success)) {
          success && success(result.result || '');
        } else {
          if (result.err_code == 404) {
            clearCookie('islogin');
            var dialog = require('../component/dialog/dialog.tpl');
            dialog.create({
              content: '登录超时,是否重新登录',
              height: 200,
              width:350
            }, function(arg){
              if (arg == 1) {
                var logindialog = require('../component/logindialog/logindialog.tpl');
                logindialog.create();
              }
            });
          } else {
            fail && fail(result.err_msg || '服务器返回错误');
          }
        }
        if (getLoginState.islogin) {
          setCookie('islogin', '1', 0.5);
        }
      } else {
        fail && fail(status);
      }
    }
  }
  if (options.method.toUpperCase() == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.method.toUpperCase() == "POST") {
    xhr.open("POST", options.url, true); //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
}

//格式化参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  // arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}
function xss(content) {
  return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var regs = {
  require: {
    reg: '(^\s+)|(\s+$)',
    errorMsg: '*号为必填项!',
    fun: function(val){
      if (val.replace(/ /g,'') != "") {
        return true
      } else {
        return false
      }
    }
  },
  num: { reg: '^[0-9]*[1-9][0-9]*$', errorMsg: '必须为数字' },
  email: { reg: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+', errorMsg: '邮箱输入不合法' },
  phone: { reg: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/, errorMsg: '手机号输入不合法' }
}

function validator(form) {
  var result = {
    success: true,
    content: [],
    errorMsg: ''
  }
  var ff = form;
  for (var i = 0; i < ff.elements.length; i++) {
    var ee = ff.elements[i];
    if (!(ee.style && ee.style.display == 'none') && "INPUT" == ee.tagName.toUpperCase() || "SELECT" == ee.tagName.toUpperCase()) {
      var id = ee.getAttribute('id');
      if (id) {
        var valid = ee.getAttribute('valid');
        if (valid) {
            var validitems = valid.split('|');
            var flag = true;
            for (var n = 0; n < validitems.length; n++) {
                var item = validitems[n];
                if (regs[item]) {
                    if (regs[item].fun) {
                        if (regs[item].fun(ee.value)) {} else {
                            if (item !== 'require' && ee.value != "") {
                                result.success = false;
                                result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
                                flag = false;
                                break;
                            }
                            if (item == 'require') {
                                result.success = false;
                                result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
                                flag = false;
                              break;
                            }
                        }
                    } else {
                        var reg = new RegExp(regs[item].reg);
                        if (reg.test(ee.value)) {} else {
                            if (item !== 'require' && ee.value != "") {
                                result.success = false;
                                result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
                                flag = false;
                              break;
                            }
                            if (item == 'require') {
                                result.success = false;
                                result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
                                flag = false;
                                break;
                            }
                        }
                    }
                }
            }
            // validitems.every((item) => {
            //   if (regs[item]) {
            //     if (regs[item].fun) {
            //       if (regs[item].fun(ee.value)) {} else {
            //         if (item !== 'require' && ee.value != "") {
            //           result.success = false;
            //           result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
            //           flag = false;
            //           return false;
            //         }
            //         if (item == 'require') {
            //           result.success = false;
            //           result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
            //           flag = false;
            //           return false;
            //         }
            //       }
            //     } else {
            //       var reg = new RegExp(regs[item].reg);
            //       if (reg.test(ee.value)) {} else {
            //         if (item !== 'require' && ee.value != "") {
            //           result.success = false;
            //           result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
            //           flag = false;
            //           return false;
            //         }
            //         if (item == 'require') {
            //           result.success = false;
            //           result.errorMsg = ee.getAttribute('errorMsg') || regs[item].errorMsg;
            //           flag = false;
            //           return false;
            //         }
            //       }
            //     }
            //   }
            //   return true;
            // })

            if (!flag) {
                break;
            } else {
                result.content.push({
                    name: id,
                    value: ee.value
                })
            }
        } else {          result.content.push({
              name: id,
              value: ee.value
          })
        }
      }
    };
  }

  return result;
}

module.exports={
  getCookie: getCookie,
  setCookie: setCookie,
  clearCookie: clearCookie,

  getLoginState: getLoginState,
  listen: listen,
  mouseenter: mouseenter,
  mouseleave: mouseleave,
  validator: validator,
  ajax: ajax,
  xss: xss
}
