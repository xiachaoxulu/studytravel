/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),f=e.webkitRequestFileSystem,u=e.requestFileSystem||f||e.mozRequestFileSystem,s=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c="application/octet-stream",d=0,l=500,w=function(t){var r=function(){if(typeof t==="string"){n().revokeObjectURL(t)}else{t.remove()}};if(e.chrome){r()}else{setTimeout(r,l)}},p=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var i=e["on"+t[r]];if(typeof i==="function"){try{i.call(e,n||e)}catch(o){s(o)}}}},v=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob(["\ufeff",e],{type:e.type})}return e},y=function(t,s,l){if(!l){t=v(t)}var y=this,m=t.type,S=false,h,R,O=function(){p(y,"writestart progress write writeend".split(" "))},g=function(){if(R&&a&&typeof FileReader!=="undefined"){var r=new FileReader;r.onloadend=function(){var e=r.result;R.location.href="data:attachment/file"+e.slice(e.search(/[,;]/));y.readyState=y.DONE;O()};r.readAsDataURL(t);y.readyState=y.INIT;return}if(S||!h){h=n().createObjectURL(t)}if(R){R.location.href=h}else{var i=e.open(h,"_blank");if(i==undefined&&a){e.location.href=h}}y.readyState=y.DONE;O();w(h)},b=function(e){return function(){if(y.readyState!==y.DONE){return e.apply(this,arguments)}}},E={create:true,exclusive:false},N;y.readyState=y.INIT;if(!s){s="download"}if(i){h=n().createObjectURL(t);r.href=h;r.download=s;setTimeout(function(){o(r);O();w(h);y.readyState=y.DONE});return}if(e.chrome&&m&&m!==c){N=t.slice||t.webkitSlice;t=N.call(t,0,t.size,c);S=true}if(f&&s!=="download"){s+=".download"}if(m===c||f){R=e}if(!u){g();return}d+=t.size;u(e.TEMPORARY,d,b(function(e){e.root.getDirectory("saved",E,b(function(e){var n=function(){e.getFile(s,E,b(function(e){e.createWriter(b(function(n){n.onwriteend=function(t){R.location.href=e.toURL();y.readyState=y.DONE;p(y,"writeend",t);w(e)};n.onerror=function(){var e=n.error;if(e.code!==e.ABORT_ERR){g()}};"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=y["on"+e]});n.write(t);y.abort=function(){n.abort();y.readyState=y.DONE};y.readyState=y.WRITING}),g)}),g)};e.getFile(s,{create:false},b(function(e){e.remove();n()}),b(function(e){if(e.code===e.NOT_FOUND_ERR){n()}else{g()}}))}),g)}),g)},m=y.prototype,S=function(e,t,n){return new y(e,t,n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){if(!n){e=v(e)}return navigator.msSaveOrOpenBlob(e,t||"download")}}m.abort=function(){var e=this;e.readyState=e.DONE;p(e,"abort")};m.readyState=m.INIT=0;m.WRITING=1;m.DONE=2;m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null;return S}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!=null){define([],function(){return saveAs})}


function downloadFile(filename, header, data) {

	var DownloadEvt = null;

    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./)) {
        // Internet Explorer (<= 9) workaround by Darryl (https://github.com/dawiong/tableExport.jquery.plugin)
        // based on sampopes answer on http://stackoverflow.com/questions/22317951
        // ! Not working for json and pdf format !
        var frame = document.createElement("iframe");

        if (frame) {
            document.body.appendChild(frame);
            frame.setAttribute("style", "display:none");
            frame.contentDocument.open("txt/html", "replace");
            frame.contentDocument.write(data);
            frame.contentDocument.close();
            frame.focus();

            frame.contentDocument.execCommand("SaveAs", true, filename);
            document.body.removeChild(frame);
        }
    } else {
        var DownloadLink = document.createElement('a');

        if (DownloadLink) {
            DownloadLink.style.display = 'none';
            DownloadLink.download = filename;

            if (header.toLowerCase().indexOf("base64,") >= 0)
                DownloadLink.href = header + base64encode(data);
            else
                DownloadLink.href = header + encodeURIComponent(data);

            document.body.appendChild(DownloadLink);

            if (document.createEvent) {
                if (DownloadEvt == null)
                    DownloadEvt = document.createEvent('MouseEvents');

                DownloadEvt.initEvent('click', true, false);
                DownloadLink.dispatchEvent(DownloadEvt);
            } else if (document.createEventObject)
                DownloadLink.fireEvent('onclick');
            else if (typeof DownloadLink.onclick == 'function')
                DownloadLink.onclick();

            document.body.removeChild(DownloadLink);
        }
    }
}

function base64encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = utf8Encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

function utf8Encode(string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

// 导出excel
function exportExcel(arg,callback){

    let options = {
        html: '',  // 必须包含table标签
        style: '', // 不包含style标签
        sheetName: '',
        fileName:''
    }

    for (var i in options) {
        options[i] = arg[i]
    }

    var docFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    docFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    docFile += "<head>";
    docFile += "<!--[if gte mso 9]>";
    docFile += "<xml>";
    docFile += "<x:ExcelWorkbook>";
    docFile += "<x:ExcelWorksheets>";
    docFile += "<x:ExcelWorksheet>";
    docFile += "<x:Name>";
    docFile += options.sheetName;
    docFile += "</x:Name>";
    docFile += "<x:WorksheetOptions>";
    docFile += "<x:DisplayGridlines/>";
    docFile += "</x:WorksheetOptions>";
    docFile += "</x:ExcelWorksheet>";
    docFile += "</x:ExcelWorksheets>";
    docFile += "</x:ExcelWorkbook>";
    docFile += "</xml>";
    docFile += "<![endif]-->";
    docFile += "</head>";
    docFile += "<body>";
    docFile += "<style>"+options.style+"</style>";
    docFile += options.html;
    docFile += "</body>";
    docFile += "</html>";

    // console.log(docFile)

    try {
        var blob = new Blob([docFile], {
            type: 'application/vnd.ms-excel'
        });
        saveAs(blob, options.fileName + '.xls');
    } catch (e) {
        downloadFile(options.fileName + '.xls',
            'data:application/vnd.ms-excel;base64,',
            docFile);
    }


    callback && callback();

}


window.exportExcel = exportExcel;
