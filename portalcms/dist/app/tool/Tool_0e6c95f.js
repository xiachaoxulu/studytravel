define("app/tool/Tool",function(e,r,t){"use strict";function n(){return h=a("islogin")?!0:!1,{islogin:h}}function o(e,r,t){var n=new Date;n.setTime(n.getTime()+60*t*60*1e3);var o="expires="+n.toUTCString();document.cookie=e+"="+r+"; "+o}function a(e){for(var r=e+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){for(var o=t[n];" "==o.charAt(0);)o=o.substring(1);if(-1!=o.indexOf(r))return o.substring(r.length,o.length)}return""}function i(e){o(e,"",-1)}function s(e,r,t){return e&&e.addEventListener?(e.addEventListener(r,t,!1),{remove:function(){e.removeEventListener(r,t,!1)}}):e&&e.attachEvent?(e.attachEvent("on"+r,t),{remove:function(){e.detachEvent("on"+r,t)}}):void 0}function u(e){var r,t=e.type.toLowerCase();return"mouseover"==t?r=e.relatedTarget||e.fromElement:(t="mouseout")&&(r=e.relatedTarget||e.toElement),r}function l(e,r){return e.contains?e!=r&&e.contains(r):!!(16&e.compareDocumentPosition(r))}function c(e,r){var t=s(e,"mouseover",function(n){var o=u(n);return e==o||l(e,o)||r&&r(n),t})}function g(e,r){var t=s(e,"mouseout",function(n){var o=u(n);return e==o||l(e,o)||r&&r(n),t})}function f(r,t,a){if(!r||!r.url||!m.api[r.url])throw"http请求,url参数不能为空";var s={data:{},method:"post"},u={};u.url=m.basepath+m.api[r.url],u.data=r.data||s.data,u.method=r.method||s.method;var l=p(u.data);if(window.XMLHttpRequest)var c=new XMLHttpRequest;else var c=new ActiveXObject("Microsoft.XMLHTTP");c.onreadystatechange=function(){if(4==c.readyState){var r=c.status;if(r>=200&&300>r){var s=JSON.parse(c.responseText);if(s&&JSON.parse(s.success))t&&t(s.result||"");else if(404==s.err_code){i("islogin");var u=e("app/component/dialog/dialog.tpl");u.create({content:"登录超时,是否重新登录",height:200,width:350},function(r){if(1==r){var t=e("app/component/logindialog/logindialog.tpl");t.create()}})}else a&&a(s.err_msg||"服务器返回错误");n.islogin&&o("islogin","1",.5)}else a&&a(r)}},"GET"==u.method.toUpperCase()?(c.open("GET",u.url+"?"+l,!0),c.send(null)):"POST"==u.method.toUpperCase()&&(c.open("POST",u.url,!0),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(l))}function p(e){var r=[];for(var t in e)r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return r.join("&")}function v(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}function d(e){for(var r={success:!0,content:[],errorMsg:""},t=e,n=0;n<t.elements.length;n++){var o=t.elements[n];if((!o.style||"none"!=o.style.display)&&"INPUT"==o.tagName.toUpperCase()||"SELECT"==o.tagName.toUpperCase()){var a=o.getAttribute("id");if(a){var i=o.getAttribute("valid");if(i){for(var s=i.split("|"),u=!0,l=0;l<s.length;l++){var c=s[l];if(M[c])if(M[c].fun)if(M[c].fun(o.value));else{if("require"!==c&&""!=o.value){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}if("require"==c){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}}else{var g=new RegExp(M[c].reg);if(g.test(o.value));else{if("require"!==c&&""!=o.value){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}if("require"==c){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}}}}if(!u)break;r.content.push({name:a,value:o.value})}else r.content.push({name:a,value:o.value})}}}return r}var m=e("app/config/api"),h=!0,M={require:{reg:"(^s+)|(s+$)",errorMsg:"*号为必填项!",fun:function(e){return""!=e.replace(/ /g,"")?!0:!1}},num:{reg:"^[0-9]*[1-9][0-9]*$",errorMsg:"必须为数字"},email:{reg:"^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",errorMsg:"邮箱输入不合法"},phone:{reg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,errorMsg:"手机号输入不合法"}};t.exports={getCookie:a,setCookie:o,clearCookie:i,getLoginState:n,listen:s,mouseenter:c,mouseleave:g,validator:d,ajax:f,xss:v}});