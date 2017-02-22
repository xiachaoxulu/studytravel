/**
* @Created Date       : 2016-09-01T15:12:33+08:00
* @Last Modified time : 2016-11-04 13:05:24
*/



import login from './modules/Accounts/view/login';

export default function (router) {

    // normal routes
    router.map({

        //登录
        '/Login': {
            component: login
        },
        // Demo
        '/Demo': {
            component: function (resolve) {
                require(['modules/Demo/view/main.vue'], resolve)
            },
            subRoutes: {
                'buttons': {
                    component: function (resolve) {
                        require(['modules/Demo/view/buttons.vue'], resolve);
                    }
                },
                'uilist': {
                    component: function (resolve) {
                        require(['modules/UiList/view/main.vue'], resolve);
                    }
                },
                'ui': {
                    component: function (resolve) {
                        require(['modules/Demo/view/ui.vue'], resolve);
                    }
                }
            }
        },
        // 主面板
        '/Home': {
            component: function (resolve) {
                require(['modules/dashboard/view/main.vue'], resolve)
            }
        },
        // 组织与员工
        '/OrgEmployee': {
            component: function (resolve) {
                require(['modules/OrgEmployee/view/main.vue'], resolve)
            },
            subRoutes: {
                'ByOrg': {
                    component: function (resolve) {
                        require(['modules/OrgEmployee/view/byOrg.vue'], resolve);
                    }
                },
                'ByOrg/:action': {
                    component: function (resolve) {
                        require(['modules/OrgEmployee/view/byOrg.vue'], resolve);
                    }
                },
                'ByPost': {
                    component: function (resolve) {
                        require(['modules/OrgEmployee/view/byPost.vue'], resolve);
                    }
                }
            }
        },
        '/OrgEmployee1': {
            component: function (resolve) {
                require(['modules/OrgEmployee/view/departmentTreeEdit.vue'], resolve);
            }
        },

        // 设置
        '/Settings/:action': {
            component: function (resolve) {
                require(['modules/Settings/view/main.vue'], resolve)
            }
        },

        // 考勤
        '/Attendence': {
            component: function(resolve) {
                require(['modules/Attendence/view/main.vue'],
                    resolve);
            },
            subRoutes: {
                'dailyWorktime': {
                    component: function(resolve) {
                        require(['modules/Attendence/view/dailyWorktime.vue'],
                            resolve);
                    }
                },
                'monthlyWorktime': {
                    component: function(resolve) {
                        require(['modules/Attendence/view/monthlyWorktime.vue'],
                            resolve);
                    }
                }
            }
        },
        // 新版考勤
        '/AttendanceEntire': {
            component: function(resolve) {
                require(['modules/AttendanceEntire/view/main.vue'], resolve);
            },
            subRoutes: {
                'Day': {
                    component: function(resolve) {
                        require(['modules/AttendanceEntire/view/day.vue'], resolve);
                    }
                },
                'Month': {
                    component: function(resolve) {
                        require(['modules/AttendanceEntire/view/month.vue'], resolve);
                    }
                }
            }
        },
        // 新版考勤
        '/c': {
            component: function(resolve) {
                require(['components/ui/imageView.vue'], resolve);
            }
        },
        // 申请
        '/Apply/BizTrip': { // 出差
            component: function(resolve) {
                require(['modules/Apply/view/BizTrip.vue'], resolve);
            }
        },
        '/Apply/Overtime': { // 加班
            component: function(resolve) {
                require(['modules/Apply/view/Overtime.vue'], resolve);
            }
        },
        '/Apply/Vacation': { // 请假
            component: function(resolve) {
                require(['modules/Apply/view/Vacation.vue'], resolve);
            }
        },

        // 排班
        '/Schedule': {
            component: function (resolve) {
                require(['modules/Schedule/view/main.vue'], resolve)
            },
            subRoutes: {
                // 周月排班/类型/群组
                '/manager/:type/:group': {
                    component: function (resolve) {
                        require(['modules/Schedule/view/tableDaysManager.vue'], resolve)
                    }
                },
                '/service/:type/:group': {
                    component: function (resolve) {
                        require(['modules/Schedule/view/tableDaysService.vue'], resolve)
                    }
                },
                '/department/:type/:group': {
                    component: function(resolve) {
                        require(['modules/Schedule/view/tableDaysDeparment.vue'], resolve)
                    }
                },
                // 24小时排班
                '/service/:type/:group/:hour': {
                    component: function (resolve) {
                        require(['modules/Schedule/view/tableHours.vue'], resolve)
                    }
                },
            }
        },
        //权限
        '/Permission': {
            component: function (resolve) {
                require(['modules/Permission/view/main.vue'], resolve)
            },
            subRoutes: {
                '/roleManagement': {
                    component: function (resolve) {
                        require(['modules/Permission/view/roleManagement.vue'], resolve)
                    }
                },
                '/allAgents': {
                    component: function (resolve) {
                        require(['modules/Permission/view/allAgents.vue'], resolve)
                    }
                },
                '/reportPermissions': {
                    component: function (resolve) {
                        require(['modules/Permission/view/reportPermissions.vue'], resolve)
                    }
                }
            }
        },
        //账号管理
        '/Accounts':{
            component:function(resolve){
                require(['modules/Accounts/view/helpAndFeedback'],resolve)
            },
            subRoutes:{
                '/wholeProblem':{
                    component:function(resolve){
                        require(['modules/Accounts/view/wholeProblem'],resolve);
                    }
                },
                '/fastHelp':{
                    component:function(resolve){
                        require(['modules/Accounts/view/fastHelp'],resolve);
                    }
                },
                '/feedback':{
                    component:function(resolve){
                        require(['modules/Accounts/view/feedback'],resolve);
                    }
                }
            }
        },
        //招聘
        '/Recruitment': {
            component: function(resolve) {
                require(['modules/Recruitment/view/main'], resolve);
            },
            subRoutes: {
                '/postRelease': {
                    component: function(resolve) {
                        require(['modules/Recruitment/view/postRelease'], resolve);
                    }
                },
                '/resume': {
                    component: function(resolve) {
                        require(['modules/Recruitment/view/resume'], resolve);
                    }
                },
                // '/archives': {
                //     component: function(resolve) {
                //         require(['modules/Recruitment/view/archives'], resolve);
                //     }
                // },
            }

        },
        //数据报表
        '/Statement':{
            component:function(resolve){
                require(['modules/Statement/view/main'],resolve);
            },
            subRoutes:{
                '/reportMenu':{
                    component:function(resolve){
                        require(['modules/Statement/view/reportMenu'],resolve);
                    }
                },
            }

        },

        //薪资
        '/Pay': {
            component: function(resolve) {
                require(['modules/Pay/view/main'], resolve);
            },
            subRoutes: {
                '/paySeries': {
                    component: function(resolve) {
                        require(['modules/Pay/view/paySeries'], resolve);
                    },

                    // subRoutes: {
                    //     '/paySeriesItems': {
                    //         component: function(resolve) {
                    //             require(['modules/Pay/view/paySeriesItems'], resolve);
                    //         }
                    //     },
                    //     '/paySeriesSuite': {
                    //         component: function(resolve) {
                    //             require(['modules/Pay/view/paySeriesSuite'], resolve);
                    //         }
                    //     },
                    // }

                },
                '/payUsers': {
                    component: function(resolve) {
                        require(['modules/Pay/view/payUsers'], resolve);
                    }
                },
                '/payCalculate': {
                    component: function(resolve) {
                        require(['modules/Pay/view/payCalculate'], resolve);
                    }
                },
            }

        },
        Workflow: {
            component: function(resolve) {
                require(['modules/Workflow/view/main'], resolve);
            },
            subRoutes: {
                '/Pending': {
                    component: function(resolve) {
                        require(['modules/Workflow/view/ApprovalPendingList'], resolve);
                    }
                },
                '/Resolved': {
                    component: function(resolve) {
                        require(['modules/Workflow/view/ApprovalResolvedList'], resolve);
                    }
                },
                '/My': {
                    component: function(resolve) {
                        require(['modules/Workflow/view/ApprovalMy'], resolve);
                    }
                }
            }
        },
        //首页卡片跳转页面

        // //健康证预警
        // '/healthCardWarning':{
        //     component:function(resolve){
        //         require(['modules/Dashboard/view/healthCardWarning'],resolve);
        //     },
        // },
        // //月工时预警
        // '/monthCheckWorkWarning':{
        //     component:function(resolve){
        //         require(['modules/Dashboard/view/monthCheckWorkWarning'],resolve);
        //     },
        // },
        // //日工时预警
        // '/dayCheckWorkWarning':{
        //     component:function(resolve){
        //         require(['modules/Dashboard/view/dayCheckWorkWarning'],resolve);
        //     },
        // },
        // //加班工时预警
        // '/countOvertimeWarning':{
        //     component:function(resolve){
        //         require(['modules/Dashboard/view/countOvertimeWarning'],resolve);
        //     },
        // },
        // //加班工时限额
        // '/countOvertimeLimit':{
        //     component:function(resolve){
        //         require(['modules/Dashboard/view/countOvertimeLimit'],resolve);
        //     },
        // },

        // not found handler
        '*': {
            component: function (resolve) {
                require(['components/404.vue'], resolve)
            }
        }


    })

    // redirect
    router.redirect({
        '/'                 : '/Home',
        '/Settings'         : '/Settings/all',
        '/Permission'       : '/Permission/roleManagement',
        '/Statement'        : '/Statement/reportMenu',
        '/Recruitment'      : '/Recruitment/postRelease',
        '/AttendanceEntire' : '/AttendanceEntire/Day',
        '/OrgEmployee'      : '/OrgEmployee/ByOrg',
        '/Settings'         : '/Settings/all',
        '/Pay'              : '/Pay/paySeries',
        '/Workflow'         : '/Workflow/Pending'
    })


    // global before
    // 3 options:
    // 1. return a boolean
    // 2. return a Promise that resolves to a boolean
    // 3. call transition.next() or transition.abort()

    let timeGo=0,
        timer,
        navMap = {'/OrgEmployee':'org-','/Statement':'commonreport-','/Settings':'config-'}
    ;

    function checkRouteAuth(buttonTag){

        let buttons = router.app.$root.state.userAuthority.userButtons;

        if(buttons && JSON.stringify(buttons)){
            if(JSON.stringify(buttons).indexOf(buttonTag)>-1){
                return true;
            }
            return false;
        }

        return true;
    }

    router.beforeEach((transition) => {

        // 未登录 直接跳转登陆
        if (!router.app.$root.getLoginStatus()) {
            router.go({
                path: '/Login'
            })
        }

        // 左侧菜单路由权限控制
        let buttonTag;
        for(let key in navMap){
            if(transition.to.path.indexOf(key)===0){
                buttonTag = navMap[key];
            }
        }
        if(buttonTag){
            // 如属于左侧菜单，且没有权限，则直接提示无权限 不跳转
            if(!checkRouteAuth(buttonTag)){
                console.log(transition)
                if(router.app.$root.state.hasLogin){
                    router.app.$root.showTip({
                        type:'warning',
                        msg:'您没有权限访问该模块'
                    })
                }
                // 重置左侧菜单点击changeView对顶部导航的影响
                if(transition.from.path==='/Home'){
                    router.app.$root.changeView(true);
                }
                return false;
            }
        }



        // 路由切换最短时间间隔为500ms，防止过快切换造成的路由渲染混乱
        if(new Date().getTime()-timeGo>500){
            timeGo = new Date().getTime();
            // 500ms后开启loading状态
            router.app.$root.loadingTimer = setTimeout(()=>{
                router.app.$root.toggleLoading(true)
            },500)

            transition.next();
        }else{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                // 500ms后开启loading状态
                router.app.$root.loadingTimer = setTimeout(()=>{
                    router.app.$root.toggleLoading(true)
                },500)

                transition.next();
            },500)
        }

    })

    router.afterEach(function (transition) {

        router.app.$nextTick(function(){
            router.app.$broadcast('routerChange');
            router.app.$emit('toggleTabs',transition);
        });

        // 加载切换后关闭loading
        router.app.$root.toggleLoading(false);

    })


}
