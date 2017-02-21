define("app/component/head/head",function(e,n,t){"use strict";function i(){var e='{{^islogin}}\r\n<div class="unlogin">\r\n	<input type="button" value="登录" id="loginBtn">\r\n	<input type="button" value="注册" id="regBtn">\r\n</div>\r\n{{/islogin}}\r\n{{#islogin}}\r\n<div class="inlogin">\r\n	<a href="javascript:void(0)" class="photo"></a>\r\n	<div class="item-container">\r\n		<div class="item" data-key="usercenter"><a href="javascript:void(0)">个人中心</a></div>\r\n		<div class="item" data-key="suggest"><a href="javascript:void(0)" >意见反馈</a></div>\r\n		<div class="item" data-key="exit"><a href="javascript:void(0)" >退出</a></div>\r\n	</div>\r\n</div>\r\n{{/islogin}}';g.parse(e);var n=m.getLoginState(),t=g.render(e,n),i=document.querySelector(".header .login");i.innerHTML=t,n.islogin?o():a()}function o(){var e=document.querySelector(".header .photo"),n=document.querySelector(".header .inlogin"),t=document.querySelector(".header .item-container"),i=document.querySelectorAll(".header .item");m.listen(e,"mouseover",function(){t.style.display="block"}),m.mouseleave(n,function(){t.style.display="none"}),Array.prototype.slice.call(i).forEach(function(e){m.listen(e,"click",function(){var n=e.getAttribute("data-key");if(n)switch(n){case"exit":l()}})})}function a(){var n=document.getElementById("loginBtn");m.listen(n,"click",function(){var n=e("../logindialog/logindialog.");n.create(function(){i()})});var t=document.getElementById("regBtn");m.listen(t,"click",function(){window.location.href="/app/page/register/register.html",v&&v()})}function l(){m.clearCookie("islogin"),i()}function c(){for(var e=document.querySelectorAll(".main-nav > ul li"),n=0;n<e.length;n++)!function(n){m.listen(e[n],"click",function(){for(var t=0;t<e[n].parentNode.childNodes.length;t++)"li"==e[n].parentNode.childNodes[t].nodeName.toLowerCase()&&(e[n].parentNode.childNodes[t]==e[n]?(e[n].parentNode.childNodes[t].className="active",console.log(1)):(e[n].parentNode.childNodes[t].className=" ",console.log(2)));u&&u(n)}),m.listen(e[n],"mouseover",function(){"active"!==e[n].className&&(e[n].className="hover")}),m.listen(e[n],"mouseout",function(){"active"!==e[n].className&&(e[n].className="")})}(n)}function r(e){for(var n=document.querySelectorAll(".main-nav > ul li"),t=0;t<n.length;t++)n[t].className="",t==e&&(console.log("active"),n[t].className="active")}function s(e){u=e}function d(e){v=e}var u,v,m=e("app/tool/Tool"),g=e("lib/mustache.min");i(),c(),t.exports={setActive:r,setNavClickCallBack:s,setRegBtnCallBack:d}});