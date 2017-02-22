/**
 * 扫描程序中的权限按钮,插入到后台数据库
 */
var fs = require("fs");
var path = require('path');
var request = require('request');
var pagemap = require('./src/menuMap')


var location = "./src/modules";
var location2 = "./dist/static";
var regex = /__code\s*=\s*"[^"]*"/ig; //code  ="setting-roster-search/花名册查询/disabled"
var regex2 = /__code."[^"]*"/ig;
// var test ='{value:!0});var r=o(8),a=n(r),i=o(172),c=n(i);t["default"]={data:function(){return{state:a["default"].state,showNavbar:!1,menuList:[{text:"添加同级部门",event:"addOrgSibling",show:!0,__code:"org-depttree-addsiblingorg-depttree-addsibling/添加同级部门"},{text:"添加子部门",event:"addOrgChild",show:!0,__code:"org-depttree-addchild/添加子部门"},{text:"修改",event:"editOrgName",show:!0,__code:"org-depttree-edit/修改"}';

// var arr = test.match(regex2);
// console.log(arr);
// // console.log(regex2.test(test));
// return;
var allFiles = []; //所有需要扫描的文件列表
var matchs = []; //所有匹配的按钮

/**
 * 扫描所有文件
 * [scanFiles description]
 * @param  {[type]} location [description]
 * @return {[type]}          [description]
 */
function scanFiles(location) {
    var files = fs.readdirSync(location);
    files.forEach(function(f) {
        var fname = location + path.sep + f;
        var stat = fs.lstatSync(fname);
        if (stat.isDirectory()) {
            scanFiles(fname);
        } else {
            if (fs.existsSync(fname)) {
                allFiles.push(fname);
                console.log('add:' + fname);
            } else {
                console.log('pass:' + fname);
            }
        }
    })
}

/**
 * 读取文件
 * [read description]
 * @return {[type]} [description]
 */
function read(ex) {
    var len = allFiles.length;
    if (len > 0) {
        allFiles.forEach(function(stat, index) {
            console.log("开始读取第:" + index + ",共" + len + "文件");
            var data = fs.readFileSync(stat, "utf-8");
            var arr = data.match(ex);

            if (arr) {
                matchs = matchs.concat(arr);
            }
            console.log("读取第:" + index + "完成");
        })
    } else {
        console.log("文件列表中没有文件");
    }
}
/**发生到服务器
 * [sendToServer description]
 * @return {[type]} [description]
 */
function sendToServer() {
    var params = matchs.map(function(item) {
        if (!(item.split("\"") && item.split("\"")[1])) {
            return null;
        }
        item = item.split("\"")[1];
        var arr = item.split('/');
        if (arr.length >= 2) {
            return {
                pageName: pagemap.getPageName(item),
                ID: arr[0],
                desc: arr[1] ? arr[1] : ''
            }
        }
    }).filter(function(item) {
        if (item) {
            return item;
        }

    })
    console.log(JSON.stringify(params));
    // return;
    // var url="http://43.241.225.53/acewill/OrgEmployee/insertPageBtn.htm";        // 木屋 谨慎！！！
    //
    var url="http://10.0.10.6:8080/acewill/OrgEmployee/insertPageBtn.htm";    // 测试服
    // var url="http://103.37.157.50:8080/acewill/OrgEmployee/insertPageBtn.htm";   // 演示服
    // var url="http://103.37.157.50:9038/acewill/OrgEmployee/insertPageBtn.htm";   // 觅时代
    // var url="http://103.37.157.50:9002/acewill/OrgEmployee/insertPageBtn.htm";   // 鼎盛
    // var url="http://103.37.157.108:9014/acewill/OrgEmployee/insertPageBtn.htm";  // 花悦序发布
    // var url="http://103.37.157.108:9002/acewill/OrgEmployee/insertPageBtn.htm";  // 北京宴
    // var url="http://43.241.226.22/acewill/OrgEmployee/insertPageBtn.htm";        // 东方饺子王
    // var url="http://43.241.226.22:9002/acewill/OrgEmployee/insertPageBtn.htm";   // 拾味馆
    // var url="http://43.241.226.22:9014/acewill/OrgEmployee/insertPageBtn.htm";   // 华工
    // var url="http://103.37.157.108:9026/acewill/OrgEmployee/insertPageBtn.htm";  // 外婆家
    // var url="http://103.37.157.50:9014//acewill/OrgEmployee/insertPageBtn.htm";  // 新煮意

    request.post({
        url: url,
        form: {
            data: JSON.stringify(params)
        }
    },
    function(err, httpResponse, body) {
        console.log('-------------------------------------------')
        console.log('服务器返回=>', httpResponse.body)
    })
}

function start() {
    scanFiles(location);
    read(regex);
    allFiles = [];
    scanFiles(location2);
    read(regex2);
    sendToServer();
}


start();

// var powerScan = {
//   start: start
// }


// module.exports = powerScan
