export default {

    /**
     * 查询周排班提交状态 [尚斌]
     *
     * >>提交 {}
     *
     * orgID     : 92       组织ID
     * orgType   : store    组织类型 dept,store
     * startTime : 20160606 开始时间
     * endTime   : 20160612 结束时间
     *
     * <<响应 {}
     *
     */
    getScheduleStatus:      'acewill/schedule/schedulesubmit/selectall.htm',

    /**
     * 周排班提交审核 [尚斌]
     *
     * >>提交 {}
     *
     * orgID     : 92       组织ID
     * orgType   : store    组织类型 dept,store
     * startTime : 20160606 开始时间
     * endTime   : 20160612 结束时间
     *
     * <<响应 {}
     *
     */
    putScheduleStatus:      'acewill/schedule/schedulesubmit/insert.htm',


    /**
     * 查询排班修改记录 [尚斌]
     *
     * >>提交 {}
     *
     * 分页参数
     * 附加参数：
     * orgID     : 92       组织ID
     * orgType   : store    组织类型  部门 dept, 门店 store
     * orderType : 1        查看类型  修改日期 1  修改人 2
     * group     :          分组类型  管理组1 服务组2 部门 ''
     *
     * <<响应 {}
     *
     * 分页数据
     *
     */
    getUpdateHistory:       'acewill/schedule/scheduleupdatehis/selectbypage.htm',


    /**
     * 获取周排班内容 [尚斌]
     *
     * >>提交 {}
     *
     * deptID       : 92       组织ID
     * storeID      : store    组织类型 dept,store
     * group        : 1        管理组1 服务组2 部门 ''
     * startTimeStr : 20161031 开始日期
     * endTimeStr   : 20161031 结束日期
     * userName     : ''       人员姓名 用于搜索
     *
     * <<响应 {}
     *
     * "user2719_date1478361600000": {
     *     "ID"             : 42011,
     *     "deptID"         : 93,
     *     "monthDate"      : 1478361600000,
     *     "userID"         : 2719,
     *     "workTime"       : "360",
     *     "workTimeType"   : 1
     * },
     * ...
     *
     */
	getScheduleDays: 		'acewill/schedule/scheduleday/selectall.htm',


    /**
     * 保存周排班结果 [尚斌]
     *
     * >>提交 {}
     *
     * orgID        : 1
     * orgType      : dept store
     * group        : 门店时传递  部门时不传递
     * list         : [{deptID,userID,workTimeType,workTime,date,day},...]
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	putScheduleDays: 		'acewill/schedule/scheduleday/insert.htm',


    /**
     * 批量删除周排班 [尚斌]
     *
     * >>提交 {}
     *
     * orgID        : 1
     * orgType      : dept store
     * group        : 门店时传递  部门时不传递
     * IDs          : [1,2,3]
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	deleteScheduleDays: 	'acewill/schedule/scheduleday/deletebyids.htm',


    /**
     * 批量修改周排班 [尚斌]
     *
     * >>提交 {}
     *
     * orgID        : 1
     * orgType      : dept store
     * group        : 门店时传递  部门时不传递
     * list         : [{ID,deptID,userID,workTimeType,workTime,date,day},...]
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	updateScheduleDays: 	'acewill/schedule/scheduleday/update.htm',



    /**
     * 获取日排班内容 [尚斌]
     *
     * >>提交 {}
     *
     * deptID       : 92       组织ID
     * storeID      : store    组织类型 dept,store
     * group        : 1        管理组1 服务组2 部门 ''
     * date         : 1478188800000 当日时间戳
     * userName     : ''       人员姓名 用于搜索
     *
     * <<响应 {}
     *
     * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！等待补全
     *
     */
	getScheduleHours: 		'acewill/schedule/schedulehour/selectall.htm',


    /**
     * 保存日排班结果 [尚斌]
     *
     * >>提交 {}
     *
     * orgID        : 1
     * orgType      : dept store
     * group        : 门店时传递  部门时不传递
     * list         : [{
     *
     *                  "deptID"        : 280,
     *                  "storeID"       : 1,
     *                  "userID"        : 2692,
     *                  "startTimeStr"  : "0830", // 开始时间
     *                  "endTimeStr"    : "0900", // 结束时间
     *                  "skillID"       : "215",  // 技能ID
     *                  "workTime"      : "353",  // 班次id
     *                  "workTimeType"  : 1,      // 班次类型
     *                  "date"          : 1478188800000 // 当天日期时间戳
     *
     *                 },...]
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	// 保存排班结果 日排班
	putScheduleHours: 		'acewill/schedule/schedulehour/insert.htm',


	// 批量删除日排班
	deleteScheduleHours: 	'acewill/schedule/schedulehour/deletebyids.htm',

	// 批量修改
	updateScheduleHours: 	'acewill/schedule/schedulehour/update.htm',


    /**
     * 查询所有班次 [尚斌]
     *
     * >>提交 {}
     *
     * orgID        : 1
     * orgType      : dept store
     *
     * <<响应 []
     *
     * [
     *     {
     *          "ID"        : 161,
     *          "bgcolor"   : "#49c5cd",        // 背景色
     *          "companyID" : 1,
     *          "createTime": 1470123911000,
     *          "fontcolor" : "#ffffff",        // 字体颜色
     *          "name"      : "9：00-18:00",    // 名字
     *          "orgID"     : 93,               // 所属组织ID
     *          "orgType"   : "dept",           // 所属组织类型
     *          "registerID": 368,
     *          "time"      : "[\"09:00/18:00\"]", // 班次时间 JSON string
     *          "timeType"  : 1,                   // 班次类型 : 固定班次 1 自定义班次 2 请假 3 排休 4
     *          "type"      : 1,                   // 排班类型 : 排班类型 1 部门  2 管理组 3 服务组
     *          "valid"     : 0                    // 有效性 用于假删除
     *      },
     *      ...
     * ]
     *
     */
	//
	selectWorkClass: 		'acewill/schedule/banci/selectall.htm',


    /**
     * 增加班次 [尚斌]
     *
     * >>提交 {}
     *
     * type         :3
     * timeType     :1
     * name         :晚班2
     * time         :["00:00/24:00"]
     * fontcolor    :#FFFFFF
     * bgcolor      :#000000
     * orgType      :store
     * orgID        :1
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	addWorkClass: 			'acewill/schedule/banci/insert.htm',

    /**
     * 更新班次 [尚斌]  【排班后只允许修改颜色】
     *
     * >>提交 {}
     *
     * ID           :1
     * type         :3
     * timeType     :1
     * name         :晚班2
     * time         :["00:00/24:00"]
     * fontcolor    :#FFFFFF
     * bgcolor      :#000000
     * orgType      :store
     * orgID        :1
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	updateWorkClass: 		'acewill/schedule/banci/update.htm',


    /**
     * 删除班次 [尚斌]
     *
     * >>提交 {}
     *
     * IDs  :[1,2,3...]
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	deleteWorkClassByID: 	'acewill/schedule/banci/deletebyids.htm',


	// 获取数据
	getSkills: 				'system/codecontent/selectByDifintionCode.htm',


    /**
     * 获取部门/门店小组成员 [尚斌]
     *
     * >>提交 {}
     *
     * storeID  : 1
     * deptID   :
     * userName : '' // 搜索人员
     * startDate: 20161101
     * endDate  : 20161107
     * group    : 2    门店时传递  部门时不传递
     *
     * <<响应 {}
     *
     * 成功
     *
     */
	getPersons: 			'acewill/schedule/registerperson/selectall.htm',


	// 获取所需人数——天 	  ?orgID=84&orgType=team&startDate=1459440000000&endDate=1459699200000
	getRuquireNubmersDays: 	'acewill/schedule/forecastday/selectall.htm',

	// 获取所需人数——小时 	  ?orgID=84&orgType=team&date=1459440000000
	getRuquireNubmersHours: 'acewill/schedule/forecasthour/selectall.htm',

	// 解析excel  ?filePath=D:\人力管家项目\人力管家需求文档\预估需求人数导入模板2.xlsx
	parseExcel: 			'acewill/schedule/importexecl.htm',


    // 导入排班数据
    importDataDay:          'acewill/schedule/importscheduledayexcel.htm',
    importDataHour:         'acewill/schedule/importschedulehourexcel.htm',

    // 查询排班内的请假
    // http://localhost:8020/acewill/schedule/scheduleday/selectallholiday.htm?deptID=111&storeID=&startDate=20161001&endDate=20161010
    getLeaveInfo:              'acewill/schedule/scheduleday/selectallholiday.htm',

    // 查询排班内的出差
    // http://localhost:8020/acewill/schedule/scheduleday/selectallbustrip.htm?deptID=111&storeID=&startDate=20161001&endDate=20161010&group=1
    getBustripInfo:              'acewill/schedule/scheduleday/selectallbustrip.htm',

    // 查询排班内的调拨
    // http://localhost:8020/acewill/schedule/scheduleday/selectAllTransferwork.htm?deptID=111&storeID=&startDate=20161001&endDate=20161010&group=1
    getTransferInfo:              'acewill/schedule/scheduleday/selectAllTransferwork.htm',

}
