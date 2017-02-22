
/* */
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

	inservice:false,

    // 查询周排班提交状态 ?orgID=92&orgType=store&startTime=20160606&endTime=20160612
    getScheduleStatus:      function(arg){
        dataTpl.result = {
            type:'submited'
        }

        return dataTpl;
    },

    // 周排班提交审核 ?orgID=92&orgType=store&startTime=20160606&endTime=20160612
    putScheduleStatus:      function(){
        return dataTpl;
    },

    getUpdateHistory:       function(){


        return {
            "result": {
                "pageCount": 1,
                "pageNum": 1,
                "pageSize": 10,
                "recordCount": 2,
                "recordList": [
                    {
                        "ID": 2,
                        "classDate": 1465660800000,
                        "companyID": 1,
                        "createTime": 1465718764000,
                        "newClass": "12001700",
                        "oldClass": "07001200",
                        "operatorID": 2,
                        "operatorName": "肖子余",
                        "operatorPost": "凉菜",
                        "registerID": 417,
                        "userID": 6,
                        "userName": "孙静",
                        "userPost": "烧烤",
                        "valid": 1
                    },
                    {
                        "ID": 1,
                        "classDate": 1465660800000,
                        "companyID": 1,
                        "createTime": 1465717606000,
                        "newClass": "10001900",
                        "oldClass": "08001700",
                        "operatorID": 6,
                        "operatorName": "秦鹏",
                        "operatorPost": "烧烤",
                        "registerID": 417,
                        "userID": 2,
                        "userName": "刘东升",
                        "userPost": "凉菜",
                        "valid": 1
                    },
                ],
                "startRecord": 0
            },
            "err_msg": "请求处理成功",
            "err_code": 8888,
            "success": "true"
        }

    },

	// 获取周排班内容 &from=20140101&to=20140131&storei=001 (门店，起止日期)
	getScheduleDays: 		function(arg){

		// if(!!arg.storeID){
		// 	return dataTpl
		// }

		// else if(!!arg.deptID){

			/*dataTpl.result = {
				'user1_date20140101':{
					departmentId: '1',
					skillID: '',
					userID: '1',
					date: '2014-01-01',	// 用时间戳表示
					workTimeType: '1',
					workTime: '1',
				},
				'user2_date20140101':{
					departmentId: '1',
					skillID: '',
					userID: '2',
					date: '2014-01-01',
					workTimeType: '0',
					workTime: [
						'1300/1800',
						'2000/2400',
					]
				}
			}*/

			dataTpl.result = {
				"user1_date1461945600000": {
					"ID": 38,
					"deptID": 36,
					"monthDate": 1461945600000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1462204800000": {
					"ID": 40,
					"deptID": 36,
					"monthDate": 1462204800000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1462291200000": {
					"ID": 41,
					"deptID": 36,
					"monthDate": 1462291200000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user7_date1462032000000": {
					"ID": 63,
					"monthDate": 1462032000000,
					"storeID": 29,
					"userID": 7,
					"workTime": "[\"04:00/09:30\"]",
					"workTimeType": 2
				},
				"user4_date1462032000000": {
					"ID": 61,
					"deptID": 36,
					"monthDate": 1462032000000,
					"storeID": 29,
					"userID": 4,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1461859200000": {
					"ID": 37,
					"deptID": 36,
					"monthDate": 1461859200000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1462118400000": {
					"ID": 39,
					"deptID": 36,
					"monthDate": 1462118400000,
					"storeID": 29,
					"userID": 1,
					"workTime": "9",
					"workTimeType": 1
				},
				"user1_date1462032000000": {
					"ID": 60,
					"deptID": 36,
					"monthDate": 1462032000000,
					"storeID": 29,
					"userID": 1,
					"workTime": "1",
					"workTimeType": 1
				},
				"user4_date1461859200000": {
					"ID": 54,
					"deptID": 36,
					"monthDate": 1461859200000,
					"storeID": 29,
					"userID": 4,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1462377600000": {
					"ID": 42,
					"deptID": 36,
					"monthDate": 1462377600000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user1_date1462464000000": {
					"ID": 43,
					"deptID": 36,
					"monthDate": 1462464000000,
					"storeID": 29,
					"userID": 1,
					"workTime": "8",
					"workTimeType": 1
				},
				"user6_date1462032000000": {
					"ID": 62,
					"deptID": 36,
					"monthDate": 1462032000000,
					"storeID": 29,
					"userID": 6,
					"workTime": "9",
					"workTimeType": 1
				}
			}
			return dataTpl

		// }else{

		// 	return successRes;
		// }

	},

	// 保存排班结果 周排班
	putScheduleDays: 		function(arg){
		return successRes;
	},

	// 批量删除周排班
	deleteScheduleDays: 	function(arg){
		return successRes;
	},

	// 批量修改
	updateScheduleDays: 	function(arg){
		return successRes;
	},

	// 获取日排班内容 &day=20140101&storeid=001 (门店明细，指定日期）
	getScheduleHours: 		function(arg){

		/*			dataTpl.result = {
			// 'user1_start20140101_end12313': {
			// 	departmentId: '1',
			// 	skillID: '',
			// 	userID: '1',
			// 	date: '112342342424', // 用时间戳表示
			// 	startTime: '123123123', // 开始时间，时间戳
			// 	endTime: '12312313', // 结束时间
			// 	skillId: 1, // 技能id
			// },
			// 'user2_start20140101_end12313': {
			// 	departmentId: '1',
			// 	skillID: '',
			// 	userID: '2',
			// 	date: '112342342424', // 用时间戳表示
			// 	startTime: '123123123', // 开始时间，时间戳
			// 	endTime: '12312313', // 结束时间
			// 	skillId: 1, // 技能id
			// }


			user1_time0400_0430: {
				"startTime": "0400_0430",
				"endTime": "0400_0430",
				"skillId": "1",
				"workTime": "1",
				"workTimeType":"1"
			},
			user1_time0430_0500: {
				"startTime": "0430_0500",
				"endTime": "0430_0500",
				"skillId": "1",
				"workTime": "1",
				"workTimeType":"1"
			},
			user1_time0500_0530: {
				"startTime": "0500_0530",
				"endTime": "0500_0530",
				"skillId": "1",
				"workTime": "1",
				"workTimeType":"1"
			},

			user1_time0730_0800: {
				"startTime": "0730_0800",
				"endTime": "0730_0800",
				"skillId": "2",
				"workTime": "2",
				"workTimeType":"1"
			},
			user1_time0800_0830: {
				"startTime": "0800_0830",
				"endTime": "0800_0830",
				"skillId": "2",
				"workTime": "2",
				"workTimeType":"1"
			},
			user1_time0830_0900: {
				"startTime": "0830_0900",
				"endTime": "0830_0900",
				"skillId": "2",
				"workTime": "2",
				"workTimeType":"1"
			}

		}
		*/

		dataTpl.result = {
			"user4_time0530_0600": {
				"ID": 64,
				"deptID": 36,
				"endTimeStr": "0600",
				"monthDate": 1462032000000,
				"skillID": 1,
				"startTimeStr": "0530",
				"storeID": 29,
				"userID": 4,
				"workTime": "8",
				"workTimeType": 1
			},
			"user6_time0100_0130_date1462032000000": {
				"ID": 67,
				"deptID": 36,
				"endTimeStr": "0130",
				"monthDate": 1462032000000,
				"skillID": 2,
				"startTimeStr": "0100",
				"storeID": 29,
				"userID": 6,
				"workTime": "9",
				"workTimeType": 1
			},
			"user6_time0000_0030": {
				"ID": 65,
				"deptID": 36,
				"endTimeStr": "0030",
				"monthDate": 1462032000000,
				"skillID": 2,
				"startTimeStr": "0000",
				"storeID": 29,
				"userID": 6,
				"workTime": "9",
				"workTimeType": 1
			},
			"user1_time1200_1230": {
				"ID": 56,
				"deptID": 36,
				"endTimeStr": "1230",
				"monthDate": 1462032000000,
				"skillID": 3,
				"startTimeStr": "1200",
				"storeID": 29,
				"userID": 1,
				"workTime": "1",
				"workTimeType": 1
			},
			"user1_time1300_1330": {
				"ID": 58,
				"deptID": 36,
				"endTimeStr": "1330",
				"monthDate": 1462032000000,
				"skillID": 3,
				"startTimeStr": "1300",
				"storeID": 29,
				"userID": 1,
				"workTime": "1",
				"workTimeType": 1
			},
			"user1_time1330_1400": {
				"ID": 59,
				"deptID": 36,
				"endTimeStr": "1400",
				"monthDate": 1462032000000,
				"skillID": 3,
				"startTimeStr": "1330",
				"storeID": 29,
				"userID": 1,
				"workTime": "1",
				"workTimeType": 1
			},
			"user6_time0130_0200": {
				"ID": 68,
				"deptID": 36,
				"endTimeStr": "0200",
				"monthDate": 1462032000000,
				"skillID": 2,
				"startTimeStr": "0130",
				"storeID": 29,
				"userID": 6,
				"workTime": "9",
				"workTimeType": 1
			},
			"user1_time1230_1300": {
				"ID": 57,
				"deptID": 36,
				"endTimeStr": "1300",
				"monthDate": 1462032000000,
				"skillID": 3,
				"startTimeStr": "1230",
				"storeID": 29,
				"userID": 1,
				"workTime": "1",
				"workTimeType": 1
			},
			"user6_time0030_0100": {
				"ID": 66,
				"deptID": 36,
				"endTimeStr": "0100",
				"monthDate": 1462032000000,
				"skillID": 2,
				"startTimeStr": "0030",
				"storeID": 29,
				"userID": 6,
				"workTime": "9",
				"workTimeType": 1
			},
			"user4_time0500_0530": {
				"ID": 63,
				"deptID": 36,
				"endTimeStr": "0530",
				"monthDate": 1462032000000,
				"skillID": 1,
				"startTimeStr": "0500",
				"storeID": 29,
				"userID": 4,
				"workTime": "8",
				"workTimeType": 1
			},
			"user4_time0400_0430": {
				"ID": 61,
				"deptID": 36,
				"endTimeStr": "0430",
				"monthDate": 1462032000000,
				"skillID": 1,
				"startTimeStr": "0400",
				"storeID": 29,
				"userID": 4,
				"workTime": "8",
				"workTimeType": 1
			},
			"user6_time0200_0230": {
				"ID": 69,
				"deptID": 36,
				"endTimeStr": "0230",
				"monthDate": 1462032000000,
				"skillID": 2,
				"startTimeStr": "0200",
				"storeID": 29,
				"userID": 6,
				"workTime": "9",
				"workTimeType": 1
			},
			"user4_time0330_0400": {
				"ID": 60,
				"deptID": 36,
				"endTimeStr": "0400",
				"monthDate": 1462032000000,
				"skillID": 1,
				"startTimeStr": "0330",
				"storeID": 29,
				"userID": 4,
				"workTime": "8",
				"workTimeType": 1
			},
			"user4_time0430_0500": {
				"ID": 62,
				"deptID": 36,
				"endTimeStr": "0500",
				"monthDate": 1462032000000,
				"skillID": 1,
				"startTimeStr": "0430",
				"storeID": 29,
				"userID": 4,
				"workTime": "8",
				"workTimeType": 1
			}
		}
		return dataTpl;


	},

	// 保存排班结果 日排班
	putScheduleHours: 		function(arg){
		return successRes;
	},

	// 批量删除日排班
	deleteScheduleHours: 	function(arg){
		return successRes;
	},

	// 批量修改
	updateScheduleHours: 	function(arg){
		return successRes;
	},


	// 查询所有班次
	selectWorkClass: 		function(arg){

		/*dataTpl.result = [
			{
				valid:1,
				ID: '1',
				type: '1',
				timeType:1,
				name: '夜班',
				time: '["18:00/24:00", "24:00/05:00"]',
				fontcolor:'font_white',
				bgcolor:'bg_black'
			}, {
				valid:1,
				ID: '2',
				type: '1',
				timeType:1,
				name: '白班',
				time: '["09:00/12:00", "13:00/18:00"]',
				fontcolor:'font_white',
				bgcolor:'bg_green'
			}
		]*/

		dataTpl.result = [
        {
			"ID": 1,
			"bgcolor": "bg_orange",
			"companyID": 1,
			"createTime": 1461729024000,
			"fontcolor": "",
			"name": "中班",
			"registerID": 1,
			"time": "[\"12:00/18:00\"]",
			"timeType": 1,
			"type": 1,
			"valid": 1
		},
        {
			"ID": 8,
			"bgcolor": "bg_green",
			"companyID": 1,
			"createTime": 1461840969000,
			"fontcolor": "",
			"name": "白班",
			"time": "[\"03:30/08:30\"]",
			"timeType": 1,
			"type": 1,
			"valid": 1
		},
        {
            "ID": 10,
            "bgcolor": "bg_blue",
            "companyID": 1,
            "createTime": 1461842519000,
            "fontcolor": "",
            "name": "夜班(跨)",
            "time": "[\"22:00/06:00\"]",
            "timeType": 1,
            "type": 2,
            "valid": 1
        },
        {
            "ID": 11,
            "bgcolor": "#01579B",
            "companyID": 1,
            "createTime": 1461842519000,
            "fontcolor": "#fff",
            "name": "服务组班次",
            "time": "[\"22:00/06:00\"]",
            "timeType": 1,
            "type": 3,
            "valid": 1
        }
        ]

        return dataTpl;
	},


	// 增加班次
	addWorkClass: 		function(arg){

			console.log(arg)

			arg.valid = 1;
			arg.ID = parseInt(Math.random()*20)

			dataTpl.result = arg

			return dataTpl;

	},
	// 更新班次
	updateWorkClass: 	function(arg){

			arg.valid = 1;
			dataTpl.result = arg

			return dataTpl;

	},

	// 删除班次
	deleteWorkClassByID: 	function(arg){
		return successRes;
	},


	// 获取部门/门店小组成员  ?deptID=36&storeID=29&teamID=84&startDate=20160401&endDate=20160430
	getPersons: 			function(arg){

		console.log(arg)

        if(arg.group=='service'){
            return {
                "result": [{
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 81,
                    "userName": "张施强"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 89,
                    "userName": "秦鹏"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 92,
                    "userName": "程文杰"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 104,
                    "userName": "张赛赛"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 128,
                    "userName": "邵文彬"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 129,
                    "userName": "周孟蝶"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 134,
                    "userName": "刘东生"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 135,
                    "userName": "曹南南"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 136,
                    "userName": "岳喜诺"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 137,
                    "userName": "王焕祯"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 138,
                    "userName": "陈玉"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 140,
                    "userName": "王海燕"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 141,
                    "userName": "王娜"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 143,
                    "userName": "王澜"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 146,
                    "userName": "柴可可"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 147,
                    "userName": "杜辉雄"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 151,
                    "userName": "刘明强"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 153,
                    "userName": "乐洋"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 154,
                    "userName": "刘乾坤"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 162,
                    "userName": "张坡"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 165,
                    "userName": "杜强林"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 167,
                    "userName": "董凡"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 172,
                    "userName": "古德财"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 173,
                    "userName": "柏桂林"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 179,
                    "userName": "王龙海"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 181,
                    "userName": "王三元"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 182,
                    "userName": "李桂芝"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 183,
                    "userName": "连彩云"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 186,
                    "userName": "陈秀云"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 188,
                    "userName": "黄荣松"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 190,
                    "userName": "李永宽"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 196,
                    "userName": "郏高波"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 202,
                    "userName": "蔡智"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 203,
                    "userName": "刘果"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 204,
                    "userName": "李波"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 208,
                    "userName": "陈实"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 210,
                    "userName": "晋腾蛟"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 211,
                    "userName": "侯雪枫"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 212,
                    "userName": "戴瑞丰"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 213,
                    "userName": "文改霞"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 215,
                    "userName": "牛全星"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 216,
                    "userName": "艾洪伟"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 217,
                    "userName": "靳梦辉"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 218,
                    "userName": "熊峰"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 219,
                    "userName": "贾凯旋"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 220,
                    "userName": "王新丽"
                }, {
                    "deptID": 102,
                    "deptName": "运营部",
                    "restTime": "4",
                    "storeID": 73,
                    "storeName": "欢乐谷",
                    "totalRest": 8,
                    "totalWorkHour": 0,
                    "userID": 221,
                    "userName": "高志威"
                }],
                "err_msg": "请求处理成功",
                "err_code": 8888,
                "success": "true"
            }
        }
        else if(arg.group=='manager'){
            return {"result":[{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":732,"userName":"高禹"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":733,"userName":"廖恒"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":734,"userName":"温志敏"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":735,"userName":"裴政尧"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":736,"userName":"尹黎"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":737,"userName":"陈伟"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":738,"userName":"刘义武"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":739,"userName":"高铭乾"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":740,"userName":"晏涛"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":741,"userName":"丁克武"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":742,"userName":"柴光侠"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":743,"userName":"刘俊兰"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":744,"userName":"刘再的"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":745,"userName":"李新花"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":746,"userName":"郭震"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":747,"userName":"苗林梅"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":748,"userName":"陈静"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":749,"userName":"胥国辉"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":750,"userName":"高铭章"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":751,"userName":"解钧博"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":752,"userName":"张超"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":753,"userName":"苗佳佳"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":754,"userName":"李强强"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":755,"userName":"魏耀林"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":756,"userName":"杜兴泮"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":757,"userName":"王泽鸿"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":758,"userName":"张俊威"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":759,"userName":"王雪峰"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":760,"userName":"陈建强"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":761,"userName":"史强福"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":762,"userName":"王艳花"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":763,"userName":"陈言"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":764,"userName":"王春丽"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":765,"userName":"张战英"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":766,"userName":"张正睿"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":767,"userName":"张阳"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":768,"userName":"汤学荣"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":769,"userName":"姜书侦"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":770,"userName":"周其琼"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":771,"userName":"席如风"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":772,"userName":"席如娟"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":773,"userName":"李亚欣"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":774,"userName":"田朋朋"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":775,"userName":"谷二强"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":776,"userName":"冯启辉"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":777,"userName":"牛春影"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":778,"userName":"张培珍"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":779,"userName":"高淑芬"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":780,"userName":"孙玉杰"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":781,"userName":"李素桃"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":782,"userName":"王艾可"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":783,"userName":"付静伟"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":784,"userName":"陈兴"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":785,"userName":"周春菊"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":786,"userName":"杨博超"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":787,"userName":"杨秀梅"},{"deptID":102,"deptName":"运营部","restTime":"4","storeID":74,"storeName":"台湾街","totalRest":8,"totalWorkHour":0,"userID":788,"userName":"史庆龙"}],"err_msg":"请求处理成功","err_code":8888,"success":"true"}}
        else if(arg.group=='all'){
            return {"result":[{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":198,"userName":"张凯"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":200,"userName":"宋东宏"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":228,"userName":"李晓青"},{"deptID":95,"deptName":"人资部","postName":"切墩","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":3,"userName":"汪京辉"},{"deptID":95,"deptName":"人资部","postName":"期望13","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":4,"userName":"邓晓娟"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":5,"userName":"陶彬彬"},{"deptID":95,"deptName":"人资部","postName":"总监","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":6,"userName":"孙静"},{"deptID":95,"deptName":"人资部","postName":"副理","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":7,"userName":"赵钰"},{"deptID":95,"deptName":"人资部","postName":"副理","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":9,"userName":"张爽"},{"deptID":95,"deptName":"人资部","postName":"副理","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":13,"userName":"李霞"},{"deptID":95,"deptName":"人资部","postName":"副理","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":14,"userName":"陈俐霞"},{"deptID":95,"deptName":"人资部","postName":"副理","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":41,"userName":"刘红爱"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":11,"userName":"张博"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":10,"userName":"王波"},{"deptID":95,"deptName":"人资部","restTime":"4","totalRest":8,"totalWorkHour":0,"userID":1753,"userName":"夏超"}],"err_msg":"请求处理成功","err_code":8888,"success":"true"}
        }


	},


	// 获取所需人数——天
	getRuquireNubmersDays: 		function(arg){

		/*
		// 接口1 ，周排班 需求人数
		//
		参数：{
			deptID:'',
			storeID:'',
			startDate:'',
			endDate:'',
		}

		数据：

		[
			{
				date:123123123,
				count:1
			},
			{
				date:123123123,
				count:12
			},
			{
				date:123123123,
				count:5
			}
		]


		// 接口2，日排班需求人数
		// {
		// 	date:'123123123',
		// }

		{

			time_0000_0030:{
				date:123123123,
				startTime:'0000',
				endTime:'0030',
				count:1
			},

			time_0100_0130:{
				date:123123123,
				startTime:'0000',
				endTime:'0030',
				count:2
			},

			time_0200_0230:{
				date:123123123,
				startTime:'0000',
				endTime:'0030',
				count:3
			}

		}
		*/
			dataTpl.result = {
				"date_1459440000000":{
					"ID": 1,
					"companyID": 1,
					"createTime": 1462264821000,
					"monthDate": 1459440000000,
					"personCount": 26,
					"registerID": 16,
					"valid": 1,
					"week": 5
				},
				"1459526400000":{
					"ID": 2,
					"companyID": 1,
					"createTime": 1462264841000,
					"monthDate": 1459526400000,
					"personCount": 56,
					"registerID": 16,
					"valid": 1,
					"week": 6
				}
			}

			return dataTpl;

	},
	// 获取所需人数——小时
	getRuquireNubmersHours: 	function(arg){

		dataTpl.result = {
			"time_1330_1400": {
				"ID": 669,
				"companyID": 1,
				"createTime": 1462247887000,
				"endTime": "1400",
				"monthDate": 1459440000000,
				"personCount": 3,
				"registerID": 16,
				"skillID": "123001",
				"startTime": "1330",
				"valid": 1
			}
		}

		return dataTpl;
	},

	// 获取人员技能
	getSkills: function(arg){

		return {"result":[{"ID":150,"code":"123001","codeName":"合计","createTime":1462243229000,"difintionID":29,"orderNum":1,"valid":1},{"ID":151,"code":"123002","codeName":"中餐","createTime":1461757517000,"difintionID":29,"orderNum":2,"valid":1},{"ID":152,"code":"123003","codeName":"凉菜","createTime":1461917244000,"difintionID":29,"orderNum":3,"valid":1},{"ID":153,"code":"123004","codeName":"收银","createTime":1461917249000,"difintionID":29,"orderNum":4,"valid":1},{"ID":154,"code":"123005","codeName":"迎宾","createTime":1461917276000,"difintionID":29,"orderNum":5,"valid":1},{"ID":155,"code":"123006","codeName":"清洁","createTime":1461917280000,"difintionID":29,"orderNum":6,"valid":1},{"ID":156,"code":"123007","codeName":"烧烤","createTime":1461757473000,"difintionID":29,"orderNum":7,"valid":1}],"err_msg":"请求处理成功","err_code":8888,"success":"true"};

	},

	parseExcel(){
		return dataTpl
	}



}
