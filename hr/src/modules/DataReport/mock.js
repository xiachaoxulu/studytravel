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
	inservice:true,

	//未来门店规划数据
	getFutrueStorePlan(arg){

		dataTpl.result = [
			{
			"companyId": 1,
			"date": 1462073869000,
			"id": 1,
			"storeNum": 20
			},
			{
			"companyId": 1,
			"date": 1496547494000,
			"id": 2,
			"storeNum": 30
			},
			{
			"companyId": 1,
			"date": 1528083507000,
			"id": 3,
			"storeNum": 15
			},
			{
			"companyId": 1,
			"date": 1559619521000,
			"id": 4,
			"storeNum": 25
			},
			{
			"companyId": 1,
			"date": 1591241941000,
			"id": 5,
			"storeNum": 50
			}
		]
		return dataTpl;
	},

	getCardList(arg){
		dataTpl.result = {

		}
		return dataTpl;

	},

	//考勤规则数据
	getAttendenceRule(arg){
		dataTpl.result = {

		}
		return dataTpl;
	},

	//离职率数据
	getLeaveRate(arg){
		dataTpl.result = {

		}

		return dataTpl;
	},

	//日（月）考勤工时
	getDailyWorkTime(arg){
		dataTpl.result = {

		}
		return dataTpl;
	},

	//日（月）考勤工时-饼状图
	getpieDailyWorkTime(arg){
  dataTpl.result = {
        "overTimeWorkHour":0,//加班工时
        "clockWorkHour":0 //打卡工时
    }
		return dataTpl;
	},
	//人力成本数据
	getHumanCost(arg){
		dataTpl.result = {

		}
		return dataTpl;
	},

	//薪资数据
	getSalary(arg){
		dataTpl.result = {

		}
		return dataTpl;
	},

	//动态数据
	getMovingData(arg){
		dataTpl.result = {

		}
		return dataTpl;

	},

	//年龄分布-饼状图
	getYearPercent(arg){
		dataTpl.result = {

		}
		return dataTpl;

	}

}
