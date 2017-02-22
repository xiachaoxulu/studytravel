import Vue from 'vue';
const Tool = Vue.tool;

const state = {
  bizTripList: [], // 出差数据数组
  bizTripSelected: [], // 出差列表中选择数据的ID数组
  overtimeList: [], // 加班数据数组
  overtimeSelected: [], // 加班列表中选择数据的ID数组
  vacationList: [], // 请假数据数组
  vacationSelected: [] // 请假列表中选择数据的ID数组
};

const mutations = {
  // 设置出差数据列表
  SetBizTripList(list) {
    state.bizTripList = list;
  },
  // 设置加班数据列表
  SetOvertimeList(list) {
    state.overtimeList = list;
  },
  // 设置请假数据列表
  SetVacationList(list) {
    state.vacationList = list;
  }
};

const actions = {
  /**
   * 获取系统字典项数据
   *
   * @param      {String}    activeValue  字典项分类编码
   * @param      {Function}  cbSuccess    The cb success
   * @param      {Function}  cbError      The cb error
   */
  findSystemConfig(activeValue, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: { defintionCode: activeValue },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按员工编号获取员工出差申请时长单位
   *
   * @param      {<type>}    empID      The emp id
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadEmployeeBizTripDurationUnit(empID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getEmployeeBizTripDurationUnit',
      data: { userID: empID },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按员工编号获取员工加班申请时长单位
   *
   * @param      {<type>}    empID      The emp id
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadEmployeeOvertimeDurationUnit(empID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getEmployeeOvertimeDurationUnit',
      data: { userID: empID },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按员工编号获取员工请假申请时长单位
   *
   * @param      {<type>}    empID      The emp id
   * @param      {<type>}    type       The type, code content
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadEmployeeVacationDurationUnit(empID, type, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getEmployeeVacationDurationUnit',
      data: { userID: empID, type: type },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按条件查询出差申请列表
   *
   * @param      {Object}    conditions  条件键值对查询条件
   * @param      {Function}  cbSuccess   The cb success
   * @param      {Function}  cbError     The cb error
   */
  loadBizTripList(conditions, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripApplyList',
      data: conditions,
      success(data, res) {
        mutations.SetBizTripList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按出差申请编号查询单个出差申请
   *
   * @param      {String}    id         出差申请编号
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadBizTripApplyByID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripApplyByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 添加出差申请
   *
   * @param      {Object}    apply      申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  addBizTripApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.addBizTripApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 修改出差申请
   *
   * @param      {Object}    apply      申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  editBizTripApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.editBizTripApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按条件查询加班申请列表
   *
   * @param      {Object}    conditions  条件键值对查询条件
   * @param      {Function}  cbSuccess   The cb success
   * @param      {Function}  cbError     The cb error
   */
  loadOvertimeApplyList(conditions, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getOvertimeApplyList',
      data: conditions,
      success(data, res) {
        mutations.SetOvertimeList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按出差申请编号查询单个出差申请
   *
   * @param      {String}    id         出差申请编号
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadOvertimeApplyByID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getOvertimeApplyByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 添加加班申请
   *
   * @param      {Object}    apply      加班申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  addOvertimeApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.addOvertimeApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 修改加班申请
   *
   * @param      {Object}    apply      加班申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  editOvertimeApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.editOvertimeApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按条件查询请假申请列表
   *
   * @param      {Object}    conditions  条件键值对查询条件
   * @param      {Function}  cbSuccess   The cb success
   * @param      {Function}  cbError     The cb error
   */

  loadVacationApplyList(conditions, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getVacationApplyList',
      data: conditions,
      success(data, res) {
        mutations.SetVacationList(data);
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 按请假申请编号查询单个加班申请
   *
   * @param      {String}    id         加班申请编号
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  loadVacationApplyByID(id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getVacationApplyByID',
      data: { ID: id },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 获取年假剩余时长
   *
   * @param      {<type>}    userID     The user id
   * @param      {<type>}    startDate  The start date
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  getAnnualVacationRemain(userID, startDate, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getAnnualVacationRemain',
      data: { uId: userID, sDate: startDate },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 获取调休剩余时长
   *
   * @param      {<type>}    startDate  The start date
   * @param      {<type>}    endDate    The end date
   * @param      {<type>}    userID     The user id
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  getCompensationVacationRemain(startDate, endDate, userID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getCompensationVacationRemain',
      data: { sDate: startDate, eDate: endDate, userID: userID },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  /**
   * 添加请假申请
   *
   * @param      {Object}    apply      请假申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  addVacationApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.addVacationApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 修改请假申请
   *
   * @param      {Object}    apply      请假申请数据对象
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  editVacationApply(apply, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.editVacationApply',
      data: apply,
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },
  /**
   * 申请提交至工作流公用接口处理
   *
   * @param      {String}    busCode    工作流类型编号，actbustrip: 出差, actovertime: 加班, actleave: 请假
   * @param      {String}    id         申请编号
   * @param      {Function}  cbSuccess  The cb success
   * @param      {Function}  cbError    The cb error
   */
  submitToWorkflow(busCode, id, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.submitToWorkflow',
      data: { busCode: busCode, rId: id },
      success(data, res) { cbSuccess && cbSuccess(res); },
      error(res) { cbError && cbError(res); }
    });
  },

  loadBizTripProvinceList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripProvinceList',
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  loadBizTripProvinceList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripProvinceList',
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },

  loadBizTripCityList(pID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripCityList',
      data: { code: pID },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  }, 

  loadBizTripAreaList(cID, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Apply.getBizTripAreaList',
      data: { code: cID },
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  },    
};

const config = {
  // 出差申请材料字典编码
  BizTripApplyMaterialCode: '137000',
  // 加班申请材料字典编码
  OvertimeApplyMaterialCode: '136000',
  // 请假申请材料字典编码
  VacationApplyMaterialCode: '135000',
  // 出差原因字典编码
  BizTripReasonCode: '134000',
  // 加班原因字典编码
  OvertimeReasonCode: '139000',
  // 加班类型字典编码
  OvertimeCategoryCode: '159000',
  // 请假原因字典编码
  VacationReasonCode: '138000',
  // 假期类型字典编码
  VacationCategoryCode: '133000',
  // 出差类型字典编码
  BizTripCategoryCode: '160000',
}

export default {
  state,
  mutations,
  actions,
  config
}
