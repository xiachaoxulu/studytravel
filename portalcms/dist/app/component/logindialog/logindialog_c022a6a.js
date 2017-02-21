define("app/component/logindialog/logindialog",function(e,o,n){"use strict";function r(o){var n=e("app/component/dialog/dialog"),r='<div class="logindialog">\r\n	<p><input type="text" id="username" placeholder="用户名"></p>\r\n	<p><input type="password" id="password" placeholder="密码"></p>\r\n	<p class="forget"><span class="error"></span><a href="javascript:void(0)">忘记密码</a></p>\r\n	<p><input type="button" value="登录" class="login"></p>\r\n</div>';t.parse(r);var l=t.render(r),s=n.create({title:"登录",content:l,height:350,showfooter:!1}),p=(s.dom.querySelector(".logindialog"),s.dom.querySelector(".login")),c=s.dom.querySelector("#username"),d=s.dom.querySelector("#password"),u=s.dom.querySelector(".error");p&&a.listen(p,"click",function(){if(""==c.value.trim()||""==d.value.trim())u.innerHTML=a.xss("用户名或者密码不能为空");else{u.innerHTML=a.xss("");{e("app/component/loading/loading").create(s.dom,{type:"cat"})}a.ajax({url:"login",method:"post",data:{userName:c.value,passWord:i(d.value)}},function(){s.close(),a.setCookie("islogin","1",.5),o&&o({username:c})},function(e){u.innerHTML=e})}})}var a=e("app/tool/Tool"),t=e("lib/mustache.min"),i=e("lib/md5");n.exports={create:r}});