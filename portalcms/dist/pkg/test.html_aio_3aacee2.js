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
/*!lib/md5.js*/
;define('lib/md5', function(require, exports, module) {

  !function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
  

});

