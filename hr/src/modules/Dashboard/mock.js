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
    inservice: false,

    getCardList(arg) {

        dataTpl.result = {

        }

        return dataTpl;

    },
    getCardDataOfWarning(arg){
        dataTpl.result = {
            "healthCardWarning": 1, //健康证预警
            "monthCheckWorkWarning": 0, //月工时预警
            "dayCheckWorkWarning": 0, //日工时预警
            "contractWarning": 0 //合同预警
        }
        return dataTpl;
    },
    getCardDataOfAttendance(arg){
        dataTpl.result = {
            "noConfirmAbnormal": 0, //未确认调拨
            "onWorkNumber": "0/0", //实到人数/排班人数
            "noSolveAbnormal": 1 //未处理异常
        }

        return dataTpl;
    },
    getCardDataOfEmployee(arg){
        dataTpl.result = {
            "applyLeaveOffice": 0, //申请离职
            "stayPositive": 0 //待转正
        }

        return dataTpl;
    },
}
