/**
 * @Created Date       : 2016-10-19T16:01:01+08:00
 * @Last Modified time : 2016-12-26T17:44:48+08:00
 */
export default {
    //
    getScheduleConfig: 'acewill/schedule/schedulerule/selectall.htm',
    // ?managePeriod=1&servicePeriod=2&departmentPeriod=1&acrossDayClasses=2&manageRest=4.5&serviceRest=8.5&departmentRest=6.5&ID=1
    putScheduleConfig: 'acewill/schedule/schedulerule/insertOrUpdate.htm',

    getSystemConfigData: 'system/codecontent/selectByDifintionCode.htm', //配置系统配置列表url
    addSystemConfig: 'system/codecontent/insert.htm', //添加系统配置项目内容
    updateSystemConfig: 'system/codecontent/update.htm', //修改系统配置项目内容
    deleteSystemConfig: 'system/codecontent/deletebyids.htm', //删除系统配置项目内容


    getYearRuleList: 'Holiday/yearList', //年假列表
    insertYearRule: 'Holiday/insertyear', //添加年假规则
    deleteYearRule: 'Holiday/deleteyear', //删除年假
    updateYearRule: 'Holiday/updateYear',
    getOneYearRule: 'Holiday/getbyOneyear',
    validatorYearRule: 'Holiday/valiformula', //验证公式

    getOtherRuleList: 'Holiday/otherList', //查询其他假期
    insertOtherRule: 'Holiday/insertother',
    deleteOtherRule: 'Holiday/deleteyear',
    updateOtherRule: 'Holiday/updateOther',
    getOneOtherRule: 'Holiday/getbyOneother',

    getYearRuleScope: 'Holiday/yearUserList',
    getOtherRuleScope: 'Holiday/otherUserList',
    copyYearRule: 'Holiday/copyyear',

    getAttendanceRuleList: 'acewill/checkwork/checkworkrule/selectall.htm', // 查询考勤规则
    getAttendanceOnRuleList: 'acewill/checkwork/checkworkrule/selectCheckworkRule.htm',
    getAttendanceRuleByID: 'acewill/checkwork/checkworkrule/findbyid.htm', // 按规则 ID 查询考勤规则
    addAttendanceRule: 'acewill/checkwork/checkworkrule/insert.htm', // 添加考勤规则
    editAttendanceRule: 'acewill/checkwork/checkworkrule/update.htm', // 编辑考勤规则
    removeAttendanceRuleList: 'acewill/checkwork/checkworkrule/deletebyids.htm', // 批量删除考勤规则
    validAttendanceRule: 'acewill/checkwork/checkworkrule/updatevalid.htm', // 禁用启用考勤规则
    getPostTree: 'acewill/basedata/post/selectall.htm',
    getEmployeeByPostID: 'acewill/OrgEmployee/selectEmployeeByPostOrderByName.htm',



    importRankData: 'acewill/pay/importrankexcel.htm', // 导入职级薪酬
    importPostData: 'acewill/pay/importpostexcel.htm', // 导入岗位薪酬
    exportPostRankData: 'acewill/pay/export.htm', // 导出

    selectPersonalTaxRule: 'acewill/Pay/paytax/selectAll.htm', // 查询个税薪酬规则

    // 员工扩展
    getextendEmployeeList: 'acewill/init/listExtend.htm', //扩展
    addExtendEmployeeColumn: 'acewill/init/addExtend.htm', //添加单列信息
    getOneExtendEmployeeColumn: 'acewill/init/getExtend.htm', //获取单个列的信息
    deleteExtends: 'acewill/init/deleteExtend.htm', //删除IDs
    updateExtendEmployee: 'acewill/init/updateExtend.htm', //更新


    // 考勤机
    getOneMachine: 'acewill/iclock/selectIClock.htm', //获取单个考勤机信息
    getMachineList: 'acewill/iclock/selectIClockPage.htm', //获取考勤机列表
    addAttendanceMachine: 'acewill/iclock/insertIClock.htm', //添加考勤机
    updateMachine: 'acewill/iclock/updateIClock.htm', //修改考勤机
    deleteMachines: 'acewill/iclock/deleteIClock.htm', //删除考勤机
    selecticlockpage:'acewill/iclock/selecticlockpage.htm',//选择考勤机
    selectuserinfobysnpin:'acewill/iclock/selectuserinfobysnpin.htm',//下发命令

    //表必填项目设置
    //
    getSyncData:'system/codecontent/updatecomtablefield.htm',
    getTableInfo:'system/codecontent/selectbusintablelist.htm',
    getTableColumnInfo:'system/codecontent/selectbusinfieldBytable.htm',
    updateTableColumnInfo:'system/codecontent/updatecomtf.htm',

    // 审批设置
    getApprovalSettingList: 'acewill/workflow/selectBusWorkflow',
    validApprovalSetting: 'acewill/workflow/updateBusWorkflow',

    /* 根据ID查询工作流数据 */
    getWorkflowByID:'acewill/setWorkflow/getWorkflowDep.htm',
    /* 根据ID添加修改工作流 */
    updateWorkflowByID:'acewill/setWorkflow/saveWorkflow.htm',
    /* 根据ID删除工作流 */
    deleteWorkflowByID:'acewill/setWorkflow/deleteWorkflow.htm',
    /* 加载业务可选字段 */
    loadConditionsFieldsByBus:'acewill/setWorkflow/getCodecontent.htm',
    /* 根据分支条件字段类型加载数据 */
    loadConditionsFieldData:'acewill/setWorkflow/getReArguments.htm',
    getSystemLog: 'acewill/OrgEmployee/selectSystemLog.htm',
    /*
      * 薪酬规则  多条件查询岗位工资表   【尚斌】
    */
    paypostSelectall: 'acewill/pay/paypost/selectall.htm', //薪酬规则  多条件查询岗位工资表


    /*
      * 薪酬规则  新建岗位工资，插入前先把原来所有的删除  【尚斌】
      * postID：岗位ID；
      * salary：工资；
    */
    paypostInsert: 'acewill/pay/paypost/insert.htm', //  payPostPojoListStr=[{postID=34,salary=500}]

    // paypostUpdate: 'acewill/pay/paypost/updatePayPost.htm', //薪酬规则  新建岗位工资，插入前先把原来所有的删除  payPostPojoListStr=[{postID=34,salary=500}]

    /*
      * 薪酬规则  新建岗位工资，插入前先把原来所有的删除  【尚斌】
      * postID：岗位ID；
      * salary：工资；
    */
    paypostUpdate: 'acewill/pay/paypost/insert.htm', //薪酬规则  新建岗位工资，插入前先把原来所有的删除  payPostPojoListStr=[{postID=34,salary=500}]


    /*
      * 薪酬规则  多条件查询职级工资表
    */
    payrankSelectall: 'acewill/pay/payrank/selectall.htm', //薪酬规则  多条件查询职级工资表

    /*
      * 薪酬规则  多条件查询岗位工资表
    */
    payrankInsert: 'acewill/pay/payrank/insert.htm', //

    // payrankUpdate: 'acewill/pay/payrank/updatepayRank.htm', //薪酬规则  多条件查询岗位工资表

    /*
      * 薪酬规则  多条件查询岗位工资表
    */
    payrankUpdate: 'acewill/pay/payrank/insert.htm', //薪酬规则  多条件查询岗位工资表

    /*
      * 薪酬规则  保存或者更新工资规则
      * post:岗位；
      * isOpen：状态 是否开启；
    */
    payruleInsert: 'acewill/pay/payrule/insert.htm', //薪酬规则  保存或者更新工资规则(item单项(post岗位rank职位)) item=post&isOpen=1


    /*
      * 薪酬规则  查询岗位工资、职级工资是否开启(item:post/rank)item=post

    */
    payruleSelectall: 'acewill/pay/payrule/selectall.htm', //薪酬规则  查询岗位工资、职级工资是否开启(item:post/rank)item=post

        /*
         *添加员工工号规则 【宋宁宁】
         *>> 提交
         *ruleName:'',
         *orgIDs:[],
         *state:[],
         *numberRule:'',
         *employeeNumberRuleDetail:[],
         */
        addEmployeeNumberRule:'acewill/employee/addEmployeeNumberRule.htm',

        /*
         *更新员工工号规则 【宋宁宁】
         *>> 提交
         *ruleName:'',
         *orgIDs:[],
         *state:[],
         *numberRule:'',
         *employeeNumberRuleDetail:[],
         */
        updateEmployeeNumberRule:'acewill/employee/updateEmployeeNumberRule.htm',

        /*
         *更新员工工号规则 【宋宁宁】
         *>> 提交
         *ruleName:'',
         *orgIDs:[],
         *state:[],
         *numberRule:'',
         *employeeNumberRuleDetail:[],
         */
        isCanUpdateEmployeeNumberRule:'acewill/employee/isCanUpdateEmployeeNumberRule.htm',

        /*
         *查询所有员工工号规则列表 【宋宁宁】
         *
         */
        selectEmployeeNumberRuleAll:'acewill/employee/selectEmployeeNumberRuleAll.htm',


        /*
         *查询员工工号规则详情 【宋宁宁】
         *>> ruleID
         */
        selectEmployeeNumberRule:'acewill/employee/selectEmployeeNumberRule.htm',


        /*
         *删除员工工号规则详情 【宋宁宁】
         *>> ruleID
         */
        deleteEmployeeNumberRule:'acewill/employee/deleteEmployeeNumberRule.htm',

    /**
     * 依考勤规则ID查询假期列表，不传参数则为默认假期列表
     * 
     */
    selectHolidayByCheckworkRuleID: 'acewill/checkwork/statutoryHolidays/findHolidaysByRuleId.htm',
     /**
     * 考勤机名称查询
     * 参数：snId ,sDate, eDate,  pageSize   
     * 
     */
    selectclockcmdpager: 'acewill/clocking/selectclockcmdpager.htm'
};
