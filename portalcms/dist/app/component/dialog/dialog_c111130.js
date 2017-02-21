define("app/component/dialog/dialog",function(e,t,o){"use strict";function n(e,t){function o(){document.body.removeChild(a),p.docmove&&p.docmove.remove(),p.docmup&&p.docmup.remove()}var n={};n.title=e.title||"提示",n.content=e.content||"请输入提示内容",n.close=e.close||!0,n.width=e.width||500,n.height=e.height||300,n.showfooter=void 0==e.showfooter?!0:e.showfooter,c.parse(l);var s=c.render(l,n),a=document.createElement("div"),d="dialog"+Math.floor(1e4*Math.random()+1);a.setAttribute("id",d),a.innerHTML=s,document.body.appendChild(a);var u=document.querySelector("#"+d+" .container"),f=document.querySelector("#"+d+" .dialog-container .title"),m=document.querySelector("#"+d+" .dialog-container .close"),v=document.querySelector("#"+d+" .dialog-container .btn0"),h=document.querySelector("#"+d+" .dialog-container .btn1");500!=n.width&&(u.style.width=n.width+"px"),300!=n.height&&(u.style.height=n.height+"px");var p=i(f,u);return m&&r.listen(m,"click",function(){t&&t(0),o()}),v&&r.listen(v,"click",function(){t&&t(1),o()}),h&&r.listen(h,"click",function(){t&&t(2),o()}),{close:o,dom:u}}function i(e,t){function o(e,o){n&&(l+=e-i,s+=o-c,i=e,c=o,t.offsetLeft-Math.abs(l)>=0?t.style.transform="translate("+l+"px,"+s+"px)":l=0>l?-t.offsetLeft:t.offsetLeft,t.offsetTop-Math.abs(s)>=0?t.style.transform="translate("+l+"px,"+s+"px)":s=0>s?-t.offsetTop:t.offsetTop)}var n=!1,i=0,c=0,l=0,s=0,a=(t.clientWidth,t.clientHeight,void 0),d=void 0;return r.listen(e,"mousedown",function(e){0==e.button&&(n=!0,i=e.x,c=e.y,a=r.listen(document,"mousemove",function(e){o(e.x,e.y)}),d=r.listen(document,"mouseup",function(){n=!1,a.remove(),d.remove(),a=null,d=null}))}),{docmove:a,docmup:d}}var c=e("lib/mustache.min"),r=e("app/tool/Tool"),l='<!-- \r\n@require "app/component/dialog/dialog.less" \r\n-->\r\n<div class="dialog-container">\r\n	<div class="container">\r\n		{{#close}}<div class="close"><a href="javascript:void(0)" class="icon"></a></div>{{/close}}\r\n		<div class="title">{{title}}</div>\r\n		<div class="content">{{{content}}}</div>\r\n		{{#showfooter}}\r\n		<div class="footer">\r\n			<a class="btn0">确定</a>\r\n			<a class="btn1">取消</a>\r\n		</div>\r\n		{{/showfooter}}\r\n	</div>\r\n</div>';o.exports={create:n}});