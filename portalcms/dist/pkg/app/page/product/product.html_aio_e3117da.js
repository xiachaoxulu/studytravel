/*!lib/mod.js*/
;/**
* @Created Date       : 2016-11-11T15:54:03+08:00
* @Last Modified time : 2016-11-29T11:15:41+08:00
*/



/**
 * @file: mod.js
 * @author fis
 * ver: 1.0.13
 * update: 2016/01/27
 * https://github.com/fex-team/mod
 */
var require;

/* eslint-disable no-unused-vars */
var define;

(function (global) {

    // 避免重复加载而导致已定义模块丢失
    if (require) {
        return;
    }

    var head = document.getElementsByTagName('head')[0];
    var loadingMap = {};
    var factoryMap = {};
    var modulesMap = {};
    var scriptsMap = {};
    var resMap = {};
    var pkgMap = {};

    var createScripts = function(queues, onerror){

        var docFrag = document.createDocumentFragment();

        for(var i = 0, len = queues.length; i < len; i++){
            var id = queues[i].id;
            var url = queues[i].url;

            if (url in scriptsMap) {
                continue;
            }

            scriptsMap[url] = true;

            var script = document.createElement('script');
            if (onerror) {
                (function(script, id){
                    var tid = setTimeout(function(){
                        onerror(id);
                    }, require.timeout);

                    script.onerror = function () {
                        clearTimeout(tid);
                        onerror(id);
                    };

                    var onload = function () {
                        clearTimeout(tid);
                    };

                    if ('onload' in script) {
                        script.onload = onload;
                    }
                    else {
                        script.onreadystatechange = function () {
                            if (this.readyState === 'loaded' || this.readyState === 'complete') {
                                onload();
                            }
                        };
                    }
                })(script, id);
            }
            script.type = 'text/javascript';
            script.src = url;

            docFrag.appendChild(script);
        }

        head.appendChild(docFrag);
    };

    var loadScripts = function(ids, callback, onerror){
        var queues = [];
        for(var i = 0, len = ids.length; i < len; i++){
            var id = ids[i];
            var queue = loadingMap[id] || (loadingMap[id] = []);
            queue.push(callback);

            //
            // resource map query
            //
            var res = resMap[id] || resMap[id + '.js'] || {};
            var pkg = res.pkg;
            var url;

            if (pkg) {
                url = pkgMap[pkg].url || pkgMap[pkg].uri;
            }
            else {
                url = res.url || res.uri || id;
            }

            queues.push({
                id: id,
                url: url
            });
        }

        createScripts(queues, onerror);
    };

    define = function (id, factory) {
        id = id.replace(/\.js$/i, '');
        factoryMap[id] = factory;

        var queue = loadingMap[id];
        if (queue) {
            for (var i = 0, n = queue.length; i < n; i++) {
                queue[i]();
            }
            delete loadingMap[id];
        }
    };

    require = function (id) {
        // compatible with require([dep, dep2...]) syntax.
        if (id && id.splice) {
            return require.async.apply(this, arguments);
        }

        id = require.alias(id);

        var mod = modulesMap[id];
        if (mod) {
            return mod.exports;
        }

        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            throw '[ModJS] Cannot find module `' + id + '`';
        }

        mod = modulesMap[id] = {
            exports: {}
        };

        //
        // factory: function OR value
        //
        var ret = (typeof factory === 'function') ? factory.apply(mod, [require, mod.exports, mod]) : factory;

        if (ret) {
            mod.exports = ret;
        }

        return mod.exports;
    };

    require.async = function (names, onload, onerror) {
        if (typeof names === 'string') {
            names = [names];
        }

        var needMap = {};
        var needNum = 0;
        var needLoad = [];

        function findNeed(depArr) {
            var child;

            for (var i = 0, n = depArr.length; i < n; i++) {
                //
                // skip loading or loaded
                //
                var dep = require.alias(depArr[i]);

                if (dep in needMap) {
                    continue;
                }

                needMap[dep] = true;

                if (dep in factoryMap) {
                    // check whether loaded resource's deps is loaded or not
                    child = resMap[dep] || resMap[dep + '.js'];
                    if (child && 'deps' in child) {
                        findNeed(child.deps);
                    }
                    continue;
                }

                needLoad.push(dep);
                needNum++;

                child = resMap[dep] || resMap[dep + '.js'];
                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
            }
        }

        function updateNeed() {
            if (0 === needNum--) {
                var args = [];
                for (var i = 0, n = names.length; i < n; i++) {
                    args[i] = require(names[i]);
                }

                onload && onload.apply(global, args);
            }
        }

        findNeed(names);
        loadScripts(needLoad, updateNeed, onerror);
        updateNeed();
    };

    require.ensure = function(names, callback) {
      require.async(names, function() {
        callback && callback.call(this, require);
      });
    };

    require.resourceMap = function (obj) {
        var k;
        var col;

        // merge `res` & `pkg` fields
        col = obj.res;
        for (k in col) {
            if (col.hasOwnProperty(k)) {
                resMap[k] = col[k];
            }
        }

        col = obj.pkg;
        for (k in col) {
            if (col.hasOwnProperty(k)) {
                pkgMap[k] = col[k];
            }
        }
    };

    require.loadJs = function (url) {
        if (url in scriptsMap) {
            return;
        }

        scriptsMap[url] = true;

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
    };

    require.loadCss = function (cfg) {
        if (cfg.content) {
            var sty = document.createElement('style');
            sty.type = 'text/css';

            if (sty.styleSheet) { // IE
                sty.styleSheet.cssText = cfg.content;
            }
            else {
                sty.innerHTML = cfg.content;
            }
            head.appendChild(sty);
        }
        else if (cfg.url) {
            var link = document.createElement('link');
            link.href = cfg.url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        }
    };


    require.alias = function (id) {
        return id.replace(/\.js$/i, '');
    };

    require.timeout = 5000;

})(this);

/*!app/config/api.js*/
;define("app/config/api",function(e,a,r){"use strict";var s={login:"acewill/user/loginUser.htm",selectcompanyforms:"merchant/user/selectcompanyforms.htm",userinsert:"merchant/user/userinsert.htm",validateusername:"merchant/user/validateusername.htm",uploadfile:"merchant/user/uploadfile.htm"},t="/";r.exports={api:s,basepath:t}});
/*!app/tool/Tool.js*/
;define("app/tool/Tool",function(e,r,t){"use strict";function n(){return h=a("islogin")?!0:!1,{islogin:h}}function o(e,r,t){var n=new Date;n.setTime(n.getTime()+60*t*60*1e3);var o="expires="+n.toUTCString();document.cookie=e+"="+r+"; "+o}function a(e){for(var r=e+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){for(var o=t[n];" "==o.charAt(0);)o=o.substring(1);if(-1!=o.indexOf(r))return o.substring(r.length,o.length)}return""}function i(e){o(e,"",-1)}function s(e,r,t){return e&&e.addEventListener?(e.addEventListener(r,t,!1),{remove:function(){e.removeEventListener(r,t,!1)}}):e&&e.attachEvent?(e.attachEvent("on"+r,t),{remove:function(){e.detachEvent("on"+r,t)}}):void 0}function u(e){var r,t=e.type.toLowerCase();return"mouseover"==t?r=e.relatedTarget||e.fromElement:(t="mouseout")&&(r=e.relatedTarget||e.toElement),r}function l(e,r){return e.contains?e!=r&&e.contains(r):!!(16&e.compareDocumentPosition(r))}function c(e,r){var t=s(e,"mouseover",function(n){var o=u(n);return e==o||l(e,o)||r&&r(n),t})}function g(e,r){var t=s(e,"mouseout",function(n){var o=u(n);return e==o||l(e,o)||r&&r(n),t})}function f(r,t,a){if(!r||!r.url||!m.api[r.url])throw"http请求,url参数不能为空";var s={data:{},method:"post"},u={};u.url=m.basepath+m.api[r.url],u.data=r.data||s.data,u.method=r.method||s.method;var l=p(u.data);if(window.XMLHttpRequest)var c=new XMLHttpRequest;else var c=new ActiveXObject("Microsoft.XMLHTTP");c.onreadystatechange=function(){if(4==c.readyState){var r=c.status;if(r>=200&&300>r){var s=JSON.parse(c.responseText);if(s&&JSON.parse(s.success))t&&t(s.result||"");else if(404==s.err_code){i("islogin");var u=e("app/component/dialog/dialog.tpl");u.create({content:"登录超时,是否重新登录",height:200,width:350},function(r){if(1==r){var t=e("app/component/logindialog/logindialog.tpl");t.create()}})}else a&&a(s.err_msg||"服务器返回错误");n.islogin&&o("islogin","1",.5)}else a&&a(r)}},"GET"==u.method.toUpperCase()?(c.open("GET",u.url+"?"+l,!0),c.send(null)):"POST"==u.method.toUpperCase()&&(c.open("POST",u.url,!0),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(l))}function p(e){var r=[];for(var t in e)r.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return r.join("&")}function v(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}function d(e){for(var r={success:!0,content:[],errorMsg:""},t=e,n=0;n<t.elements.length;n++){var o=t.elements[n];if((!o.style||"none"!=o.style.display)&&"INPUT"==o.tagName.toUpperCase()||"SELECT"==o.tagName.toUpperCase()){var a=o.getAttribute("id");if(a){var i=o.getAttribute("valid");if(i){for(var s=i.split("|"),u=!0,l=0;l<s.length;l++){var c=s[l];if(M[c])if(M[c].fun)if(M[c].fun(o.value));else{if("require"!==c&&""!=o.value){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}if("require"==c){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}}else{var g=new RegExp(M[c].reg);if(g.test(o.value));else{if("require"!==c&&""!=o.value){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}if("require"==c){r.success=!1,r.errorMsg=o.getAttribute("errorMsg")||M[c].errorMsg,u=!1;break}}}}if(!u)break;r.content.push({name:a,value:o.value})}else r.content.push({name:a,value:o.value})}}}return r}var m=e("app/config/api"),h=!0,M={require:{reg:"(^s+)|(s+$)",errorMsg:"*号为必填项!",fun:function(e){return""!=e.replace(/ /g,"")?!0:!1}},num:{reg:"^[0-9]*[1-9][0-9]*$",errorMsg:"必须为数字"},email:{reg:"^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",errorMsg:"邮箱输入不合法"},phone:{reg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,errorMsg:"手机号输入不合法"}};t.exports={getCookie:a,setCookie:o,clearCookie:i,getLoginState:n,listen:s,mouseenter:c,mouseleave:g,validator:d,ajax:f,xss:v}});
/*!app/page/product/product.js*/
;"use strict";function toggleProduct(){for(var e=0;e<navs.length;e++)!function(e){tool.listen(navs[e],"click",function(){for(var o=0;o<navs[e].parentNode.childNodes.length;o++)if("li"==navs[e].parentNode.childNodes[o].nodeName.toLowerCase())if(navs[e].parentNode.childNodes[o]==navs[e])pages[e].style.display="block",navs[e].parentNode.childNodes[o].childNodes[0].className="hover",navs[e].parentNode.childNodes[o].childNodes[0].childNodes[0].childNodes[0].src=imgs2[e];else{var s=navs[e].parentNode.childNodes[o].childNodes[0].childNodes[1].innerHTML;navs[e].parentNode.childNodes[o].childNodes[0].className=" ",pages[e].parentNode.childNodes[o].style.display="none",navs[e].parentNode.childNodes[o].childNodes[0].childNodes[0].childNodes[0].src=imgs1[s]}})}(e)}function targetPage(){for(var e=window.location.search.substr(1).split("=")[1],o={org:0,power:4,proval:3,pay:2,time:1,move:5},s=0;s<navs.length;s++)!function(s){s=o[e];for(var d=0;d<navs[s].parentNode.childNodes.length;d++)if("li"==navs[s].parentNode.childNodes[d].nodeName.toLowerCase())if(navs[s].parentNode.childNodes[d]==navs[s])pages[s].style.display="block",navs[s].parentNode.childNodes[d].childNodes[0].className="hover",navs[s].parentNode.childNodes[d].childNodes[0].childNodes[0].childNodes[0].src=imgs2[s];else{var i=navs[s].parentNode.childNodes[d].childNodes[0].childNodes[1].innerHTML;navs[s].parentNode.childNodes[d].childNodes[0].className=" ",pages[s].parentNode.childNodes[d].style.display="none",navs[s].parentNode.childNodes[d].childNodes[0].childNodes[0].childNodes[0].src=imgs1[i]}}(s)}var tool=require("app/tool/Tool"),navs=document.querySelectorAll(".nav-bar ul li"),pages=document.querySelectorAll(".page"),imgs1={"组织与员工":"../../../resource/image/icon1.png","时间管理":"../../../resource/image/icon5.png","薪酬管理":"../../../resource/image/icon4.png","审批":"../../../resource/image/icon3.png","权限管理":"../../../resource/image/icon2.png","移动端":"../../../resource/image/icon6.png"},imgs2=["../../../resource/image/icon11.png","../../../resource/image/icon55.png","../../../resource/image/icon44.png","../../../resource/image/icon33.png","../../../resource/image/icon22.png","../../../resource/image/icon66.png"];targetPage(),toggleProduct();
