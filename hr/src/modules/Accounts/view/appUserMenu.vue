<template>
    <div>
        <div class="app-user-menuWrap" v-show="showUserMenu" transition="flipY" transition-mode="out-in">
            <!--当前登录人菜单-->
            <div class="app-user-menu" v-show="show.menu">
                <div class="app-user-menu-left"><img src="../../../assets/images/app-user-menu-left.png" alt=""></div>
                <div class="app-user-menu-tit">
                    <p>账号管理</p>
                    <div class="app-user-menu-close" @click="showUserMenu = false"><img src="../../../assets/images/app-user-menu-close.jpg" alt=""></div>
                </div>
                <div class="app-user-menu-list">
                    <ul>
                        <li code="accounts-usermenu-changepw/修改密码" @click="show.menu=false"><a href="javascript:;" @click="show.modal3=true">修改密码</a></li>
                        <li __code="account-resetPass/重置密码" @click="show.menu=false"><a href="javascript:;" @click="show.modal4=true">重置密码</a></li>
                        <li @click="show.menu=false"><a href="javascript:;" @click="logOutBtn()">退出当前账号</a></li>
                    </ul>
                    <ul>
                        <li @click="show.menu=false"><a href="javascript:;" @click="show.modal2=true">关于人力管家</a></li>
                        <!-- <li><a href="javascript:;" @click="goHelpAndFeedBack">帮助与反馈</a></li> -->
                    </ul>
                </div>
            </div>
        </div>

        <ui-modal :show.sync="show.modal1" header="提示" body="确定退出登录吗？">
            <div slot="footer" class="footer text-center">
                <ui-button color="success" @click="logOut()" class="large ">确定</ui-button>
                <ui-button @click="show.modal1 = false">关闭</ui-button>
            </div>
        </ui-modal>

        <ui-modal :show.sync="show.modal3" header="修改密码" @close="cancelChangePW">

            <ui-validator v-if="show.modal3" @successed="goChangePass">
                <div>
                    <div v-if="mustChangePw" style="margin:0 50px; color:red;">
                        <p><strong>温馨提示：</strong>密码安全已升级，必须修改密码后才能使用</p>
                        <p>新密码为8-12位字符，必须含有字母和数字，可包含大写字母特殊字符</p>
                    </div>
                    <form class="form-horizontal container-fluid" vali-submit="submitBt" autocomplete="off">
                        <div class="form-body">
                            <div class="form-group row">
                                <div class="col-sm-24">
                                    <div class="change-password">
                                        <!-- autocomplete="off"不起作用时,用于屏蔽浏览器自动填充 -->
                                        <input style="display:none;"></input>
                                        <div class="input-wrap">
                                            <p style="text-align: right; padding-right:10px;">旧密码:</p>
                                            <div>
                                                <input type="password" placeholder="请输入旧密码" v-model="state.passWord" vali="required"
                                                    vali-msg="必填"></div>
                                        </div>
                                        <div class="input-wrap">
                                            <p style="text-align: right; padding-right:10px;">新密码:</p>
                                            <div>
                                                <input type="password" placeholder="请输入新密码" v-model="state.afterNewPassWord"
                                                    vali="required|minStr:8|maxStr:12" vali-msg="请输入密码 8-12位,必须含有字母和数字,可包含大写字母特殊字符"></div>
                                        </div>
                                        <div class="input-wrap">
                                            <p style="text-align: right; padding-right:10px;">确认新密码:</p>
                                            <div>
                                                <input type="password" placeholder="请重新输入密码" v-model="state.newPassWord" vali="required"
                                                    vali-msg="必填，两次密码必须一致"></div>
                                        </div>
                                    </div>

                                    <div class="form-actions">
                                        <div class="row">
                                            <div class="text-center">
                                                <ui-button color="success" raised class="large " id="submitBt">保存</ui-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ui-validator>
            <div slot="footer" class="footer text-center">

            </div>
        </ui-modal>

        <ui-modal :show.sync="show.modal4" header="重置密码">

            <ui-validator v-if="show.modal4" @successed="goResetPass">
                <div>
                    <form class="form-horizontal container-fluid" vali-submit="submitBt2" autocomplete="off">
                        <div class="form-body">
                            <div class="form-group row">
                                <div class="col-sm-24">
                                    <div class="change-password">
                                        <div class="input-wrap">
                                            <p style="text-align: right; padding-right:10px;">员工姓名:</p>
                                            <div class="choose-input" @click="selectEmployee">
                                                <input type="text" v-model="info.userName" vali="required" vali-msg='必填项' class="form-control" placeholder="请选择员工姓名">
                                                <i class="icon-tool icon-tool-search"></i>
                                            </div>
                                        </div>
                                        <div class="input-wrap">
                                            <p style="text-align: right; padding-right:10px;">员工工号:</p>
                                            <div>
                                                <input type="text" v-model="info.userNum" class="form-control" placeholder="选择员工自动生成"
                                                    disabled></div>
                                        </div>
                                    </div>
                                    <div class="form-actions">
                                        <div class="row">
                                            <div class="text-center">
                                                <ui-button color="success" raised class="large " id="submitBt2">重置密码</ui-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </ui-validator>
            <components :is="what" :display.sync="showSelect" :params="params" :callback="chooseEmployeeCallBack">
            </components>
            <div slot="footer" class="footer text-center">

            </div>
        </ui-modal>
        <div class="resetSuccess">
            <ui-modal :show.sync="resetSuccess" header="重置密码" @close="closeResetSuccess" >

                <ui-validator v-if="resetSuccess" @successed="goResetPass">
                    <div class="reset-success">
                        <div class="reset-success-title">
                            <!--<img src="../../../assets/images/reset-success.png" alt="">-->
                            <h2>重置成功</h2>
                        </div>
                        <p>姓名：{{info.userName}}</p>
                        <p>员工工号：{{info.userNum}}</p>
                        <p>初始密码：<span>888888</span></p>
                    </div>
                </ui-validator>
                <components :is="what" :display.sync="showSelect" :params="params" :callback="chooseEmployeeCallBack">
                </components>
                <div slot="footer" class="footer text-center">
                    <ui-button color="success" raised class="large " @click='resetSuccess=false'>确定</ui-button>
                </div>
            </ui-modal>
        </div>

        <ui-modal :show.sync="show.modal2" header="关于人力管家">
            <div class="about-modal">
                <div class="about-wrap">
                    <span>版本</span>
                    <p>{{$root.state.version}}</p>
                </div>
                <div class="about-wrap">
                    <span>公司官网</span>
                    <p>{{$root.state.website}}</p>
                </div>
                <!-- <div class="about-wrap">
                <span>微信服务号</span>
                <p></p>
            </div> -->
                <div class="about-wrap">
                    <span>版权所有</span>
                    <p>{{$root.state.copyrigth}}</p>
                </div>
            </div>
            <div slot="footer" class="footer text-center"></div>
        </ui-modal>
    </div>
</template>
<script>
    import EventListener from 'libs/utils/EventListener'
    import store from '../store'
    export default {

        ready() {
            this._closeEvent = EventListener.listen(window, 'mouseup', (e) => {
                if (!this.$el.contains(e.target)) {
                    this.showUserMenu = false;
                }
            })
            // 修改密码
            this.$root._event.$on('accounts_changePw', () => {
                this.show.modal3 = true;
                this.mustChangePw = true;
            })

            // 退出登录
            this.$root._event.$on('accounts_logout', () => {
                window.localStorage.removeItem('mustChangePw');
                this.logOut();
            })

        },

        watch: {
            showUserMenu(val) {
                if (val) this.show.menu = true;
            },
            'show.modal3'(val) {
                // 清空缓存的密码
                if (val) {
                    this.state.passWord = '';
                    this.state.afterNewPassWord = '';
                    this.state.newPassWord = '';
                }
            }
        },

        data() {
            return {
                state: store.state,
                mustChangePw: false, //冻结修改密码弹窗，在强制修改密码时使用
                show: {
                    menu: false,
                    modal1: false,
                    modal2: false,
                    modal3: false,
                    modal4: false,
                },
                info: {
                    userName: '',
                    userNum: '', //员工编码
                },
                what: '',
                showSelect: false,
                params: {
                    // state: "['120001']"
                },
                resetSuccess: false,
            }
        },
        props: {
            showUserMenu: {
                twoWay: true,
                default: false,
            },
        },
        methods: {
            //选择人员回调
            chooseEmployeeCallBack(data) {
                if (data.length > 0) {
                    this.info.userName = data[0].userName;
                    this.info.userNum = data[0].userNum;
                    var orgname = data[0].deptName;

                    if (data[0].storeName) {
                        orgname += "/" + data[0].storeName;
                    }
                    if (data[0].teamName) {
                        orgname += "/" + data[0].teamName;
                    }
                    this.info.orgName = orgname;
                    this.info.userID = data[0].ID;
                    this.info.postName = data[0].postName;
                }
            },
            //查询员工
            selectEmployee() {
                this.what = "appSelectEmployee";
                this.showSelect = true;
            },
            // 取消修改密码
            cancelChangePW() {

                if (window.localStorage.mustChangePw !== 'true') return;

                this.$root.showConfirm({
                    freeze: true,
                    msg: '您的密码安全性太低，不修改密码无法继续使用，是否修改密码？',
                    textOK: '是',
                    textCancel: '否',
                    ok: () => {
                        this.$root._event.$emit('accounts_changePw');
                    },
                    cancel: () => {
                        this.$root._event.$emit('accounts_logout');
                    }
                })
            },
            //修改密码
            goChangePass() {
                var self = this;
                store.actions.goChangePass(function (cbSuccess, cbError) {
                    if (cbSuccess) {
                        self.show.modal3 = false;
                        self.mustChangePw = false;

                        window.localStorage.removeItem('mustChangePw');
                    }
                })
            },
            //重置密码
            goResetPass() {
                var self = this;
                store.actions.resetPass(this.info, (data) => {
                    self.resetSuccess = true;
                    self.show.modal4 = false;
                    // console.log(self.resetSuccess)
                }, (res) => {

                })
            },
            closeResetSuccess() {
                this.info = {
                    userName: '',
                    userNum: '', //员工编码
                }
            },
            // 帮助与反馈
            goHelpAndFeedBack() {
                store.actions.goHelpAndFeedback();
            },
            //退出登录
            logOut() {

                var self = this;
                store.actions.logOutFn(function (cbSuccess, cbError) {
                    if (cbSuccess) {
                        self.show.modal1 = false;
                    }
                })
            },
            //退出登录按钮
            logOutBtn() {
                this.show.modal1 = true;
            },

        }
    }

</script>
<style >
    .app-user-menuWrap {
        z-index: 200000;
        position: absolute;
        left: 150px;
        bottom: 35px;
        width: 150px;
        height: 250px;
    }
    
    .app-user-menu {
        width: 150px;
        height: 250px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 5px 5px 5px #999;
    }
    
    .app-user-menu-list li {
        border-radius: 6px;
    }
    
    .app-user-menu-list a {
        padding-left: 20px;
        display: block;
        color: #666;
        text-decoration: none;
    }
    
    .app-user-menu-list a:hover {
        color: #333;
        background: #efefef;
    }
    
    .app-user-menu-left {
        position: absolute;
        left: -7px;
        bottom: 32px;
    }
    
    .app-user-menu-tit {
        overflow: hidden;
        height: 50px;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .app-user-menu-tit p {
        float: left;
        height: 50px;
        line-height: 50px;
        text-indent: 20px;
    }
    
    .app-user-menu-tit .app-user-menu-close {
        float: right;
        margin: 15px 25px 0 0;
        cursor: pointer;
    }
    
    .app-user-menu ul {
        overflow: hidden;
        padding: 10px 0;
        border-bottom: 1px dashed #cccccc;
    }
    
    .app-user-menu ul:last-child {
        border: none;
    }
    
    .app-user-menu ul li {
        height: 33px;
        line-height: 33px;
    }
    
    .about-modal {
        padding: 30px 55px;
    }
    
    .about-wrap {
        height: 35px;
        line-height: 35px;
    }
    
    .about-wrap span {
        display: block;
        float: left;
        width: 60px;
        margin-right: 20px;
        color: #bcbcbc;
    }
    
    .change-password {
        margin: 40px 40px;
        border: 1px solid #7e7e7e;
        border-radius: 5px;
    }
    
    .change-password .input-wrap {
        position: relative;
        box-sizing: border-box;
        height: 60px;
        line-height: 60px;
        padding: 10px 0;
        border-bottom: 1px solid #7e7e7e;
        border-radius: 0 !important;
    }
    
    .change-password .input-wrap input {}
    
    .change-password .input-wrap:last-child {
        border: none;
    }
    
    .change-password .input-wrap p {
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        text-align: center;
    }
    
    .change-password .input-wrap div {
        position: relative;
        margin-left: 125px;
        padding-right: 5px;
        height: 40px;
        line-height: 40px;
    }
    
    .change-password .input-wrap div input {
        width: 100%;
        border: none;
    }
    
    .change-password .input-wrap div input:focus {
        outline: none;
    }
    
    .choose-input > i {
        display: inline-block;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 4px;
        right: 0;
        color: #999;
    }
    
    .disabled {
        pointer-events: none;
    }
    .reset-success{
        margin-bottom: 60px;
    }
    .reset-success p {
        width: 215px;
        margin: 0 auto;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
    }
     .reset-success p span{
         color: #fc6e58;
     }
    .reset-success-title {
        background: #ffe1df;
        height: 45px;
        margin-bottom:60px;
    }
    
    .reset-success-title img {
        float: left;
        margin-right: 30px;
    }
    
    .reset-success-title h2 {
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        text-align: center;
        margin-top: 0 !important;

    }
    .resetSuccess .ui-modal-body{
        padding: 0 !important;
    }
</style>