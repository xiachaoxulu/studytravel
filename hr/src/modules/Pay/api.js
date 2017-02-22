/**
* @Created Date       : 2016-10-19T16:01:01+08:00
* @Last Modified time : 2016-11-01T15:44:34+08:00
*/



export default {
    /*  分页*/

    /**
     * 查询工资项目 分页 [赵志慧]
     *
     * >>提交
     * 分页参数
     *
     * <<响应 {}
     * ID :
     * category: 类别，字典项
     * changeName: 修改人
     * createTime: 修改时间
     * des : 备注
     * itemName: 工资项目名称
     */
    selectPayItems: 'Pay/selectPayitems',


    /**
     * 添加工资项目 [赵志慧]
     *
     * >>提交
     * itemName: 名称
     * category: 类别 [字典项code]
     * des: 描述
     *
     * <<响应 {}
     *
     */
    insertPayItems: 'Pay/insertPayitems',

    /**
     * 更新工资项目 [赵志慧]
     *
     * >>提交
     *
     * ID
     * itemName: 名称
     * category: 类别 [字典项code]
     * des: 描述
     *
     * <<响应 {}
     *
     */
    updatePayItems: 'Pay/updatePayitems',

    /**
     * 删除工资项目 [赵志慧]
     *
     * >>提交
     *
     * IDs:["78"] 可多选
     *
     * <<响应
     * {}
     */
    deletePayItems: 'Pay/deletePayitems',

    /**
     * 查询工资套 [赵志慧]
     *
     * >>提交
     *
     * 分页参数
     *
     * <<响应 []
     * {
     * ID :
     * employeeType : 用工类型，多选， 字典项
     * orgId : 组织id，多选
     * suiteName : 工资套名称
     * valid : 是否开启工资套 1,0
     * }
     */
    selectPaysuite: 'Pay/selectPaysuites',

    /*
    */


    /**
     * 添加工资套 [赵志慧]
     *
     * >>提交
     *
     * suiteName:123  名称
     * orgId:[139,112]  组织id 多选
     * employeeType:100001,100002  用工类型，字典项 多选
     *
     * <<响应 {}
     *
     */
    insertPaysuite: 'Pay/insertPaysuites',

    /**
     * 更新工资套 [赵志慧]
     *
     * >>提交
     *
     * ID:81
     * suiteName:123  名称
     * orgId:[139,112]  组织id 多选 字符串
     * employeeType:100001,100002  用工类型，字典项 多选 字符串
     *
     * <<响应 {}
     *
     */
    updatePaysuites: 'Pay/updatePaysuites',

    /**
     * 删除工资套 [赵志慧]
     *
     * >>提交
     *
     * IDs:[104] 字符串
     *
     * <<响应 {}
     *
     */
    deletePaysuite: 'Pay/deletePaysuites',


    /**
     * 复制工资套 [赵志慧]
     *
     * >>提交
     *
     * suiteId:106 被复制工资套ID
     * suiteName:xxx 新工资套名字
     *
     * <<响应 {}
     *
     */
    copyPaysuite: 'Pay/copyPaysuite',

    /**
     * 开启关闭工资套 [赵志慧]
     *
     * >>提交
     *
     * ID:147
     * open:false 状态
     *
     * <<响应 {}
     *
     */
    togglePaysuite:'Pay/insertPaysuitesOpen',


    /**
     * 薪酬账套 导入，导出 [赵志慧]
     *
     * >>提交
     *
     * file:, 文件数据(formData)
     * imptype:suite or item  导入类型 工资套or工资项目
     *
     * <<响应 {}
     *
     */
    paySeriesImport:'Pay/importExcel',

    /**
     * 薪酬账套 导入，导出 [赵志慧]
     *
     * >>提交 【GET】
     *
     * suiteID:工资套id
     * expType: 类型 suite
     * fileName: 导出文件名
     * titles:导出字段名 e.g. 工资套名称,工资项目,类别,小数位数,计算顺序,工资项目内容
     * fields:导出字段 e.g. suiteName,itemName,type,pointNum,orderNum,formula
     *
     * <<响应
     * 文件流
     */
    paySeriesExport:'Pay/export',


    /**
     * 工资套>工资项目 分页 [赵志慧]
     *
     * >>提交
     *
     * 分页参数
     *
     * <<响应
     *
     * "ID": 64,
     * "itemId": 关联的工资项目ID 152,
     * "formula": 公式 "{分值=20};",
     * "itemName": 名称 e.g. "分值",
     * "orderNum": 计算顺序 1,
     * "pointNum": 小数点位数0,
     * "suiteId": 工资套id  176,
     * "type": 类型 字典项 e.g. "142001"
     *
     */

    selectPaySuiteItems: 'Pay/selectSuiteItems',

    /**
     * 添加工资套项目 [赵志慧]
     *
     * >>提交
     *
     * itemID:30 工资项目ID
     * suiteId:147 所属工资套ID
     * pointNum:2 小数位数
     * formula:{个人所得税=123}; 公式
     *
     * <<响应
     *
     */
    insertPaySuiteItems: 'Pay/insertSuiteItems',



    /**
     * 更新工资套项目 [赵志慧]
     *
     * >>提交
     *
     * ID:12
     * suiteId:147 所属工资套ID
     * pointNum:2 小数位数
     * formula:{个人所得税=123}; 公式
     *
     * <<响应
     *
     */
    updatePaySuiteItems: 'Pay/updateSuiteItems',

    /**
     * 删除工资套项目 [赵志慧]
     *
     * >>提交
     *
     * IDs:[104] 多选，字符串
     *
     * <<响应
     *
     */
    deletePaySuiteItems: 'Pay/deleteSuiteItems',

    /**
     * 保存工资套项目计算顺序 [赵志慧]
     *
     * >>提交
     *
     * order:[{"ID":"38","orderNum":1},{"ID":"39","orderNum":2}] // 字符串
     *
     * <<响应
     *
     */
    orderPaySuiteItems : 'Pay/insertOrderNum',


    /**
     * 查询参与计算项 [赵志慧]
     *
     * >>提交
     *
     *
     * <<响应
     *
        {
            "holiday": {
                "name": "假期"
                "Items": [{
                    "des": "系统内置",
                    "fieldType": "3",
                    "isSys": "y",
                    "itemName": "叫萧公子"
                }],
            },
            "countSuites": {
                "name": "已存在的计算项"
                "Items": [{
                    "ID": 99,
                    "des": "工资套内置",
                    "isSys": "n",
                    "itemName": "实发工资"
                }],
            },
            ...
        }
     *
     */
    selectPaySuiteCountItems:'Pay/selectInsertItems',

    /* 工资套>公式套 */
    selectPaySuiteFormula: 'Pay/selectFormulasuite',
    insertPaySuiteFormula: 'Pay/insertFormulasuite',// 尚未启用
    updatePaySuiteFormula: 'Pay/updateFormulasuite',// 尚未启用
    deletePaySuiteFormula: 'Pay/deleteFormulasuite',// 尚未启用

    /* 查询公式套人员列表 分页*/
    selectEmployeeBySuite:'Pay/selectEmployee',


    /*
      * 员工变动  查询     【孙彦飞】
      * payrangeid：左边树id
      * startTime：开始时间
      * endtime：结束时间
      * userBusiness：员工业务
      * typ：标签
      * b：变动
      * y：应用
      * g：搁置
    */
    selectPayUsers:'acewill/pay/empcha/sl.htm',//查询


    /*
      *员工变动 应用
      * aboutbus:
      * startDate:
      * aboutbusTable:
      * userBusiness:
      * employeeId:
    */
    insertPayUsers:'acewill/pay/empcha/ins.htm',//（应用）


    /*
      *员工变动 搁置
      * aboutbus:
      * startDate:
      * aboutbusTable:
      * userBusiness:
      * employeeId:
    */
    shelveUsers:'acewill/pay/empcha/shel.htm',//（搁置）


    /* ----------------------------------- 薪酬计算与发放 ----------------------------------- */
    /**
     * 查询工资年月
     * >> 提交 无
     * << 响应 [{}]
     * ID: 工资月份编号
     * month: 工资月份字符串 yyyymm 格式
     */
    selectPayYearMonth: 'Pay/paymonth/select.htm',

    // 查询工资套列表（无调用）
    selectPaySuite: 'Pay/payforstaff/selectpayrange.htm',

    /**
     * 查询发放人员
     * >> 提交 {}
     * payrangeID: 工资套ID
     * monthID: 工资月份ID
     * userName: 员工姓名
     * pageSize: 每页显示条目数
     * pageNum: 当前页码
     * << 响应
     * 参见 payCalculate.vue 
     */
    selectPayDistributeEmployee: 'Pay/payforstaff/selectall.htm',
    /**
     * 查询停发人员
     * 同上
     */
    selectPaySuspendEmployee: 'Pay/payforstaff/tingfa.htm',

    /**
     * 重新计算
     * >> 提交 {}
     * rangeID: 工资套ID
     * monthID: 工资年月ID
     * << 响应 {}
     */
    payReComputeAll: 'Pay/payitemsforpay/refresh.htm',
    
    /**
     * 获取单个工资条
     * >> 提交 {}
     * payID: 工资条ID
     * monthID: 工资年月ID
     * suiteID: 工资套ID
     * << 响应 {}
     * ID: 工资条ID
     * month: 工资年月文本 yyyymm
     * organize: 组织名称
     * payItems: [{}] 工资项
     *     itemName: 工资项名称
     *     money: 金额
     *     payItemID: 工资项ID
     *     valueType: 值类型
     * postName: 岗位名称
     * suiteName: 工资套名称
     * userID: 员工ID
     * userName: 员工姓名
     */
    selectPayByID: 'Pay/payforstaff/selectbypayid.htm',

    /**
     * 修改工资项金额
     * >> 提交 {}
     * ID: 工资条编号
     * payItemID: 工资项编号
     * money: 金额数
     * << 响应 {}
     */
    updatePayItemAmount: 'Pay/payitemsforpay/update.htm',

    /**
     * 停发 在发 修改状态
     * IDs []: 工资条编号列表
     * valid: 停发/在发(0/1)
     * reason: 停发原因
     */
    validPayStatus: 'Pay/payforstaff/valid.htm',

    /**
     * 需要重新计算的工资项查询
     * >> 提交 {}
     * suiteID: 工资套ID
     * monthID: 工资年月ID
     * payID: 工资条编号
     * << 响应 [{}]
     * ID: 工资项ID
     * willChangeName: 工资项名称
     */
    selectReComputePayItem: 'Pay/payforstaff/willchangeitems.htm',

    /**
     * 重新计算单个工资条上选中的工资项的金额
     * >> 提交 {}
     * items []: 工资项ID集合
     * payIDs []: 工资条ID
     * << 响应 {}
     */
    payReCompute: 'Pay/payitemsforpay/refreshone.htm',

    /**
     * 导出薪酬 Excel 文件
     * paysuitId: 工资套编号
     * month: 月份
     */
    payExcelExport: 'acewill/export/payExport.htm',

    /**
     * 导入薪酬 Excel 文件
     */
    payExcelImport: 'acewill/import/payImport.htm',

    /**
     * 修改薪资状态(保存, 提交, 撤回)
     * >> 提交 {}
     * rangeID: 工资套ID
     * monthID: 工资月份ID
     * statusCode: 1-保存, 2-提交, 3-撤回
     */
    updatePayStatus: 'Pay/payforstaff/updateStatus.htm'

};
