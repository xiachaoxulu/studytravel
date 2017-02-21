{{^islogin}}
<div class="unlogin">
	<input type="button" value="登录" id="loginBtn">
	<input type="button" value="注册" id="regBtn">
</div>
{{/islogin}}
{{#islogin}}
<div class="inlogin">
	<a href="javascript:void(0)" class="photo"></a>
	<div class="item-container">
		<div class="item" data-key="usercenter"><a href="javascript:void(0)">个人中心</a></div>
		<div class="item" data-key="suggest"><a href="javascript:void(0)" >意见反馈</a></div>
		<div class="item" data-key="exit"><a href="javascript:void(0)" >退出</a></div>
	</div>
</div>
{{/islogin}}