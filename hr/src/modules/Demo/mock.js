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

	// 模拟数据，可通过arg参数动态返回数据
	getCardList(arg){

		dataTpl.result = {

		}

		return dataTpl;

	},


    test(){


        dataTpl.result ={}

        return dataTpl;


    }


}
