/**
 * @Created Date       : 2016-10-19T11:37:31+08:00
 * @Last Modified time : 2016-12-22T14:23:40+08:00
 */



import Vue from 'vue';
// APP 公用数据 在组件中通过$root.name 获取
const state = {

    // app 信息
    version: '2.0',
    website: 'www.acewill.cn',
    title: '人力管家',
    copyrigth: '奥琦玮信息科技（北京）有限公司',

    // app 状态
    hasLogin: false,

    // button 加载完毕

    hasLoadButtons: false,

    // theme
    theme: 'theme-default',

    // tabs 左侧标签栏
    tabs: {
        // linkStr:{
        // 	link:'/ssdf',
        // 	name:''
        // }
    },

    homePath: '/Home',
    menuData: {},
    // 权限列表 模块 菜单 按钮
    userAuthority: {

        // 左侧菜单
        nav: [

            {
                name: '首页',
                link: '/Home',
                icon: 'icon-nav-home',
                isHome: true
            }, {
                name: '组织与员工',
                link: '/OrgEmployee',
                icon: 'icon-nav-oe',
            }, {
                name: '数据报表',
                // link: '/Statement/demissionAnalysis',
                link: '/Statement/reportMenu',
                icon: 'icon-nav-datatable',
            }, {
                name: '规则设置',
                link: '/Settings',
                icon: 'icon-nav-settings',
            },
        ],

        // 常用功能APP列表
        userCommonFn: [],
        // 权限开启的模块和功能
        userModules: [],

        // 所有功能
        userMenus: {},

        // 按钮权限
        userButtons: {}
    },
    // 字段权限 列选字段 混合表
    tabelFields: {
        // tableName: {
        //     fieldName: {}
        // }
    },
    // 字段权限、列选缓和表的类型
    tableTypes:{
        // talbeName:1 // 1:字段权限表   0: 列选表
    },

    // 所在城市
    cityname: '北京',
    citykey: '101010100',

    // 本周天气
    weather: [],
    weatherData: {},

    /* 全局操作提示 */
    tip: {
        show: false,
        type: 'success', // 提示类型 success,warning,info,danger
        msg: '',
        duration: 3000
    },

    /* 全局确认提示 */
    confirm: {
        show: false,
        freeze: false, // 是否冻结，冻结后 不显示关闭按钮，点击背景不会关闭。
        title: '提示',
        msg: '',
        textOK: '确定',
        textCancel: '取消',
        _confirmed() {
            state.confirm.ok();
            state.confirm.ok = () => {};
        },
        _denied() {
            state.confirm.cancel();
            state.confirm.cancel = () => {};
        },
        ok() {},
        cancel() {},
    },

    //当前登录人字段
    curUserName: '',

    // 防超时操作刷新间隔
    refreshTime:240,
    // 最后访问时间
    lastVisitTime: null
};
// 数据修改
const mutations = {

    AddTabs(key, data) {
        Vue.set(state.tabs, key, data);
    },
    RemoveTabs(key) {
        Vue.delete(state.tabs, key);
    },
    // 信息提示
    SetTipData(data) {
        for (var i in data) {
            state.tip[i] = data[i];
        }
    },
    // 信息确认
    SetConfirmData(data) {
        for (var i in data) {
            state.confirm[i] = data[i];
        }
    },

    SetWeather(data) {
        state.weather = data;

        data.forEach(function(item) {
            // console.log(item.date.string)
            state.weatherData[item.date.string] = item;
        });

        // console.log(state.weatherData)

    },
    //改变当前角色下所有菜单格式
    SetUserAuthority(data) {
        data = data || [];
        // console.log(data);
        state.userAuthority.userMenus = {};
        state.userAuthority.userModules = [];
        for (var i = 0; i < data.length; i++) {
            data[i].moduleName = data[i].menuName;
            data[i].icon = data[i].imagUrl;
            for (var index in state.menuData) {
                if (data[i].ID == index) {
                    data[i].url = state.menuData[index].url;
                    data[i].icon = state.menuData[index].icon;
                }
            }
            state.userAuthority.userMenus[data[i].ID] = data[i];
            if (data[i].ID < 1) {
                state.userAuthority.userModules.$set(state.userAuthority.userModules.length, data[i]);
            }
            state.userAuthority.userModules.forEach(function(item) {
                item.menus = [];
                for (var menu in state.userAuthority.userMenus) {
                    if (item.ID == state.userAuthority.userMenus[menu].parentID) {
                        item.menus.$set(item.menus.length, menu);
                    }
                }
            });
        }
        // console.log(state.userAuthority.userMenus);
        // console.log(state.userAuthority.userModules);
        // console.log(state.userAuthority);

    },
    //当前用户的常用功能菜单
    SetUserCommonFn(data) {
        state.userAuthority.userCommonFn = [];
        for (var i = 0; i < data.length; i++) {
            if (state.userAuthority.userCommonFn.indexOf(data[i].ID + '') == -1) {
                state.userAuthority.userCommonFn.$set(state.userAuthority.userCommonFn.length, data[i].ID + '');
            }
        }

    },
    //设置字段权限
    SetTableField(feildAuthData, cBsuccess) {
        for (var i = 0; i < feildAuthData.length; i++) {
            state.tabelFields[feildAuthData[i].tableName] = feildAuthData[i].fields;
            if (Array.isArray(state.tabelFields.employeeTable)) {
                state.tabelFields.employeeTable = {};
                feildAuthData[i].fields.forEach((item) => {
                    state.tabelFields.employeeTable[item.name] = item;
                })
            }
        }
        cBsuccess(state.tabelFields);

    },
    //设置显示当前登录人名称
    SetCurUserName() {
        state.curUserName = window.localStorage.userName;
    },
    //设置当前角色可用按钮
    SetUserButtons(data) {

        state.userAuthority.userButtons = {};


        if (data && data.buttonList) {
            for (var i = 0; i < data.buttonList.length; i++) {
                // data.buttonList[i].ID = data.buttonList[i].btnCode;
                // data.buttonList[i].name = data.buttonList[i].btnName;
                state.userAuthority.userButtons[data.buttonList[i].btnCode] = 1; //data.buttonList[i];
            }
        };

        // console.warn('state.userAuthority.userButtons',state.userAuthority.userButtons)

        // 保存按钮权限到cookie
        let buttons = JSON.stringify(state.userAuthority.userButtons);

        // console.error(buttons.length)

        // 拆分button

        function splitStringByLength(str, maxLen) {

            let page = Math.ceil(str.length / maxLen);
            let strList = [];

            for (let i = 0; i < page; i++) {
                strList.push(str.substring(i * maxLen, (i + 1) * maxLen));
            }

            return strList;
        }

        let list = splitStringByLength(buttons, 1000);

        let saveList = [];
        list.forEach((str, index) => {
            saveList.push('p' + index);
            // Vue.Tool.cookie.set('p'+index, str, 'd366');
            window.localStorage['p' + index] = str;
        });

        // Vue.Tool.cookie.set('d366Map', JSON.stringify(saveList), 'd366');

        window.localStorage.d366Map = JSON.stringify(saveList);

        state.hasLoadButtons = true;

    },
    ClearUserButtons() {

        let buttonsMap = window.localStorage.d366Map; //Vue.Tool.cookie.get('d366Map');
        // let buttons = Vue.Tool.cookie.get('d366');

        if (buttonsMap) {

            let btnMap = JSON.parse(buttonsMap);
            let buttons = '';

            if (Array.isArray(btnMap)) {

                btnMap.forEach(page => {
                    window.localStorage.removeItem(page);
                });
            }
        }

        window.localStorage.removeItem('d366Map');

    },
    // 从cookie中获取全线按钮列表，TODO: 数据加密，分割，防止4k限制和篡改
    GetAuthorityButtons(callback) {

        let buttonsMap = window.localStorage.d366Map; //Vue.Tool.cookie.get('d366Map');

        // 每次进入系统都要获取最新的按钮权限信息,用于更新本地缓存的信息
        actions.getUserBtn(callback);

        // 优先读取本地缓存信息，防止登录时按钮权限接口请求过慢造成的权限问题。
        // TODO: 可考虑将此部分信息放置在登录成功返回中
        // TODO: 退出或者权限过期后自动清空当前缓存的按钮权限，防止通过修改缓存登录状态进入系统进行操作。
        if (buttonsMap) {

            let btnMap = JSON.parse(buttonsMap);
            let buttons = '';

            if (Array.isArray(btnMap)) {

                btnMap.forEach(page => {
                    buttons += window.localStorage[page];
                });

                // 测试拿到的buttons数据是否完整，如果不完整报错，需要重新拿数据
                try {
                    state.userAuthority.userButtons = JSON.parse(buttons);
                    callback && callback();
                } catch (e) {
                    // actions.getUserBtn();
                }

            } else {
                // actions.getUserBtn();
            }


            // console.log(state.userAuthority.userButtons)

        } else {

            // 重新登录
            // actions.setLoginStatus(false);

            // actions.getUserBtn();

        }

        state.hasLoadButtons = true;

    },

    // 保存表字段数据
    SetTableFieldByName(tabelName, data) {
        state.tabelFields[tabelName] = data;
    }

};
// 操作
const actions = {

    // 检测path是否为左侧固定导航或者其子路由

    checkInNav(path) {

        return state.userAuthority.nav.filter(nav => {

            if (path.indexOf(nav.link) == 0) {
                return true;
            }

        });

    },

    // 添加左侧标签
    addTabs(key, data) {
        mutations.AddTabs(key, data);
    },
    // 关闭左侧标签
    closeTabs(key) {
        mutations.RemoveTabs(key);
    },
    // 显示全局提示信息，默认3s后自动关闭
    showTip(data) {
        data.show = true;
        mutations.SetTipData(data);
    },
    // 手动关闭全局提示信息
    hideTip() {
        mutations.SetTipData({
            show: false
        });
    },

    // 显示全局提示信息，默认3s后自动关闭
    showConfirm(data) {
        data.show = true;
        mutations.SetConfirmData(data);
    },
    // 手动关闭全局提示信息
    hideConfirm() {
        mutations.SetConfirmData({
            show: false
        });
    },

    // 获取本周天气
    getWeather() {

        let _this = this;

        let wType = [
            '晴|icon-w-qing',
            '多云|icon-w-duoyun',
            '阴|icon-w-yin',
            '阵雨|icon-w-zhenyu',
            '雷阵雨|icon-w-leizhenyu',
            '雷阵雨伴有冰雹|icon-w-leizhenyu',
            '雨夹雪|icon-w-yujiaxue',
            '小雨|icon-w-xiaoyu',
            '中雨|icon-w-zhongyu',
            '大雨|icon-w-dayu',
            '暴雨|icon-w-baoyu',
            '大暴雨|icon-w-dabaoyu',
            '特大暴雨|icon-w-tedabaoyu',
            '阵雪|icon-w-zhenxue',
            '小雪|icon-w-xiaoxue',
            '中雪|icon-w-xiaoxue',
            '大雪|icon-w-daxue',
            '暴雪|icon-w-daxue',
            '雾|icon-w-wu',
            '冻雨|icon-w-dongyu',
            '小雨-中雨|icon-w-xiaoyu',
            '中雨-大雨|icon-w-dayu',
            '大雨-暴雨|icon-w-dayu',
            '暴雨-大暴雨|icon-w-baoyu',
            '大暴雨-特大暴雨|icon-w-tedabaoyu',
            '小雪-中雪|icon-w-xiaoxue',
            '中雪-大雪|icon-w-daxue',
            '大雪-暴雪|icon-w-daxue',
            '小雨到中雨|icon-w-xiaoyu',
            '中雨到大雨|icon-w-dayu',
            '大雨到暴雨|icon-w-dayu',
            '暴雨到大暴雨|icon-w-baoyu',
            '大暴雨到特大暴雨|icon-w-tedabaoyu',
            '小雪到中雪|icon-w-xiaoxue',
            '中雪到大雪|icon-w-daxue',
            '大雪到暴雪|icon-w-daxue',
            '小到中雨|icon-w-xiaoyu',
            '中到大雨|icon-w-dayu',
            '大到暴雨|icon-w-dayu',
            '暴雨到大暴雨|icon-w-baoyu',
            '大暴雨到特大暴雨|icon-w-tedabaoyu',
            '小雪到中雪|icon-w-xiaoxue',
            '中雪到大雪|icon-w-daxue',
            '大雪到暴雪|icon-w-daxue',
            '浮尘|icon-w-shachen',
            '扬沙|icon-w-shachen',
            '沙尘暴|icon-w-shachenbao',
            '强沙尘暴|icon-w-qiangshachenbao',
            '霾|icon-w-mai'
        ];

        /**
         * 获取天气图标
         * @param  {String} type 天气名称
         * @return {[type]}      [description]
         */
        function getWeatherIcon(type) {

            // console.log(type)

            let _icon = '';

            wType.forEach(function(item) {

                if (item.indexOf(type + '|') == 0) {
                    _icon = item.split('|')[1];
                }

            });

            return _icon;

        }


        // 请求数据
        Vue.http({
            url: 'http://wthrcdn.etouch.cn/weather_mini?citykey=' + state.citykey,
            method: 'GET',
            emulateJSON: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {

            let data = response.data.data;

            // console.info('天气：',data)

            let _list = [];

            if (data.forecast && data.forecast.length > 0) {

                data.forecast.forEach(function(item, index) {

                    item.date = Vue.tool.iDate(new Date(), 'yy/mm/dd', index),
                        item.icon = getWeatherIcon(item.type);

                    _list.push(item);

                });

            }

            // console.error(_list)
            mutations.SetWeather(_list);


        }, function(response) {

            // console.error(response)

        });

    },

    //当前登录人的常用功能菜单
    loadUserData() {
        Vue.Tool.ajax({
            url: 'api.Accounts.selectSysmenu',
            data: '',
            success(data, res) {
                // console.log(data);
                mutations.SetUserCommonFn(data);
            },
            error(res) {

            }
        });

    },
    //查询所有菜单
    loadAllMenu() {
        Vue.Tool.ajax({
            url: 'api.Accounts.selectMyMenu',
            data: '',
            success(data, res) {
                // console.log(data);
                mutations.SetUserAuthority(data);
            },
            error(res) {

            }
        });
    },
    //当前登录人字段权限
    getTableField() {
        return state.tabelFields;
    },
    // 获取所有数据表字段权限和列选配置
    loadTableField() {
        console.log('loadTableField')
        var fieldPromise = new Promise((resolve, reject) => {
            Vue.Tool.ajax({
                url: 'api.common.getUserTableData',
                data: '',
                success(data, res) {
                    resolve(data);

                },
                error(res) {
                    reject(res);
                }
            })
        })
        Promise.all([fieldPromise]).then((val) => {
            state.tableTypes = {};
            var feildAuthData = val[0];
            for (var i = 0; i < feildAuthData.length; i++) {
                state.tableTypes[feildAuthData[i].tableName] = feildAuthData[i].tableType;
                state.tabelFields[feildAuthData[i].tableName] = {};
                // feildAuthData[i].fields = [];
                Array.isArray(feildAuthData[i].fields) && feildAuthData[i].fields.forEach(item => {
                    state.tabelFields[feildAuthData[i].tableName][item.name] = item;
                })

            }

        }).catch((e) => {
            // if (cbError) cbError(e);
        });
    },

    // 根据表名查询某表自定义字段数据
    loadTableFieldByName(tableName, callback) {
        Vue.Tool.ajax({
            url: 'api.common.getUserTableData',
            data: {
                tableName: tableName
            },
            success(data, res) {
                // console.log(data);
                mutations.SetTableFieldByName(tableName, data);

                callback && callback();
            },
            error(res) {

            }
        });
    },
    //
    /**
     * 查询某个数据表的权限内字段列表
     * @param [String] tableName   表名
     * @param [String] type        类型
     * @param [Function] callback  回调
     */
    selectTableFields(tableName, type, callback) {

        // 默认从缓存获取
        if (tableName && !type) {

            let authData;

            // 如果有表，则初始为空，
            // 如果无表，则返回undefined
            if(state.tabelFields[tableName]){
                authData = {};
            }

            for(let key in state.tabelFields[tableName]){

                if(state.tabelFields[tableName][key].auth!=0){
                    if(!authData) authData = {};
                    authData[key] = state.tabelFields[tableName][key];
                }

            }

            return {
                fieldsData:authData,
                tableType:state.tableTypes[tableName]
            };
        }
        // 加载指定表
        else if (type === 'loadSingle') {
            actions.loadTableFieldByName(tableName, callback)
        }
        // 加载所有表
        else if (type === 'loadAll') {
            actions.loadTableField();
        }

    },
    // 保存某个数据表的列选配置
    saveTableFields(tableName, list, callback) {

        let saveData = {
            tableName: tableName,
            fields: JSON.stringify(list)
        }

        Vue.Tool.ajax({
            url: 'api.common.saveUserTableData',
            data: saveData,
            success(data, res) {

                // console.log(data)

                // 更新当前缓存数据

                if (!state.tabelFields[tableName]) state.tabelFields[tableName] = {};

                data.fields && Array.isArray(data.fields) && data.fields.forEach(item => {
                    // 注意，不能覆盖字段权限所用的auth字段
                    Object.assign(state.tabelFields[tableName][item.name],item)
                });

                console.log('列选字段保存成功', state.tabelFields[tableName])

                callback && callback(state.tabelFields[tableName]);

            },
            error(res) {

            }
        });

        // saveUserCommonFn
        // console.log(tableName,data)
    },

    // 设置登录人数据 包括 常用菜单，所有功能菜单，按钮权限
    setUserAllData(data) {
        mutations.SetCurUserName(data.userName);
        mutations.SetUserCommonFn(data.commonMenu);
        mutations.SetUserAuthority(data.allMenu);
        mutations.SetUserButtons(data.buttons);
    },

    //加载当前角色所含有的功能按钮
    getUserBtn(callback) {
        Vue.Tool.ajax({
            url: 'api.Permission.selectMyButton',
            data: '',
            success(data, res) {


                mutations.SetUserButtons(data);


                setTimeout(() => {
                    callback && callback();
                }, 0);


                // setTimeout(()=>{
                //     console.warn('重新检查按钮权限');
                //     // 重新检查按钮权限
                //     Vue.router.app.$broadcast('recheckAuthority')
                // },1000)

            },
            error() {

            }
        });
    },

    //查询传过来的菜单在不在当前权限里
    checkMenu(name) {
        for (var i in state.userAuthority.userMenus) {
            if (name === state.userAuthority.userMenus[i].menuName) {
                // console.log(name);
                // console.log(state.userAuthority.userMenus[i].menuName);
                return true;
            }

        }
    },
    //保存常用功能
    saveUserCommonFn() {
        var userMenuJSON = [];
        for (var i = 0; i < state.userAuthority.userCommonFn.length; i++) {
            userMenuJSON.$set(userMenuJSON.length, {
                menuID: state.userAuthority.userCommonFn[i],
                orderNum: i
            });
        }
        // console.log(state.userAuthority.userCommonFn);
        Vue.Tool.ajax({
            url: 'api.Accounts.insertUserMenu',
            data: '&userMenuJSON=' + JSON.stringify(userMenuJSON),
            success(data, res) {
                // console.log(data);
            },
            error(res) {

            }
        });

    },
    //设置显示登录人名称
    setCurUserName(userName) {
        mutations.SetCurUserName(userName);
    },

    // 检测登陆状态
    checkLoginStatus() {

        // 判断登陆状态

        let hasLogin = Vue.Tool.cookie.get('hasLogin');

        // console.log(hasLogin)

        return !!hasLogin;
        // return !!window.localStorage.hasLogin

    },
    // 设置登录状态
    setLoginStatus(type) {
        // 登陆成功
        if (type) {
            state.hasLogin = true;
            // window.localStorage.hasLogin = "true";
            Vue.Tool.cookie.del('hasLogin');
            Vue.Tool.cookie.set('hasLogin', 1, 'd366');
        } else {

            // state.hasLogin = false;
            Vue.Tool.cookie.del('hasLogin');
            // Vue.Tool.cookie.del('d366Map');
            mutations.ClearUserButtons();
        }
    },


    // 从cookie中获取全线按钮列表，TODO: 数据加密，分割，防止4k限制和篡改，如果没有cookie，则加载数据
    getAuthorityButtons(callback) {

        mutations.GetAuthorityButtons(callback);

        // callback();

    },

    // 重置接口超时时间，通过刷新接口
    // 需要优化
    resetOvertime(){
        if(!state.hasLogin) return;
        var needVisit = false;
        if(!state.lastVisitTime) {
            state.lastVisitTime = new Date();
            needVisit = true;
        } else {
            var currentTime = new Date();
            var duration = ~~((currentTime.getTime() - state.lastVisitTime.getTime()) / 1000);
            if(duration >= state.refreshTime) {
                needVisit = true;
                state.lastVisitTime = currentTime;
            }
        }
        if(needVisit) {
            Vue.Tool.ajax({
                url: 'api.Accounts.login',
                success(data, res) {
                },
                error(res) {
                }
            });
        }
    },

};

export default {
    state,
    mutations,
    actions
};
