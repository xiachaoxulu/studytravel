import Vue from 'vue'
    // import mock from '../config-mock' // 发布时，务必卸载mock
    // const mockData = Vue.__Developing ? mock : {}; // 判断是否开启全局mock数据
const mockData = {};
if (!Vue.__Developing) {
    console.log('调试模式已关闭，请卸载mock数据')
}


/**左填充
 * [padleft description]
 * @param  {[type]} source  [description]
 * @param  {[type]} char    [description]
 * @param  {[type]} howlong [description]
 * @return {[type]}         [description]
 */
function padleft(source, char, howlong) {
    if (Array.from(arguments).length < 3 || typeof char != 'string' || char.length != 1 || typeof howlong != 'number') {
        return null;
    }
    source = source.toString();
    if (source.length == howlong) {
        return source;
    } else {
        var _str = Array(howlong).join(char) + source;
        return _str.slice(_str.length - howlong);
    }

};
/**右填充
 * [padright description]
 * @param  {[type]} source  [description]
 * @param  {[type]} char    [description]
 * @param  {[type]} howlong [description]
 * @return {[type]}         [description]
 */
function padright(source, char, howlong) {
    if (Array.from(arguments).length < 3 || typeof char != 'string' || char.length != 1 || typeof howlong != 'number') {
        return null;
    }
    source = source.toString();
    if (source.length == howlong) {
        return source;
    } else {
        var _str = source + Array(howlong).join(char);
        return _str.slice(0, howlong);
    }
}

// ajax
function ajax(arg) {

    let urls = arg.url.split('.');

    // console.log(urls)

    // 获取api中的地址
    let realUrl = Vue.apiConfig;
    for (let i = 0, len = urls.length; i < len; i++) {
        realUrl = realUrl[urls[i]]
    }

    let basePath = Vue.__Basepath;
    realUrl = basePath + realUrl;
    console.log(realUrl)

    var options = {
        url: realUrl,
        data: arg.data,
        method: arg.method || Vue.__HttpMethod,
        success: arg.success || function() {},
        error: arg.error || function() {}
    }

    // console.log(options.method)

    // console.log(urls[1])
    // console.log(mock[urls[1]])
    // console.log(mock[urls[1]].inservice)

    // test mock
    if (Vue.__Developing && !!urls[1] && mock[urls[1]] && mock[urls[1]].inservice) {

        function mockTest(props) {

            let mockdata = mock;

            // console.log(urls)

            for (let i = 1; i < urls.length; i++) {

                if (typeof(mockdata[urls[i]]) == 'function') {
                    mockdata = mockdata[urls[i]](props);
                } else {
                    mockdata = mockdata[urls[i]]
                }
            }

            // console.log(mockdata)

            return {
                data: mockdata.result,
                res: {
                    data: mockdata
                }
            };

        }

        var mockdata = mockTest(arg.data)

        // console.log('—— get mockdata from —— '+arg.url)
        // console.log(mockdata)

        options.success(mockdata.data, mockdata.res);

        return;
    }
    // 请求数据
    Vue.http({
        url: options.url,
        data: options.data,
        method: options.method,
        emulateJSON: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        // // 每请求一次，则更新登陆过期时间
        // Vue.Tool.cookie.set('hasLogin', 1, 'h0.5');

        // 成功
        if (response.data.err_code - 0 == 8888) {
            options.success(response.data.result, response)
        }
        // 登陆状态失效
        else if (response.data.err_code - 0 == 4444) {

            Vue.router.app.setLoginStatus(false)
            Vue.router.go({
                path: '/Login'
            });

        } else {
            console.warn(response.data.err_msg)
            options.error(response.data.err_msg,response.data.err_code)
        }

    }, function(response) {

        options.error(response.statusText)

    })
}

/**
 * 异步加载队列
 * @param  {Array}    list     执行列表
 * @param  {Function} callback 加载完成回调函数
 * @param  {Boolean}  type     是否按顺序加载执行
 * @return {Function}
 */
function asyncLoader(list, callback, type) {

    var loaders = list.length;
    var list = list;

    /* 顺序加载 */
    if (type) {
        return function fn() {

            let handler = list.shift();

            if (list.length == 0) {
                handler(() => {
                    callback();
                })
            } else {
                handler(() => {
                    fn();
                })
            }

        };
    }
    /* 并行加载 */
    else {
        return function fn() {

            let handler = list.shift();
            handler(() => {
                loaders--;
                if (loaders == 0) {
                    callback();
                }

            });

            if (list.length > 0) {
                fn();
            }

        };
    }
}



// 日期计算
// required by [modules/schedule]
function iDate(time, style, diff) {
    // 如果传入的是时间戳，必须是number类型，否则报错

    var d = diff || 0;

    var date = new Date(new Date(time).getTime() + d * (1000 * 60 * 60 * 24));

    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    var db = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        mm: ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
        d: date.getDate(),
        dd: (date.getDate() < 10 ? '0' : '') + date.getDate(),

        _h: date.getHours(),
        _hh: (date.getHours() < 10 ? '0' : '') + date.getHours(),
        _m: date.getMinutes(),
        _mm: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        _s: date.getSeconds(),
        _ss: (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),

        lastDay: '',
        w: weekDay[date.getDay()],
        week:date.getDay(),
        time: date.getTime(),
        string: ''
    }

    if (db.m + 1 > 12) {
        var nextMonthDay1 = new Date((db.y + 1) + '/01/1');
    } else {
        var nextMonthDay1 = new Date(db.y + '/' + (db.m + 1) + '/1');
    }



    // 本月末 = 下月初1-1000毫秒
    db.lastDay = (new Date(nextMonthDay1.getTime() - 1000)).getDate();


    if (style && style.indexOf('yy/mm/dd') > -1) {

        db.string = db.y + '/' + db.mm + '/' + db.dd

    } else if (style && style.indexOf('yymmdd') > -1) {

        db.string = db.y + '' + db.mm + '' + db.dd

    } else if (style && style.indexOf('yy-mm-dd') > -1) {

        db.string = db.y + '-' + db.mm + '-' + db.dd

    } else {
        db.string = db.y + '/' + db.m + '/' + db.d;
    }
    if (style && style.indexOf('hh:mm:ss') > -1) {

        db.string += ' ' + db._hh + ':' + db._mm + ':' + db._ss;

    }



    // console.log(db.string)

    return db;

}

// 将数组转换为树型结构
//      arrNode: 树节点数组
//      pAttr: 父节点id属性名称,默认'parentID'
//      idAttr: 节点id树型名称,默认'ID'
function convertToTree(arrNode, pAttr, idAttr) {
    if (!Array.isArray(arrNode)) return [];
    pAttr = pAttr || 'parentID';
    idAttr = idAttr || 'ID';
    var map = {},
        node, roots = [];

    for (var i = 0; i < arrNode.length; i++) {
        node = arrNode[i];
        if (!node.children) node.children = [];
        if (node.leaf == undefined) node.leaf = true;
        map[node[idAttr]] = i;
    }
    for (var i = 0; i < arrNode.length; i++) {
        node = arrNode[i];
        // 判断当前节点是否为根节点
        var isRoot = false;
        if (node[pAttr] == null || node[pAttr] == undefined) { // 若当前节点的parentID属性为null或undefined,则说明当前节点是根节点
            isRoot = true;
        } else {
            if (map[node[pAttr]] == undefined) { // 否则,若当前节点的parentID在节点数组中没有ID与之相等，说明该parentID无效,也说明当前节点是根节点
                isRoot = true;
            }
        }
        if (!isRoot) { // 若当前节点不是根节点
            // 将其挂载到其父节点的children下，且其父节点的叶子属性改为false
            arrNode[map[node[pAttr]]].children.push(node);
            arrNode[map[node[pAttr]]].leaf = false;
        } else { // 若当前节点为根节点，则直接添加的树根数组中
            roots.push(node);
        }
    }
    return roots;
}
var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
}

function verifyBirthday(year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        //判断年份的范围（3岁到100岁之间)
        var time = now_year - year;
        if (time >= 3 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
}

function changeFivteenToEighteen(card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0,
            i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
}

function IDCardResolve(idCardNo) {
    console.log(idCardNo);
    if (idCardNo == "") {
        return false;
    }
    ////检查号码是否符合规范，包括长度，类型
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(idCardNo) === false) {
        return false;
    }
    //检查省份
    var province = idCardNo.substr(0, 2);
    if (city[province] == undefined) {
        return false;
    }
    //生日
    var len = idCardNo.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = idCardNo.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19' + year + '/' + month + '/' + day);
        if (!verifyBirthday('19' + year, month, day, birthday)) {
            return false;
        }
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = idCardNo.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year + '/' + month + '/' + day);
        if (!verifyBirthday(year, month, day, birthday)) {
            return false;
        }
    }
    idCardNo = changeFivteenToEighteen(idCardNo);
    len = idCardNo.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0,
            i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += idCardNo.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum != idCardNo.substr(17, 1)) {
            return false;
        }
    }

    var result = {};
    var province = idCardNo.substring(0, 2);
    province = city[province];
    var birthday = '';
    if (idCardNo.length == 15) {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = idCardNo.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        birthday = '19' + year + "-" + month + "-" + day;
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    else if (idCardNo.length == 18) {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = idCardNo.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        birthday = year + "-" + month + "-" + day;
    } else return;
    var str = idCardNo;
    var sex = (str.substr(str.length - 2, 1) - 0) % 2 == 0 ? "女" : "男";

    result.birthday = birthday;
    result.province = province;
    result.gender = sex;
    return result;
}


// get cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
// delete cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// set cookie
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);

    // console.log(iDate(exp).string)

    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// expires time
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

let cookie = {
    set: setCookie,
    get: getCookie,
    del: delCookie
}


function install(Vue) {

    Vue.Tool = Vue.tool = {
        ajax,
        asyncLoader,
        iDate,
        convertToTree,
        IDCardResolve,
        cookie,
        padleft,
        padright
    }

    Object.defineProperties(Vue.prototype, {

        $Tool: {
            get: function() {
                return Vue.Tool
            }
        },


    });


}

if (window.Vue) {
    Vue.use(install);
}

module.exports = install;
