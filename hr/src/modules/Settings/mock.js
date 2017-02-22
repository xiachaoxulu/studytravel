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
	inservice:false,


    getScheduleConfig(arg){


        dataTpl.result = {
            'managePeriod':1,
            'servicePeriod':2,
            'departmentPeriod':1,
            'acrossDayClasses':2,
            'manageRest':4.5,
            'serviceRest':8.5,
            'departmentRest':6.5,
        }

        return dataTpl;

    },
    putScheduleConfig(arg){

        dataTpl.result = {

        }

        return dataTpl;
    },

	// 模拟数据，可通过arg参数动态返回数据
	getCardList(arg){


	},
	//*****************************模拟系统配置
	getSystemConfigData(data){
		var count=10;
		if(data.code=='100000')
		{
			count=20;
		}
		var results=[];
	    dataTpl.result = results;
		for (var i = 0; i < count; i++) {
			var obj={
				ID:i,
				codeName:'小学'+i,
				code:11100+i,
				orderNum:i+'',
				createTime:'2016-03-07 16:39:56'
			}
			results.push(obj);
		};
		return dataTpl;
	},
	addSystemConfig(data){
		if(data.code=='100000')
		{
			return successRes;
		}
		else
		{
			return dataTpl;
		}
	},
	updateSystemConfig(data){
		if(data.code=='121000')
		{
			return successRes;
		}
		else
		{
			return dataTpl;
		}
	},
	deleteSystemConfig(data)
	{
		return dataTpl;
	}
}
