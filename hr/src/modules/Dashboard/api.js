export default {

    /**
     * 查询所有卡片数据，带权限 [尚斌]
     *
     * >>提交
     *
     *
     * <<响应 []

     [{
         "ID": 20,
         "alias": "预警提示",  // 卡片名称
         "cardDetailPojoList": [ // 卡片数据列表
             {
                 "ID": 17,
                 "alias": "健康证预警(人)", // 数据名称
                 "cardDetailID": 17,
                 "cardDetailUserID": 1441,
                 "cardID": 20,
                 "companyID": 1,
                 "createTime": 1467271947000,
                 "ctrl": "{type:\"tab\",name:\"健康证预警\",link:\"/OrgEmployee/ByOrg/action_roster?healthEndTime=30\"}", //控制项
                 "info": "",// 描述
                 "isShow": 1, // 是否显示
                 "name": "healthCardWarning", // 对应的 key 用于对应数据查询接口返回的key
                 "operatorID": 1,
                 "orderNum": 1, // 排序
                 "valid": 1 // 是否有效
             }
         ],
         "cardID": 20,
         "cardUserID": 980,
         "companyID": 1,
         "createTime": 1467271805000,
         "info": "",
         "isShow": 1, // 是否显示
         "name": "cardWarning", //
         "operatorID": 1,
         "orderNum": 0, // 排序
         "type": "dataCard", // 类型  用来区分卡片类型
         "url": "api.Dashboard.getCardDataOfWarning",  // 数据 api
         "valid": 1
     }]

     */
    getCardList: 'acewill/index/cardanddetailanduser/selectall.htm',



    /**
     * 更新卡片排序和显示状态 [尚斌]
     *
     * >>提交
     *
     * {
     *  cardID:11,
     *  orderNum:1, // 排序
     *  isShowStr:true // 是否显示
     * }
     *
     * <<响应 {}

     */
    updateCardList: 'acewill/index/carduser/deleteandinsert.htm',



    /**
     * 更新卡片子元素排序和显示状态 [尚斌]
     *
     * >>提交
     *
     * {
     *  cardDetailID:11,
     *  orderNum:1, // 排序
     *  isShowStr:true // 是否显示
     * }
     *
     * <<响应 {}

     */
    updateCardItemList: 'acewill/index/carddetailuser/deleteandinsert.htm',


    /**
     * 预警提示查询 [宋宁宁]
     *
     * >>提交
     *
     * <<响应 {}
     {
         "healthCardWarning": 7,
         "countOvertimeWarning": "0",
         "monthCheckWorkWarning": "0",
         "dayCheckWorkWarning": 0,
         "countLegalLimit": "0",
         "countOvertimeLimit": "0",
         "contractWarning": 0
     }
     */
    getCardDataOfWarning: 'acewill/common/selectWarningTips.htm',


    /**
     * 考勤管理查询 [宋宁宁]
     *
     * >>提交
     *
     * <<响应 {}
     {
        "noConfirmAbnormal":0,
        "onWorkNumber":"0/2",
        "noSolveAbnormal":56183
    }
     */

    getCardDataOfAttendance: 'acewill/common/selectCheckWorkManage.htm',


    //
    /**
     * 员工状态查询 [宋宁宁]
     *
     * >>提交
     *
     * <<响应 {}
     {
        "applyLeaveOffice":0,
        "stayPositive":"1"
    }
     */
    getCardDataOfEmployee: 'acewill/common/selectEmployeeState.htm',

    // 考勤预警
    getfAttendanceWarning: 'acewill/common/countAttendanceWarningInfo.htm',

    /**
     * 获取待审批最近数目和全部数目
     * >> 提交 无
     * << 响应 {}
     * allcount: 全部待审批数目
     * pcount: 最近待审批数目
     */
    getApprovalPendingCount: 'acewill/workflow/selectwfcount.htm',


    //首页点击弹出

    getHealthData: 'acewill/common/card/healthcardwarningpage.htm',
    getMonthCheckWork: 'acewill/common/card/monthcheckworkwarningpage.htm',
    getDayCheckWork: 'acewill/common/card/daycheckworkwarningpage.htm',
    getOverTimeWarning: 'acewill/common/card/overtimewarningpage.htm',
    getOverTimeLimit: 'acewill/common/card/overtimelimitpage.htm'
};
