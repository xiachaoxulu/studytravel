<!--
* @Created Date       : 2016-10-24T09:57:13+08:00
* @Last Modified time : 2016-12-02T15:28:34+08:00
 -->


<template>
    <div class="app-login" @keyup.13="onkeydownFn">
        <div class="login_wrap">
            <div class="login_top">
                <div class="login_logo">
                    <p>人力管家</p>
                </div>
            </div>
            <div class="login_form">
                <div class="login_form_box">
                    <ui-validator>
                        <div validator="form" class="form-horizontal container-fluid" vali-submit="submitBt|submitedCall">
                            <div class="login_form_box_w mbtm">
                                <div class="user-icon material-icons">person</div>
                                <p class="input-wrap">
                                    <input type="text" placeholder="用户名" v-model="state.userVal" vali="required"
                                           vali-msg="请输入用户名">
                                </p>
                                <span :class="state.userVal !='' ? 'display-block' : 'display-none'">
                                    <button type="button" @click="clearUserVal" tabindex="-1" class="icon-tool-close icon-tool"></button>
                                </span>
                            </div>
                            <div class="login_form_box_w  ">
                                <div class="user-icon material-icons">https</div>
                                <p class="input-wrap">
                                    <input type="password" placeholder="密码" v-model="state.passVal" vali="required"
                                           vali-msg="请输入密码">
                                </p>
                                <span :class="state.passVal != '' ? 'display-block' : 'display-none'">
                                    <button type="button" @click="clearPassVal" class="icon-tool-close icon-tool"></button>
                                </span>
                            </div>
                            <div class="login_form_tip">
                                <p class="forget-pass" @click="show.modal1=true">忘记密码</p>
                                <p class="error-message">{{state.loginErrorMsg}}</p>
                            </div>
                            <div class="button_box">
                                <ui-button color="success" class="large" id="submitBt">登录</ui-button>
                            </div>
                            <div style="text-align: center; padding:20px 0;">请使用<a href="http://chrome.360.cn/" target="_blank">360极速浏览器</a>或<a href="http://rj.baidu.com/soft/detail/14744.html?ald" target="_blank">谷歌浏览器</a>获得最佳体验</div>
                        </div>
                    </ui-validator>
                </div>
            </div>
        </div>
        <ui-modal :show.sync="show.modal1" header="提示" body="请找系统管理员修改密码">
            <div slot="footer" class="footer text-center">
                <ui-button @click="show.modal1 = false">关闭</ui-button>
            </div>
        </ui-modal>
    </div>
</template>
<script>
    import Vue from 'vue'
    import store from '../store';
    export default {
        attached(){
            store.actions.setloginErrorMsg('');
        },
        data() {
            return {
                state: store.state,
                userHeadPicUrl:'',
                show: {
                    modal1: false,
                }
            }
        },
        events: {
            submitedCall() {
                this.state.loginErrorMsg = '登陆中...'
                this.onLoginBtn();
            },
        },
        watch: {},
        methods: {
            onkeydownFn(event) {
                var self = this;
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 13) { // enter 键
                    self.onLoginBtn();
                }
            },
            clearPassVal() {
                this.state.passVal = '';
            },
            clearUserVal() {
                this.state.userVal = '';
            },
            onLoginBtn() {
                let self = this;
                store.actions.goLoginFn(function () {
                  store.actions.loadLoginHeadPic(function(data){
                    window.localStorage.userName2 = data.userName;
                    window.localStorage.userHeadPicUrl=data.userID;
                    self.$root.userName2=data.userName
                    self.$root.userHeadPicUrl=data.userID;
                  });
                })
            }
        },
        ready() {
            // Vue.Tool.loadLoginHeadPic=this.loadLoginHeadPic;
        }
    }
</script>
<style scoped>
    .display-block {
        display: block !important;
    }

    .display-none {
        display: none !important;
    }

    .app-login {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: url(../../../assets/images/userBg.jpg) no-repeat;
        background-size: cover;
        z-index: 1000000;
    }

    .login_wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -180px;
        margin-left: -220px;
        width: 440px;
        height: 380px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 20px rgba(0,0,0,0.5);
    }

    .login_top {
        font-size: 38px;
        color: #1e45d9;
        text-align: center;
        padding-top: 38px;
    }

    .login_form_box {
        margin-top: 33px;
        padding: 0 50px;
    }

    .login_form_box .login_form_box_w {
        position: relative;
        height: 40px;
        background: #fff;
        border: 1px solid #7e7e7e;
    }

    .mbtm {
        margin-bottom: 23px;
        /*border-radius: 0 0 6px 6px !important;*/
    }

    .border-top-none {
        border-top: none !important;
    }

    .login_form_box .login_form_box_w p {
        margin-left: 40px;
        /*padding: 0 10px;*/
    }

    .login_form_box_w span {
        position: absolute;
        right: 11px;
        top: 7px;
        display: none;
        width: 27px;
        height: 27px;
    }
    .user-icon{
        float: left;
        width: 38px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        color: #909090;
    }
    .input-wrap{
      margin-left: 40px!important;
    }

    .login_form_box_w span button {
        border: none;
        background: none;
        font-size: 18px;
        margin-top: -1px;
    }

    .login_form_box_w p input {
        width: 100%;
        height: 38px;
        border: none;
        font-size: 14px;
    }

    .login_form_box_w p input:focus {
        outline: none;
    }

    .login_form_tip {
        height: 40px;
        padding-top: 10px;
        overflow: hidden;
    }

    .forget-pass {
        cursor: pointer;
        float: right;
        color: #504c7c;
    }

    .error-message {
        color: #fd6551;
    }

    .button_box {
        margin: 0 auto;
        width: 255px;
        height: 47px;
        text-align: center;
    }

    #submitBt {
        width: 255px;
        height: 47px;
        border: none;
        background: #2758ea;
        color: #fff;
        border-radius: 5px;
    }
</style>
