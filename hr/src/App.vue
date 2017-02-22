<!--
* @Created Date       : 2016-12-06T10:13:23+08:00
* @Last Modified time : 2016-12-22T14:47:42+08:00
 -->


<template>
    <div :class="[state.theme,!openLeftBar?'hasClosedLeftBar':'']">
        <!-- 左侧栏 vue -->
        <div class="app-aside" v-if="state.hasLogin">
            <h1 class="app-title">人力管家</h1>

            <div id="toggleSidebar" title="显示/隐藏导航栏">
                <span class="icon icon-tool icon-tool-keyboardarrowright" v-if="!openLeftBar" @click="openLeftBar=!openLeftBar"></span>
                <span class="icon icon-tool icon-tool-keyboardarrowleft" v-if="!!openLeftBar" @click="openLeftBar=!openLeftBar"></span>
            </div>

            <!-- <div class="app-search"> -->
            <!-- <span class="_icon"></span> -->
            <!-- <input class="_input" type="text" name="" id=""> -->
            <!-- </div> -->
            <!-- 菜单 -->
            <nav class="app-nav" style="margin-top: 20px;">
<ul>
    <li v-for="nav in state.userAuthority.nav" v-link="{path:nav.link , activeClass:'active'}" @click="changeView(nav.isHome)">
        <span class="icon icon-nav {{nav.icon}}"></span> <strong>{{nav.name}}</strong></li>
</ul>
</nav>
<!-- 标签 -->
<div style="position:absolute;top:300px;bottom:140px;left:0;right:0;width:180px;">
<ui-scrollview :opacity='0'>
    <ul class="app-tabs">
        <li v-for="(key, tab) in state.tabs | reverseTabs" v-link="{path:tab.link , activeClass:'active'}" @click="changeView()"
            :class="{'active':tab.active}">
            <span class="_name">{{tab.name}}</span>
            <span class="_close" @click="closeTab(key,true)"></span>

        </li>
    </ul>
</ui-scrollview>
</div>
<div class="app-user" @click="showUserMenu==true ? false :showUserMenu=true">
    <div class="app-user-head">
        <!--<div class="app-user-head--pic" :style="{'background-image':'url('+userHeadPicUrl+')'}"></div>-->
        <div class="app-user-head--pic" :style="{'background-image':'url(/acewill/employee/getHeadImag.htm?userId='+userHeadPicUrl+')'}"></div>
    </div>
    <div class="app-user-name">{{!!userName2?userName2:state.curUserName}}</div>
</div>
</div>
<!-- 右侧内容区 router-view -->
<div class="app-content">
    <!-- 默认顶部 -->
    <header v-if="state.hasLogin" class="app-header ui-module-navbar pos-topbar-fixed">
        <app-header :show="showHeader"></app-header>
    </header>
    <!-- router-view  -->
    <router-view transition="main" transition-mode="out-in" keep-alive></router-view>
    <!-- 功能列表 -->
    <app-function v-if="state.hasLogin" :show.sync="showFuns" :editable.sync="editFuns"></app-function>
    <!-- 用户信息 -->
    <!-- <app-userinfo :show.sync="showUser" ></app-userinfo> -->
    <!-- <ui-sidebar :show.sync="showUser" title="个人信息" layout="content">

                      <div slot="content">
                          <app-userinfo></app-userinfo>
                      </div>

                  </ui-sidebar> -->
    <!-- 本周天气 -->
    <ui-modal :show.sync="showWeather" header="本周天气" type="large">
        <div class="ui-panel">
            <table class="table table-bordered">
                <colgroup>
                    <col v-for="item in state.weather" width="150px"></col>
                </colgroup>
                <tbody>
                    <tr>
                        <template v-for="item in state.weather">
                            <td>
                                <p class="text-center" style="font-size: 30px;"><i class="icon-weather {{item.icon}}"></i></p>
<div>{{item.date.m}}月{{item.date.d}}日 {{item.date.w}}</div>
<div>{{item.type}}</div>
<div>{{item.fengxiang=='无持续风向'?'':item.fengxiang+'/'}}{{item.fengli}}</div>
<div>最{{item.high}}/最{{item.low}}</div>
</td>
</template>
</tr>
</tbody>
</table>
</div>
<div slot="footer" class="text-center">
    <ui-button color="success" @click="showWeather=false">确定</ui-button>
</div>
</ui-modal>
</div>
<!-- 系统提示 -->
<ui-alert :type="state.tip.type" :show.sync="state.tip.show" :duration="state.tip.duration" placement="top" width="300px">
    <strong>{{{state.tip.msg}}}</strong>
</ui-alert>
<!-- 全局确认框 -->
<ui-confirm :header="state.confirm.title" :confirm-button-text="state.confirm.textOK" :deny-button-text="state.confirm.textCancel"
    :show.sync="state.confirm.show" :backdrop-dismissible="!state.confirm.freeze" :show-close-button="!state.confirm.freeze"
    close-on-confirm @confirmed="state.confirm._confirmed" @denied="state.confirm._denied">
    {{{state.confirm.msg}}}
</ui-confirm>
<!-- 左下角菜单 -->
<app-user-menu :show-user-menu.sync="showUserMenu"></app-user-menu>
<!-- 全局加载提示 -->
<div class="app-loading" v-if="showLoading" transition="zoom" transition-mode="out-in">
    <ui-progress-circular class="app-loadingBar" :show="true" :size="50"></ui-progress-circular>
    <div class="app-loadingMsg">拼命加载中</div>
</div>
<div class="app-mask" v-if="showMask" transition="zoom" transition-mode="out-in">
    <ui-progress-circular class="app-loadingBar" :show="true" :size="50"></ui-progress-circular>
    <div class="app-loadingMsg">{{maskMsg}}</div>
</div>
</div>
</template>
<script>
    import Vue from 'vue'
    import store from './store'
    import appUserMenu from 'modules/Accounts/view/appUserMenu'
    export default {
        init() {
            // 全局按钮权限检查
            Vue.mixin({
                attached: function () {

                    // console.log('store.state.hasLoadButtons',store.state.hasLoadButtons)

                    /* ***** 权限控制 ****** */

                    // 如果没有加载到按钮权限，则暂时不检查按钮权限
                    if (!store.state.hasLoadButtons) return;

                    console.warn('checking Authority')

                    this.$nextTick(() => {
                        this.$root.checkAuthority();
                    })
                    setTimeout(() => {
                        this.$root && this.$root.checkAuthority();
                    }, 1000)

                },
                events: {
                    recheckAuthority() {
                        console.warn('recheckAuthority')
                        this.$nextTick(() => {
                            this.$root.checkAuthority();
                        })
                    }
                }
            })

            // 全局事件监听器，用于模块间事件传递
            // 使用方式 在需要监听事件的模块 this.$root._event.$on('eventName')；
            // 使用 this.$root._event.$emit(eventName) 触发事件；
            // eventName 命名规范 moudleName_actionName 例如 accounts_changePw
            this._event = new Vue();

        },
        attached() {
            /* 开发状态，动态设定 __Basepath，发布时需要注释掉 */
            /*if (this.$route.query.server) {
                Vue.__Basepath = `http://${this.$route.query.server}/`
    
                window.localStorage.server = this.$route.query.server;
    
                this.showTip({
                    type: 'success',
                    msg: '设定完成, server=' + this.$route.query.server
                })
            } else if (window.localStorage.server) {
                Vue.__Basepath = `http://${window.localStorage.server}/`;
    
                this.showTip({
                    type: 'success',
                    msg: '设定完成, server=' + window.localStorage.server
                })
            }*/

            /* 检测登录状态 */
            this.checkLogin();
            /* 检测是否是首页 */
            this.checkHome(this.$route.path == this.state.homePath ? true : false);

            if (window.localStorage.userHeadPicUrl == 'undefined') {
                this.userHeadPicUrl = '';
            } else {
                this.userHeadPicUrl = window.localStorage.userHeadPicUrl;
            }
            if (window.localStorage.userName2 == 'undefined') {
                 this.userName2= window.localStorage.userName;
            } else {
                this.userName2 = window.localStorage.userName2;
            }

        },
        ready() {
            // console.log(this.state.userAuthority.userMenus);
            // console.log(this.state.userAuthority.userModules);
            this.store = store;

            // 登陆状态下每次刷新，重新加载数据
            // 现有权限控制策略：登陆时加载权限数据，退出后清空按钮数据缓存，中途刷新重新加载最新数据并缓存按钮权限。
            // TODO: 是否将menu数据也缓存？ 不利于及时更新数据，缓存会导致部分可能中途变动的数据只有重新登陆后才会获取最新数据。
            // TODO: 需要添加路由权限控制，将路由与功能菜单进行关联。
            if (this.getLoginStatus()) {
                // 初始化app 权限列表
                this.loadUserData();
                // 查询所有菜单
                this.loadAllMenu();
                // 从cookie中获取权限按钮列表
                store.actions.getAuthorityButtons(() => {
                    // 重新检测按钮权限
                    this.$nextTick(() => {
                        this.$root.$broadcast('recheckAuthority');
                    })

                });
            };

            // 初始化天气
            store.actions.getWeather();


            // 初始化app 皮肤


            // 初始化全局方法
            this.Vue = Vue;
            this.Tool = Vue.Tool;
            Vue.Tool.showTip = this.showTip;
            Vue.Tool.hideTip = this.hideTip;
            Vue.Tool.showConfirm = this.showConfirm;
            Vue.Tool.hideConfirm = this.hideConfirm;
            Vue.Tool.checkMenu = this.checkMenu;
            Vue.Tool.loadAllMenu = this.loadAllMenu;
            Vue.Tool.loadUserData = this.loadUserData;
            Vue.Tool.setUserAllData = store.actions.setUserAllData;
            Vue.Tool.getUserBtn = store.actions.getUserBtn;
            Vue.Tool.downLoadFile = this.downLoadFile;
            Vue.Tool.toggleMask = this.toggleMask;
            Vue.Tool.getTableField = this.getTableField;

            // 事件监听
            this._event.$off('global_mustChangePw');
            this._event.$on('global_mustChangePw', () => {
                this._event.$emit('accounts_changePw');
            })

            /* 检测是否需要修改密码 */
            if (window.localStorage.mustChangePw === 'true') {
                if (this.getLoginStatus()) {
                    this._event.$emit('global_mustChangePw');
                }
            }


            // 列选设置
            this.columnConfig = {
                select: store.actions.selectTableFields,
                save: store.actions.saveTableFields
            }

            // 防止操作中超时
            document.querySelector('body').addEventListener('click',function(){
                store.actions.resetOvertime();
            })
        },
        data() {
            return {
                state: store.state,
                showHeader: true,
                showFuns: false,
                editFuns: false,
                showUser: false,
                showWeather: false,
                showUserMenu: false,
                showLoading: false,
                showMask: false,
                maskMsg: '正在处理,请稍候...',
                loadingTimer: null,
                userHeadPicUrl: '',
                userName2: '',
                openLeftBar: true // 显示左侧栏
            }
        },
        components: {
            appUserMenu
        },
        methods: {
            // 显隐页面加载状态
            toggleLoading(show) {
                this.showLoading = show;
                if (!show) {
                    clearTimeout(this.loadingTimer)
                }
            },
            // 登陆检测
            checkLogin() {
                this.setLoginStatus(store.actions.checkLoginStatus());
            },
            // 设置登录状态
            setLoginStatus(type) {
                store.actions.setLoginStatus(type);
            },
            // 获取登录状态
            getLoginStatus() {
                return store.actions.checkLoginStatus();
            },
            // 全局按钮授权检查
            checkAuthority(el) {

                // return;

                let dom = el || this.$el;
                let _this = this;
                let buttons = this.$el.querySelectorAll('[__code]');

                Array.from(buttons).forEach(function (item) {

                    // code="id/name/disabled"
                    let code = item.getAttribute('__code').split('/');
                    let ID = code[0];

                    if (!_this.checkAuthorityByID(ID)) {

                        // 如果没有设置disable，则默认删除无权限元素
                        if (!code[2]) {

                            if (item.parentNode) {
                                item.parentNode.removeChild(item);
                            } else {
                                console.warn(item)
                            }

                        }
                        // 如果设置disable，则对button添加disabled属性，对非button添加disabled className
                        else {

                            if (item.tagName.toLowerCase() == 'button') {
                                item.setAttribute('disabled', 'disabled');
                            } else {

                                item.classList.add('disabled');

                                // 使用捕获模式，来屏蔽自身及子元素已绑定的click事件
                                item.addEventListener('click', function (e) {
                                    e.stopPropagation();
                                    return false;
                                }, true)

                            }
                        }
                    }
                })

            },
            // 根据ID检测按钮权限
            checkAuthorityByID(id) {
                // return true;
                return !!this.state.userAuthority.userButtons[id] ? true : false;
            },

            // 判断是否为首页
            checkHome(isHome) {

                /* 是否显示首页 header */
                this.showHeader = !!isHome;

            },

            // 关闭多余的tab
            closeMaxTabs() {
                let navH = document.querySelector('nav.app-nav').offsetHeight,
                    appUserH = document.querySelector('div.app-user').offsetHeight,
                    appTitleH = document.querySelector('h1.app-title').offsetHeight,
                    bodyH = document.body.offsetHeight,
                    tabH = 55,
                    tabMax = parseInt((bodyH - navH - appUserH - appTitleH - 30 - 20) / tabH),
                    tabKeys = Object.keys(this.state.tabs);

                if (tabKeys.length > tabMax) {
                    // Vue.delete(this.state.tabs, tabKeys.shift())
                }

            },

            // 打开功能app
            openFn(type, link, name) {

                // 针对于admin进行ing限制
                if (this.isAdmin()) {

                }


                type = type || 'tab';

                console.log(type, link, name)

                if (type == 'tab') {
                    // console.log(link.replace('/', '$'))
                    this.$root.addTabs(link, {
                        name: name,
                        link: link
                    })

                } else {
                    this.$root.changeView();
                }

                // console.log(this.$route.path)
                // console.log(this.$route.link)

                // 当前路由下直接派发事件
                if (this.$route.path == link) {
                    this.$broadcast('routerChange', true);
                    return;
                }


                // 否则改变路由
                this.$router.go(link)

                // 清理多余的tab页
                this.$nextTick(() => {
                    this.closeMaxTabs();
                })

            },
            // 切换视图
            changeView(isHome) {
                this.checkHome(isHome);
            },
            // 添加标签
            addTabs(key, data) {
                store.actions.addTabs(key, data);
                this.checkHome();
            },
            // 关闭标签页
            closeTab(key, type) {

                console.log(key, type)

                // console.error('closeTab')

                // if(!type) return ;

                // 当前标签关闭才打开历史纪录，否则直接关闭，需要排除query的影响
                if (this.$route.path.split('?')[0] == key) {


                    // console.log('is curent path')

                    // 如果属于左侧导航，则跳回左侧导航
                    let nav = store.actions.checkInNav(key);

                    console.log(nav.length, Object.keys(this.state.tabs).length)


                    if (nav.length > 0) {
                        this.$router.go(nav[0].link);
                    }
                    // 所有标签关闭后跳回首页或所属左侧导航
                    else if (Object.keys(this.state.tabs).length <= 1) {
                        this.$router.go('/')
                    } else {

                        // console.log('go -1')

                        window.history.go(-1);
                    }
                    this.checkHome();
                }
                store.actions.closeTabs(key);

            },
            // 显示个人信息
            showUserInfo() {
                this.showUser = true;
            },
            // 显示功能列表
            showAllFuns() {
                this.showFuns = true;
            },


            /* 全局功能 */
            showTip(data) {
                store.actions.showTip(data);
            },
            hideTip() {
                store.actions.hideTip();
            },
            showConfirm(data) {
                store.actions.showConfirm(data);
            },
            hideConfirm() {
                store.actions.hideConfirm();
            },
            ///当前登录人的常用功能菜单
            loadUserData() {
                console.log('loadUserData')
                //初始化当前角色含有的功能按钮
                store.actions.setCurUserName();
                store.actions.loadUserData();
                store.actions.loadTableField();
                // this.getTableField();
            },
            getTableField() {
                return store.actions.getTableField();
            },
            //加载当前角色所有的menu
            loadAllMenu() {
                store.actions.loadAllMenu();
            },
            //查询传过来的菜单在不在当前权限里
            checkMenu(name) {
                store.actions.checkMenu(name);
            },
            // 保存常用功能列表
            saveUserCommonFn() {
                store.actions.saveUserCommonFn();
                // console.log('保存常用功能列表')
            },
            /**
             * 根据路由变化，执行相应的action
             * @param  {Boolean} goNow      是否立即激活action
             * @param  {Boolean} hasReady   调用该方法的模块是否已经ready
             * @param  {object}  actionList 动作列表
             * @return {[type]}             [description]
             */
            routerAction(goNow, hasReady, actionList) {

                let _this = this;

                // console.error(this.$route.path)

                // 关闭所有功能页
                actionList.closeAll();

                // 打开url对应功能页
                if (this.$route.params && this.$route.params.action && actionList[this.$route.params.action]) {

                    let time = goNow || hasReady ? 400 : 1000;

                    setTimeout(function () {
                        actionList[_this.$route.params.action]();
                    }, time)

                }

            },


            /**
             * 公用文件下载
             * @param  {string} path   接口路径 例如 common/export.html
             * @param  {string} params 附加参数，get格式 例如 filed=123&data=123
             * @return {[type]}        [description]
             */
            downloadFile(path, params) {

                path = path.replace(/^[\/]/ig, '');
                let iframe = document.createElement('iframe')
                iframe.src = Vue.__Basepath + path + '?' + params;
                iframe.style.display = 'none'
                document.body.appendChild(iframe);
            },
            /**全屏遮盖层,需要手动关闭
             * [toggleMask description]
             * @param  {[type]} flag [description]
             * @param  {[type]} msg  [description]
             * @return {[type]}      [description]
             */
            toggleMask(flag, msg) {
                this.showMask = flag;
                if (msg && msg != "") {
                    this.maskMsg = msg;
                }
            },

            // 判断是否是admin登陆
            isAdmin() {
                // return false;
                return this.state.curUserName === 'admin';
            },

            // 检查admin的路由权限
            /**
             * @param [String] pathTo 路由url
             * @param [String] type   类型 menu:用来处理功能按钮的 不会提示
             */
            checkAdminRouteAuth(pathTo, type) {

                // 如果不是admin，则无需检查
                if (!this.isAdmin()) return true;

                let authPath = this.state.adminRoutes.filter(path => {
                    if (path.indexOf('/*') > 0) {
                        return pathTo.indexOf(path.split('/*')[0]) === 0
                    }
                    else {
                        return pathTo === path;
                    }
                });

                if (authPath.length === 0) {
                    if (type === 'menu') return false;
                    this.showTip({
                        type: 'warning',
                        msg: '管理员没有权限访问业务模块'
                    })
                    return false;
                }

                return true;
            },

        },
        filters: {
            reverseTabs(value) {
                console.log(Object.keys(value))
                console.log(Object.keys(value).reverse())
                var tabs = {};
                Object.keys(value).reverse().forEach(item => {
                    tabs[item] = value[item];
                })
                return tabs;
            }
        },
        events: {
            // 页面刷新时，若所有功能列表中的含有当前路由，则打开标签页
            toggleTabs(transition) {
                // console.warn(transition)
                for (let key in this.state.userAuthority.userMenus) {

                    let menu = this.state.userAuthority.userMenus[key];

                    // console.log(menu.url,transition.to.path)
                    // 需要排除query的影响
                    if (menu.url == transition.to.path.split('?')[0]) {
                        this.addTabs(menu.url, {
                            link: menu.url,
                            name: menu.menuName
                        });
                        // 清理多余的tab页
                        this.$nextTick(() => {
                            this.closeMaxTabs();
                        })
                    }

                }
            }
        }

    }
</script>
<style src="./assets/css/bootstrap.css"></style>
<style src="./assets/css/bootstrap-theme.css"></style>
<style src="./assets/css/animate.css"></style>
<style src="./assets/css/keen-ui.css"></style>
<style src="./assets/css/keen-ui-theme.css"></style>
<style src="./assets/css/ui-dropdown.css"></style>
<style src="./assets/css/ui-statistic.css"></style>
<style src="./assets/css/ui-datepicker.css"></style>
<style src="./assets/css/ui-table.css"></style>
<style src="./assets/css/base.css"></style>
<style src="./assets/css/common-modules.css"></style>
<style scoped>
    .app-tabs{
        margin-top: 0px;
    }
    .scorllView{
        padding-bottom: 0;
    }
    .slimScrollBar{
        opacity: 0 !important;
    }
</style>