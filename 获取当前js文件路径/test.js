! function () {

    var getCurrAbsPath = function () {
        var a = {},
            stack;
        try {
            a.b();
        } catch (e) {
            stack = e.stack || e.sourceURL || e.stacktrace;
        }
        var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?\.js/,
            absPath = rExtractUri.exec(stack);
        return absPath[0] || '';
    };

    var curPath = (document.currentScript && document.currentScript.src) || getCurrAbsPath();
    window.swfPath =curPath.replace(/\/\w+?\.js/,'');
}();