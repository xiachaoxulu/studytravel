const mysql = require('./mysqlHelper');
const tool = require('./common');
/**
 * 统一返回给上层:{
 *  
 *  success:boolean,
 *  msg:'',
 *  data
 * 
 * }
 */



exports.selectAll = async function () {
    try {
        let sql = "select id,stateName,stateOrder from ACTIVITY_STATE Where valid=1";
        let result = await mysql.query(sql);
        tool.daoAnswer(true, '', result);
    } catch (error) {

    }
}

/**
 * id: 主键,整形
 * 
 */
exports.deleteById = async function (id) {
    try {
        let result = await mysql.query("delete from ACTIVITY_STATE Where id=?", [id]);
        if (result.affectRows === 0) {
            return tool.daoAnswer(false, '未知错误,请查看日志', '');
        } else {
            return tool.daoAnswer(true, '删除成功', '');
        }
    } catch (error) {

    }
}
/**
 * data:{ 
 *  stateName:''
 * }
 * 状态的名称
 * 
 */
exports.add = async function (data) {
    try {
        let existNameSql = "select stateName from ACTIVITY_STATE Where stateName =?";
        let result = await mysql.query(existNameSql, data.stateName);
        if (result.length === 0) {
            let maxOrder = await mysql.query("select max(stateOrder) as maxOrder  from ACTIVITY_STATE");
            if (maxOrder.length === 0) {
                maxOrder = 1;
            } else {
                maxOrder = maxOrder[0].maxOrder - 0 + 1;
            }
            let sql = "insert into ACTIVITY_STATE(`stateName`,`stateOrder`) values ( ?,?)";
            let result = await mysql.query(sql, [data.stateName, maxOrder]);
            if (result.affectRows === 0) {
                return tool.daoAnswer(false, '未知错误,请查看日志', '');
            } else {
                return tool.daoAnswer(true, '添加成功', result.inerstId);
            }
        } else {
            return tool.daoAnswer(false, '名称重复', '');
        }
    } catch (error) {

    }
}

/**
 * data:{
 *  id:3
 *  stateName:''
 * }
 * 
 * 
 */
exports.updateNameById = async function (data) {
    let existNameSql = "select stateName from ACTIVITY_STATE Where stateName =?";
    let result = await mysql.query(existNameSql, data.stateName);
    if (result.length !== 0) {
        let result = await mysql.query("update ACTIVITY_STATE set stateName =? Where id=?", [data.stateName, data.id]);
    } else {
        return tool.daoAnswer(false, '名称重复', '');
    }
}
/**
 * data:[
 * {
 *  id:3,stateOrder:9
 * }
 * 
 * ]
 * 
 * 
 */
exports.changeOrder = async function (data) {
    try {
        let result = await mysql.execTransaction((conn) => {
            data.forEach((item) => {
                conn.query("update ACTIVITY_STATE set stateOrder=? Where id=?", [item.stateOrder, item.id]);
            });
        });
        console.log(result)
    } catch (error) {

    }

}