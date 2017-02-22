/**
 * @Created Date       : 2016-08-28T15:36:04+08:00
* @Last Modified time : 2016-12-03T17:17:32+08:00
 */



import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {

    // combo 组织树
    orgComboTree: [],

    startTime: '',
    endTime: '',
    dropname: [{
        label: '选择组织'
    }],
    dropvalue: [],
    orgDisplayName: [],
    orgDisplayID: [],
    //离职人数统计
    dimifields: [],
    dimiList: [],

    //离职原因分析
    AnalyzFields: [],
    AnalyzList: [],

    //离职工龄分析
    workYearAnalyzFileds: [],
    workYearAnalyzList: [],

    //门店列表
    storeListFileds: [],
    storeListList: [],

    //离职率
    rateListFileds: [],
    rateListList: [],

    //离职员工列表
    leaveEmployeListList: [],
    leaveEmployeListFileds: [],

    employeListParams: {},

    //员工人数
    EmployeeNumCountListList: [],

    flag: true,
    //用工类型
    userTypes: [],
    userTypeVal: [],
    //组织类型下拉框
    orgTypeList: [],
    //组织名称下拉框
    orgNameList: [],
    orgNameListVal: [],
    //时间条件
    timeCondition: [{
        codeName: '按月份查询',
        value: 'month',
    }, {
        codeName: '按日期查询',
        value: 'day',
    }],
    //日考勤报表数据
    attenDayDataList: [],
    attenMonthDataList: [],

    attenXzyDayDataList: [],
    attenXzyMonthDataList: [],
    attenCardDataList: [],
    employeeNumberReportDataList: [],
    leaveEmployeeNumberReportDataList: [],
    leaveEmployeeNumberReportTitleList: [{
        name: "orgName",
        title: "组织名称",
        width: '300px'
    }, ],
    moveEmployeeNumberReportDataList: [],
    userTypeEmployeeNumberReportTitleList: [{
        name: "orgName",
        title: "组织名称",
        width: '300px'
    }, ],
    userTypeEmployeeNumberReportDataList: [],
    leaveRateEmployeeNumberReportDataList: [],
    leaveRateEmployeeNumberReportTitleList: [{
        name: "orgName",
        title: "组织名称",
        width: '300px'
    }, ],
    leaveEmployeeWorkAgeAnalysisReportDataList: [],
    leaveEmployeeAgeAnalysisReportDataList: [],
    onlineEmployeeNativeAgeAnalysisReportDataList: [],
    onlineEmployeeAgeAnalysisReportDataList: [],
    onlineEmployeeEducationAgeAnalysisReportDataList: [],
    onlineEmployeeEducationAgeAnalysisReportTitleList: [{
        name: "orgName",
        title: "组织名称",
        width: '300px'
    }],
    onlineEmployeeRankAnalysisReportDataList: [],
    onlineEmployeeRankAnalysisReportTitleList: [{
        name: "orgName",
        title: "组织名称",
        width: '300px'
    }],
    employeeVacationBalanceReportList: [],
    huagongPayMonthReportList: [],
    huagongPayMonthReportTitle: [{
        name: "userID",
        title: "序号",
    }, {
        name: "suiteName ",
        title: "工资套名称",
    }, {
        name: "userName",
        title: "姓名",
    }, {
        name: "startTime",
        title: "入职时间",
    }, {
        name: "postName",
        title: "岗位",
    }, {
        name: "postTypeName",
        title: "岗位分类",
    }, {
        name: "organizeName",
        title: "班组",
        width: '300px'
    }],
    huagongPayMonthReportMultiTitles: [{
        title: '工资',
        columns: [],
    }, {
        title: '奖金',
        columns: [],
    }, {
        title: '社保',
        columns: [],
    }, {
        title: '合计',
        columns: [],
    }],
    xzyTitles: [{
        name: "serialNum",
        title: "序号",
        width: '60px',
    }, {
        name: "suiteName",
        title: "工资套名称",
    }, {
        name: "userNum",
        title: "员工工号",
    }, {
        name: "userName",
        title: "姓名",
    }, {
        name: "startTime",
        title: "入职时间",
    }, {
        name: "userIDCard",
        title: "身份证号",
    }, {
        name: "organizeName",
        title: "组织名称",
    }, {
        name: "rankName",
        title: "职级",
    }, {
        name: "postName",
        title: "岗位名称",
    }],

    xzyPayReportList:[],
    //新煮意薪酬 岗位名称
    postNameList: [],
    postNameListVal: [],
    searchFor: {},



};
// 数据修改
const mutations = {
        //当一个表格数据加载完清空所有查询条件
        clearSearchConditions() {
            state.orgNameListVal = [];
            state.userTypeVal = [];
            state.startTime='';
            state.endTime='';
        },
        clearSearchConditions2() {
            state.searchFor.userType = [];
            state.searchFor.userType = JSON.stringify([]);
            state.searchFor.IDs = [];
            state.searchFor.IDs = JSON.stringify([]);
            // state.startTime='';
            // state.endTime='';
        },
        //重置时间
        ResetTime(flag) {
            if (flag) {
                state.flag = true
            } else {
                state.flag = false
            }
        },
        //默认时间
        defaultTime() {
            state.startTime = Tool.iDate(new Date().getTime(), 'yy/mm/', -90).y + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/', -90).mm;
            state.endTime = Tool.iDate(new Date().getTime(), 'yy/mm/').y + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/').mm;
        },
        defaultTimeDay() {
            // state.startTimeDay = Tool.iDate(new Date().getTime(), 'yy/mm/', -7).y + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/', -7).mm + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/', -7).dd;
            // state.endTimeDay = Tool.iDate(new Date().getTime(), 'yy/mm/').y + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/').mm + '/' + Tool.iDate(new Date().getTime(), 'yy/mm/').dd;
        },
        //设置门店部门组织树所选择的值
        setOrgDisplayName(data) {
            state.orgDisplayName = [];
            state.orgDisplayID = [];
            for (var i = 0; i < data.length; i++) {
                state.orgDisplayName.$set(state.orgDisplayName.length, data[i].text);
                state.orgDisplayID.$set(state.orgDisplayID.length, data[i].organizeID);
            }
        },
        //combo 组织树
        SetComboTree(data) {
            state.orgDisplayName = [];
            state.orgDisplayID = [];

            // this.setOrgChartTreeRecursion(data);
            state.orgComboTree = data;
        },
        setEmployeListParams(data, m) {
            state.employeListParams.startDate = m;
            state.employeListParams.IDs = JSON.stringify([data]);
        },
        //设置离职员工列表
        setLeaveEmployeListGrid(data) {
            state.leaveEmployeListList = [];
            state.leaveEmployeListFileds = [];
            for (let i = 0; i < data.length; i++) {
                state.leaveEmployeListList.$set(state.leaveEmployeListList.length, data[i]);
            }
        },
        //员工人数
        setEmployeeNumCountListGrid(data) {
            state.EmployeeNumCountListList = [];
            for (let i = 0; i < data.length; i++) {
                state.EmployeeNumCountListList.$set(state.EmployeeNumCountListList.length, data[i]);
            }
        },
        //用工类型
        SetUserTypes(data) {
            data.forEach((item) => {
                item.value = item.code;
                item.name = item.codeName;
            })
            state.userTypes = data;
        },
        //日考勤数据
        setAtteDayReportData(data) {
            state.attenDayDataList = data;
        },
        // 月考勤数据
        setAtteMonthReportData(data) {
            state.attenMonthDataList = data;
        },
        //日考勤数据
        setAtteXzyDayReportData(data) {
            state.attenXzyDayDataList = data;
        },
        // 月考勤数据
        setAtteXzyMonthReportData(data) {
            state.attenXzyMonthDataList = data;
        },
        // 补签卡
        setCardReportData(data) {
            state.attenCardDataList = data;
        },
        // 员工人数统计
        setEmployeeNumberReportData(data) {
            state.employeeNumberReportDataList = data;
        },
        // 离职人数统计
        setLeaveEmployeeNumberReportData(data) {
            state.leaveEmployeeNumberReportTitleList = [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }];
            for (var i in data[0]) {
                if (i != 'orgID') {
                    if (i != 'total') {
                        state.leaveEmployeeNumberReportTitleList.push({
                            name: i,
                            title: i,
                        });
                    }
                }
            }
            state.leaveEmployeeNumberReportTitleList.push()
            state.leaveEmployeeNumberReportDataList = data;
        },
        // 员工异动统计
        setMoveEmployeeNumberReportData(data) {
            state.moveEmployeeNumberReportDataList = data;
        },
        // 用工类型人数统计
        setUserTypeEmployeeNumberReportData(data) {
            state.userTypeEmployeeNumberReportTitleList = [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }]
            for (var i in data[0]) {
                if (i != 'orgID') {
                    if (i != 'total') {
                        state.userTypeEmployeeNumberReportTitleList.push({
                            name: i,
                            title: i,
                        });
                    }
                }
            }
            state.userTypeEmployeeNumberReportDataList = data;
        },
        // 离职率
        setLeaveRateEmployeeNumberReportData(data) {
            state.leaveRateEmployeeNumberReportTitleList = [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }]
            for (var i in data[0]) {
                if (i != 'orgID') {
                    if (i != 'total') {
                        state.leaveRateEmployeeNumberReportTitleList.push({
                            name: i,
                            title: i,
                        });
                    }
                }
            }
            state.leaveRateEmployeeNumberReportDataList = data;
        },
        // 离职司龄
        setLeaveEmployeeWorkAgeAnalysisReportData(data) {
            state.leaveEmployeeWorkAgeAnalysisReportDataList = data;
        },
        // 离职年龄
        setLeaveEmployeeAgeAnalysisReportData(data) {
            state.leaveEmployeeAgeAnalysisReportDataList = data;
        },
        // 在职员工籍贯
        setOnlineEmployeeNativeAgeAnalysisReportData(data) {
            state.onlineEmployeeNativeAgeAnalysisReportDataList = data;
        },
        // 在职员工年龄
        setOnlineEmployeeAgeAnalysisReportData(data) {
            state.onlineEmployeeAgeAnalysisReportDataList = data;
        },
        // 在职员工文化程度
        setOnlineEmployeeEducationAgeAnalysisReportData(data) {
            state.onlineEmployeeEducationAgeAnalysisReportTitleList = [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }]
            for (var i in data[0]) {
                if (i != 'orgID') {
                    if (i != 'total') {
                        state.onlineEmployeeEducationAgeAnalysisReportTitleList.push({
                            name: i,
                            title: i,
                        });
                    }
                }
            }
            state.onlineEmployeeEducationAgeAnalysisReportDataList = data;

        },
        // 在职员工职级
        setOnlineEmployeeRankAnalysisReportData(data) {
            state.onlineEmployeeRankAnalysisReportTitleList = [{
                name: "orgName",
                title: "组织名称",
                width: '300px'
            }]
            for (var i in data[0]) {
                if (i != 'orgID') {
                    if (i != 'total') {
                        state.onlineEmployeeRankAnalysisReportTitleList.push({
                            name: i,
                            title: i,
                        });
                    }
                }
            }
            state.onlineEmployeeRankAnalysisReportDataList = data;
        },
        // 假期余额
        setEmployeeVacationBalanceReport(data) {
            state.employeeVacationBalanceReportList = data;
        },
        //华工薪酬 工资发放报表
        setHuagongPayMonthReport(data) {
            state.huagongPayMonthReportList = data.map((item) => {
                if (item.itemList && item.itemList.length > 0) {
                    item.itemList.forEach((ilist) => {
                        item[ilist.itemName] = ilist.money;
                    });
                    delete item.itemList;
                }
                return item;
            });
        },
        //新煮意薪酬 工资发放报表
        setxzyPayReport(data) {

          for (var i in data) {
              if (data[i].itemList) {
                data[i].itemList.forEach((item)=>{
                  state.xzyTitles.push({
                      name: item.itemName,
                      title: item.itemName,
                  });
                })
              }
          }
          state.xzyPayReportList = data.map((item) => {
              if (item.itemList && item.itemList.length > 0) {
                  item.itemList.forEach((ilist) => {
                      item[ilist.itemName] = ilist.money;
                  });
                  delete item.itemList;
              }
              return item;
          });
          // console.log(state.xzyTitles)
          // console.log(state.xzyPayReportList)

        },
        //设置岗位名称
        setPostNameList(data) {
            data.forEach((item) => {
                item.value = item.ID;
                item.name = item.postName;
            })
            state.postNameList = data;
        },
        //组织类型
        setOrgTypeList(data) {
            state.orgTypeList = data;
        },
        //组织名称
        SetOrgNameList(data) {
            state.orgNameList = [];
            state.orgNameListVal = [];
            state.orgNameList = data.map((item) => {
                return {
                    name: item.departmentName,
                    value: item.organizeID
                }
            });
        },
        SetTeamNameList(data) {
            state.orgNameList = [];
            state.orgNameListVal = [];
            state.orgNameList = data.map((item) => {
                return {
                    name: item.teamName,
                    value: item.organizeID
                }
            });
        },
        SetStoreNameList(data) {
            state.orgNameList = [];
            state.orgNameListVal = [];
            state.orgNameList = data.map((item) => {
                return {
                    name: item.storeName,
                    value: item.organizeID
                }
            });
        },
        // 查询条件参数
        setLoadParams(timeCondition, userName) {
            state.searchFor = {};
            if (timeCondition == 'month') {
                state.searchFor.startDate = (state.startTime.replace('/', '-')).replace('/', '-');
                state.searchFor.endDate = (state.endTime.replace('/', '-')).replace('/', '-');
            } else {
                state.searchFor.startDate = (state.startTime.replace('/', '-')).replace('/', '-');
                state.searchFor.endDate = (state.endTime.replace('/', '-')).replace('/', '-');
            }
            state.searchFor.IDs = JSON.stringify(state.orgNameListVal);
            state.searchFor.userType = [];
            state.searchFor.userType = JSON.stringify(state.userTypeVal);
            state.searchFor.dateType = timeCondition;
            state.searchFor.userName = userName;
        },
        OrgChartTree(data) {
            state.orgChartTree = data;
        },
    }
    // 操作
const actions = {
    //重置时间
    ResetTime(flag) {
        mutations.ResetTime(flag);
    },
    //默认时间
    defaultTime() {
        mutations.defaultTime();
    },
    defaultTimeDay() {
        mutations.defaultTimeDay();
    },

    //检查开始结束时间和组织是否选择
    checkConditions() {
        if (state.startTime == '' || state.endTime == '' || state.orgNameListVal.length <= 0 || state.orgTypeList.length <= 0 || state.userTypeVal.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择查询条件！',
                duration: 1000
            })
            return false;
        } else {
            return true;
        }
    },
    checkConditions2() {
        if (state.startTime == '' || state.endTime == '' || state.orgNameListVal.length <= 0 || state.orgTypeList.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择查询条件！',
                duration: 1000
            })
            return false;
        } else {
            return true;
        }
    },
    checkConditions3() {
        if (state.startTime == '' || state.endTime == '') {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择查询时间',
                duration: 1000
            })
            return false;
        } else {
            return true;
        }
    },
    // //检查姓名搜索需要的时间字段
    // checkUserNameSeareh(){
    //   if (state.startTime == '' || state.endTime == '' ) {
    //       Vue.tool.showTip({
    //           type: 'danger',
    //           msg: '请选择查询条件！',
    //           duration: 1000
    //       })
    //       return false;
    //   } else {
    //       return true;
    //   }
    // },
    //加载组织类型
    loadOrgType(cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Statement.selectOrgTypeReport',
            data: '',
            success(data, res) {
                cbSuccess(data);
                mutations.setOrgTypeList(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //加载组织名称
    loadOrgName(type, cbSuccess, cbError) {
        var params = {};
        var url = '';
        params.type = type;
        if (type == 'dept' || type == 'brand' || type == 'area') {
            url = 'api.Statement.selectByType';
            Tool.ajax({
                url: url,
                data: params,
                success(deptData, res) {
                    mutations.SetOrgNameList(deptData);
                    cbSuccess && cbSuccess();
                },
                error(res) {
                    cbError(res)
                }
            })
        } else if (type == 'store') {
            url = 'api.Statement.selectStore';
            Tool.ajax({
                url: url,
                data: '',
                success(deptData, res) {
                    mutations.SetStoreNameList(deptData);
                    cbSuccess && cbSuccess();
                },
                error(res) {
                    cbError(res)
                }
            })
        } else if (type == 'team') {
            url = 'api.Statement.selectMyTeam';
            Tool.ajax({
                url: url,
                data: '',
                success(deptData, res) {
                    mutations.SetTeamNameList(deptData);
                    cbSuccess && cbSuccess();
                },
                error(res) {
                    cbError(res)
                }
            })
        }

    },
    //设置门店部门组织树所选择的值
    setOrgDisplayName(data) {
        mutations.setOrgDisplayName(data);
    },
    //加载离职员工列表
    showModalLeaveEmployeList(data, m) {
        mutations.setEmployeListParams(data, m);
    },
    load() {
        Vue.tool.checkMenu('服务组排班')
    },
    //**********加载系统配置 114000
    findSystemConfig(activeValue, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Settings.getSystemConfigData',
            data: {
                defintionCode: activeValue,
                // key: key
            },
            success(data, res) {
                mutations.SetUserTypes(data);
                if (cbSuccess) cbSuccess(data);
            },
            error(res) {
                if (cbError) cbError(res);
            }
        });
    },
    setLoadParams(timeCondition, userName) {
        mutations.setLoadParams(timeCondition, userName);
    },
    //加载日考勤 木屋
    loadAtteDayReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectDayAttendanceReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setAtteDayReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //加载月考勤 木屋
    loadAtteMonthReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectMonthAttendanceReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setAtteMonthReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })

    },
    //加载日考勤 新煮意
    loadAtteXzyDayReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectXzyDayAttendanceReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setAtteXzyDayReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //加载月考勤 新煮意
    loadAtteXzyMonthReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectXzyMonthAttendanceReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setAtteXzyMonthReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })

    },
    //加载补签卡
    loadCardReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectRetroactiveCardReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setCardReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })

    },
    //员工人数统计
    loadEmployeeNumberReportData(cbSuccess, cbError, timeCondition, userName) {
        Tool.ajax({
            url: 'api.Statement.selectEmployeeNumberReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setEmployeeNumberReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //离职人数统计
    loadLeaveEmployeeNumberReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectLeaveEmployeeNumberReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setLeaveEmployeeNumberReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //员工异动统计
    loadMoveEmployeeNumberReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectMoveEmployeeNumberReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setMoveEmployeeNumberReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //查询用工类型人数统计t
    loadUserTypeEmployeeNumberReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectUserTypeEmployeeNumberReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setUserTypeEmployeeNumberReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //查询离职率列表
    loadLeaveRateEmployeeNumberReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectLeaveRateEmployeeNumberReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setLeaveRateEmployeeNumberReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },

    loadLeaveEmployeeAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectLeaveEmployeeAgeAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setLeaveEmployeeAgeAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //离职司龄
    loadLeaveEmployeeWorkAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectLeaveEmployeeWorkAgeAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setLeaveEmployeeWorkAgeAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //在职员工籍贯
    loadOnlineEmployeeNativeAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectOnlineEmployeeNativeAgeAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setOnlineEmployeeNativeAgeAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //在职员工年龄
    loadOnlineEmployeeAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectOnlineEmployeeAgeAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setOnlineEmployeeAgeAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //在职员工文化程度
    loadOnlineEmployeeEducationAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectOnlineEmployeeEducationAgeAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setOnlineEmployeeEducationAgeAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //在职员工职级分析
    loadOnlineEmployeeRankAgeAnalysisReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectOnlineEmployeeRankAnalysisReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setOnlineEmployeeRankAnalysisReportData(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    //假期余额报表
    loadEmployeeVacationBalanceReport(cbSuccess, cbError, timeCondition) {
        Tool.ajax({
            url: 'api.Statement.selectEmployeeVacationBalanceReport',
            data: state.searchFor,
            success(data, res) {
                mutations.setEmployeeVacationBalanceReport(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    loadHuagongPayMonthReport(cbSuccess, cbError, timeCondition, userName) {
        var searchFor = {};
        searchFor.startDate = (state.startTime.replace('/', '-')).replace('/', '-');
        searchFor.endDate = (state.endTime.replace('/', '-')).replace('/', '-');
        searchFor.IDs = JSON.stringify(state.orgDisplayID);
        searchFor.userType = [];
        searchFor.userType = JSON.stringify(state.userTypeVal);
        searchFor.dateType = timeCondition;
        searchFor.userName = userName;
        Tool.ajax({
            url: 'api.Statement.huagongPayMonth',
            data: searchFor,
            success(data, res) {
                mutations.setHuagongPayMonthReport(data);
                // mutations.clearSearchConditions();
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },
    loadxzyPayReport(cbSuccess, cbError, timeCondition, userName) {
        var searchFor = {};
        searchFor.startDate = (state.startTime.replace('/', '-')).replace('/', '-');
        searchFor.endDate = (state.endTime.replace('/', '-')).replace('/', '-');
        searchFor.IDs = JSON.stringify(state.orgDisplayID);
        searchFor.userType = [];
        searchFor.userType = JSON.stringify(state.userTypeVal);
        searchFor.dateType = timeCondition;
        searchFor.userName = userName;
        searchFor.postIDs = [];
        searchFor.postIDs = JSON.stringify(state.postNameListVal);
        Tool.ajax({
            url: 'api.Statement.xzyPayMonth',
            data: searchFor,
            success(data, res) {
                mutations.setxzyPayReport(data);
                cbSuccess(data);
            },
            error(res) {
                cbError(res)
            }
        })
    },

    clearSearchConditions() {
        mutations.clearSearchConditions();
    },
    clearSearchConditions2() {
        mutations.clearSearchConditions2();
    },
    // 加载岗位名称
    loadPostNameList() {
        Tool.ajax({
            url: 'api.Statement.postSelect',
            data: '',
            success(data, res) {
                mutations.setPostNameList(data);
            },
            error(res) {

            }
        })
    },
    loadOrgListTree(cbSuccess, cbError) {
        var deptPromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectDepartment',
                success(deptData, res) {
                    resolve(deptData);
                },
                error(res) {
                    reject(res);
                }
            });
        });
        var storePromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.Permission.selectStore',
                success(storeData, res) {
                    resolve(storeData);
                },
                error(res) {
                    reject(res);
                }
            });
        });
        var teamPromise = new Promise((resolve, reject) => {
            Tool.ajax({
                url: 'api.OrgEmployee.getAllStoreTeam',
                success(teamData, res) {
                    resolve(teamData);
                },
                error(res) {
                    reject(res);
                }
            });
        });
        Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
            var deptData = val[0];
            var storeData = val[1];
            var teamData = val[2];

            if (Array.isArray(teamData)) {
                teamData.forEach(function(elem) {
                    elem.nodeType = "team";
                    elem.text = elem.teamName;

                });
            }
            if (Array.isArray(storeData)) {
                storeData.forEach(function(elem) {
                    if (Array.isArray(teamData)) {
                        var childrenButton = teamData.filter(function(item) {
                            return item.storeID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function(item) {
                            elem.children.push(item);
                        });
                    }
                });
            }
            if (Array.isArray(deptData)) {
                deptData.forEach(function(elem) {
                    elem.nodeType = "department";
                    elem.expanded = false;
                    elem.text = elem.departmentName;
                    if (Array.isArray(storeData)) {
                        var childrenButton = storeData.filter(function(item) {
                            return item.deptID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function(item) {
                            item.nodeType = "store";
                            item.text = item.storeName;
                            elem.children.push(item);
                        });
                    }
                });
            }
            // var treeData = Tool.convertToTree(deptData, 'deptID');
            var treeData2 = Tool.convertToTree(deptData)
            var root = {
                ID: -1,
                pageName: '组织树',
                children: [],
                expanded: true
            };
            treeData2.forEach(function(item) {
                item.expanded = true;
                root.children.push(item);
            });

            // 处理没有挂载在部门的 store
            if (Array.isArray(storeData)) {
                storeData.forEach((elem) => {
                    if (!elem.nodeType) {
                        elem.text = elem.storeName;
                        root.children.push(elem);
                    }
                });
            }
            mutations.SetComboTree(root);
            if (cbSuccess) cbSuccess(root);
        }).catch((e) => {
            if (cbError) cbError(e);
        });
    },
}

export default {
    state,
    mutations,
    actions
};
