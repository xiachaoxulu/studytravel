export default {
  /**
   * 按字典分类编码获取系统字典项
   * >> 提交 {}
   * defintionCode: 字典分类编码
   * << 响应 [{}]
   * ID: 字典项ID
   * code: 字典项编码
   * codeName: 字典项名称
   * difintionID: 字典项分类ID
   * flag: 1为内置项
   * orderNum: 排序号
   */
  getSystemConfigData: 'system/codecontent/selectByDifintionCode.htm', 

  /**
   * 获取待审批最近数目和全部数目
   * >> 提交 无
   * << 响应 {}
   * allcount: 全部待审批数目
   * pcount: 最近待审批数目
   */
  getApprovalPendingCount: 'acewill/workflow/selectwfcount.htm',

  /**
   * 获取待审批数组列表
   * >> 提交 无
   * << 响应 {}
   * wkId: 工作流审批ID
   * title: 审批标题
   * flag: 1为最近待审批
   * date: 提交日期
   * text: 审批内容描述
   */
  getApprovalPendingList: 'acewill/workflow/selectwflist.htm',

  /**
   * 审批同意
   * >> 提交 {}
   * taskId: 工作流ID
   * msg: 审批意见
   * << 响应 {}
   */
  approvalResolve: 'acewill/workflow/completeMyprocessTask',
  
  /**
   * 审批驳回
   * >> 提交 {}
   * taskId: 工作流ID
   * msg: 驳回意见
   * << 响应 {}
   */
  approvalReject: 'acewill/workflow/completeRollbackTask',

  /**
   * 审批转审
   * >> 提交 {}
   * taskId: 工作流ID
   * msg: 转审意见
   * << 响应 {}
   */
  approvalTransfer: 'acewill/workflow/completeTransferToSign',

  /*------------------------- 工作流审批列表 -------------------------*/
  /**
   * 离职用户列表
   * >> 提交 {}
   * state []: 审批状态
   * userType []: 用工类型
   * organizeID []: 组织编号
   * sDate: 开始时间
   * eDate: 结束时间
   * userName: 员工姓名
   * type: 0-待审批, 1-已审批, 2-我的
   * << 响应
   * 参见 store.js 中 fieldsDimission 字段
   */
  getDimissionEmployee: 'acewill/workflow/selectwkpendingpage.htm',

  /**
   * 请假用户列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsVacation 字段
   */
  getVacationEmployee: 'acewill/workflow/selectwkvacatepage.htm', 

  /**
   * 加班用户列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsOvertime 字段
   */
  getOvertimeEmployee: 'acewill/workflow/selectwkactovertimepage.htm', 

  /**
   * 转正用户列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsOffical 字段
   */
  getOfficalEmployee: 'acewill/workflow/selectwkOfficialpage.htm', 

  /**
   * 员工入职列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsEntry 字段
   */
  getEntryEmployee: 'acewill/workflow/selectwkempentrypage.htm', 

  /**
   * 员工异动列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsTransfer 字段
   */
  getTransferEmployee: 'acewill/workflow/selectwktransferworkpage.htm', 

  /**
   * 员工出差列表
   * >> 提交 {}
   * 同上
   * << 响应
   * 参见 store.js 中 fieldsBizTrip 字段
   */
  getBizTripEmployee: 'acewill/workflow/selectbusinesstrippage.htm', 

  /* ----------------------------------------------------------------------------------------------- */
                                                                    
  /* --------------------------------- Excel导出 --------------------------------------------------- */
  /**
   * 离职
   * >> 提交 {}
   * state []: 审批状态
   * userType []: 用工类型
   * organizeID []: 组织编号
   * sDate: 开始时间
   * eDate: 结束时间
   * userName: 员工姓名
   * type: 0-待审批, 1-已审批, 2-我的
   * << 响应 无
   */
  exportDismissionEmployee: 'acewill/workflow/exportwkpending.htm',  

  /**
   * 请假
   * 同上
   */
  exportVacationEmployee: 'acewill/workflow/exportwkvacate.htm', 

  /**
   * 加班
   * 同上
   */
  exportOvertimeEmployee: 'acewill/workflow/exportwkactovertime.htm', 

  /**
   * 转正
   * 同上
   */
  exportOfficalEmployee: 'acewill/workflow/exportwkOfficial.htm', 

  /**
   * 入职
   * 同上
   */
  exportEntryEmployee: 'acewill/workflow/exportwkempentry.htm', 

  /**
   * 异动
   * 同上
   */
  exportTransferEmployee: 'acewill/workflow/exportwktransferwork.htm', 
  
  /**
   * 出差
   * 同上
   */
  exportBizTripEmployee: 'acewill/workflow/exportbusinesstrip.htm', 
  /* ----------------------------------------------------------------------------------------------- */                                                                                                                                      
}
