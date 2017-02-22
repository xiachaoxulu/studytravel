<template>
    <!-- 模块示例 -->
    <div class="ui-module app-permisson">
        <!-- 模块功能条 -->
        <header class="ui-module-navbar pos-topbar-fixed">
            <app-modulenavbar :show="showNavbar">
                <div class="back-btn">
                    <button class="ui-tool-button ml0 mr10">
                        <span class="icon icon-tool icon-tool-back pull-left"></span>
                        <span class="_name pull-left"></span>
                    </button>
                </div>
                <!-- 左侧按钮组 -->
                <div class="pull-left">
                    <ui-buttongroup active-class="btn-primary">
                        <button type="button" class="btn btn-primary"
                                v-link="{path:'/Accounts/wholeProblem', replace:true }">
                            全部问题
                        </button>
                        <button type="button" class="btn btn-default"
                                v-link="{path:'/Accounts/fastHelp', replace:true }">快速帮助
                        </button>
                        <button type="button" class="btn btn-default"
                                v-link="{path:'/Accounts/feedback', replace:true }">意见反馈
                        </button>
                    </ui-buttongroup>
                </div>
                <!-- 右侧按钮组 -->
                <div class="pull-right">
                    <button class="ui-tool-button" @click="goSaveBtn()">
                        <span class="icon icon-tool icon-tool-save pull-left"></span>
                        <span class="_name pull-left">保存</span>
                    </button>
                </div>
            </app-modulenavbar>
        </header>
        <router-view class="view" transition="view" transition-mode="out-in"></router-view>

    </div>
</template>
<script type="text/javascript">
    import store from '../store';
    export default {
        data() {
            return {
                // modal
                state: store.state,
                curStyle: true,
                showNavbar: false,
                showFieldBar: [],
                show: {
                    modal1: false,
                }
            }
        },
        props: {},
        filters: {
            isShow(value) {
                return !!value ? 'display:block' : 'display:none';
            }
        },
        methods: {
            //全局保存
            goSaveBtn(){
                store.actions.goSaveBtn();
            },
            //字段条件
            remove(val) {
                store.actions.removeTagList(val);
            },
            clearTagList() {
                store.actions.clearTagList()
            },
            cascadeCheck(index, fieldS) {
                store.actions.cascadeCheck(index, fieldS)
            },
            toggleFieldBar(index) {
                this.$data.showFieldBar.$set(index, !this.$data.showFieldBar[index]);
            },
        },
        created() {
//            store.actions.loadFeildData();
        },
        watch: {},
        ready() {
            this.toggleFieldBar(); //
            var vm = this;
            setTimeout(function () {
                vm.showNavbar = true;
            }, 500)
        }
    };
</script>
<style type="text/css" lang="less">
    /* 防止全局css混乱干扰 */

    .app-permisson {

    /*提取全局 start*/
    .com-col-m1-left {
        width: 300px;
    }

    .com-col-m1-middle {
        left: 307px;
        padding: 0 20px;
    }

    .ml0 {
        margin-left: 0 !important;
    }

    .mr10 {
        margin-right: 10px !important;
    }

    .display-none {
        display: none;
    }

    .display-block {
        display: block;
    }

    .border-line {
        border-top: 1px dashed #cccccc;
    }

    /*提取全局 end*/
    /*顶部按钮  start*/
    .ui-module-navbar-content .back-btn {
        float: left;
    }

    .top-tab-nav {
        overflow: hidden;
        margin-left: 135px;
    }

    /*顶部按钮 end*/
    /*中间菜单管理 start*/
    .menu-manage-nav {
        width: 100%;
        min-width: 365px;
        overflow: hidden;
        margin-bottom: 20px;
        margin-top: 14px;
    }

    .cur-role {
        margin-top: 20px;
        font-size: 16px;
    }

    .border-line {
        margin: 20px 0;
    }

    .border-line.short {
        float: left;
        width: 250px;
    }

    /*中间菜单管理 end*/
    /*右侧属性，人员列表 start*/
    .ui-module-aside {
        padding: 0 !important;
    }

    .ui-module-aside-top {
        height: 150px;
        padding: 15px;
        background: #6369ed;
    }

    .attr-or-edit {
        margin-top: 5px;
    }

    .attr-or-edit h3 {
        font-size: 16px;
        color: #fff;
    }

    .attr-or-edit p {
        float: right;
    }

    .attr-or-edit p button {
        width: 18px;
        height: 18px;
        background: url(../../../assets/images/add-or-edit-role.png);
        border: none;
    }
    .date-wrap {
        position: absolute;
        left: 100px;
        top: -3px;
    }
    .mz-datepicker-popup{
        z-index: 11 !important;
    }
    .date-wrap .mz-datepicker input{
        position: absolute;
        left: 0;
        top:0;
        z-index:1;
    }
    /*.date-wrap .mz-datepicker-popup{*/
        /*z-index:12 !important;*/
    /*}*/
    .date-wrap .mz-datepicker {
        width: 170px !important;
        height: 20px;
    }

    .date-wrap .form-control {
        height: 20px;
        padding: 0;
        background: none !important;
        border: none;
    }

    .date-wrap .material-icons {
        display: none !important;
    }

    .role-edit {
        position: relative;
    }

    .role-edit button {
        position: absolute;
        left:265px;
        top: 0;
    }

    .attr-msg {
        margin-top: 5px;
    }

    .attr-msg ul li {
        height: 25px;
        line-height: 25px;
    }

    .attr-msg ul li span {
        display: block;
        float: left;
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: right;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .attr-msg ul li b {
        display: block;
        height: 25px;
        margin-left: 70px;
        color: #fff;
    }

    .attr-msg ul li b input {
        width: 100%;
        height: 25px;
        background: none;
        border: none;
    }

    .ui-module-aside-content {
        /*position: relative;*/
        overflow: hidden;
        padding: 25px;
    }

    .role-tit {
        margin-top: 10px;
    }

    .role-tit h2 {
        font-size: 16px;
        margin: 0 !important;
    }

    .role-content {
        position: absolute;
        bottom: 100px;
        left: 25px;
        right: 25px;
        top: 220px;
    }

    .role-content ul li {
        height: 50px;
        margin-top: 18px;
    }

    .role-content ul li .role-content-pic {
        width: 50px;
        height: 50px;
        float: left;
        border-radius: 50px;
        margin-right: 20px;
    }

    .role-content ul li .role-content-pic img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .role-content ul li .role-content-text{
        height: 50px;
    }
    .role-content ul li .role-content-text p {
        margin: 5px 0 !important;
        font-size: 16px;
        color: #000;
    }

    .role-content ul li .role-content-text p b {
        display: inline-block;
        width:80px;
        font-weight: normal;
        margin-right: 10px;
    }

    .role-content ul li .role-content-text p span {
        width: 160px;
        display: inline-block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        font-size: 14px;
        color: #686868;
    }

    .role-delete {
        float: left;
        width: 15px;
        height: 15px;
        margin-right: 17px;
        margin-top: 16px;
    }

    .role-delete button {
        width: 16px;
        height: 16px;
        border: none;
        background: url(../../../assets/images/delete-role.jpg);
    }

    .role-edit button {
        width: 16px;
        height: 16px;
        border: none;
        background: url(../../../assets/images/edit-role.jpg);
    }

    .add-role-btn {
        width: 105px;
        height: 30px;
        margin: 0 auto;
        text-align: center;
    }

    .add-role-btn button {
        width: 105px;
        height: 30px;
        border-radius: 30px;
        background: none;
        border: 1px solid #6369ed;
        color: #6369ed;
    }

    .commit-or-cancel {
        position: fixed;
        bottom: 17px;
        right: 50px;
    }

    .commit-or-cancel button {
        width: 150px;
        height: 40px;
        /*background: none;*/
        border: none;
        border-radius: 40px;
        font-size: 16px;
        color: #fff;
    }

    .commit-or-cancel button:first-child {
        margin-right: 17px;
    }

    .commit-or-cancel .green {
        background: #0ed185;
    }

    .commit-or-cancel .red {
        background: #ff6262;
    }

    /*右侧属性，人员列表 end*/
    /*左侧角色树 start*/
    .pos-l-aside-fixed {
        background: #fff;
        overflow-y: auto;
    }

    .role-tree {
        margin-top: 10px;
    }

    .tree-box li a {
        line-height: 32px !important;
        height: 32px !important;
    }

    .tree-box li a:hover {
        background-color: #a8adb9;
        color: #fff;
    }

    /*左侧角色树  end*/
    /*弹出层  选择屏蔽人员字段 start*/
    .black-person {
        box-sizing: border-box;
        height: 315px;
        border-bottom: 1px solid #a0a0a0;
        border-top: 1px solid #a0a0a0;
    }

    .black-person-l {
        float: left;
        width: 195px;
        height: 314px;
        border-right: 1px solid #a0a0a0;
    }

    .black-person-r {
        margin-left: 200px;
        height: 314px;
    }

    .check-field {
        margin: 0;
        padding-left: 15px;
        font-size: 14px;
    }
    .employment-type-wrap{
        height: 120px;
    }
    .check-field h3 {
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px !important;
        margin-bottom: 0px !important;
    }

    .check-field ul {
        padding: 10px;
    }

    .check-field li {
        float: left;
        width: 50%;
        padding: 0;
        list-style: none;
        white-space: nowrap;
        outline: 0;
        user-select: none;
        margin-bottom: 5px;
    }

    i.ui-icon.material-icons {
        /*cursor: pointer;*/
        /*vertical-align: middle;*/
        /*width: 20px;*/
        /*height: 20px;*/
        /*border-radius: 20px;*/
        /*border: 1px solid #ccc;*/
        /*font-size: 20px !important;*/
        /*text-indent: -1px;*/
        /*line-height: 20px;*/
    }

    .check-field li a,
    .check-field h3 a {
        display: inline-block;
        height: 40px;
        line-height: 37px;
        border-radius: 2px;
        cursor: pointer;
        text-decoration: none;
        vertical-align: middle;
        color: #000;
    }

    .check-field li a {
        /*width: 70px;*/
        /*white-space:nowrap;*/
        /*overflow:hidden;*/
        /*text-overflow:ellipsis;*/
        /*margin-left: 5px;*/
    }
    .check-field li .ui-checkbox{
        width: 100px;
        margin-bottom: 0;
        vertical-align: middle;
    }

    .tree-checkbox {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 18px;
        vertical-align: middle;
        height: 18px;
        width: 18px;
        border: 1px solid #a8adb9 !important;
        box-sizing: border-box;
        font-size: 17px;
        color: #27c9b4;
        font-weight: 900;
        text-align: center;
        border-radius: 2px;
    }

    .tree-checkbox.uncheck {
        color: #fff;
    }

    .selected-field {
        overflow: hidden;
        padding: 20px;
    }

    .selected-field h3 {
        margin-top: 0 !important;
    }

    .selected-field a {
        float: right;
    }

    .selected-field .tagList {
        overflow: hidden;
        width: 100%;
    }

    .selected-field .tagList .label {
        display: inline-block;
        padding: 0 12px;
        height: 30px;
        line-height: 30px;
    }

    .search {
        height: 50px;
        margin: 15px 0 0 20px;
    }

    .search-tree {
        height: 240px;
    }

    .search-bar {
        box-sizing: border-box;
        width: 160px;
        height: 30px;
        border: 1px solid #a0a0a0;
        border-radius: 30px;
        padding: 0 13px;
    }

    .search-bar input:focus {
        outline: none;
    }

    .search-bar input {
        width: 100%;
        height: 28px;
        border: none;
    }

    .role-person-tit h3 {
        margin: 0;
        font-size: 16px;
    }

    /*人员权限   start*/
    .sml-tit {
        overflow: hidden;
    }

    .sml-tit p {
        float: left;
        margin: 10px;
    }

    .person-accredit .check-field {
        height: 160px;

    }

    .organization-chart {
        box-sizing: border-box;
        height: 500px;
        padding: 30px;
    }



    /*人员权限   end*/
    .check-field .mz-datepicker {
        width: 150px !important;
        height: 30px;
    }
    .check-field .mz-datepicker input{
        width: 100%;
        height: 30px;
    }
    .check-field .mz-datepicker >i{
        top: 3px;
    }

    }
</style>
