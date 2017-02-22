export default {

  /**
   * 从中控获取数据
   * >> 提交 {}
   * data: yyyy-mm-dd 时间格式字符串
   * 
   * << 响应 {}
   */
  getPushCard:'acewill/pushcard/getcardvaluebydate.htm',

  /**
   * { item_description }
   */
  getDayDetailTip:'acewill/pushcard/pushcardrecord/selectbydate2.htm',
  /**
   * 查询日考勤数据
   * >> 提交 {}
   * pageNum:1
   * pageSize:50
   * date:2016-11-16
   * 
   * << 响应 {}
   *
   * recordList":[
            {
                "ID":37265,
                "bc":"["无排班/无排班"]",  班次信息
                "buluGs":0,                补录工时
                "chuchaiTime":0,           出差次数
                "dakaGs":0,                打卡工时  
                "date":1479225600000,      日期
                "diaoboTime":0,            调拨次数 
                "dkbc":"["未打卡/未打卡"]", 打卡班次
                "holidayTime":0,            休假次数    
                "hoursForDay":0,            日工时
                "hoursForMonth":0,          月工时
                "kgTime":0,                 旷工
                "ltTime":0,                 迟到
                "ltTimes":0,                迟到次数
                "name":"贾双双",            姓名
                "overTime":13,              加班工时
                "userID":2580,              员工ID 
                "userNum":"555555557",      员工编号
                "userType":"全职月薪",      员工类型   
                "valid":0,           
                "yebanTime":0,              夜班工时
                "ztTime":0,                 早退工时
                "ztTimes":0                 早退次数
            },
      ]
   */
  getDailyworktime: 'acewill/pushcard/pushcardrecord/selectbydate.htm',

  /**
   * 获取考勤日报表头部报表信息
   * >> 提交 {}
   * date:2016-11-16
   * 
   * << 响应 {}
   *
   * "result":{
        "chaoshi":0, 超时人数
        "chuchai":1, 出差人数
        "chuqin":2,  出勤人数
        "diaobo":1,  调拨人数
        "jiaban":0,  加班人数
        "quanbutijiao":false, 是否全部提交
        "xiujia":0,  休假人数
        "yichang":0  异常人数
    },
   */
  getMonthworktime:'acewill/checkw/scwsy.htm',//查询月考勤

  /**
   * 获取考勤日报表头部报表信息
   * >> 提交 {}
   * date:2016-11-16
   * 
   * << 响应 {}
   *
   * "result":{
        "chaoshi":0, 超时人数
        "chuchai":1, 出差人数
        "chuqin":2,  出勤人数
        "diaobo":1,  调拨人数
        "jiaban":0,  加班人数
        "quanbutijiao":false, 是否全部提交
        "xiujia":0,  休假人数
        "yichang":0  异常人数
    },
   */
  getDayReport: 'acewill/pushcard/pushcardrecord/selectbydateup.htm', //获取日考勤报表

  /**
   * 获取月考勤报表
   * >> 提交 {}
   * date:2016-11-16
   * 
   * << 响应 {}
   *
   * "result":{
        "chaoshi":0, 超时人数
        "chuchai":1, 出差人数
        "chuqin":2,  出勤人数
        "diaobo":1,  调拨人数
        "jiaban":0,  加班人数
        "quanbutijiao":false, 是否全部提交
        "xiujia":0,  休假人数
        "yichang":0  异常人数
    },
   */
  getMonthReport:'acewill/checkw/acm3s.htm',//获取月考勤报表

  /**
   * 查询其他工时
   * >> 提交 {}
   * pageNum:1
     pageSize:30
     userName:             员工名称
     organizes:            员工组织 
     startd:2016-11-01     开始日期
     endd:2016-11-16       结束日期
   * 
   * << 响应 {}
   *
   * recordList":[
            {
                "fillcard":"损坏",          补录原因
                "fillwork":8,               补录工时
                "tabRegisterDes":"YOYO-北京公司-运营部-运营一部-运营一部门店",   组织名称
                "userName":"孙6",
                "userNum":"00000077",
                "userType":"全职-时薪",
                "workday":1478275200000
            }
     ]
   */
  getOtherList:'acewill/workh/fwh2.htm',//查询其他工时


  importDayRecord:'acewill/checkwork/importDayCheckWork.htm',//导入日考勤
  importMonthRecord:'acewill/checkwork/importMonthCheckWork.htm',//导入月考勤
/**
   * 查询其他工时总数
   * >> 提交 {}
   * pageNum:1
     pageSize:30
     userName:             员工名称
     organizes:            员工组织 
     startd:2016-11-01     开始日期
     endd:2016-11-16       结束日期
   * 
   * << 响应 {}
   *
   * "result":"94.10"  总计工时
   */
  getSum:'acewill/workh/calf.htm',
  

  /**
   * 获取日考勤异常人
   * >> 提交 {}
   * date:2016-11-15
   * 
   * << 响应 {}
   *
   * "ID":37264,
    "banci":"["无排班/无排班 "]",  班次
    "dakaTime":"["08:57/19:24"]",  打卡时间
    "erroType":146001,             异常类型
    "erroTypeDetails":"打卡未排班",异常类型详细 
    "tiaozhengTime":"["08:57/19:24"]",调整时间
    "userID":2580,
    "userName":"贾双双",
    "userNum":"555555557"
   */
  getException: 'acewill/pushcard/pushcardrecord/selecterro.htm',

   /**
   *补录工时
   * >> 提交 {}
   * IDs:[789]   补录人员
     hou:4.1     补录工时
     reason:104016   补录原因
     daystr:20161117 补录日期
   * 
   * << 响应 {}
   * "result":1  1表示成功，0表示失败
   */
  insertOtherTimeEntry:'acewill/workh/inse.htm',//补录工时

  /**
   * 获取考勤日报表日历模块感叹号信息
   * >> 提交 {}
   *  date:2016-11-16  当前日期
      start:20161030   开始日期
      end:20161210     结束日期
   * 
   * << 响应 {}
   *
   * "result":[
        {
            "day":1477756800000, 日期
            "num":37              异常人数
        },
        {
            "day":1477843200000,
            "num":412
        }
    ]
   */
  getCalendarInfo:'acewill/dcwc/cwc.htm',//获取日历信息

  /**
   * 获取考勤数据最后更新时间
   * >> 提交 {}
   *  date:2016-11-16  当前日期
      start:20161030   开始日期
      end:20161210     结束日期
   * 
   * << 响应 {}
   *"ID":39118,
    "banci":"["无排班/无排班 "]",   班次
    "times":"["2016-11-15 11:48:49 无效打卡","2016-11-15 11:48:52 无效打卡","2016-11-15 21:00:01 无效打卡"]",  打卡时间
    "userID":67, 
    "userName":"吴志伟",
    "userNum":"ZY010200066",
    "userType":"全职-时薪"
   */
  getLasttime:'acewill/pushcard/pushcardrecord/lasttime.htm',//获取上次同步打卡记录时间


  getAllotMonthInfo:'acewill/checkwork/checkworktransfer/selecthours.htm',

  /**
   * 获取出勤人数详细列表
   * >> 提交 {}
   *  pageNum:1
      pageSize:30
      date:2016-11-16
      userName:
   * 
   * << 响应 {}
   * result:[
   *   "ID":37645,
       "banci":"["无排班/无排班 "]",
       "times":"["2016-11-11 11:49:33 无效打卡","2016-11-11 21:21:49 无效打卡"]",
       "userID":67,
       "userName":"吴志伟",
       "userNum":"ZY010200066",
       "userType":"全职-时薪"
   * ]
   */
  getAttendanceMan:'acewill/pushcard/pushcardrecord/chuqin.htm',//获取出勤人数
  /**
   * 获取出差人数
   * >> 提交 {}
   *  pageNum:1
      pageSize:30
      userName:
      reason:
      sDate:2016-11-16
      eDate:2016-11-16
   * 
   * << 响应 {}
   * result:[
   *    "ID":36,
        "endTime":1479283200000,
        "hourOrDays":"1",
        "reason":"134001",
        "reasonDetails":"培训",
        "rq":1478849493000,
        "startAddr":"夺",
        "startTime":1479229200000,
        "status":"同意",
        "statusName":"同意",
        "towhere":"345",
        "userID":2739,
        "userName":"关羽",
        "userNum":"00000007",
        "userPost":"督导",
        "userTypeName":"全职-时薪"
   * ]
   */
  getEvectionMan:'acewill/pushcard/actbustrip/selectbydate.htm',//获取出差人数

   /**
   * 获取加班人数
   * >> 提交 {}
   *  pageNum:1
      pageSize:30
      userName:          员工姓名
      sDate:2016-10-05   开始日期
      eDate:2016-11-16   结束日期
   * 
   * << 响应 {}
   * result:[
   *    "ID":62,
        "dayOrHours":"1",              工时
        "endTime":1479020400000,       结束时间
        "reason":"139001",             加班原因编码
        "reasonDetails":"临时加班",    加班原因
        "rq":1478687289000,            申请日期
        "startTime":1478966400000,     开始日期
        "status":"同意",
        "statusName":"同意",           状态
        "userID":2744,
        "userName":"大乔",
        "userNum":"00000009",
        "userPost":"北京店店长员工",
        "userTypeName":"全职-时薪"
   * ]
   */
  getOvertime:'acewill/pushcard/actovertime/selectbydate.htm',//获取加班人数

  /**
   * 获取加班人数
   * >> 提交 {}
   *  pageNum:1
      pageSize:30
      userName:          员工姓名
      sDate:2016-10-05   开始日期
      eDate:2016-11-16   结束日期
   * 
   * << 响应 {}
   * result:[
   *    "ID":82,
        "createTime":1478683791000,
        "dayOrHours":"2",                 请假天数
        "endTime":1478880000000,          结束日期
        "leaveType":"事假",               请假类型
        "reason":"138001",                请假原因编码
        "reasonDetails":"个人原因",       请假原因
        "rq":1478683792000,
        "startTime":1478793600000,
        "status":"同意",
        "statusName":"同意",
        "userID":2741,
        "userName":"小乔",
        "userNum":"00000002",
        "userPost":"北京店店长员工",
        "userTypeName":"全职-时薪"
   * ]
   */
  getVacation:'acewill/pushcard/actleave/selectbydate.htm',//获取休假人数

  /**
   * 获取调拨信息
   * >> 提交 {}
   *  dateStr:2016-11-15
   * 
   * << 响应 {}
   *
   * result:[
   * {
   *   "ID":1064,
            "companyID":1,
            "createTime":1478851390000,
            "deptID":314,                      原部门ID
            "deptName":"运营部2",              原部门
            "effectiveTime":"2016-11-11",      生效日期
            "endDate":8,                        
            "endTime":"2016-11-19",            截止日期
            "hoursForDay":0,                   日工时
            "isException":1,                   是否异常 1位异常
            "isSubmit":0,                      是否提交
            "operatorID":1,              
            "organizeID":644, 
            "reasion":"109002",                异常原因 
            "status":"150005",                 状态编号
            "storeID":13,                      门店ID
            "storeName":"运营门店2-1",         门店名称
            "toDeptID":307,                    调拨至部门
            "toDeptName":"运营部",             调拨至部门名称
            "toOrganizeID":639,                调拨至组织ID
            "toPostID":2873,                   调拨岗位
            "toStoreID":11,                    调拨门店
            "toStoreName":"运营1店",           调拨门店名称 
            "transferworkState":"未处理-异常", 调拨状态
            "type":"124002",                    调拨状态编码  
            "userID":2771,
            "userName":"赵旭尧",
            "userNum":"100003",
            "userTypeName":"全职月薪",
            "valid":1
   * } 
   * ]
   *
   */
  getAllot:'acewill/checkwork/checkworkrule/selectTransferworkCheckwork.htm',//获取调拨信息

  /**
   * 提交日考勤
   * >> 提交 {}
     dateStr:2016-11-13 日期
   * << 响应 {}
   * result: 1  成功 0 失败
   * 
   * ]
   */
  submitDay:'acewill/dcwc/dayc.htm',//提交日考勤

  /**
   * 提交异常考勤
   * >> 提交 {}
     list:[
        {
          "ID":37262,
          "reason":"104017",
          "dkbc":["08:51/08:52"],  打卡班次
          "tzbc":["08:51/08:52"]   调整班次
        }

     ]
   * << 响应 {}
   * result: 1  成功 0 失败
   * 
   * ]
   */
  submitException:'acewill/pushcard/pushcardrecord/confirm.htm',//提交异常考勤
  /**
   * 提交调拨
   * >> 提交 {}
   * userIDs:[2603]     员工编号 数组多个员工
     dateStr:2016-11-13 日期
   * << 响应 {}
   * result: 1  成功 0 失败
   * 
   * ]
   */
  submitAllot:'acewill/checkwork/checkworktransfer/insertOrUpdate.htm',//提交调拨


  /**
   * 提交月考勤
   * >> 提交 {}
   * userType:[]              用工类型
     state:[]                 员工状态
     organizeID:[]            组织ID
     checkworkRuleId:68       考勤规则ID
     month:2016-11            月份 
   * << 响应 {}
   * result: 69   大于0 表示成功
   * 
   * ]
   */
  submitMonth:'acewill/checkw/smsy.htm',//提交月考勤

  getAllotException:'acewill/pushcard/pushcardrecord/diaoboerro.htm',//获取调拨异常接口
  /**
   * 获取调拨考勤周期内时间段
   * >> 提交 {}
   * userID:2771
    dateStr:2016-11-15
   * << 响应 {}
   * result:[
   *   {
   *     startDate  开始日期
   *     endDate    结束日期
   *   }
   * 
   * ]
   */
  getAllotTitle:'acewill/checkwork/checkworktransfer/selecttransfertime.htm',//获取调拨考勤周期内时间段

  /**
   * 获取考勤规则名称和ID
   * >> 提交 {}
   * << 响应 {}
   * result:[
   *   {
   *     "ID":73,    编号
         "checkworkName":"测试", 考勤规则名称
   *   }
   * 
   * ]
   */
  getAttendanceRuleList: 'acewill/checkwork/checkworkrule/selectCheckworkRule.htm', // 查询考勤规则


   /**
   * 查询调拨人数
   * >> 提交 {}
   * dateStr:2016-11-15
   * << 响应 {}
   * result:15   调拨人数
   * 
   * ]
   */
  selectAllotCount:'acewill/checkwork/checkworktransfer/selectcount.htm',//查询调拨人数

  /**
   * 查询调拨历史
   * >> 提交 {}
   * pageNum:1
     pageSize:30
     userName:
     startTimeStr:2016-11-16
     endTimeStr:2016-11-16
     transferType:1 
     orgID:   原组织ID
     toOrgID: 调入组织id
   * << 响应 {}
   *  result:[
   *  {
   *    "ID":1064,
        "companyID":1,
        "createTime":1478851390000,
        "dateStr":"2016-11-14",
        "deptID":314,                   原部门
        "deptName":"运营部2",           原部门名称
        "effectiveTime":"2016-11-11",   生效日期
        "endTime":"2016-11-19",         截止日期  
        "hoursForDay":0,                日工时  
        "isException":0,                是否异常
        "isSubmit":0,                   是否提交 
        "operatorID":1,                 操作员ID
        "organizeID":644,               组织ORGID
        "reasion":"109002",             调拨原因编码
        "status":"150005",              状态编码
        "storeID":13,                   原门店ID
        "storeName":"运营门店2-1",      原门店名称
        "toDeptID":307,                 调拨至部门ID
        "toDeptName":"运营部",          调拨至部门名称
        "toOrganizeID":639,             调拨至组织ORGID
        "toPostID":2873,                调拨至岗位ID
        "toStoreID":11,                 调拨至门店ID
        "toStoreName":"运营1店",        调拨至门店名称
        "type":"124002",
        "userID":2771,
        "userName":"赵旭尧",
        "userNum":"100003",
        "userTypeName":"全职月薪",
        "valid":1
   *  
   *  }
   * 
   * ]
   */
  selectAllotHistory:'acewill/checkwork/checkworkrule/selectTransferworkCheckworkHis.htm',//调拨历史


  /**
   * 日考勤页面图形饼图
   * >> 提交 {}
   * ruleId:68          考勤规则ID
     sDate:2016-11-16    日期
   * << 响应 {}
   *  "result":[
        {
            "value":"0.00",
            "name":"打卡工时"
        },
        {
            "value":"0.00",
            "name":"加班工时"
        },
        {
            "value":"0.00",
            "name":"培训工时"
        },
        {
            "value":"0.00",
            "name":"调拨工时"
        }
    ]
   * 
   * ]
   */
  getDayEchartPie:'acewill/common/fanHoursForDayReportInfo.htm',

  /**
   * 日考勤页面散点图
   * >> 提交 {}
   * ruleId:68          考勤规则ID
     sDate:2016-11-16    日期
   * << 响应 {}
   *"result":{
        "dayWarningTime":7,  警戒线
        "data":[

        ],
        "average":"0.00"     平均值
    },
   *  
   * ]
   */
  getDayEchartSplash:'acewill/common/countHoursForDayReportInfo.htm',
  getMonthEchartPie:'acewill/common/fanHoursForMonthReportInfo.htm',
  getMonthEchartSplash:'acewill/common/countHoursForMonthReportInfo.htm',

   /**
   * 查询异常考勤详细
   * >> 提交 {}
   * userID:2580       人员编号
     date:2016-11-15   日期
   * << 响应 {}
   *"result":[
   *  {
   *    "bz":"无效打卡",
        "date":"2016-11-15",
        "pushCardTime":1479171425000,   打卡时间
        "sn":"6412155000747",           打卡SN
        "state":"0",                    状态
        "userID":2580,
        "userName":"贾双双",
        "userNum":"555555557"
   *  }
   * ]
   */
  getPushcardtime:'acewill/pushcard/pushcardtime/selectall.htm',//查询异常考勤

  getDayReportNotify: 'acewill/pushcard/tixing.htm', // 未完成日结提醒
}
