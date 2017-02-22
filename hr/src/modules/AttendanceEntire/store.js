/**
 * @Created Date       : 2016-10-19T11:37:30+08:00
 * @Last Modified time : 2016-10-26T09:58:49+08:00
 */

import Vue from 'vue';
const Tool = Vue.tool;

// VUEX
// flux view>actions>
// 数据、状态
const state = {
    searchParam: {},
    cardRefresh: false, //从中控拉取数据
    downloadExcel: false,
    pushcardtimeData: [],
    dayTime: '',
  }
  // 数据修改
const mutations = {
    Setsearchparam(data) {
      state.searchParam = data;
    },
    Setdownload(flag) {
      state.downloadExcel = flag;
    },
    SetRefresh(flag) {
      state.cardRefresh = flag;
    },
    SetPushcardtime(data, index) {
      data.forEach((item) => {
        item.pushCardTime = Tool.iDate(item.pushCardTime)._hh + ':' + Tool.iDate(item.pushCardTime)._mm + ':' + Tool.iDate(item.pushCardTime)._ss
      })
      state.pushcardtimeData.$set(index, data);
    },
    setDayTime(time) {
      state.dayTime = time;
    },
  } // 操作
const actions = {
  setDayTime(time) {
    mutations.setDayTime(time);
  },
  getPushCard(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getPushCard',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },

  SetRefresh(flag) {
    mutations.SetRefresh(flag);
  },
  Setdownload(flag) {
    mutations.Setdownload(flag);
  },
  //不分页查询系统设置等数据
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
  Setsearchparam(data) {
    let p = {};
    Object.assign(p, data);
    mutations.Setsearchparam(p);
  },
  //获取考勤报表
  getDayReport(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getDayReport',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getMonthReport(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getMonthReport',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //补录新增接口
  addothertimeentry(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.insertOtherTimeEntry',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取日历信息
  getCalendar(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getCalendarInfo',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //获取最后更新日期
  getLasttime(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getLasttime',
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getException(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getException',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getAllot(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getAllot',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  submitDay(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.submitDay',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  selectAllotCount(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.selectAllotCount',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  submitException(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.submitException',
      data: { list: JSON.stringify(data) },
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  submitAllot(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.submitAllot',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  loadOrgListTreeNonPower(cbSuccess, cbError) {
    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.nonPowerdepartment',
        success(deptData, res) {
          resolve(deptData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var storePromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.nonPowerstore',
        success(storeData, res) {
          resolve(storeData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var teamPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.nonPowerstoreTeam',
        success(teamData, res) {
          resolve(teamData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
      var deptData = val[0];
      var storeData = val[1];
      var teamData = val[2];

      if (Array.isArray(teamData)) {
        teamData.forEach(function(elem) {
          elem.nodeType = "team";
          elem.text = elem.teamName;

        });
      }
      if (Array.isArray(storeData)) {
        storeData.forEach(function(elem) {
          if (Array.isArray(teamData)) {
            var childrenButton = teamData.filter(function(item) {
              return item.storeID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              elem.children.push(item);
            });
          }
        });
      }
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          elem.nodeType = "department";
          elem.expanded = false;
          elem.text = elem.departmentName;
          if (Array.isArray(storeData)) {
            var childrenButton = storeData.filter(function(item) {
              return item.deptID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              item.nodeType = "store";
              item.text = item.storeName;
              elem.children.push(item);
            });
          }
        });
      }
      // var treeData = Tool.convertToTree(deptData, 'deptID');
      var treeData2 = Tool.convertToTree(deptData)
      var root = { ID: -1, pageName: '组织树', children: [], expanded: true };
      treeData2.forEach(function(item) {
        item.expanded = true;
        root.children.push(item);
      });

      // 处理没有挂载在部门的 store 
      if (Array.isArray(storeData)) {
        storeData.forEach((elem) => {
          if (!elem.nodeType) {
            elem.text = elem.storeName;
            root.children.push(elem);
          }
        });
      }
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });
  },
  loadOrgListTree(cbSuccess, cbError) {
    var deptPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectDepartment',
        success(deptData, res) {
          resolve(deptData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var storePromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.Permission.selectStore',
        success(storeData, res) {
          resolve(storeData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    var teamPromise = new Promise((resolve, reject) => {
      Tool.ajax({
        url: 'api.OrgEmployee.getAllStoreTeam',
        success(teamData, res) {
          resolve(teamData);
        },
        error(res) {
          reject(res);
        }
      });
    });
    Promise.all([deptPromise, storePromise, teamPromise]).then((val) => {
      var deptData = val[0];
      var storeData = val[1];
      var teamData = val[2];

      if (Array.isArray(teamData)) {
        teamData.forEach(function(elem) {
          elem.nodeType = "team";
          elem.text = elem.teamName;

        });
      }
      if (Array.isArray(storeData)) {
        storeData.forEach(function(elem) {
          if (Array.isArray(teamData)) {
            var childrenButton = teamData.filter(function(item) {
              return item.storeID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              elem.children.push(item);
            });
          }
        });
      }
      if (Array.isArray(deptData)) {
        deptData.forEach(function(elem) {
          elem.nodeType = "department";
          elem.expanded = false;
          elem.text = elem.departmentName;
          if (Array.isArray(storeData)) {
            var childrenButton = storeData.filter(function(item) {
              return item.deptID == elem.ID;
            });
            elem.children = [];
            childrenButton.forEach(function(item) {
              item.nodeType = "store";
              item.text = item.storeName;
              elem.children.push(item);
            });
          }
        });
      }
      // var treeData = Tool.convertToTree(deptData, 'deptID');
      var treeData2 = Tool.convertToTree(deptData)

      var root = { ID: -1, pageName: '组织树', children: [], expanded: true };
      treeData2.forEach(function(item) {
        item.expanded = true;
        root.children.push(item);
      });

      // 处理没有挂载在部门的 store
      if (Array.isArray(storeData)) {
        storeData.forEach((elem) => {
          if (!elem.nodeType) {
            elem.text = elem.storeName;
            root.children.push(elem);
          }
        });
      }
      if (cbSuccess) cbSuccess(root);
    }).catch((e) => {
      if (cbError) cbError(e);
    });


  },
  getAllotMonthInfo(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getAllotMonthInfo',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getAllotTitle(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getAllotTitle',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  submitMonth(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.submitMonth',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getAllotException(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getAllotException',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getSum(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getSum',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getAllRules(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.Settings.getAttendanceOnRuleList',
      success(data, res) { cbSuccess && cbSuccess(data) },
      error(res) { cbError && cbError(res) }
    });
  },

  // --------报表
  getDayEchartPie(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getDayEchartPie',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getDayEchartSplash(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getDayEchartSplash',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getMonthEchartPie(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getMonthEchartPie',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  getMonthEchartSplash(data, cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.AttendanceEntire.getMonthEchartSplash',
      data: data,
      success(data, res) {
        if (cbSuccess) cbSuccess(data);
      },
      error(res) {
        if (cbError) cbError(res);
      }
    });
  },
  //加载异常考勤列表
  getPushcardtime(userID, date, index, callback) {
    var params = {};
    Object.assign(params, {
      userID: userID,
      date: date,
    });
    console.log(params);
    Tool.ajax({
      url: 'api.AttendanceEntire.getPushcardtime',
      data: params,
      success(data, res) {
        callback && callback(data);
        mutations.SetPushcardtime(data, index);
        console.log(data);
      },
      error(res) {

      }
    })
  },
  loadEmployeeByKey(key, cbSuccess, cbError) {
    if (!key) return;
    Tool.ajax({
      url: 'api.OrgEmployee.getEmployeesByKey',
      data: { userName: key },
      success(data, res) {
        cbSuccess && cbSuccess(data);
      },
      error(res) { cbError && cbError(res); }
    });
  },
  getDayReportNotifyList(cbSuccess, cbError) {
    Tool.ajax({
      url: 'api.OrgEmployee.getDayReportNotify',
      success(data, res) { cbSuccess && cbSuccess(data); },
      error(res) { cbError && cbError(res); }
    });
  }
}

export default {
  state,
  mutations,
  actions
};
