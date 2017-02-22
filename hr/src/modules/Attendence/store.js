import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>
// 数据、状态
const state = {
    searchParam: {}
  }
  // 数据修改
const mutations = {
    Setsearchparam(data) {
      state.searchParam = data;
    }
  }
  // 操作
const actions = {
  Setsearchparam(data) {
    let p = {};
    Object.assign(p, data);
    mutations.Setsearchparam(p);
  },
  //**********加载系统配置 114000
  findSystemConfig(activeValue, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getSystemConfigData',
      data: {
        defintionCode: activeValue,
        // key: key
      },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  /**
   * 提交排班补卡
   * [submitScheduleRepair description]
   * @param  {[type]} data      [description]
   * @param  {[type]} cbSuccess [description]
   * @param  {[type]} cbError   [description]
   * @return {[type]}           [description]
   */
  submitScheduleRepair(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Attendence.submitScheduleRepair',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  /**提交自定义补卡
   * [submitCustomRepair description]
   * @param  {[type]} data      [description]
   * @param  {[type]} cbSuccess [description]
   * @param  {[type]} cbError   [description]
   * @return {[type]}           [description]
   */
  submitCustomRepair(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Attendence.submitCustomRepair',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  dataSync(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Attendence.dataSync',
      data: { date: data },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getLastTime(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Attendence.getLastTime',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  }
}
export default {
  state,
  mutations,
  actions
};
