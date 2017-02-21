define("app/tool/exportExcelTool",function(e,t,n){"use strict";var o={datatype:"json",dataset:[],columns:[],returnUri:!1,worksheetName:"My Worksheet",fileName:"工作档案",encoding:"utf-8"},r={},a=function(e){function t(){var e=r.datatype.toLowerCase();switch(i(e),e){case"json":h=s(c())}return r.returnUri?h:void a(h)}function n(e,t,n){t=t||"",n=n||512;var o,r=window.atob(e),a=[];for(o=0;o<r.length;o+=n){var i,c=r.slice(o,o+n),s=new Array(c.length);for(i=0;i<c.length;i+=1)s[i]=c.charCodeAt(i);var d=new window.Uint8Array(s);a.push(d)}var l=new window.Blob(a,{type:t});return l}function a(e){var t,o="application/vnd.ms-excel",a=r.fileName+".xls";if(window.navigator.msSaveBlob)return t=n(e,o),window.navigator.msSaveBlob(t,a),!1;var i=document.createElementNS("http://www.w3.org/1999/xhtml","a"),c=document.createEvent("MouseEvents");if(c.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),window.URL.createObjectURL){t=n(e,o);var s=window.URL.createObjectURL(t,o);i.download=a,i.href=s,i.dispatchEvent(c)}else{var d="data:"+o+";base64,"+e;i.download=a,i.href=d,i.dispatchEvent(c)}return!0}function i(e){switch(e){case"table":break;case"json":u=r.dataset}}function c(){var e="<table>";return e+="<thead><tr>",r.columns.forEach(function(t){t.ishidden||(e+="<th",null!=t.width&&(e+=" style='width: "+t.width+"'"),e+=">",e+=t.headertext,e+="</th>")}),e+="</tr></thead>",e+="<tbody>",u.forEach(function(t){e+="<tr>",r.columns.forEach(function(n){t.hasOwnProperty(n.datafield)&&(n.ishidden||(e+="<td",null!=n.width&&(e+=" style='width: "+n.width+"'"),e+=">",e+=t[n.datafield],e+="</td>"))}),e+="</tr>"}),e+="</tbody>",e+="</table>"}function s(e){var t="<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";t+="<head>",t+='<meta http-equiv="Content-type" content="text/html;charset='+r.encoding+'" />',t+="<!--[if gte mso 9]>",t+="<xml>",t+="<x:ExcelWorkbook>",t+="<x:ExcelWorksheets>",t+="<x:ExcelWorksheet>",t+="<x:Name>",t+="{worksheet}",t+="</x:Name>",t+="<x:WorksheetOptions>",t+="<x:DisplayGridlines/>",t+="</x:WorksheetOptions>",t+="</x:ExcelWorksheet>",t+="</x:ExcelWorksheets>",t+="</x:ExcelWorkbook>",t+="</xml>",t+="<![endif]-->",t+="</head>",t+="<body>",t+=e.replace(/"/g,"'"),t+="</body>",t+="</html>";var n={worksheet:r.worksheetName,table:e};return d(l(t,n))}function d(e){return window.btoa(unescape(encodeURIComponent(e)))}function l(e,t){return e.replace(/{(\w+)}/g,function(e,n){return t[n]})}r.containerid=e.containerid||o.containerid,r.datatype=e.datatype||o.datatype,r.dataset=e.dataset||o.dataset,r.columns=e.columns||o.columns,r.returnUri=e.returnUri||o.returnUri,r.worksheetName=e.worksheetName||o.worksheetName,r.encoding=e.encoding||o.encoding,r.fileName=e.fileName||o.fileName;var h,u=[];return t()};n.exports={exportExcelTool:a}});