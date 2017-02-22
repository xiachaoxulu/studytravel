<!--
@Author: Yang
@Date:   2016-08-28 12:47:52
@Project: 人力管家
@Last modified by:   Yang
@Last modified time: 2016-09-02 04:32:40
@License: copyright@acewill
-->
<template>
    <!-- 模块示例 -->
    <div class="ui-module module-Pay">
        <!-- 模块功能条 -->
        <header class="ui-module-navbar pos-topbar-fixed">
            <app-modulenavbar :show="showNavbar">
                <!-- 左侧按钮组 -->
                <div class="pull-left emp-center-tab">
                    <strong class="_headerTitle">薪酬核算</strong>
                    <ui-buttongroup active-class="btn-primary">
                        <button __code="pay-series/薪酬账套" type="button" class="btn btn-primary" v-link="{path:'/Pay/paySeries', activeClass:'btn-primary', replace:true }" @click="changeHeaderMenu('PaySeries')">薪酬账套</button>
                        <button __code="pay-user/员工变动应用" type="button" class="btn btn-default" v-link="{path:'/Pay/payUsers', activeClass:'btn-primary', replace:true }" @click="changeHeaderMenu('PayUser')">员工变动应用</button>
                        <button __code="pay-calculate/薪酬计算与发放" type="button" class="btn btn-default" v-link="{path:'/Pay/payCalculate', activeClass:'btn-primary', replace:true }" @click="changeHeaderMenu('PayCalculate')">薪酬计算与发放</button>
                    </ui-buttongroup>
                </div>
                <!-- 右侧按钮组 -->
                <components :is="menuID"></components>
            </app-modulenavbar>
        </header>
        <router-view class="view" transition="main" transition-mode="out-in" keep-alive></router-view>
    </div>
</template>
<script type="text/javascript">
import store from '../store';
import menuPaySeries from './menuPaySeries'
import menuPayUser from './menuPayUser'
import menuPayCalculate from './menuPayCalculate'
export default {
    name: 'fff',
    data() {
        return {
            showNavbar: false,
            menuID: 'menuPaySeries'
        }
    },
    components: {
        menuPaySeries,
        menuPayUser,
        menuPayCalculate,
    },
    methods: {
        // 切换显示不同的头部按钮菜单
        changeHeaderMenu(menuID) {
            this.menuID = 'menu' + menuID;
        },
    },
    created() {

    },
    ready() {

        var vm = this;
        setTimeout(function() {
            vm.showNavbar = true;
        }, 500)

        // 初始化数据
        store.actions.initData();

    }
};
</script>
<style lang="scss">
.module-Pay {
    ._headerTitle {
        font-size: 16px;
        padding-right: 20px;
        padding-left: 5px;
    }
    .back-btn {
        float: left;
    }
    .emp-center-tab {
        position: absolute;
        margin-left: -5px;
    }
    .com-col-m1-left {
        width: 200px !important;
    }
    .com-col-m1-middle {
        right: 0 !important;
    }
    .com-menuList {
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    .com-menuList ul li {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        margin-top: 2px;
        cursor: pointer;
    }
    .com-menuList ul li i {
        float: right;
        margin-top: 4px;
        color: #fff;
    }
    .com-menuList ul li a {
        color: #000000;
        display: inline-block;
        outline: none;
        text-decoration: none;
    }
    .com-menuList ul li:hover {
        background: #a9adb9;
    }
    .com-menuList ul li.active {
        background: #a9adb9;
    }
    .com-menuList ul li.active {
        color: #fff;
    }
    .com-menuList ul li:hover {
        color: #fff;
    }
    .com-menuList ._title {
        padding-left: 0px;
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-bottom: 10px;
    }
}
</style>
