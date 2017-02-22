/**
* @Created Date       : 2016-11-07T10:07:22+08:00
* @Last Modified time : 2016-12-22T14:49:52+08:00
*/



import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {
    //登录用户名val
    userVal: '',
    //登录密码val
    passVal: '',
    //登陆错误信息显示
    loginErrorMsg: '',
    //旧密码
    passWord: '',
    //新密码之前
    afterNewPassWord: '',
    //确认新密码
    newPassWord: '',
    //登录返回的菜单
    userAuthority: {},
    //登录人头像url
    // userHeadPicUrl:'',
};
// 数据修改
const mutations = {
    //登录的错误信息设置
    setLoginErrorMsg(data) {
        state.loginErrorMsg = data;
    },
    //设置登录人头像
    // setUserHeadPic(data){
    //   userHeadPicUrl=data.photourl;
    // },
};
// 操作
const actions = {

    setloginErrorMsg(val) {
        mutations.setLoginErrorMsg(val);
    },
    //修改密码
    goChangePass(cbSuccess, cbError) {
        if (state.newPassWord != state.afterNewPassWord) {
            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '两次密码输入有误', // 提示文字
                duration: 1000 // 自动消失时间
            });

            return;

        } else if (state.newPassWord == state.passWord) {

            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '新密码不能与老密码相同', // 提示文字
                duration: 1000 // 自动消失时间
            });

            return;

        }

        else if (!this.checkPassword(state.newPassWord)) {

            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '新密码长度必须为8-12位，必须含有字母、数字，可含有特殊字符或大写字母。', // 提示文字
                duration: 2000 // 自动消失时间
            });


            return;
        }


        var params = {};
        params.password = state.passWord;
        params.newPassWord = state.newPassWord;
        var Tool = Vue.tool;
        Vue.Tool.ajax({
            url: 'api.Accounts.updatePassword',
            data: params,
            success(data, res) {
                Vue.tool.showTip({
                    type: 'success', // 提示类型 success,warning,info,danger
                    msg: '密码修改成功，请重新登录', // 提示文字
                    duration: 1000 // 自动消失时间
                });
                cbSuccess(data);
                console.log(data, res);

                setTimeout(() => {
                    // 退出登录
                    Vue.router.app.setLoginStatus(false);

                    window.location.reload();
                }, 1000)

            },
            error(res) {
                Vue.tool.showTip({
                    type: 'danger', // 提示类型 success,warning,info,danger
                    msg: res, // 提示文字
                    duration: 1000 // 自动消失时间
                });
                console.log(res)
            }
        })


    },
    //登录
    goLoginFn(successed) {
        var params = {};
        params.name = state.userVal.replace(/ /g, '');
        params.pass = state.passVal.replace(/ /g, '');

        let _this = this;

        Vue.Tool.ajax({
            url: 'api.Accounts.login',
            data: params,
            success: (data, res) => {
                window.localStorage.userName = state.userVal.replace(/ /g, '');
                successed && successed();

                // 设定当前用户数据
                Vue.Tool.setUserAllData({
                    userName: data.name || state.userVal.replace(/ /g, ''),
                    commonMenu: data.userMenu || [],
                    allMenu: data.menu || [],
                    buttons: {
                        btnPageList: data.btnPageList || [],
                        buttonList: data.buttonList || []
                    }
                })
                Vue.Tool.loadUserData();

                // 加载按钮数据
                Vue.Tool.getUserBtn(() => {

                    // 设定登陆成功状态 及 跳转地址
                    Vue.nextTick(() => {
                        Vue.router.app.setLoginStatus(true);
                        Vue.router.go({
                            path: '/'
                        });
                    })

                    // 检测密码强度是否合格，否则登陆后提示修改密码
                    if (!this.checkPassword(state.passVal)) {

                        window.localStorage.mustChangePw = true;

                        setTimeout(() => {

                            Vue.router.app.$root._event.$emit('global_mustChangePw');

                        }, 1000)

                    } else {
                        // 否则移除之前可能存在的强制修改密码标示
                        window.localStorage.removeItem('mustChangePw');
                    }


                })


            },
            error(res) {
                mutations.setLoginErrorMsg(res);
            }
        })
    },
    //退出登录
    logOutFn(cbSuccess, cbError) {
        Vue.Tool.ajax({
            url: 'api.Accounts.logOut',
            data: '',
            success(data, res) {

                //登录用户名val
                this.userVal = ''
                //登录密码val
                this.passVal = ''

                cbSuccess(data);
                Vue.router.app.setLoginStatus(false);
                // Vue.router.go({
                //     path: '/Login'
                // });
                window.location.reload();

            },
            error(res) {

            }
        });
    },
    //加载登录人头像
    loadLoginHeadPic(cbSuccess, cbError) {
        Vue.Tool.ajax({
            url: 'api.Accounts.selectEmployeeByLoginName',
            data: '',
            success(data, res) {
                cbSuccess(data);
                // mutations.setUserHeadPic(data);
            },
            error(res) {

            }
        })
    },
    //去帮助与反馈
    goHelpAndFeedback() {
        Vue.router.go({
            path: '/Accounts/wholeProblem'
        });
    },

    // 密码强度验证
    checkPassword(password) {
        let level = 0;

        // 8-12位
        if (password.length >= 8 && password.length <= 12) {
            level++;
        }
        else {
            return false;
        }

        // 包含字母和数字
        if (password.match(/[a-z]+/ig) && password.match(/[0-9]+/ig)) {
            level++;
        } else {
            return false;
        }

        // 包含大写字母
        if (password.match(/[A-Z]+/ig)) {
            level++;
        }
        // 包含特殊字符
        if (password.match(/[^a-zA-z0-9]/ig)) {
            level++;
        }
        //

        return level >= 2;
    },
    //重置密码
    resetPass(params,cbSuccess,cbError) {
        Vue.Tool.ajax({
            url: 'api.Accounts.resetPassword',
            data:{
                loginName:params.userNum,
            },
            success(data, res) {
                cbSuccess(data)
            },
            error(res) {
                cbError(res)
            }
        })
    }


};

export default {
    state,
    mutations,
    actions
};
