exports.daoAnswer = function (success, msg, data) {
    return {
        success: success ? true : false,
        msg: msg.toString(),
        data: data
    }
}