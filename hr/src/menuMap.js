/**
 * @Created Date       : 2016-10-12T15:13:36+08:00
* @Last Modified time : 2016-11-22T10:32:41+08:00
 */



var map = {
    org: {
        name: "组织与员工",
        moduleID: 5, //模块ID
        menus: {
            structureMap: {
                name: "横向视图"
            },
            import: {
                name: "导入",
                pages: {
                    "importOrg": {
                        name: "导入组织"
                    },
                    "importStore": {
                        name: "导入门店"
                    },
                    "importPosition": {
                        name: "导入职位"
                    },
                    "importRank": {
                        name: "导入职级"
                    },
                    "importPostType": {
                        name: "导入岗位分类"
                    },
                    "importPost": {
                        name: "导入岗位"
                    },
                    "importUsers": {
                        name: "导入员工"
                    },

                }
            },
            map: {
                menuID: 53,
                name: "组织架构图",
            },
            post: {
                menuID: 57,
                name: "岗位"
            },
            orgTree: {
                menuID: 58,
                name: "组织树管理",
                pages: {
                    "dept": {
                        name: "组织树"
                    },
                }
            },
            postTree: {
                menuID: 59,
                name: "岗位树管理",
                pages: {
                    "position": {
                        name: "职位树"
                    },
                    "post": {
                        name: "岗位树"
                    },
                    "postClass": {
                        name: "岗位分类"
                    },
                    "rank": {
                        name: "职级"
                    },

                }
            },

            addEmployee: {
                menuID: 60,
                name: "新员工入职",
            },

            regular: {
                menuID: 61,
                name: "员工转正",
            },

            transaction: {
                menuID: 62,
                name: "员工异动",
            },

            dimission: {
                menuID: 63,
                name: "员工离职",
            },

            roster: {
                menuID: 64,
                name: "花名册",
            },

            blacklist: {
                menuID: 65,
                name: "黑名单",
            },

            dormitory: {
                name: "宿舍",
            },

            area: {
                name: "区域管理",
            },

            store: {
                name: "门店",
            },

            team: {
                name: "门店小组",
            },

            brand: {
                name: "品牌",
            },

        }
    },
    permission: {
        name: "权限管理",
        moduleID: 3,
        menus: {
            role: {
                menuID: 52,
                name: "角色管理",
                pages: {
                    "tree": {
                        name: "角色树管理"
                    },
                    "manage": {
                        name: "角色功能授权"
                    }
                }
            },
        }
    },
    schedule: {
        name: "排班",
        moduleID: 9,
        menus: {
            department: {
                menuID: 54,
                name: "部门排班",
            },
            service: {
                menuID: 55,
                name: "服务组排班",
            },
            manager: {
                menuID: 56,
                name: "管理组排班",
            },
            menu: {
                name: "排班菜单",
                pages: {
                    "workClass": {
                        name: "班次"
                    }
                }
            },


        }
    },
    attendanceEntire: {
        name: "考勤",
        moduleID: 10,
        menus: {
            day: {
                menuID: 66,
                name: "日考勤",
            },
            month: {
                menuID: 67,
                name: "月考勤"
            },
            refresh: {
                name: "刷新",
            },
            bulu: {
                name: "补录",
            },
            choose: {
                name: '筛选'
            },
            import: {
                name: "更多",
                pages: {
                    "importExcel": {
                        name: "导入"
                    },
                    "exportExcel": {
                        name: "导出"
                    },
                    "other": {
                        name: "查看其它工时"
                    },
                    "allot": {
                        name: "查看调拨员工"
                    },
                    "importPostType": {
                        name: "导入岗位分类"
                    },
                    "importPost": {
                        name: "导入岗位"
                    },
                    "importUsers": {
                        name: "导入员工"
                    },

                }
            }
        }

    },
    recruitment: {
        name: "招聘",
        moduleID: 13,
        menus: {
            post: {
                menuID: 73,
                name: "岗位发布",
            },
            posted: {
                name: "已发布岗位",
            },
            resume: {
                menuID: 74,
                name: "简历"
            },
        }
    },
    apply: {
        name: "申请",
        moduleID: 12,
        menus: {
            leave: {
                menuID: 70,
                name: "请假申请",
            },
            overtime: {
                menuID: 71,
                name: "加班申请"
            },
            trip: {
                menuID: 72,
                name: "出差申请"
            },
        }
    },
    pay: {
        name: "薪酬",
        moduleID: 14,
        menus: {
            series: {
                menuID: 77,
                name: "薪酬账套",
                pages: {
                    items: {
                        name: '工资项目'
                    },
                    suites: {
                        name: '工资套'
                    }
                }
            },
            user: {
                menuID: 78,
                name: "变动应用"
            },
            calculate: {
                menuID: 79,
                name: "计算发放"
            },
        }
    },
    workflow: {
        name: "工作流",
        moduleID: 17,
        menus: {
            approval: {
                menuID: 82,
                name: "审批",
                pages: {
                    pending: {
                        name: "待审批"
                    },
                    resolved: {
                        name: "已审批"
                    },
                    my: {
                        name: "我的"
                    }
                }
            },
        }
    },
    config: {
        name: "规则配置",
        moduleID: 11,
        menus: {
            system: {
                menuID: 68,
                name: "系统设置",
            },
            schedule: {
                menuID: 69,
                name: "排班规则"
            },
            attendance: {
                menuID: 80,
                name: "考勤规则"
            },
            vacation: {
                menuID: 76,
                name: '假期规则'
            },
            pay: {
                menuID: 83,
                name: '薪酬规则'
            },
            extendTable: {
                menuID: 84,
                name: '员工扩展'
            },
            ATmachine: {
                menuID: 81,
                name: '考勤机'
            },
            requireItem: {
                menuID: 85,
                name: '必填项'
            },
            safeSetting: {
                menuID: 86,
                name: '安全设置'
            },
            orgRule:{
                menuID: 88,
                name: '组织与员工规则'
            },
            workflow: {
                menuID: 87,
                name: '审批设置'
            },
        }
    },
    commonreport: {
        name: '公用报表',
        moduleID: 16,
        menus: {
            dimiCount: {
                name: '离职人数统计'
            },
            leaveCause: {
                name: '离职员工分析'
            },
            move: {
                name: '员工异动报表'
            },
            userType: {
                name: '用工类型人数统计'
            },
            leaveRate: {
                name: '离职率'
            },
            onlineCause: {
                name: '在职员工分析'
            },
            employeeCount: {
                name: '员工人数统计'
            }
        }
    },
    mwreport: {
        name: '木屋报表',
        moduleID: 15,
        menus: {
            day: {
                name: '出勤日报表'
            },
            month: {
                name: '月考勤明细报表'
            },
            reCard: {
                name: '补签卡记录'
            }
        }
    },
    hgreport: {
        name: '华工报表',
        moduleID: 18,
        menus: {
            pay: {
                name: '工资发放报表',
            }
        }
    },
    xzyreport: {
        name: '新煮意报表',
        moduleID: 19,
        menus: {
            pay: {
                name: '工资发放报表',
            },
            month:{
              name:'出勤月报表',
            },
            day:{
              name:'出勤日报表',
            }
        }
    },
    account:{
        name:'账号管理',
        moduleID:22,
        menus:{
            resetPass:{
                name:'重置密码'
            }
        }
    }


}

function getPageName(code) {
    var arr = code.split("/")[0].split("-");

    if (!map[arr[0]]) return "";

    // module-menu-button
    if (arr.length <= 3) {

        if (map[arr[0]].menus && map[arr[0]].menus[arr[1]]) {
            // var menuKey = map[arr[0]].menus[arr[1]].menuID ? "="+arr[1] :"";
            // moduleID__key:menuName=menuKey
            return map[arr[0]].moduleID + "___" + arr[0] + '-' + arr[1] + ':' + map[arr[0]].menus[arr[1]].name;
        }

    }
    // module-menu-page-button
    else if (arr.length == 4) {

        if (map[arr[0]].menus && map[arr[0]].menus[arr[1]]) {

            // var menuKey = map[arr[0]].menus[arr[1]].menuID ? "="+arr[1] :"";

            if (map[arr[0]].menus[arr[1]].pages && map[arr[0]].menus[arr[1]].pages[arr[2]]) {
                // moduleID__key:pageName
                return map[arr[0]].moduleID + "___" + arr[0] + '-' + arr[1] + '-' + arr[2] + ':' + map[arr[0]].menus[arr[1]].pages[arr[2]].name;
            } else {
                // moduleID__key:menuName=menuKey
                return map[arr[0]].moduleID + "___" + arr[0] + '-' + arr[1] + ':' + map[arr[0]].menus[arr[1]].name;
            }

        }

    } else {
        return "";
    }



}

module.exports = {
    map: map,
    getPageName: getPageName
};
