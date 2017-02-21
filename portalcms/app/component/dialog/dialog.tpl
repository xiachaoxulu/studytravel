<!-- 
@require "dialog.less" 
-->
<div class="dialog-container">
	<div class="container">
		{{#close}}<div class="close"><a href="javascript:void(0)" class="icon"></a></div>{{/close}}
		<div class="title">{{title}}</div>
		<div class="content">{{{content}}}</div>
		{{#showfooter}}
		<div class="footer">
			<a class="btn0">确定</a>
			<a class="btn1">取消</a>
		</div>
		{{/showfooter}}
	</div>
</div>