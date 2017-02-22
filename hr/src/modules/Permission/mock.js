var successRes = {
    "result": 1,
    "success": true,
    "err_msg": "请求处理成功",
    "err_code": 8888
}

var dataTpl = {
    "result": 1,
    "success": true,
    "err_msg": "请求处理成功",
    "err_code": 8888
}

export default {

    // 是否开启本模块 mock
    inservice: false,

    // 模拟数据，可通过arg参数动态返回数据

    getRoleList(arg){
        dataTpl.result = [{
            id: 1,
            name: '林俊杰',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 2,
            name: '张宇',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 3,
            name: '张信哲',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 4,
            name: '张雨生',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 5,
            name: '陈楚生',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 6,
            name: '李宇春',
            value: '1',
            userCode: '10015447',
            checked: false
        }, {
            id: 7,
            name: '何炅',
            value: '1',
            userCode: '10015447',
            checked: false
        }]
        return dataTpl;
    },
    getFieldData(arg) {
        dataTpl.result = [{
            id: 1,
            title: '排班表',
            fieldS: [{
                id: 9,
                checked: false,
                fieldText: '字段1'
            }, {
                id: 12,
                checked: false,
                fieldText: '字段2'
            }, {
                id: 11,
                checked: false,
                fieldText: '字段3'
            }, {
                id: 10,
                checked: false,
                fieldText: '字段4'
            }]
        }, {
            id: 1,
            title: '假期表',
            fieldS: [{
                id: 2,
                checked: true,
                fieldText: '字段5'
            }, {
                id: 3,
                checked: true,
                fieldText: '字段6'
            }, {
                id: 4,
                checked: true,
                fieldText: '字段7'
            }, {
                id: 5,
                checked: true,
                fieldText: '字段8'
            }]
        }, {
            id: 1,
            title: '年假表',
            fieldS: [{
                id: 1,
                checked: false,
                fieldText: '字段9'
            }, {
                id: 6,
                checked: false,
                fieldText: '字段10'
            }, {
                id: 7,
                checked: false,
                fieldText: '字段11'
            }, {
                id: 8,
                checked: false,
                fieldText: '字段12'
            }]
        }]
        return dataTpl;
    },
    getPersonRoleList(arg) {

        dataTpl.result = [{
            id: 1,
            name: '林俊杰',
            userCode: '10015447',
            date: '2016-01-02',
            photo: '../../../assets/images/avatar.jpg'
        }, {
            id: 2,
            name: '张宇',
            userCode: '10015447',
            date: '2016-01-02',
            photo: ''
        }, {
            id: 3,
            name: '张信哲',
            userCode: '10015447',
            date: '2016-01-02',
            photo: ''
        }, {
            id: 4,
            name: '张雨生',
            userCode: '10015447',
            date: '2016-01-02',
            photo: ''
        }]
        return dataTpl;
    },
    selectSystemTree(arg) {

        dataTpl.result = [{
            "ID": 7,
            "companyID": 1,
            "createTime": 1463380744000,
            "des": "测试",
            "operatorID": 1,
            "parentID": -1,
            "roleName": "人事组",
            "type": 1,
            "valid": 1
        }, {
            "ID": 8,
            "companyID": 1,
            "createTime": 1464685363000,
            "operatorID": 7,
            "parentID": 7,
            "roleName": "人事专员",
            "type": 2,
            "valid": 1
        }, {
            "ID": 9,
            "companyID": 1,
            "createTime": 1464751211000,
            "operatorID": 1,
            "parentID": -1,
            "roleName": "门店组",
            "type": 1,
            "valid": 1
        }, {
            "ID": 10,
            "companyID": 1,
            "createTime": 1464751223000,
            "operatorID": 1,
            "parentID": 9,
            "roleName": "新澳店",
            "type": 2,
            "valid": 1
        }];

        return dataTpl;
    },
    getMenuTree(arg) {
        dataTpl.result = [
            {
                "ID": -3,
                "menuName": "权限管理",
                "parentID": -1
            },
            {
                "ID": 14,
                "createTime": 1461569501000,
                "des": "角色管理",
                "isLeft": 0,
                "menuName": "角色管理",
                "moduleID": 3,
                "parentID": -3,
                "url": "Web.view.companyconf.role.Role",
                "valid": 1
            },
            {
                "ID": 17,
                "createTime": 1461569553000,
                "des": "",
                "isLeft": 0,
                "menuName": "菜单权限",
                "moduleID": 3,
                "parentID": -3,
                "url": "Web.view.companyconf.authority.Menu",
                "valid": 1
            },
            {
                "ID": 18,
                "createTime": 1461569577000,
                "des": "数据权限",
                "isLeft": 0,
                "menuName": "数据权限",
                "moduleID": 3,
                "parentID": -3,
                "url": "Web.view.companyconf.authority.Data",
                "valid": 1
            },
            {
                "ID": 20,
                "createTime": 1461569604000,
                "des": "",
                "isLeft": 0,
                "menuName": "操作员管理",
                "moduleID": 3,
                "parentID": -3,
                "url": "Web.view.companyconf.operator.Operator",
                "valid": 1
            },
            {
                "ID": 21,
                "createTime": 1461569612000,
                "des": "",
                "isLeft": 0,
                "menuName": "工作流配置",
                "moduleID": 3,
                "parentID": -3,
                "url": "Web.view.companyconf.wfconfig.WFConfig",
                "valid": 1
            },
            {
                "ID": -5,
                "menuName": "组织架构",
                "parentID": -1
            },
            {
                "ID": 23,
                "createTime": 1462262659000,
                "des": "",
                "isLeft": 0,
                "menuName": "组织管理",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.org.Org",
                "valid": 1
            },
            {
                "ID": 24,
                "createTime": 1461571632000,
                "des": "",
                "isLeft": 1,
                "menuName": "职位",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.position.Position",
                "valid": 1
            },
            {
                "ID": 25,
                "createTime": 1461571640000,
                "des": "",
                "isLeft": 0,
                "menuName": "岗位",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.post.Post",
                "valid": 1
            },
            {
                "ID": 26,
                "createTime": 1461571651000,
                "des": "",
                "isLeft": 0,
                "menuName": "岗位分配",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.postallot.PostAllot",
                "valid": 1
            },
            {
                "ID": 27,
                "createTime": 1461571666000,
                "des": "",
                "isLeft": 0,
                "menuName": "小组分类",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.teamtype.TeamType",
                "valid": 1
            },
            {
                "ID": 44,
                "createTime": 1461571621000,
                "des": "",
                "isLeft": 0,
                "menuName": "职级",
                "moduleID": 5,
                "parentID": -5,
                "url": "Web.view.basedata.rank.Rank",
                "valid": 1
            },
            {
                "ID": -6,
                "menuName": "门店管理",
                "parentID": -1
            },
            {
                "ID": 32,
                "createTime": 1461571821000,
                "des": "",
                "isLeft": 0,
                "menuName": "区域",
                "moduleID": 6,
                "parentID": -6,
                "url": "Web.view.basedata.area.Area",
                "valid": 1
            },
            {
                "ID": 33,
                "createTime": 1461571828000,
                "des": "",
                "isLeft": 0,
                "menuName": "品牌",
                "moduleID": 6,
                "parentID": -6,
                "url": "Web.view.basedata.brand.Brand",
                "valid": 1
            },
            {
                "ID": 34,
                "createTime": 1461571838000,
                "des": "",
                "isLeft": 1,
                "menuName": "宿舍",
                "moduleID": 6,
                "parentID": -6,
                "url": "Web.view.basedata.dormitory.Dormitory",
                "valid": 1
            },
            {
                "ID": -7,
                "menuName": "员工管理",
                "parentID": -1
            },
            {
                "ID": 36,
                "createTime": 1461571892000,
                "des": "",
                "isLeft": 0,
                "menuName": "员工入职",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.usermanage.UserManage",
                "valid": 1
            },
            {
                "ID": 37,
                "createTime": 1461571904000,
                "des": "",
                "isLeft": 0,
                "menuName": "员工转正",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.official.Official",
                "valid": 1
            },
            {
                "ID": 38,
                "createTime": 1461571913000,
                "des": "",
                "isLeft": 1,
                "menuName": "员工异动",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.transaction.Transaction",
                "valid": 1
            },
            {
                "ID": 39,
                "createTime": 1461571921000,
                "des": "",
                "isLeft": 0,
                "menuName": "员工离职",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.dimission.Dimission",
                "valid": 1
            },
            {
                "ID": 40,
                "createTime": 1461571935000,
                "des": "",
                "isLeft": 0,
                "menuName": "黑名单",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.blacklist.Blacklist",
                "valid": 1
            },
            {
                "ID": 41,
                "createTime": 1461571946000,
                "des": "",
                "isLeft": 0,
                "menuName": "合同档案",
                "moduleID": 7,
                "parentID": -7,
                "url": "Web.view.manpowerplan.contract.Contract",
                "valid": 1
            },
            {
                "ID": -8,
                "menuName": "招聘管理",
                "parentID": -1
            },
            {
                "ID": 43,
                "createTime": 1461829396000,
                "des": "",
                "isLeft": 0,
                "menuName": "岗位发布",
                "moduleID": 8,
                "parentID": -8,
                "url": "Web.view.postjobsrecruitment.postjobs.Postjobs",
                "valid": 1
            },
            {
                "ID": 45,
                "createTime": 1462448680000,
                "des": "",
                "isLeft": 0,
                "menuName": "岗位申请查询",
                "moduleID": 8,
                "parentID": -8,
                "url": "Web.view.postjobsrecruitment.postshow.Postshow",
                "valid": 1
            },
            {
                "ID": -9,
                "menuName": "排班",
                "parentID": -1
            },
            {
                "ID": 46,
                "createTime": 1462506324000,
                "des": "",
                "isLeft": 1,
                "menuName": "部门排班",
                "moduleID": 9,
                "parentID": -9,
                "url": "Web.view.schedule.Department",
                "valid": 1
            },
            {
                "ID": 47,
                "createTime": 1462506347000,
                "des": "",
                "isLeft": 0,
                "menuName": "门店排班",
                "moduleID": 9,
                "parentID": -9,
                "url": "Web.view.schedule.Store",
                "valid": 1
            },
            {
                "ID": -10,
                "menuName": "考勤",
                "parentID": -1
            },
            {
                "ID": 48,
                "createTime": 1463111159000,
                "des": "",
                "isLeft": 1,
                "menuName": "日考勤",
                "moduleID": 10,
                "parentID": -10,
                "url": "Web.view.attendance.department.Day",
                "valid": 1
            },
            {
                "ID": 49,
                "createTime": 1463111169000,
                "des": "",
                "isLeft": 0,
                "menuName": "月考勤",
                "moduleID": 10,
                "parentID": -10,
                "url": "Web.view.attendance.department.Month",
                "valid": 1
            },
            {
                "ID": 50,
                "createTime": 1463111180000,
                "des": "",
                "isLeft": 0,
                "menuName": "考勤规则",
                "moduleID": 10,
                "parentID": -10,
                "url": "Web.view.attendance.rule.Rule",
                "valid": 1
            }
        ]
        return dataTpl;
    },
    getMenuBtnTree(arg) {
        dataTpl.result = {
            "btnPageList": [{
                "ID": 1,
                "createTime": 1464856908000,
                "moduleID": 1,
                "pageCode": "0001",
                "pageName": "人事实务",
                "valid": 1
            }, {
                "ID": 2,
                "createTime": 1464856925000,
                "moduleID": 1,
                "pageCode": "0002",
                "pageName": "员工页面",
                "valid": 1
            }, {
                "ID": 3,
                "createTime": 1464856934000,
                "moduleID": 1,
                "pageCode": "0003",
                "pageName": "部门页面",
                "valid": 1
            }],
            "buttonList": [{
                "btnCode": "0001",
                "btnID": 1,
                "btnName": "新增",
                "pageCode": 1,
                "pageID": 1
            }, {
                "btnCode": "002",
                "btnID": 2,
                "btnName": "修改",
                "pageCode": 1,
                "pageID": 1
            }, {
                "btnCode": "003",
                "btnID": 3,
                "btnName": "删除",
                "pageCode": 1,
                "pageID": 1
            }, {"btnCode": "001", "btnID": 4, "btnName": "新增", "pageCode": 2, "pageID": 2}, {
                "btnCode": "002",
                "btnID": 5,
                "btnName": "删除",
                "pageCode": 2,
                "pageID": 2
            }, {"btnCode": "003", "btnID": 6, "btnName": "修改", "pageCode": 2, "pageID": 2}, {
                "btnCode": "001",
                "btnID": 7,
                "btnName": "新增",
                "pageCode": 3,
                "pageID": 3
            }, {"btnCode": "002", "btnID": 8, "btnName": "修改", "pageCode": 3, "pageID": 3}, {
                "btnCode": "003",
                "btnID": 9,
                "btnName": "删除",
                "pageCode": 3,
                "pageID": 3
            }]
        }
        return dataTpl;
    },
    getCardList(arg) {
        dataTpl.result = {}
        return dataTpl;

    }


}
