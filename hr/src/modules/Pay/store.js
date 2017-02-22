import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>mutations>state>view

// 数据、状态
const state = {

    /* 公用数据 字典项等 以code为索引 */
    commonData: {
        userTypes: {},    // 用工类型
        userTypeOptions: [],    // 用工类型 下拉列表格式
        payItemTypes: {}, // 工资项目类别
        payItemDataType:{} // 类型
    },

    /* end */


    /* ******************************** 员工变动应用模块 start ******************************** */

    showApplyBtn: true,
    showShelveBtn: true,
    startTime: '',
    endTime: '',
    commitFlag: true,
    selectedInput:[],
    payUserSearch:'',// 搜索员工

    payRangeID: '',
    optionList: [
        {value: '124003', name: '升迁'},
        {value: '124001', name: '调动'},
        {value: '124004', name: '降职'},
        {value: '128005', name: '转正'},
        {value: '120003', name: '离职'},
    ],

    // 薪酬计算与发放
    paySuspendReasonCode: '141000',
    payYearMonth: [],
    paySuiteList: [], // 工资套列表


    /* ******************************** 员工变动应用模块 end ******************************** */




    /* ******************************** 薪酬账套模块 start ******************************** */

    /* 以下数据仅供薪酬账套模块使用 */

    // 单选，当前工资套信息，
    paySuiteInfo:{
        ID:'',           // ID
        suiteName:'',       // 名字
        valid:false,        // 启用状态
        orgId:'',           // 组织
        employeeType:'',    // 用工类型
    },
    paySuiteSearchUser:'',  // 搜索工资套内员工
    payItemsSearch:'', // 工资项目搜索
    // 单选，工资项目信息
    payItemInfo:{
        ID:'',
        itemName:'', // 项目名称
        valueType:'',// 数值类型 code
        category:'', // 项目类别 code
        des:'',
    },
    // 多选，工资项目列表IDs
    payItemIDs:[],

    // 单选，工资套项目
    paySuiteItemInfo:{
        ID:'',
        itemName:'',
        orderNum:'', // 计算顺序
        pointNum:'', // 小数点位数
        formula:'',  // 公式
        type:'',     // 类型
    },

    /* ******************************** 薪酬账套模块 end ******************************** */


    /* ******************************** 薪酬计算与发放模块 start ******************************** */
    searchPayEmployee: {
        payrangeID: null,
        monthID: null,
        userName: null
    },
    payDistributeEmployeeSelected: [],
    paySuspendEmployeeSelected: []
    /* ******************************** 薪酬计算与发放模块 end ******************************** */
};
// 数据修改
const mutations = {

    /* 公用数据 字典项等 */
    SetCommonData(key, data){

        state.commonData[key] = {};
        data.forEach(item=> {
            state.commonData[key][item.code] = item;
        })


        if(key=='userTypes'){

            for(let key in state.commonData.userTypes){
                let item = state.commonData.userTypes[key];
                state.commonData.userTypeOptions.push({
                    name:item.codeName,
                    value:item.code
                })
            }

        }

    },

    /* end */



    /* ******************************** 员工变动应用模块 start ******************************** */
    // 清空员工搜索名
    ClearSearchUser(){
        state.payUserSearch = '';
    },

    // 员工变动应用 > 设置工资套ID
    SetPayrangeID(ID){
        state.payRangeID = ID;
    },
    //修改员工变动应用提交状态
    ResetCommitFlag(flag){
        if (flag) {
            state.commitFlag = true
        } else {
            state.commitFlag = false
        }
    },
    //改变员工变动应用，应用按钮的状态
    ChangeShowApplyBtn(flag){
        if (flag) {
            state.showApplyBtn = true;
        } else {
            state.showApplyBtn = false;
        }
    },
    //改变员工变动应用，搁置按钮的状态
    ChangeShowShelveBtn(flag){
        if (flag) {
            state.showShelveBtn = true;
        } else {
            state.showShelveBtn = false;
        }
    },
    /* ******************************** 员工变动应用模块 end ******************************** */
    /* 薪酬计算与发放 */
    SetPayYearMonth(yearMonth) {
        state.payYearMonth = yearMonth;
    },

    /* ******************************** 薪酬账套模块 start ******************************** */
    // 工资套列表
    SetSuiteList(data){
        state.paySuiteList = data || [];
    },
    // 工资套信息
    SetSuiteInfo(data){

        for(let key in state.paySuiteInfo){
            state.paySuiteInfo[key] = data[key];
        }

        state.paySuiteInfo.valid = !!state.paySuiteInfo.valid;

    },
    // 工资项目
    SetPayItemInfo(data){
        for(let key in state.payItemInfo){
            state.payItemInfo[key] = data[key];
        }
    },
    // 要操作的工资项目列表IDs
    SetPayItemIDs(IDs){
        state.payItemIDs = IDs;
    },

    // 工资套工资项目
    SetPaySuiteItemInfo(data){
        for(let key in state.paySuiteItemInfo){
            state.paySuiteItemInfo[key] = data[key];
        }
    },
    /* ******************************** 薪酬账套模块 end ******************************** */


}
// 操作
const actions = {

    // 初始化数据
    initData(){

        // 加载字典项 —— 员工类型
        actions.findSystemConfig('120000', data=> {
            mutations.SetCommonData('userTypes', data);
        });

        // 加载字典项 —— 工资项目类别
        actions.findSystemConfig('142000', data=> {
            mutations.SetCommonData('payItemTypes', data);
        });
        // 加载字典项 —— 工资项目类型
        actions.findSystemConfig('148000', data=> {
            mutations.SetCommonData('payItemDataType', data);
        });

    },

    // 根据code获取字典项名字
    getNameInDataBook(name, code){

        let data = state.SetCommonData[name] || [];

        return data.filter(item=> {
            if (item.code == code) return item.codeName;
        })

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
                if (cbSuccess) cbSuccess(data);
            },
            error(res) {
                if (cbError) cbError(res);
            }
        });
    },

    //加载部门门店小组
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
                teamData.forEach(function (elem) {
                    elem.nodeType = "team";
                    elem.text = elem.teamName;

                });
            }
            if (Array.isArray(storeData)) {
                storeData.forEach(function (elem) {
                    if (Array.isArray(teamData)) {
                        var childrenButton = teamData.filter(function (item) {
                            return item.storeID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function (item) {
                            elem.children.push(item);
                        });
                    }
                });
            }
            if (Array.isArray(deptData)) {
                deptData.forEach(function (elem) {
                    elem.nodeType = "department";
                    elem.expanded = false;
                    elem.text = elem.departmentName;
                    if (Array.isArray(storeData)) {
                        var childrenButton = storeData.filter(function (item) {
                            return item.deptID == elem.ID;
                        });
                        elem.children = [];
                        childrenButton.forEach(function (item) {
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
            treeData2.forEach(function (item) {
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
            if (cbSuccess) cbSuccess(root);
        }).catch((e) => {
            if (cbError) cbError(e);
        });
    },


    /* ******************************** 薪酬账套模块 start ******************************** */

    // 获取工资项目
    getPayItems(successed,failded){
        Tool.ajax({
            url: 'api.Pay.selectPayItems',
            data: {
                pageNum:1,
                pageSize:1000000
            },
            success(data, res){

                console.log(data)

                if(successed) successed(data.recordList);
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })

    },

    // 添加工资项目
    addPayItems(data,successed,failded) {
        Tool.ajax({
            url: 'api.Pay.insertPayItems',
            data: data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'添加成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 选择工资项目
    setPayItemInfo(data){
        mutations.SetPayItemInfo(data);
    },
    // 选择多条工资项目，记录ID
    setPayItemIDs(IDs){
        mutations.SetPayItemIDs(IDs);
    },

    // 修改工资项目
    updatePayItems(data,successed,failded) {

        if(!state.payItemInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资项目'
            })

            return;
        }

        data.ID = state.payItemInfo.ID;

        Tool.ajax({
            url: 'api.Pay.updatePayItems',
            data:data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'修改成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 删除工资项目
    deletePayItems(successed,failded) {

        // if(state.payItemIDs.length==0){

        //     Vue.Tool.showTip({
        //         type:'error',
        //         msg:'请选择要操作的工资项目'
        //     })

        //     return;
        // }

        Tool.ajax({
            url: 'api.Pay.deletePayItems',
            data:{
                IDs:JSON.stringify(state.payItemIDs)
            },
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'删除成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },


    // 导入工资项目
    importPayItems(){
        Tool.ajax({
            url: 'api.Pay.paySeriesImport',
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'导入成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    /* ********* 工资套 ********** */

    // 查询工资套列表
    getSuiteList(successed,failded){
        Tool.ajax({
            url: 'api.Pay.selectPaysuite',
            success(data, res){
                mutations.SetSuiteList(data);
                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },
    //
    getSuiteData(index){
        let data = state.paySuiteList[index];
        mutations.SetSuiteInfo(data)
    },

    // 添加工资套
    addPaysuite(data,successed,failded) {
        Tool.ajax({
            url: 'api.Pay.insertPaysuite',
            data: data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'添加成功'
                })

                actions.getSuiteList();

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },
    // 复制工资套
    copyPaysuite(name,successed,failded) {

        if(!state.paySuiteInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资套'
            })

            return;
        }

        Tool.ajax({
            url: 'api.Pay.copyPaysuite',
            data:{
                suiteId:state.paySuiteInfo.ID,
                suiteName:name
            },
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'复制成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },
    // 修改工资套
    updatePaysuite(data,successed,failded) {

        if(!state.paySuiteInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资套'
            })

            return;
        }

        data.ID = state.paySuiteInfo.ID;

        Tool.ajax({
            url: 'api.Pay.updatePaysuites',
            data:data,
            success(_data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'修改成功'
                })

                mutations.SetSuiteInfo(data)

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },
    // 删除工资套
    deletePaysuite(successed,failded) {

        if(!state.paySuiteInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资套'
            })

            return;
        }

        Tool.ajax({
            url: 'api.Pay.deletePaysuite',
            data:{
                IDs:JSON.stringify([state.paySuiteInfo.ID])
            },
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'删除成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 开启关闭工资套

    togglePaysuite(status,successed,failded){

        if(!state.paySuiteInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资套'
            })

            return;
        }

        Tool.ajax({
            url: 'api.Pay.togglePaysuite',
            data:{
                ID:state.paySuiteInfo.ID,
                open:status,
            },
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'修改成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })

    },


    /* ********* 工资套项目 ********** */

    // 添加工资项目
    addPaySuiteItems(data,successed,failded) {

        data.suiteId = state.paySuiteInfo.ID;

        Tool.ajax({
            url: 'api.Pay.insertPaySuiteItems',
            data: data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'添加成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 选择工资项目
    setPaySuiteItemInfo(data){
        mutations.SetPaySuiteItemInfo(data);
    },

    // 修改工资项目
    updatePaySuiteItems(data,successed,failded) {

        if(!state.paySuiteItemInfo.ID){

            Vue.Tool.showTip({
                type:'error',
                msg:'请选择要操作的工资项目'
            })

            return;
        }

        data.ID = state.paySuiteItemInfo.ID;
        data.suiteId = state.paySuiteInfo.ID;

        Tool.ajax({
            url: 'api.Pay.updatePaySuiteItems',
            data:data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'修改成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 删除工资项目
    deletePaySuiteItems(suiteID,IDs,successed,failded) {

        // if(state.payItemIDs.length==0){

        //     Vue.Tool.showTip({
        //         type:'error',
        //         msg:'请选择要操作的工资项目'
        //     })

        //     return;
        // }

        Tool.ajax({
            url: 'api.Pay.deletePaySuiteItems',
            data:{
                suiteID:suiteID,
                IDs:JSON.stringify(IDs)
            },
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'删除成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })
    },

    // 保存工资项目顺序
    savePaySuiteItemsOrder(data,successed,failded){

        Tool.ajax({
            url: 'api.Pay.orderPaySuiteItems',
            data:data,
            success(data, res){

                Vue.Tool.showTip({
                    type:'success',
                    msg:'保存计算顺序成功'
                })

                if(successed) successed();
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })

    },


    // 查询参与计算项目

    selectPaySuiteCountItems(successed,failded){

        Tool.ajax({
            url: 'api.Pay.selectPaySuiteCountItems',
            data:{
                suiteId:state.paySuiteInfo.ID
            },
            success(data, res){

                if(successed) successed(data);
            },
            error(error_msg,error_code){

                Vue.Tool.showTip({
                    type:'error',
                    msg:error_msg
                })

                if(failded) failded(error_msg,error_code);
            }
        })

    },


    /* ******************************** 薪酬账套模块 end ******************************** */


    /* ******************************** 员工变动应用 start ******************************** */

    // 清空员工搜索名称
    clearSearchUser(){
        mutations.ClearSearchUser();
    },

    //员工变动应用 > 应用员工
    applyUsers(data,successed,failded){


        var params=[];
        for(var i in data){
            params.push({
                aboutbus:data[i].aboutbus,
                startDate:data[i].startDate,
                aboutbusTable:data[i].aboutbusTable,
                userBusiness:state.selectedInput.split(',')[0],//state.payRangeID,//data[i].userBusiness,
                employeeId:data[i].employeeid
            })
        }

        if(!params.length){

            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '请至少选择一条数据操作', // 提示文字
                duration: 1000 // 自动消失时间
            });

            return;
        }

        Tool.ajax({
            url: 'api.Pay.insertPayUsers',
            data:"employeechange="+JSON.stringify(params),
            success(data, res){
                Vue.tool.showTip({
                    type: 'success', // 提示类型 success,warning,info,danger
                    msg: res.data.err_msg, // 提示文字
                    duration: 1000 // 自动消失时间
                });

                successed&&successed();
            },
            error(res){

                failded&&failded();

            }
        })
    },
    //员工变动应用 > 搁置员工
    shelveUsers(data,successed,failded){

        var params=[];
        for(var i in data){
            params.push({
                aboutbus:data[i].aboutbus,
                startDate:data[i].startDate,
                aboutbusTable:data[i].aboutbusTable,
                userBusiness:state.selectedInput.split(',')[0],//data[i].userBusiness,
                employeeId:data[i].employeeid
            })
        }


        if(!params.length){

            Vue.tool.showTip({
                type: 'danger', // 提示类型 success,warning,info,danger
                msg: '请至少选择一条数据操作', // 提示文字
                duration: 1000 // 自动消失时间
            });

            return;
        }


        Tool.ajax({
            url: 'api.Pay.shelveUsers',
            data:"&employeechange="+JSON.stringify(params),
            success(data, res){
                Vue.tool.showTip({
                    type: 'success', // 提示类型 success,warning,info,danger
                    msg: res.data.err_msg, // 提示文字
                    duration: 1000 // 自动消失时间
                });

                successed&&successed();
            },
            error(res){

            }
        })
    },

    //员工变动应用 > 改变应用按钮的状态
    changeShowApplyBtn(flag){
        mutations.ChangeShowApplyBtn(flag)
    },
    //员工变动应用 > 改变搁置按钮的状态
    changeShowShelveBtn(flag){
        mutations.ChangeShowShelveBtn(flag)
    },
    //员工变动应用 > 默认时间
    defaultTime() {
        mutations.defaultTime();
    },
    //员工变动应用 > 修改提交状态
    resetCommitFlag(flag){
        mutations.ResetCommitFlag(flag);
    },
    //员工变动应用 > 检查查询输入项
    checkTimeOrSelect(){
        if (state.startTime == '' || state.endTime == '' || state.selectedInput.length <= 0) {
            Vue.tool.showTip({
                type: 'danger',
                msg: '请选择开始结束时间和员工业务',
                duration: 2500
            })
        } else {
            return true;
        }
    },
    // 员工变动应用 > 设置工资套ID
    setPayrangeID(ID){
        mutations.SetPayrangeID(ID);
    },
    /* ******************************** 员工变动应用 end ******************************** */

    /* ******************************** 薪酬计算与发放 start ******************************** */
    // 查询工资年月
    loadPayYearMonth(cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.selectPayYearMonth',
            success(data, res) {
                mutations.SetPayYearMonth(data);
                cbSuccess && cbSuccess(data);
            },
            error(res) {
                cbError && cbError(res);
            }
        });
    },

    /* ******************************** 薪酬计算与发放 end ******************************** */
    // 重新计算工资项
    reComputePayItems(payIDs, items, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.payReCompute',
            data: { payIDs: JSON.stringify(payIDs), items: JSON.stringify(items) },
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    },
    loadPayByID(payID, monthID, suiteID, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.selectPayByID',
            data: { payID: payID, monthID: monthID, suiteID: suiteID },
            success(data) {cbSuccess && cbSuccess(data); },
            error(res) {cbError && cbError(res);}
        });
    },
    // 修改工资项金额
    editPayItemAmount(list, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.updatePayItemAmount',
            data: { list: JSON.stringify(list) },
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    },
    // 修改员工 停发 在发 状态
    editEmployeePayStatus(status, ids, reason, cbSuccess, cbError) {
        var params = { valid: status, IDs: JSON.stringify(ids) };
        if (!!reason) params.reason = reason;
        Tool.ajax({
            url: 'api.Pay.validPayStatus',
            data: params,
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    },
    // 查询需重新计算的工资项
    loadReComputePayItem(suiteID, monthID, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.selectReComputePayItem',
            data: { suiteID: suiteID, monthID: monthID },
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    },
    // 重新计算一个工资套下某工资年月下所有员工的工资
    reComputePayAll(payRangeID, monthID, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.payReComputeAll',
            data: { rangeID: payRangeID, monthID: monthID },
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    },
    // 更新当前工资套，工资月份下的工资状态
    updatePayStatus(rangeID, monthID, statusCode, cbSuccess, cbError) {
        Tool.ajax({
            url: 'api.Pay.updatePayStatus',
            data: { rangeID: rangeID, monthID: monthID, type: statusCode },
            success(data) { cbSuccess && cbSuccess(data); },
            error(res) { cbError && cbError(res); }
        });
    }
    // 切换运功自筹

}
export default {
    state,
    mutations,
    actions
};
