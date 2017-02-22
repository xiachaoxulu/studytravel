export default {
  // 出差申请
   
  /**
   * 分页查询出差申请列表
   * >> 提交 {}
   * pageNum: 页码
   * pageSize: 每页显示数
   * sDate: 开始时间，时间字符串，如 "2016-11-10 00:00:00"
   * eDate: 结束时间，时间字符串，如 "2016-11-10 00:00:00"
   * startAddr: 出发地
   * towhere: 目的地
   * 
   * << 响应 {}
   * pageCount: 页数
   * pageNum: 页码
   * recordCount: 总条目数
   * recordList: [{}]
   *   ID: 出差申请编号
   *   endTime: 结束时间，时间戳
   *   hourOrDays: 时长（小时/天）
   *   reason: 出差原因编码
   *   reasonDetails: 出差原因
   *   startAddr: 出发地
   *   startTime: 开始时间，时间戳
   *   status: 状态编码
   *   statusName: 状态名称
   *   towhere: 目的地
   *   userID: 员工编号
   *   userName: 员工姓名
   *   userNum: 员工工号
   *   userPost: 岗位名称
   *   userTypeName: 员工类型名称
   * startRecord: 开始显示的记录索引
   */
  getBizTripApplyList: 'acewill/pushcard/actbustrip/select.htm', // 分页查询

  /**
   * 按出差申请ID获取单个出差申请
   */
  getBizTripApplyByID: 'acewill/pushcard/actbustrip/select.htm',

  /**
   * 更新出差申请（修改出差返回时间）
   * >> 提交 {}
   * ID: 出差申请ID
   * realBackTime: 出差返回时间（时间字符串）
   * 
   * << 响应
   */
  editBizTripApply: 'acewill/pushcard/actbustrip/update.htm',

  /**
   * 添加出差申请
   * >> 提交 {}
   * userID: 申请员工编号
   * sDate: 出发时间（时间字符串）
   * eDate: 返程时间（时间字符串）
   * startAddr: 出发地
   * towhere: 目的地
   * hourOrDays: 时长（单位小时或天）
   * reason: 出差原因（字典编码）
   * 
   * << 响应
   */
  addBizTripApply: 'acewill/pushcard/actbustrip/insert.htm',

  /**
   * 批量删除出差申请
   */
  removeBizTripApplyList: 'acewill/pushcard/actbustrip/delete.htm',

  /**
   * 查询单个员工的假期申请时间单位
   * >> 提交 {}
   * userID: 员工编号
   * type: 假期类型
   *   133001   年假
   *   133002   事假
   *   133005   病假
   *   133006   丧假
   *   133003   调休
   *   133004   婚假
   * << 响应 {}
   */
  getEmployeeVacationDurationUnit: 'acewill/pushcard/actleave/guize.htm',

  /**
   * 查询单个员工的出差申请时间单位
   * >> 提交 {}
   * userID: 员工编号
   * << 响应 {}
   */
  getEmployeeBizTripDurationUnit: 'acewill/pushcard/actbustrip/guize.htm',

  /**
   * 查询单个员工的加班申请时间单位
   * >> 提交 {}
   * userID: 员工编号
   * << 响应 {}
   */
  getEmployeeOvertimeDurationUnit: 'acewill/pushcard/actovertime/guize.htm',


  // 加班申请
  
  /**
   * 分页查询加班申请列表
   * >> 提交 {}
   * pageNum: 页码
   * pageSize: 每页显示数
   * sDate: 开始时间，时间字符串，如 "2016-11-10 00:00:00"
   * eDate: 结束时间，时间字符串，如 "2016-11-10 00:00:00"
   * 
   * << 响应
   * pageCount: 页数
   * pageNum: 页码
   * recordCount: 总条目数
   * recordList: [{}]
   *   ID: 加班申请编号
   *   dayOrHours: 时长（小时或天）
   *   endTime: 结束时间，时间戳
   *   reason: 出差原因编码
   *   reasonDetails: 出差原因
   *   startTime: 开始时间，时间戳
   *   status: 状态编码
   *   statusName: 状态名称
   *   userID: 员工编号
   *   userName: 员工姓名
   *   userNum: 员工工号
   *   userPost: 岗位名称
   *   userTypeName: 员工类型名称
   * startRecord: 开始显示的记录索引
   */
  getOvertimeApplyList: 'acewill/pushcard/actovertime/select.htm',

  /**
   * 按加班申请ID获取单个加班申请
   */
  getOvertimeApplyByID: 'acewill/pushcard/actovertime/select.htm',

  /**
   * 更新加班申请
   */
  editOvertimeApply: 'acewill/pushcard/actovertime/update.htm',

  /**
   * 添加加班申请
   * >> 提交 {}
   * userID: 申请员工编号
   * sDate: 开始时间
   * eDate: 结束时间
   * dayOrHours: 时长（小时或天）
   * reason: 加班原因（字典编码）
   * 
   * << 响应
   */
  addOvertimeApply: 'acewill/pushcard/actovertime/insert.htm',

  /**
   * 批量删除加班申请
   */
  removeOvertimeApplyList: 'acewill/pushcard/actovertime/delete.htm',

  // 请假申请
   
  /**
   * 分页查询请假申请列表
   * >> 提交 {}
   * pageNum: 页码
   * pageSize: 每页显示数
   * sDate: 开始时间，时间字符串，如 "2016-11-10 00:00:00"
   * eDate: 结束时间，时间字符串，如 "2016-11-10 00:00:00"
   * type: 假期类型（字典编码）
   * 
   * << 响应
   * pageCount: 页数
   * pageNum: 页码
   * recordCount: 总条目数
   * recordList: [{}]
   *   ID: 请假申请编号
   *   dayOrHours: 时长（小时或天）
   *   leaveType: 假期类型名称
   *   endTime: 结束时间，时间戳
   *   reason: 出差原因编码
   *   reasonDetails: 出差原因
   *   startTime: 开始时间，时间戳
   *   status: 状态编码
   *   statusName: 状态名称
   *   userID: 员工编号
   *   userName: 员工姓名
   *   userNum: 员工工号
   *   userPost: 岗位名称
   *   userTypeName: 员工类型名称
   * startRecord: 开始显示的记录索引
   */
  getVacationApplyList: 'acewill/pushcard/actleave/select.htm', 

  /**
   * 按请假申请ID获取单个请假申请
   */
  getVacationApplyByID: 'acewill/pushcard/actleave/select.htm',

  /**
   * 更新请假申请
   */
  editVacationApply: 'acewill/pushcard/actleave/update.htm',


  /**
   * 获取年假剩余时长
   * >> 提交 {}
   * uId: 员工编号
   * sDate: 开始时间
   * << 响应 {}
   * resday: 上一年剩余假期
   * cleartime: 上一年假期清零日期
   * btime: 假期开始时间
   * etime: 假期结束时间
   * clearLastStatus: 到达清零日期时不允许申请年假
   * residueday: 本年度剩余假期
   */
  getAnnualVacationRemain: 'Holiday/selectyeardays',

  /**
   * 获取调休剩余时长
   * >> 提交 {}
   * sDate: 开始时间
   * eDate: 结束时间
   * userID: 员工编号
   * << 响应 {}
   */
  getCompensationVacationRemain: 'acewill/pushcard/shengyutiaoxiu.htm',

  /**
   * 添加请假申请
   * >> 提交 {}
   * userID: 申请员工编号
   * userName: 员工姓名
   * userNum: 员工工号
   * sDate: 开始时间
   * eDate: 结束时间
   * type: 假期类型（字典编码）
   * dayOrHours: 时长（小时或天）
   * reason: 请假原因（字典编码）
   * unit: 时长单位
   * << 响应
   */
  addVacationApply: 'acewill/pushcard/actleave/insert.htm',

  /**
   * 批量删除请假申请
   */
  removeVacationApplyList: 'acewill/pushcard/actleave/delete.htm',

  /**
   * 申请提交至工作流
   * >> 提交 {}
   * busCode: 工作流类型编码： actbustrip: 出差, actovertime: 加班, actleave: 请假
   * rId: 申请编号
   * 
   * << 响应
   */
  submitToWorkflow: 'acewill/workflow/startWorkflow',


  getBizTripProvinceList: 'acewill/pushcard/selectProvince', // 
  getBizTripCityList: 'acewill/pushcard/selectCity',
  getBizTripAreaList: 'acewill/pushcard/selectArea',
}
